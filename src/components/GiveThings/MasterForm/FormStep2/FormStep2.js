import React, {useState} from 'react';

function FormStep2({setStep,handleInput,context}) {

    const [selected, setSelected] = useState(context.form.bags)

    const handleSelect = (e) => {
        setSelected(e.target.value)
        handleInput(e);
    }
    return (
        <>
        <select name='bags' onChange={ handleSelect}  value={selected}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
        </select>
    <button onClick={ () => setStep(prev => prev-1)}>Wstecz</button>
    <button onClick={ () => setStep(prev => prev+1)}>Next</button>
    <button onClick = { () => alert(JSON.stringify(context))}>End</button>
            </>

    );
}

export default FormStep2;