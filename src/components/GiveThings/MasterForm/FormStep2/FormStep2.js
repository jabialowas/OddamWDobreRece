import React, {useContext, useState} from 'react';
import FormContext from "../../context";
import './FormStep2.scss'
import Select, {components} from "react-select";

function FormStep2() {
    const context = useContext(FormContext);
    const [selected, setSelected] = useState(context.form.bags)
    const [error, setError] = useState('')

    const handleSelect = (e) => {
        setSelected({e})
        context.handleBagsSelect(e.value);
    }
    const options = [
        {value: '1', label: '1'},
        {value: '2', label: '2'},
        {value: '3', label: '3'},
        {value: '4', label: '4'},
        {value: '5', label: '5'},
    ];

    const selectStyles = {
        menu: () => ({

            width: '80px',
            border: '0.75px solid #3C3C3C',
            background: '#E8E9E4',
            boxShadow: 'none',
            position: 'absolute',
            left: '220px',
            top: '60px'

        }),
        option: () => ({

            color: '#000000',
            padding: '6px 36px',
            width: '100%',
            '&:hover': {
                backgroundColor: '#FAD648',
                cursor: 'pointer'
            }
        }),
        control: (_, {selectProps: {width}}) => ({
            width: '300px',
            border: '0.75px solid black',
            display: "flex",
            position: 'relative',
            cursor: 'pointer',

            '&:hover': {
                backgroundColor: '#FAD648',
                cursor: 'pointer'
            }

        }),
    }

    const DropdownIndicator = props => {
        return (
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    {props.selectProps.menuIsOpen ?
                        <img src={require("../../../../assets/Icon-Arrow-Up.svg")} alt=""/> :
                        <img src={require("../../../../assets/Icon-Arrow-Down.svg")} alt=""/>}
                </components.DropdownIndicator>
            )
        );
    };

    return (

        <div className='form2-cnt'>
            <p className='step-text'> Krok {context.step}/4</p>

            <h2 className='step-title'>Podaj liczbę 60l worków, w które spakowałeś/aś rzeczy:</h2>


            <div className='form2-input'>
                <span className='input-text'>Liczba 60l worków:</span>
                <Select
                    components={{
                        DropdownIndicator,
                        IndicatorSeparator: () => null
                    }}
                    name='bags'
                    defaultValue={options[selected - 1]}
                    onChange={handleSelect}
                    options={options}
                    styles={selectStyles}
                    width={'300px'}
                    placeholder='-- wybierz --'
                    isSearchable={false}
                />
            </div>
            <div className='form-btns'>
                <button onClick={() => context.setStepDecrement()}>Wstecz</button>
                <button onClick={() => {
                    if (selected !== '') {
                        context.setStepIncrement()
                    } else {
                        setError("Wybierz liczbę worków!")
                    }
                }}>
                    Dalej
                </button>
                <span className='error-text'>{error}</span>
            </div>
        </div>

    );
}

export default FormStep2;