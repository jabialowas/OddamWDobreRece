import React, {useState} from 'react';



function FormStep1({setStep, handleInput, context}) {
    const [selected, setSelected] = useState(context.form.type)

    const handleSelect = (e) => {
        setSelected(e.target.value)
        handleInput(e);
    }
    return (
        <div>
            <input type='radio' name='type' value='unusableClothes'   defaultChecked={selected === 'unusableClothes'} onClick={handleSelect}/>
            <input type='radio' name='type' value='usableClothes' defaultChecked={selected === 'usableClothes'} onClick={handleSelect}/>
            <input type='radio' name='type' value='toys' defaultChecked={selected === 'toys'} onClick={handleSelect}/>
            <input type='radio' name='type' value='books' defaultChecked={selected === 'books'} onClick={handleSelect}/>
            <input type='radio' name='type' value='other' defaultChecked={selected === 'other'} onClick={handleSelect}/>
            <button onClick={ () => setStep(prev => prev+1)}>Next</button>
        </div>
    );
}

export default FormStep1;