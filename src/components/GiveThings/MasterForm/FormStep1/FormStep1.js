import React, {useContext, useState} from 'react';
import FormContext from "../../context";
import './FormStep1.scss'
import RadioButton from "./RadioButton";


function FormStep1() {
    const context = useContext(FormContext);
    const [selected, setSelected] = useState(context.form.type)
    const [error, setError] = useState('')


    const handleSelect = (e) => {
        setSelected(e.target.value)
        context.handleInput(e);
        console.log(e.target.value);
    }
    return (
        <>

            <div className='form1-cnt'>
                <p className='step-text'> Krok {context.step}/4</p>

                <h2 className='step-title'>Zaznacz co chcesz oddać:</h2>


                <RadioButton
                    changed={handleSelect}
                    id='usableClothes'
                    isSelected={selected === 'usableClothes'}
                    label='ubrania, które nadają się do ponownego użycia'
                    value='usableClothes'/>

                <RadioButton
                    changed={handleSelect}
                    id='unusableClothes'
                    isSelected={selected === 'unusableClothes'}
                    label='ubrania, do wyrzucenia'
                    value='unusableClothes'/>

                <RadioButton
                    changed={handleSelect}
                    id='toys'
                    isSelected={selected === 'toys'}
                    label='zabawki'
                    value='toys'/>


                <RadioButton
                    changed={handleSelect}
                    id='books'
                    isSelected={selected === 'books'}
                    label='książki'
                    value='books'/>


                <RadioButton
                    changed={handleSelect}
                    id='other'
                    isSelected={selected === 'other'}
                    label='inne'
                    value='other'/>

                <div>
                <button onClick={() => {
                    if (selected !== '') {
                        context.setStepIncrement()
                    } else {
                        setError("Wybierz co chcesz oddać!")
                    }
                }}>
                    Dalej
                </button>
                    <span className='error-text'>{error}</span>
                </div>
            </div>
        </>
    );
}

export default FormStep1;