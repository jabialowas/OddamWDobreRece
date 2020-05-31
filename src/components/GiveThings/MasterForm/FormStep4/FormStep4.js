import React, {useContext, useState} from 'react';
import FormContext from "../../context";

function FormStep4() {
    const context = useContext(FormContext);

    const [userInfo, setUserInfo] = useState(context.form.userInfo)
    const [address, setAddress] = useState(userInfo.address)
    const [city, setCity] = useState(userInfo.city)
    const [postCode, setPostCode] = useState(userInfo.postCode)
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber)
    const [date, setDate] = useState(userInfo.date)
    const [time, setTime] = useState(userInfo.time)
    const [note, setNote] = useState(userInfo.note)

    const handleAddressChange = e => {
        setAddress(e.target.value)
        context.handleUserInfoInput(e)
    }
    const handleCityChange = e => {
        setCity(e.target.value)
        context.handleUserInfoInput(e)
    }
    const handlePostCodeChange = e => {
        setPostCode(e.target.value)
        context.handleUserInfoInput(e)
    }
    const handlePhoneNumberChange = e => {
        setPhoneNumber(e.target.value)
        context.handleUserInfoInput(e)
    }
    const handleDateChange = e => {
        setDate(e.target.value)
        context.handleUserInfoInput(e)
    }
    const handleTimeChange = e => {
        setTime(e.target.value)
        context.handleUserInfoInput(e)
    }
    const handleNoteChange = e => {
        setNote(e.target.value)
        context.handleUserInfoInput(e)
    }
    return (
        <>
            <label> Ulica
                <input type='text' value={address} name='address' onChange={handleAddressChange}/>
            </label>
            <label> Miasto
                <input type='text' value={city} name='city' onChange={handleCityChange}/>
            </label>
            <label> Kod pocztowy
                <input type='text' value={postCode} name='postCode' maxLength={6} onChange={handlePostCodeChange}
                       pattern={'[0-9]{2}\-[0-9]{3}'}/>
            </label>
            <label> Numer telefonu
                <input type='text' value={phoneNumber} name='phoneNumber' onChange={handlePhoneNumberChange} max={9}/>
            </label>
            <label> Data
                <input type='date' value={date} name='date' onChange={handleDateChange}/>
            </label>
            <label> Godzina
                <input type='time' value={time} name='time' onChange={handleTimeChange}/>
            </label>
            <label> Uwagi dla kuriera
                <input type='text' value={note} name='note' onChange={handleNoteChange}/>
            </label>

            <button onClick={() => context.setStepDecrement()}>Wstecz</button>
            <button onClick={() => context.setStepIncrement()}>Next</button>
            <button onClick={() => alert(JSON.stringify(context))}>End</button>
        </>
    );
}

export default FormStep4;