import React, {useEffect, useState} from 'react';

const Checkbox = ({type = 'checkbox', name, defaultChecked = false, onChange}) => (
    <input type={type} name={name} defaultChecked={defaultChecked} onChange={onChange}/>
);

function FormStep3({handleInput,handleArr, setStep, context}) {
    const [selectedLocalization, setSelectedLocalization] = useState(context.form.localization)
    const [helpGroups, setHelpGroups] = useState(context.form.helpGroups)
    useEffect(() => {
        handleArr(helpGroups)
    }, [helpGroups])

    const handleSelectLocalization = e => {
        setSelectedLocalization(e.target.value)
        handleInput(e)
    }
    const handleSelect = (e) => {
        const item = e.target.name
        if (!helpGroups.includes(item)) {
            setHelpGroups(prev => [...prev, item])
        } else {
            setHelpGroups(prev => prev.filter(value => value !== item))
        }
    }
    return (
        <div>

            <select name='localization' onChange={handleSelectLocalization} value={selectedLocalization}>

                <option value=''>-- wybierz --</option>
                <option value='poznan'>Poznań</option>
                <option value='warsaw'>Warszawa</option>
                <option value='cracow'>Kraków</option>
                <option value='wroclaw'>Wrocław</option>
                <option value='katowice'>Katowice</option>
            </select>

            <br/>
            <label>Dzieciom
                <Checkbox name='kids' defaultChecked={helpGroups.includes('kids')} onChange={handleSelect}/>
            </label>
            <label>Samotnym matkom
                <Checkbox name='mothers' defaultChecked={helpGroups.includes('mothers')} onChange={handleSelect}/>
            </label>
            <label>Bezdomnym
                <Checkbox name='homeless' defaultChecked={helpGroups.includes('homeless')} onChange={handleSelect}/>
            </label>
            <label>Niepełnosprawnym
                <Checkbox name='disabled' defaultChecked={helpGroups.includes('disabled')} onChange={handleSelect}/>
            </label>
            <label>Osobom starszym
                <Checkbox name='elder' defaultChecked={helpGroups.includes('elder')} onChange={handleSelect}/>
            </label>


            <button onClick={() => setStep(prev => prev - 1)}>Wstecz</button>
            <button onClick={() => setStep(prev => prev + 1)}>Next</button>
            <button onClick={() => alert(JSON.stringify(context))}>End</button>


        </div>
    );
}

export default FormStep3;