import React from 'react';

function Step({title, text}) {
    return (
        <div className='givethings-step'>
            <h3 className='step-title'>{title}</h3>
            <p className='step-text'>{text}</p>
        </div>
    );
}

export default Step;