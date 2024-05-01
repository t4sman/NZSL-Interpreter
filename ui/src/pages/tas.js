import React from 'react';
import { Navbar, MediaPipe3D, MediaPipe2D} from '../components';
import { Header } from '../containers';



const tas = () => {
  return (
    <div className=''>
      <div className='gradient__bg'>
        <Navbar />
        <h1>MediaPipe World Landmarks</h1>
        <MediaPipe3D />

        <h1>MediaPipe Normalised Landmarks</h1>
        <MediaPipe2D />
      </div>
      <div className='gradient__bg'>
      </div>
      
    </div>
  )
}

export default tas
