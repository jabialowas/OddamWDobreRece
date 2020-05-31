import React, {useContext} from 'react';
import FormContext from "../context";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";
import FormSummary from "./FormSummary";
import {AuthUserContext} from "../../Session";
import GiveThingsHero from "../GiveThingsHero";
import '../GiveThings.scss'
import FormAlert from "./FormAlert";


function MasterForm() {
    const context = useContext(FormContext);

const GetForm = () => {
    switch(context.step){
        case 1: return (
            <>
            <FormAlert text='Uzupełnij szczegóły dotyczące Twoich rzeczy. Dzięki temu będziemy wiedzieć komu najlepiej je przekazać.'/>
            <FormStep1 />
            </>
        )
        case 2: return (
            <>
                <FormAlert text={['Wszystkie rzeczy do oddania zapakuj w 60l worki. Dokładną instrukcję jak poprawnie spakować rzeczy znajdziesz ',
                    <a href="">TUTAJ.</a>]}/>
                    <FormStep2 />
                    </>)
        case 3: return (
            <>
                    <FormAlert text='Jeśli wiesz komu chcesz pomóc, możesz wpisać nazwę tej organizacji w wyszukiwarce. Możesz też filtrować organizacje po ich lokalizacji bądź celu ich pomocy.'/>
                        <FormStep3 />
                        </>)
        case 4: return (
            <>
                        <FormAlert text='Podaj adres oraz termin odbioru rzeczy.'/>
                            <FormStep4 />
                            </>)
        case 5: return (
            <AuthUserContext.Consumer>
                {authUser => <FormSummary  authUser={authUser}/>}
            </AuthUserContext.Consumer>
        )
        case 6: return <FormStep2 />
    }
}
    return (
        <>
        <GetForm />
        </>
    );
}



export default MasterForm;