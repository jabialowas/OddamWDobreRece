import React from 'react';

const RadioButton = ({id,isSelected,changed,label,value}) => {
return (
        <div className="form1-radioButton">
            <input id={id} onChange={changed} value={value} type="radio" name='type' defaultChecked={isSelected} />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

export default RadioButton;