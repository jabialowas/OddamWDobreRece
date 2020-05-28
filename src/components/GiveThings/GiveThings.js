import React, {useContext, useState} from 'react';
import './GiveThings.scss'
import FormContext from "./context";
import MasterForm from "./MasterForm";
import {FormProvider} from "./context";
import {AuthUserContext} from "../Session";


function GiveThings(props) {
    const [formState, setFormState] = useState({
        form: {
            type: 'unusableClothes',
            bags: 1,
            localization: '',
            helpGroups: [],
            localizationSpecific: '',
            userInfo: {
                street: '',
                city: '',
                postCode: '',
                phone: '',
                date: '',
                time: '',
                note: '',
            },
            status: 'open'
        },
        setForm: () => {
            console.log(FormContext.form);
        }
    })
    return (
        <AuthUserContext.Consumer>
            {authUser =>
        <FormProvider value={formState} authUser={authUser}>
            <MasterForm/>
        </FormProvider>
            }
        </AuthUserContext.Consumer>
    );
}

export default GiveThings;