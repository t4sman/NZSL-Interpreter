import React, { useState, useRef } from 'react';

const ScreenRecord = () => {
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);

    const startRecording = () => {
        navigator.mediaDevices.getDisplayMedia({ video: true })
            .then(stream => {
                mediaRecorderRef.current = new MediaRecorder(stream);
                mediaRecorderRef.current.ondataavailable = handleDataAvailable;
                mediaRecorderRef.current.start();
                setRecording(true);
            })
            .catch(err => {
                console.error('Error accessing screen:', err);
            });
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

    const handleDataAvailable = (event) => {
        chunksRef.current.push(event.data);
    };

    return (
        <div>
            {!recording ? (
                <button onClick={startRecording}>Start Recording</button>
            ) : (
                <button onClick={stopRecording}>Stop Recording</button>
            )}
        </div>
    );
};

export default ScreenRecord;
