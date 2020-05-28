import React, {useContext, useState} from 'react';
import FormContext from "../context";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";


function MasterForm() {
   const [step,setStep] = useState(3);
    const context = useContext(FormContext);


    const handleArr = (arr) => {
        context.form.helpGroups = arr;
    }

    const handleInput = (e) => {
        let inputName = e.target.name
        context.form[inputName]= e.target.value;
        console.log(context);

    }
const GetForm = () => {
    switch(step){
        case 1: return <FormStep1 setStep={setStep} handleInput={e => handleInput(e)} context={context}/>
        case 2: return <FormStep2 setStep={setStep} handleInput={e => handleInput(e)} context={context}/>
        case 3: return <FormStep3 setStep={setStep} handleInput={e => handleInput(e)} handleArr={e => handleArr(e)} context={context}/>
        case 4: return <FormStep2 setStep={setStep} handleInput={e => handleInput(e)} context={context}/>
        case 5: return <FormStep2 setStep={setStep} handleInput={e => handleInput(e)} context={context}/>
        case 6: return <FormStep2 setStep={setStep} handleInput={e => handleInput(e)} context={context}/>
    }
}
    return (
        <>
        <span> {context.form.type} {context.form.bags}</span>
          <GetForm/>
            </>
    );
}



export default MasterForm;