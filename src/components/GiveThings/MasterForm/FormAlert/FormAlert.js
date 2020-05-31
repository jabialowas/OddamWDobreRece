import React from 'react';
import './FormAlert.scss'
function FormAlert({text}) {
    return (
        <div className='form-alert-cnt'>
            <h3 className='alert-title'>Ważne!</h3>
            <p className='alert-text'>{text}</p>
        </div>
    );
}

export default FormAlert;