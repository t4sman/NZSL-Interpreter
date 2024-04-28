import React, { useEffect, useRef } from 'react';
import './mediapipe.css';
import { FilesetResolver, HandLandmarker, PoseLandmarker} from '@mediapipe/tasks-vision'; 

const MediaPipe = () => {
    const videoRef = useRef(null);
    const canvasElementRef = useRef(null);
    const webcambutton = useRef(null);
    const demosSectionRef = useRef(null);

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
        const createHandLandmarker = async () => {
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
        createHandLandmarker();

        const video = videoRef.current;
        const canvasElement = canvasElementRef.current;
        const canvasCtx = canvasElement.getContext("2d");

        const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

        if (hasGetUserMedia()) {
            
            enableWebcamButton.addEventListener("click", enableCam);
          } else {
            console.warn("getUserMedia() is not supported by your browser");
        }

        function enableCam(event) {
            if (!handLandmarker) {
              console.log("Wait! objectDetector not loaded yet.");
              return;
            }
          
            if (webcamRunning === true) {
              webcamRunning = false;
              enableWebcamButton.innerText = "ENABLE PREDICTIONS";
            } else {
              webcamRunning = true;
              enableWebcamButton.innerText = "DISABLE PREDICTIONS";
            }
          
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
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            if (handresults.landmarks) {
                for (const landmarks of handresults.landmarks) {
                    handconnections.forEach(connection => {
                        const { start, end } = connection;
                        if (landmarks[start] && landmarks[end])
                        {
                            canvasCtx.beginPath();
                            canvasCtx.lineWidth = 5;
                            canvasCtx.strokeStyle = "red";
                            canvasCtx.moveTo(landmarks[start].x * canvasElement.width, landmarks[start].y * canvasElement.height);
                            canvasCtx.lineTo(landmarks[end].x * canvasElement.width, landmarks[end].y * canvasElement.height);
                            canvasCtx.stroke();
                        }
                    }
                    );
                
                    // Draw landmarks
                    landmarks.forEach((landmark) => {
                        if (landmark.x === undefined || landmark.y === undefined) {
                            return;
                        }
                        canvasCtx.beginPath();
                        canvasCtx.fillStyle = "black";
                        canvasCtx.lineWidth = 1;
                        canvasCtx.arc(landmark.x * canvasElement.width, landmark.y * canvasElement.height, 5, 0, Math.PI * 2);
                        canvasCtx.fill();
                    });
                }
            }
            if (poseresults.landmarks) {
                for (const landmarks of poseresults.landmarks) {
                    poseconnections.forEach(connection => {
                        const { start, end } = connection;
                        if (landmarks[start] && landmarks[end])
                        {
                            canvasCtx.beginPath();
                            canvasCtx.lineWidth = 3;
                            canvasCtx.strokeStyle = "green";
                            canvasCtx.moveTo(landmarks[start].x * canvasElement.width, landmarks[start].y * canvasElement.height);
                            canvasCtx.lineTo(landmarks[end].x * canvasElement.width, landmarks[end].y * canvasElement.height);
                            canvasCtx.stroke();
                        }
                    }
                    );
                
                    // Draw landmarks
                    landmarks.forEach((landmark) => {
                        if (landmark.x === undefined || landmark.y === undefined) {
                            return;
                        }
                        canvasCtx.beginPath();
                        canvasCtx.fillStyle = "white";
                        canvasCtx.lineWidth = 2;
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
        
    }, [videoRef, canvasElementRef, webcambutton, demosSectionRef]);
    

    return (
        <section id="demos" className="invisible" ref={demosSectionRef}>
            <h1>MediaPipe Hand and Pose Landmark Detection</h1>
            <br></br>
            <p>Click the button below to enable webcam and start detecting hand and pose landmarks.</p>
            <button id="webcamButton"  ref={webcambutton} className="btn">
                <span className="mdc-button__ripple"></span>
                <span className="mdc-button__label">ENABLE WEBCAM</span>
            </button>

            <div style={{ position: "relative" }}>
                <video id="webcam" style={{ position: "absolute" }} ref={videoRef}autoPlay playsInline></video>
                <canvas className="output_canvas" id="output_canvas" ref={canvasElementRef} style={{ position: "absolute", left: "0px", top: "0px" }}></canvas>
            </div>
        </section>
    )
}

export default MediaPipe;