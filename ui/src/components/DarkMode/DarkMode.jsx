import React, { useState} from 'react';
import "./DarkMode.css";

const DarkMode = () => {
    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark')
    };

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light')
    };

    const toggleTheme = (e) => {
        if (e.target.checked) setDarkMode();
        else setLightMode();
    };

    setDarkMode();
    return (
        <div className='dark_mode'>
            <input className='dark_mode_input' type='checkbox' id='darkmode_toggle' onChange={toggleTheme}/>
        </div>
    );
};

export default DarkMode;