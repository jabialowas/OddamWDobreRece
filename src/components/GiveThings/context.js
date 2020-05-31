import React from 'react';


const FormContext = React.createContext({
    form: {
        type: '',
        bags: 1,
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
        }
    },
    handleInput: () => {},
    handleBagsSelect: () => {},
    handleArr: () => {},
    handleUserInfoInput: () => {},
    setStepIncrement: () => {},
    setStepDecrement: () => {},
    step: 1
});

export const FormProvider = FormContext.Provider


export default FormContext;

