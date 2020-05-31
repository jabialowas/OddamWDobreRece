import React, {useContext, useEffect, useState} from 'react';
import {withFirebase} from "../../../Firebase";
import Firebase from "../../../Firebase";
import  firebase from "firebase";
import FormContext from "../../context";

function FormSummary({authUser}) {
    console.log(authUser);
    const context = useContext(FormContext);
    const contextSummary = context.form
    const [temp, setTemp] = useState([])
    const [helpGroupSummary, setHelpGroupSummary] = useState([])
    const [typeSummary, setTypeSummary] = useState('')
    const [localizationSummary, setLocalizationSummary] = useState('')

    useEffect(() => {

if(contextSummary.localization !== ''){
    if (contextSummary.localization === 'warsaw'){ setLocalizationSummary('Warszawa')}
    else if (contextSummary.localization === 'poznan'){ setLocalizationSummary('Poznań')}
    else if (contextSummary.localization === 'cracov'){ setLocalizationSummary('Kraków')}
    else if (contextSummary.localization === 'wroclaw'){ setLocalizationSummary('Wrocław')}
    else if (contextSummary.localization === 'katowice'){ setLocalizationSummary('Katowice')}
} else if( contextSummary.localization === '' && contextSummary.localizationSpecific !== ''){
    setLocalizationSummary(contextSummary.localizationSpecific)
}
        if (contextSummary.type === 'usableClothes') {
            setTypeSummary('ubrania, które nadają się do ponownego użycia')
        } else if (contextSummary.type === 'unusableClothes') {
            setTypeSummary('ubrania, do wyrzucenia')
        } else if (contextSummary.type === 'toys') {
            setTypeSummary('zabawki')
        } else if (contextSummary.type === 'books') {
            setTypeSummary('książki')
        } else if (contextSummary.type === 'other') {
            setTypeSummary('inne')
        }

        setTemp(contextSummary.helpGroups.map((el, index) => {
            if (el === 'kids') {
                temp[index] = 'dzieciom'
            } else if (el === 'mothers') {
                temp[index] = 'samotnym matkom'
            } else if (el === 'disabled') {
                temp[index] = 'niepełnosprawnym'
            } else if (el === 'elder') {
                temp[index] = 'osobom starszym'
            } else if (el === 'homeless') {
                temp[index] = 'bezdomnym'
            }
        }))
        setHelpGroupSummary(temp)
    }, [])


   const  handleSubmit= () => {

        const data = context.form
       firebase.database().ref('orders/' + authUser.uid + data.userInfo.time).set({
           userId:  authUser.uid,
           email: authUser.email,
           orderInfo: data,
           status: 'open'

       })
    }
    return (
        <div>
            <h3>Oddajesz</h3>
            <p>{contextSummary.bags}, {contextSummary.bags === 1 ? 'worek' : 'worki'}, {typeSummary}, {helpGroupSummary.join(', ')}</p>
            <p>{localizationSummary}</p>
            <button onClick = {handleSubmit}>End</button>
        </div>


    );
}


export default withFirebase(FormSummary);