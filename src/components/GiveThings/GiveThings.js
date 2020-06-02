import React, {useContext, useState} from 'react';
import './GiveThings.scss'
import FormContext from "./context";
import MasterForm from "./MasterForm";
import {FormProvider} from "./context";
import {AuthUserContext} from "../Session";
import GiveThingsHero from "./GiveThingsHero";
import HomeContact from "../Home/HomeContact";
import {Form} from "formik";


function GiveThings() {

    const INITIAL_VALUE= {
        form: {
            type: '',
            bags: '',
            localization: '',
            helpGroups: [],
            localizationSpecific: '',
            userInfo: {
                address: '',
                city: '',
                postCode: '',
                phoneNumber: '',
                date: '',
                time: '',
                note: '',
            },
        },
        step: 1,
    }
    const [formState, setFormState] = useState({
            ...INITIAL_VALUE,
        handleInput: (e) => {
            let inputName = e.target.name
            formState.form[inputName]= e.target.value;
        },
        handleBagsSelect: (e) => {
            formState.form.bags= e;
        },
        handleLocalizationSelect: (e) => {
            formState.form.localization= e;
        },
         handleArr: (arr) => {
            formState.form.helpGroups = arr;
        },
         handleUserInfoInput: (e) => {
            let inputName = e.target.name
            formState.form.userInfo[inputName]= e.target.value;
        },
        setStepIncrement: () => {
            setFormState( prev => (
                {...prev, step: prev.step +1}
            ));
        },
        setStepDecrement: () => {
            setFormState( prev => (
                {...prev, step: prev.step -1}
            ));
        }

    })


    return (
        <>
        <AuthUserContext.Consumer>
            {authUser =>
        <FormProvider value={formState} authUser={authUser}>

            <GiveThingsHero/>
            <MasterForm/>
            <HomeContact/>
        </FormProvider>
            }
        </AuthUserContext.Consumer>
            </>
    );
}

export default GiveThings;