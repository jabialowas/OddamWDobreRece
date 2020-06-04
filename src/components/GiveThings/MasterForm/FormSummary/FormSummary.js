import React, {useContext, useEffect, useState} from 'react';
import {withFirebase} from "../../../Firebase";
import firebase from "firebase";
import FormContext from "../../context";
import './FormSummary.scss'
import FormSummaryInfo from "./FormSummaryInfo/FormSummaryInfo";

function FormSummary({authUser}) {
    const context = useContext(FormContext);
    const contextSummary = context.form
    const [temp, setTemp] = useState([])
    const [helpGroupSummary, setHelpGroupSummary] = useState([])
    const [typeSummary, setTypeSummary] = useState('')
    const [localizationSummary, setLocalizationSummary] = useState('')

    useEffect(() => {

        if (contextSummary.localization !== '' && contextSummary.localizationSpecific === '') {
            if (contextSummary.localization === 'warsaw') {
                setLocalizationSummary('Warszawa')
            } else if (contextSummary.localization === 'poznan') {
                setLocalizationSummary('Poznań')
            } else if (contextSummary.localization === 'cracov') {
                setLocalizationSummary('Kraków')
            } else if (contextSummary.localization === 'wroclaw') {
                setLocalizationSummary('Wrocław')
            } else if (contextSummary.localization === 'katowice') {
                setLocalizationSummary('Katowice')
            }
        } else if (contextSummary.localization !== '' && contextSummary.localizationSpecific !== '') {
            setLocalizationSummary(contextSummary.localizationSpecific)
        } else if (contextSummary.localization === '' && contextSummary.localizationSpecific !== '') {
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


    const handleSubmit = () => {

        const data = context.form
        firebase.database().ref('orders/' + authUser.uid + data.userInfo.time + data.userInfo.date ).set({
            userId: authUser.uid,
            email: authUser.email,
            orderId: authUser.uid + data.userInfo.time + data.userInfo.date,
            orderInfo: data,
            status: 'open'

        })
        context.setStepIncrement();
    }
    return (
        <div className='formSummary-cnt'>
            <h2 className='step-title'>Podsumowanie Twojej darowizny</h2>
            <div className='summary-cnt'>
            <h3>Oddajesz:</h3>
                <div className="summary-row">
            <img width='50px' height='50px' src={require("../../../../assets/Icon-1.svg")}
                 alt=""/><span>{contextSummary.bags} {contextSummary.bags === 1 ? 'worek' : 'worki'}, {typeSummary}, {helpGroupSummary.join(', ')}</span>
                </div>

                <div className="summary-row">
                    <img width='50px' height='50px' src={require("../../../../assets/Icon-4.svg")}
                         alt=""/>
            <span>dla lokalizacji: {localizationSummary}</span>
                </div>
            </div>

            <div className="info-group-cnt">
                <div className="info-group">
                    <h3 className='info-group-title'>Adres odbioru:</h3>
                    <FormSummaryInfo title='Ulica' text={contextSummary.userInfo.address}/>
                    <FormSummaryInfo title='Miasto' text={contextSummary.userInfo.city}/>
                    <FormSummaryInfo title='Kod pocztowy' text={contextSummary.userInfo.postCode}/>
                    <FormSummaryInfo title='Numer telefonu' text={contextSummary.userInfo.phoneNumber}/>
                </div>
                <div className="info-group">
                    <h3 className='info-group-title'>Termin odbioru:</h3>
                    <FormSummaryInfo title='Data' text={contextSummary.userInfo.date}/>
                    <FormSummaryInfo title='Godzina' text={contextSummary.userInfo.time}/>
                    <FormSummaryInfo title='Uwagi dla kuriera' text={contextSummary.userInfo.note}/>
                </div>

            </div>
            <div className="form-btns">
                <button onClick={() => context.setStepDecrement()}>Wstecz</button>
            <button onClick={handleSubmit}>Potwierdzam</button>
            </div>
        </div>


    );
}


export default withFirebase(FormSummary);