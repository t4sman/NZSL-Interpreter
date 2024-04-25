import React, {useRef, useEffect, useState} from 'react'
import { Navbar, Brand, CTA } from './components'
import { Footer, Blog, Possibility, Features, WhatGPT3, Header } from './containers'
import './App.css';
const App = () => {
	// camera references
	const videoRef = useRef(null);
	const photoRef = useRef(null);

	const [hasPhoto, setHasPhoto] = useState(false);

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
	<div className='App'>
		<div className='gradient__bg'>
			<Navbar />
			<Header />
		</div>
		<div className='gradient__bg'>
			<div className='camera'>
				<video ref={videoRef}></video>
				<button>SNAP</button>
			</div>
			<div className={'result' + (hasPhoto ?
			'hasPhoto': '')}>
				<canvas ref={photoRef}></canvas>
				<button>CLOSE</button>		
			</div>
			<Brand />
			
			<WhatGPT3 />
			<Features />
			<Possibility />
			<CTA />
			<Blog />
			<Footer />
		</div>
	</div>
  )
}

export default App
