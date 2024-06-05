import React, { useEffect, useRef } from 'react';
import './MediaPipe3D.css';
import { FilesetResolver, HandLandmarker, PoseLandmarker } from '@mediapipe/tasks-vision';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const backend = require('../../services/backend/Backend');

const NOSE = 0;
const LEFTEYEINNER = 1;
const LEFTEYE = 2;
const LEFTEYEOUTER = 3;
const RIGHTEYEINNER = 4;
const RIGHTEYE = 5;
const RIGHTEYEOUTER = 6;
const LEFTEAR = 7;
const RIGHTEAR = 8;
const MOUTHLEFT = 9;
const MOUTHRIGHT = 10;
const LEFTSHOULDER = 11;
const RIGHTSHOULDER = 12;
const LEFTELBOW = 13;
const RIGHTELBOW = 14;
const LEFTWRIST = 15;
const RIGHTWRIST = 16;
const LEFTPINKY = 17;
const RIGHTPINKY = 18;
const LEFTINDEX = 19;
const RIGHTINDEX = 20;
const LEFTTHUMB = 21;
const RIGHTTHUMB = 22;

const WRIST = 0;
const THUMB_CMC = 1;
const THUMB_MCP = 2;
const THUMB_IP = 3;
const THUMB_TIP = 4;
const INDEX_FINGER_MCP = 5;
const INDEX_FINGER_PIP = 6;
const INDEX_FINGER_DIP = 7;
const INDEX_FINGER_TIP = 8;
const MIDDLE_FINGER_MCP = 9;
const MIDDLE_FINGER_PIP = 10;
const MIDDLE_FINGER_DIP = 11;
const MIDDLE_FINGER_TIP = 12;
const RING_FINGER_MCP = 13;
const RING_FINGER_PIP = 14;
const RING_FINGER_DIP = 15;
const RING_FINGER_TIP = 16;
const PINKY_MCP = 17;
const PINKY_PIP = 18;
const PINKY_DIP = 19;
const PINKY_TIP = 20;

