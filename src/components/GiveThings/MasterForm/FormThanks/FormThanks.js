import React from 'react';
import './FormThanks.scss'
import {ReactComponent as Decoration} from "../../../../assets/Decoration.svg";
function FormThanks() {
    return (
        <div className='formThanks-cnt'>
            <div className="thanks-content">
            <h2 className='thanks-text'>Dziękujemy za przesłanie formularza.<br/> Na maila prześlemy wszelkie informacje o odbiorze.</h2>
            <Decoration/>
            </div>
        </div>
    );
}

export default FormThanks;