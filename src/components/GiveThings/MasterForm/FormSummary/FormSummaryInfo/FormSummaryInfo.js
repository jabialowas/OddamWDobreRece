import React from 'react';

function FormSummaryInfo({title,text}) {
    return (
        <div className='info-cnt'>
            <span className='info-title'>{title}</span>
            <span className='info-text'>{text}</span>
        </div>
    );
}

export default FormSummaryInfo;