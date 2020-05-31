import React, {useContext, useEffect, useState} from 'react';
import {withFirebase} from "../../../Firebase";
import FormContext from "../../context";


const Checkbox = ({type = 'checkbox', name, defaultChecked = false, onChange}) => (
    <input type={type} name={name} defaultChecked={defaultChecked} onChange={onChange}/>
);

function FormStep3({handleInput,handleArr, setStep,firebase}) {
    const context = useContext(FormContext);
    const [selectedLocalization, setSelectedLocalization] = useState(context.form.localization)
    const [helpGroups, setHelpGroups] = useState(context.form.helpGroups)
    const [suggestArr, setSuggestArr] = useState(false)
    const [selectedLocalizationSpecific, setSelectedLocalizationSpecific] = useState(context.form.localizationSpecific)


    useEffect(() => {
        context.handleArr(helpGroups)
    }, [helpGroups])

    useEffect(() => {
        firebase.siteInfo().on('value', snapshot => {
            setSuggestArr( Object.entries(snapshot.val()).map(category => category[1].map(item => item.name)).reduce((a,b) => a.concat(b), []) )
        });
    }, [])



    const handleInputSelectLocalizationSpecific = e => {
        setSelectedLocalizationSpecific(e.target.value)
        context.handleInput(e)
    };


    const handleSelectLocalization = e => {
        setSelectedLocalization(e.target.value)
        context.handleInput(e)
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

            <select name='localization' disabled={selectedLocalizationSpecific.length > 0} onChange={handleSelectLocalization} value={selectedLocalization}>
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

            <label> locspec
                <input type='text' value={selectedLocalizationSpecific} name='localizationSpecific' disabled={selectedLocalization.length > 0} onChange={handleInputSelectLocalizationSpecific}/>
            </label>
            <button onClick={ () => context.setStepDecrement()}>Wstecz</button>
            <button onClick={ () => context.setStepIncrement()}>Next</button>
            <button onClick={() => alert(JSON.stringify(context))}>End</button>


        </div>
    );
}

export default withFirebase(FormStep3);