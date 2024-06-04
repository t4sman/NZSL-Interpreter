// src/HelpBtn.js
import React, { useState } from 'react';
import './helpBtn.css';

const HelpBtn = ({ tooltipText }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="question-mark-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="question-mark">?</span>
      {isHovered && <div className="tooltip-text puff-in-center">{"Need help? try turning on the camera and start signing! Its as simple as that. If youre still having issues try navigating over to the Tutorial page."}</div>}
    </div>
  );
};

export default HelpBtn;
