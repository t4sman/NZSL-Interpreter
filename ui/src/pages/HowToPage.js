import React, { useState } from 'react';
import { Navbar, LoginSignup, Instructions} from '../components';
import { Header } from '../containers';
import './HowToPage.css'


const HowToPage = () => {

    const instructionsText = `
    How to use`;

    const instructionsText1 = `
    Welcome to the NZSL Interpreter Tutorial Page`;
    
    const instructionsText2 = `
    Here's how to get started:`;

    const instructionsText3 = `
    1. Sign Up/Login: If it's your first time here, please sign up to create your account. If you already have an account, simply log in.`;

    const instructionsText4 = `
    2. Click the camera icon on the navbar to navigate to the camera capture section where you can interact with camera.`;

    const instructionsText5 = `
    3. Camera capture section also available with pose estimation, hand estimation, turn off background and toggle screen record`;

    const instructionsText6 = `
    4. Sign language learning pathway and dictionary is available under 'JohnnyPage'`;

    const instructionsText7 = `
    5. AI sign language interpretion is available under 'Tasman' page `;

  //Enjoy using our service to enhance your communication skills in NZSL!


    return (
        <div className='App'>
            <div className='gradient__bg'>
                <Navbar />
                <Instructions title={instructionsText1} /> 
                <Instructions body={instructionsText2} />
                <Instructions body={instructionsText3} />
                <Instructions body={instructionsText4} />
                <Instructions body={instructionsText5} />
                <Instructions body={instructionsText6} />
                <Instructions body={instructionsText7} />

                
                
            </div>
                    
        </div>
      )
    
  }
  
  export default HowToPage
  