import React from 'react';

const Instructions = ({body, title}) => {
    return (
        <div className="instructions-container">
            <h2 className="instructions-title">{title}</h2>
            <p className="instruction-text">{body}</p>
        </div>
    );
};

export default Instructions;