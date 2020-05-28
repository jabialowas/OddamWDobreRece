import React from 'react';


const FormContext = React.createContext({
    form: {
        type: '',
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
        }
    },
    setForm: () => {
        console.log(FormContext.form);
    }
});

export const FormProvider = FormContext.Provider


export default FormContext;

