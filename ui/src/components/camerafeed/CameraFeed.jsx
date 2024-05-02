import React, { useRef, useEffect } from 'react';
import './camerafeed.css';

const CameraFeed = () => {
    // camera references
	const videoRef = useRef(null);

	const getVideo = () => (
		navigator.mediaDevices.getUserMedia({ video: 
			{ width: 1920/3, height: 1080/3} })
			.then(stream => {
				let video =videoRef.current;
				video.srcObject = stream;
				video.play();
			})
			.catch(err => {
				console.error(err);
			})
	)

	useEffect(() => {
		getVideo();
	}, [videoRef]);

    return (
        <div className='camera__container'>
            <video className='camera' ref={videoRef}></video>
        </div>
    )

    }

export default CameraFeed