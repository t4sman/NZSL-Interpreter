import React from 'react';
import { Navbar, MediaPipe3D, TranslationBox} from '../components';
import { Header } from '../containers';



const tas = () => {
  return (
    <div className='App'>
      <div className='gradient__bg'>
        <Navbar />
        <MediaPipe3D />
      </div>      
    </div>
  )
}

export default tas
