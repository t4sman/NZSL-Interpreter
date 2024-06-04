// src/components/ScreenRecord.js
import React, { useState } from 'react';
import RecordRTC from 'recordrtc';

let recorder;
let stream;

const ScreenRecord = () => {
  const [isRecording, setIsRecording] = useState(false);

  const startScreenRecording = async () => {
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' },
        audio: true,
      });

      recorder = new RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/webm',
      });

      recorder.startRecording();
      setIsRecording(true);
      console.log('Screen recording started');
    } catch (error) {
      console.error('Error starting screen recording:', error);
    }
  };

  const stopScreenRecording = async () => {
    if (!recorder) {
      console.error('Recorder is not initialized');
      return;
    }

    await recorder.stopRecording();
    const blob = recorder.getBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'screen-recording.webm';
    document.body.appendChild(a);
    a.click();

    stream.getTracks().forEach(track => track.stop());
    recorder.destroy();
    recorder = null;
    setIsRecording(false);
    console.log('Screen recording stopped and downloaded');
  };

  return (
    <div>
      <button onClick={startScreenRecording} disabled={isRecording}>Start Recording</button>
      <button onClick={stopScreenRecording} disabled={!isRecording}>Stop Recording</button>
    </div>
  );
};

export default ScreenRecord;
