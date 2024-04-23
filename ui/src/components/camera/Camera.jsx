import React,{useRef, useEffect, useState} from 'react'
import "camera.css"


const Camera = () => 
{
    const videoRef = useRef(null);
    const photoREF = useRef(null);

    return (
        <div className='camera'>
            <video ref={videoRef}></video> 
            <button>REC</button>
        </div>
    )
}
const getVideo = () => {
    navigator.mediaDevices
    .getUserMedia({
        video:{width: 500, height: 500}
    })
    .then(stream =>{
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
    })
    .catch(err =>{
        console.error("no vid imput");
    })
}


export default Camera
