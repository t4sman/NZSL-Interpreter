import React from 'react';
import { Navbar, MediaPipe, HelpBtn } from './components';
import { Footer, Features, Header } from './containers';
import './App.css';
import TranslationBox from './components/translationBox/TranslationBox';


const App = () => {

	// camera use state for camera toggle
	const [captureMode, setCaptureMode] = useState('camera');
	// toggle logic 
    const toggleCaptureMode = () => {
        setCaptureMode(prevMode => prevMode === 'camera' ? 'screenRecord' : 'camera');
    };

	// app structure

  return (
    <div className='App'>
      <div className='gradient__bg'>
        <Navbar />
        <Header />
		<DarkMode />
		
      </div>
      <div className='gradient__bg'>  
        <Features />
        
        
      </div>
      <div className='gradient__bg'>
        <Footer />
      </div>
    </div>
  );
};

export default App;
