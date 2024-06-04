import React from 'react';
import { Navbar, MediaPipe, HelpBtn } from './components';
import { Footer, Features, Header } from './containers';
import './App.css';
import TranslationBox from './components/translationBox/TranslationBox';


const App = () => {
  return (
    <div className='App'>
      <div className='gradient__bg'>
        <Navbar />
        <Header />
      </div>
      <div className='gradient__bg'>  
        <Features />
        <TranslationBox />
        <HelpBtn tooltipText="Need help? try turning on the camera and start signing! Its as simple as that! " />
      </div>
      <div className='gradient__bg'>
        <Footer />
      </div>
    </div>
  );
};

export default App;
