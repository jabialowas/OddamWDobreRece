import React from 'react';
import {ReactComponent as Icon} from "../../../../assets/Icon-1.svg";
import './StepColumn.scss'

function StepColumn({icon,title,text}) {
    return (

        <div className='step-cnt'>
           <img src={require(`../../../../assets/${icon}`)}
                width='83px'
                height='83px'
                />
            <h4>{title}</h4>
            <hr/>
            <p>{text}</p>
        </div>

    );
}

export default StepColumn;