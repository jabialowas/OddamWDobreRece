import React from 'react';
import './Column.scss'
function Column({title,subtitle,text}) {
    return (
        <div className='column-cnt'>
            <h2>{title}</h2>
            <h5>{subtitle}</h5>
            <p>{text}</p>
        </div>
    );
}

export default Column;