import React from 'react';

const ToggleButton = ({ onClick, mode }) => {
    return (
        <button onClick={onClick}>{mode === 'camera' ? 'Switch to Screen Record' : 'Switch to Camera'}</button>
    );
};

export default ToggleButton;
