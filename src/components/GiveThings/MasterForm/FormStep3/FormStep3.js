import React, {useContext, useEffect, useState} from 'react';
import {withFirebase} from "../../../Firebase";
import FormContext from "../../context";
import Select, {components} from "react-select";
import './FormStep3.scss'

const Checkbox = ({type = 'checkbox', name, defaultChecked = false, onChange, label}) => (
    <>
        <input type={type} id={name} name={name} defaultChecked={defaultChecked} onChange={onChange}/>
        <label htmlFor={name}>{label}</label>
    </>
);

function FormStep3({handleInput, handleArr, setStep, firebase}) {
    const context = useContext(FormContext);
    const [selectedLocalization, setSelectedLocalization] = useState(context.form.localization)
    const [helpGroups, setHelpGroups] = useState(context.form.helpGroups)
    const [suggestArr, setSuggestArr] = useState(false)
    const [selectedLocalizationSpecific, setSelectedLocalizationSpecific] = useState(context.form.localizationSpecific)
    const [error, setError] = useState('')

    useEffect(() => {
        context.handleArr(helpGroups)
    }, [helpGroups])

    useEffect(() => {
        firebase.siteInfo().on('value', snapshot => {
            setSuggestArr(Object.entries(snapshot.val()).map(category => category[1].map(item => item.name)).reduce((a, b) => a.concat(b), []))
        });
    }, [])

    const handleInputSelectLocalizationSpecific = e => {
        setSelectedLocalizationSpecific(e.target.value)
        context.handleInput(e)
    };


    const handleSelect = (e) => {
        const item = e.target.name
        if (!helpGroups.includes(item)) {
            setHelpGroups(prev => [...prev, item])
        } else {
            setHelpGroups(prev => prev.filter(value => value !== item))
        }
    }
    const handleSelectLocalization = (e) => {
        setSelectedLocalization({e})
        context.handleLocalizationSelect(e.value);
    }

    const options = [
        {value: 'poznan', label: 'Poznań'},
        {value: 'warsaw', label: 'Warszawa'},
        {value: 'cracow', label: 'Kraków'},
        {value: 'wroclaw', label: 'Wrocław'},
        {value: 'katowice', label: 'Katowice'},
    ];

    const selectStyles = {
        menu: () => ({

            width: '300px',
            border: '0.75px solid #3C3C3C',
            background: '#E8E9E4',
            boxShadow: 'none',
            position: 'absolute',
            left: '0',
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
        control: () => ({
            width: '300px',
            border: '0.75px solid black',
            display: "flex",
            position: 'relative',
            cursor: 'pointer',
            marginBottom: '50px',

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

        <div className='form3-cnt'>
            <p className='step-text'> Krok {context.step}/4</p>
            <div className='form3-input'>
                <h2 className='step-title'>Lokalizacja:</h2>
                <Select
                    components={{
                        DropdownIndicator,
                        IndicatorSeparator: () => null
                    }}
                    name='bags'
                    defaultValue={options[options.findIndex(el => el.value === context.form.localization)]}
                    onChange={handleSelectLocalization}
                    options={options}
                    styles={selectStyles}
                    width={'300px'}
                    placeholder='-- wybierz --'
                    isSearchable={false}
                />

                <br/>
                <h3 className='form3-text'>Komu chcesz pomóc?</h3>
                <div className='form3-checkbox-cnt'>
                    <Checkbox name='kids' defaultChecked={helpGroups.includes('kids')} onChange={handleSelect}
                              label='Dzieciom'/>
                    <Checkbox name='mothers' defaultChecked={helpGroups.includes('mothers')} onChange={handleSelect}
                              label='Samotnym matkom'/>
                    <Checkbox name='homeless' defaultChecked={helpGroups.includes('homeless')} onChange={handleSelect}
                              label='Bezdomnym'/>
                    <Checkbox name='disabled' defaultChecked={helpGroups.includes('disabled')} onChange={handleSelect}
                              label='Niepełnosprawnym'/>
                    <Checkbox  name='elder' defaultChecked={helpGroups.includes('elder')} onChange={handleSelect}
                              label='Osobom starszym'/>
                </div>
                <h3 className='form3-text'>Wpisz nazwę konkretnej organizacji (opcjonalnie)</h3>
                <input  className='customInput' type='text' value={selectedLocalizationSpecific} name='localizationSpecific'
                       onChange={handleInputSelectLocalizationSpecific}/>
            </div>
            <div className='form-btns'>
                <button onClick={() => context.setStepDecrement()}>Wstecz</button>
                <button onClick={() => {
                    if((selectedLocalization !== '' || selectedLocalizationSpecific !== '') && helpGroups.length>0){
                        context.setStepIncrement()
                } else {
                        setError("Podaj lokalizację oraz conajmniej 1 docelową grupe pomocy!")
                    }
                }}>Dalej</button>
                <span className='error-text'>{error}</span>
            </div>

        </div>

    );
}

export default withFirebase(FormStep3);