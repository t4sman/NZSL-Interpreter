

import React, { useState, useEffect } from 'react';
import './translationBox.css'; // Import CSS file for styling

const TranslationBox = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Simulate typing effect
      const textArray = 'Text from backend  Text from backend Text from backend Text from backend'.split('');
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex < textArray.length) {
          setText(prevText => prevText + textArray[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setLoading(false);
        }
      }, 100); // Adjust typing speed here
  
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }, []);

  return (
    <div className="typing-container">
        <div>
            {loading ? (
            <p>Loading...</p>
            ) : (
            <p className="typed-text">{text}</p>
            )}
        </div>
    </div>
  );
};

export default TranslationBox;