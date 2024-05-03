import React from 'react';
import './features.css';
import { MediaPipe, TranslationBox } from '../../components';

const Features = () => {
  return (
    <div class="container">
      <div class="box">
        <h1>Camera Capture</h1>
        <MediaPipe />
      
      </div>
      <div class="box_2 text-container">
        <h1>Translation</h1>
        <TranslationBox></TranslationBox>
      </div>
      
    </div>
  )
}

export default Features
