import React, { useEffect, useRef } from 'react';
import './mediapipe.css';
import { FilesetResolver, HandLandmarker, PoseLandmarker } from '@mediapipe/tasks-vision';

const MediaPipe = () => {
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
        let enablePose = poseEsti.current;
        let poseRunning = false;
        let enableHand = handEsti.current;
        let handRunning = false;
        let videoButton = videobutton.current;
        let videoOn = true;

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
                numHands: 2
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
        const canvasElement = canvasElementRef.current;
        const canvasCtx = canvasElement.getContext("2d");

        const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

        if (hasGetUserMedia()) {
            enableWebcamButton.addEventListener("click", toggleCam);
            enablePose.addEventListener("click", togglePoseEstimation);
            enableHand.addEventListener("click", toggleHandEstimation);
            videoButton.addEventListener("click", togglebgVideo);
        } else {
            console.warn("getUserMedia() is not supported by your browser");
        }
        

        // camera code
        function toggleCam(event) {

            if (webcamRunning) {
                return;
            }

            webcamRunning = true;
            
            enableWebcamButton.classList.add("invisible");

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

        function togglePoseEstimation() {
            if (!poseLandmarker) {
                console.log("Wait! objectDetector not loaded yet.");
                return;
            }

            if (poseRunning) {
                poseRunning = false;
                enablePose.textContent = "Turn on Pose Estimations";
            } else {
                poseRunning = true;
                enablePose.textContent = "Turn off Pose Estimations";
            }
        }

        function toggleHandEstimation() {
            if (!handLandmarker) {
                console.log("Wait! objectDetector not loaded yet.");
                return;
            }

            if (handRunning) {
                handRunning = false;
                enableHand.textContent = "Turn on Hand Estimation";
            } else {
                handRunning = true;
                enableHand.textContent = "Turn off Hand Estimation";
            }
        }

        function togglebgVideo() {
            if (videoOn) {
                videoOn = false;
                video.classList.add("invisible");
                videoButton.textContent = "Turn on Background Video";
            } else {
                videoOn = true;
                video.classList.remove("invisible");
                videoButton.textContent = "Turn off Background Video";
            }
        }

        let lastVideoTime = -1;
        let handresults = undefined;
        let poseresults = undefined;

        let handconnections = HandLandmarker.HAND_CONNECTIONS;
        let poseconnections = PoseLandmarker.POSE_CONNECTIONS;

        async function predictWebcam() {
            // Set the size of the drawing surface, not the size of the canvas element.
            canvasElement.width = video.videoWidth;
            canvasElement.height = video.videoHeight;

            let startTimeMs = performance.now();
            if (lastVideoTime !== video.currentTime) {
                lastVideoTime = video.currentTime;
                handresults = await handLandmarker.detectForVideo(video, startTimeMs);
                poseresults = await poseLandmarker.detectForVideo(video, startTimeMs);
            }
            canvasCtx.save();
            
            if (!videoOn) {
                canvasCtx.fillStyle = "blue";
                canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height, );
            } else {
                canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            }
            if (poseRunning&&poseresults.landmarks) {
                for (const landmarks of poseresults.landmarks) {
                    poseconnections.forEach(connection => {
                        const { start, end } = connection;
                        if (landmarks[start] && landmarks[end]) {
                            canvasCtx.beginPath();
                            canvasCtx.lineWidth = 8;
                            canvasCtx.strokeStyle = "green";
                            canvasCtx.moveTo(landmarks[start].x * canvasElement.width, landmarks[start].y * canvasElement.height);
                            canvasCtx.lineTo(landmarks[end].x * canvasElement.width, landmarks[end].y * canvasElement.height);
                            canvasCtx.stroke();
                        }
                    });

                    // Draw landmarks
                    landmarks.forEach((landmark) => {
                        if (landmark.x === undefined || landmark.y === undefined) {
                            return;
                        }
                        canvasCtx.beginPath();
                        canvasCtx.fillStyle = "white";
                        canvasCtx.lineWidth = 0.3;
                        canvasCtx.arc(landmark.x * canvasElement.width, landmark.y * canvasElement.height, 5, 0, Math.PI * 2);
                        canvasCtx.fill();
                    });
                }
            }
            if (handRunning&&handresults.landmarks) {
                for (const landmarks of handresults.landmarks) {
                    handconnections.forEach(connection => {
                        const { start, end } = connection;
                        if (landmarks[start] && landmarks[end]) {
                            canvasCtx.beginPath();
                            canvasCtx.lineWidth = 5;
                            canvasCtx.strokeStyle = "red";
                            canvasCtx.moveTo(landmarks[start].x * canvasElement.width, landmarks[start].y * canvasElement.height);
                            canvasCtx.lineTo(landmarks[end].x * canvasElement.width, landmarks[end].y * canvasElement.height);
                            canvasCtx.stroke();
                        }
                    });
                    // Draw landmarks
                    landmarks.forEach((landmark) => {
                        if (landmark.x === undefined || landmark.y === undefined) {
                            return;
                        }
                        canvasCtx.beginPath();
                        canvasCtx.fillStyle = "black";
                        canvasCtx.lineWidth = 0.3;
                        canvasCtx.arc(landmark.x * canvasElement.width, landmark.y * canvasElement.height, 5, 0, Math.PI * 2);
                        canvasCtx.fill();
                    });
                }
            }
            
            canvasCtx.restore();

            // Call this function again to keep predicting when the browser is ready.
            if (webcamRunning === true) {
                window.requestAnimationFrame(predictWebcam);
            } else {
                canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            }
        }

    }, [videoRef, canvasElementRef, webcambutton, demosSectionRef, poseEsti, handEsti, videobutton]);


    return (
        <div id="demos" className="invisible container" ref={demosSectionRef}>
            <div className='container'>
                <div className='box'>
                    <video id="webcam" ref={videoRef} autoPlay playsInline></video>
                    <canvas className="output_canvas" id="output_canvas" ref={canvasElementRef}></canvas>
                </div>
                <div className='box2' >
                    
                    <button id="poseEstimationButton" ref={poseEsti} className="btn">
                        Turn on Pose Estimation
                    </button>
                    <button id="handEstimationButton" ref={handEsti} className="btn">
                        Turn on Hand Estimation
                    </button>
                    <button id="backgroundVideoButton" ref={videobutton} className="btn">
                        Turn off Background Video
                    </button>
                    <button id="modeSwitch"  className="btn">
                        Toggle Screen record / cam record
                    </button>
                    <button id="webcamButton" ref={webcambutton} className="btn">
                        Turn on Webcam
                    </button>
                </div>
            </div>
        </div>

       
        
    )
}

export default MediaPipe;