const MediaPipe3D = () => {
    const videoRef = useRef(null);
    const canvasElementRef = useRef(null);
    const webcambutton = useRef(null);
    const demosSectionRef = useRef(null);
    const poseEsti = useRef(null);
    const handEsti = useRef(null);
    const videobutton = useRef(null);


    useEffect(() => {
        const demosSection = demosSectionRef.current;

        let handLandmarker = undefined;
        let poseLandmarker = undefined;
        let runningMode = "VIDEO";
        let enableWebcamButton = webcambutton.current;
        let webcamRunning = false;

        // Before we can use HandLandmarker class we must wait for it to finish
        // loading. Machine Learning models can be large and take a moment to
        // get everything needed to run.
        const createLandmarkers = async () => {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
            );
            handLandmarker = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                    delegate: "GPU"
                },
                runningMode: runningMode,
                numHands: 2,
                min_tracking_confidence: 0,
                min_hand_detection_confidence: 0,
                min_detection_confidence: 0.1,


            });
            poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
                    delegate: "GPU"
                },
                runningMode: runningMode
            });
        }

        demosSection.classList.remove("invisible");
        createLandmarkers();

        const video = videoRef.current;
        

        const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

        if (hasGetUserMedia()) {
            enableWebcamButton.addEventListener("click", toggleCam);
        } else {
            console.warn("getUserMedia() is not supported by your browser");
        }

        function toggleCam(event) {

            if (webcamRunning) {
                return;
            }

            webcamRunning = true;

            enableWebcamButton.classList.add("invisible");
            document.getElementById('inferenceelements').style.display = 'block';


            // getUsermedia parameters.
            const constraints = {
                video: true
            };

            // Activate the webcam stream.
            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                video.srcObject = stream;
                video.addEventListener("loadeddata", predictWebcam);
            });
        }



        let lastVideoTime = -1;

        let handconnections = HandLandmarker.HAND_CONNECTIONS;
        let poseconnections = PoseLandmarker.POSE_CONNECTIONS;

        // Create a new Three.js scene, camera, and renderer
        const scene = new THREE.Scene();



        const fov = 50;
        const aspect = 9 / 16; // the canvas default
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        camera.position.set(0, 0.5, 1.5);
        camera.lookAt(0, 0.5, 0);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasElementRef.current });
        renderer.setSize(360, 640);

        let controls = new OrbitControls(camera, renderer.domElement);

        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 5 });


        let framecounter = 1;

        let posepoints = [];
        let lefthandpoints = [];
        let righthandpoints = [];
        async function predictWebcam() {
            
            let startTimeMs = performance.now();
            if (lastVideoTime !== video.currentTime) {
                framecounter++;
                lastVideoTime = video.currentTime;
                let handresults = await handLandmarker.detectForVideo(video, startTimeMs);
                let poseresults = await poseLandmarker.detectForVideo(video, startTimeMs);
                


                scene.clear();
                let poseVectors;
                let thisposepoints = [];
                
                if (poseresults?.worldLandmarks[0]) {
                    poseVectors = [];
                    
                    for (let j = 0; j < poseresults.worldLandmarks[0].length; j++) {
                        const landmark = poseresults.worldLandmarks[0][j];

                        
                        //check if they are not null
                        if (landmark.x !== null && landmark.y !== null && landmark.z !== null) {
                            if (j < 23) thisposepoints.push([landmark.x, landmark.y, landmark.z]);

                            poseVectors.push(new THREE.Vector3(((landmark.x) * -1), ((landmark.y) * -1), ((landmark.z) * -1)));
                        } else {
                            thisposepoints.push([0.0, 0.0, 0.0])
                            poseVectors.push(false);
                        }
                    }

                    posepoints.push(thisposepoints);

                    for (let i = 0; i < poseconnections.length; i++) {
                        const { start, end } = poseconnections[i];
                        if (poseVectors[start] && poseVectors[end]) {
                            const path = new THREE.CatmullRomCurve3([poseVectors[start], poseVectors[end]]);
                            const lineGeometry = new THREE.BufferGeometry();

                            // create a line from the path
                            lineGeometry.setFromPoints(path.getPoints(5));

                            const line = new THREE.Line(lineGeometry, lineMaterial);
                            scene.add(line);
                        }
                    };
                } else {
                    let defaultvalues = Array(23).fill([0.0,0.0,0.0]);
                    posepoints.push(defaultvalues);
                }

                let handVectors;
                let leftset = false;
                let rightset = false;

                if (handresults?.worldLandmarks && poseresults?.worldLandmarks[0]) {
                    
                    for (let i = 0; i < handresults.worldLandmarks.length; i++) { //for each hand detected,
                        handVectors = [];
                        let thishandpoints = [];
                        let wristmarker;
                        let deltax;
                        let deltay;
                        let deltaz;

                        let isright = false;
                        if (handresults.handedness[i][0].displayName === 'Left') {

                            wristmarker = poseresults.worldLandmarks[0][RIGHTWRIST]; //get the wrist marker from the pose estimation
                            deltax = wristmarker.x - handresults.worldLandmarks[i][WRIST].x;
                            deltay = wristmarker.y - handresults.worldLandmarks[i][WRIST].y;
                            deltaz = wristmarker.z - handresults.worldLandmarks[i][WRIST].z;

                        } else if (isright = (handresults.handedness[i][0].displayName === 'Right')) {
                            wristmarker = poseresults.worldLandmarks[0][LEFTWRIST]; //get the wrist marker from the pose estimation
                            deltax = wristmarker.x - handresults.worldLandmarks[i][WRIST].x;
                            deltay = wristmarker.y - handresults.worldLandmarks[i][WRIST].y;
                            deltaz = wristmarker.z - handresults.worldLandmarks[i][WRIST].z;
                        }
                        for (let j = 0; j < handresults.worldLandmarks[i].length; j++) { //for each landmark in the pose
                            const landmark = handresults.worldLandmarks[i][j];
                            //check if they are not null
                            if (landmark && landmark.x !== null && landmark.y !== null && landmark.z !== null) {
                                thishandpoints.push([landmark.x, landmark.y, landmark.z])
                                handVectors.push(new THREE.Vector3(((landmark.x + deltax) * -1), ((landmark.y + deltay) * -1), ((landmark.z + deltaz) * -1)));
                            } else {
                                thishandpoints.push([0.0, 0.0, 0.0])
                                handVectors.push(false);
                            }
                        }

                        if (isright) {
                            if (!rightset) {
                                righthandpoints.push(thishandpoints);
                                rightset = true;
                            } else {
                                lefthandpoints.push(thishandpoints);
                                leftset = true;
                            }
                        } else {
                            if (!leftset) {
                                lefthandpoints.push(thishandpoints);
                                leftset = true;
                            } else {
                                righthandpoints.push(thishandpoints);
                                rightset = true;
                            }
                        }

                        for (let i = 0; i < handconnections.length; i++) {
                            const { start, end } = handconnections[i];
                            if (handVectors[start] && handVectors[end]) {
                                const path = new THREE.CatmullRomCurve3([handVectors[start], handVectors[end]]);
                                const lineGeometry = new THREE.BufferGeometry();

                                // create a line from the path
                                lineGeometry.setFromPoints(path.getPoints(5));

                                const line = new THREE.Line(lineGeometry, lineMaterial);
                                scene.add(line);
                            }
                        }
                }

                }
                if (!leftset) {
                    lefthandpoints.push(Array(21).fill([0.0,0.0,0.0]));
                }
                if (!rightset) {
                    righthandpoints.push(Array(21).fill([0.0,0.0,0.0]));
                }

                renderer.render(scene, camera);

                if (framecounter % 150 === 0) {
                    let results = backend.predictSign([posepoints, lefthandpoints, righthandpoints]);

                    results.then((response) => {
                        let output = document.getElementById('predictionoutput');
                        let out = response.join(" ");
                        output.innerHTML += "<p class=\"prediction\">" + out + "</p>";
                        output.scrollTop = output.scrollHeight;
                    });

                    posepoints = [];
                    lefthandpoints = [];
                    righthandpoints = [];
                } 

            }
            // Call this function again to keep predicting when the browser is ready.
            if (webcamRunning === true) {
                requestAnimationFrame(predictWebcam);
            }
        }

    }, [videoRef, canvasElementRef, webcambutton, demosSectionRef]);


    return (
        <div id="demos" className="container" ref={demosSectionRef}>
            <div id='inferenceelements'>
                <div className="row align-items-end">
                    <video id="webcam3d" className='col-lg-6 col-sm-12' ref={videoRef} autoPlay playsInline></video>
                    <canvas className="output_canvas3d col-lg-6" id="output_canvas3d" ref={canvasElementRef}></canvas>
                    <div id="predictionoutput" className="col-12">
                    </div>
                </div>
                <br></br>
            </div>
            <button id="camButton"  ref={webcambutton} className="btn btn-primary mt-5">
                    Turn on Webcam
            </button>
        </div>
    )
}

export default MediaPipe3D;