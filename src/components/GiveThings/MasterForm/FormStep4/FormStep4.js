import React, {useContext, useState} from 'react';
import FormContext from "../../context";
import './FormStep4.scss'

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
    const [error,setError] = useState('')

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
        <div className='form4-cnt'>
            <p className='step-text'> Krok {context.step}/4</p>
            <h2 className='step-title'>Podaj adres oraz termin odbioru rzecz przez kuriera</h2>
            <div className="input-group-cnt">
                <div className="input-group">
                    <h3 className='input-title'>Adres odbioru</h3>
                    <label> Ulica
                        <input type='text' value={address} name='address' onChange={handleAddressChange}/>
                    </label>
                    <label> Miasto
                        <input type='text' value={city} name='city' onChange={handleCityChange}/>
                    </label>
                    <label> Kod pocztowy
                        <input type='text' value={postCode} name='postCode' maxLength={6}
                               onChange={handlePostCodeChange}
                               pattern={'[0-9]{2}\-[0-9]{3}'}/>
                    </label>
                    <label> Numer telefonu
                        <input type='text' value={phoneNumber} name='phoneNumber' onChange={handlePhoneNumberChange}
                               maxLength={9}/>
                    </label>
                </div>
                <div className="input-group">
                    <h3 className='input-title'>Termin odbioru</h3>
                    <label> Data
                        <input type='date' value={date} name='date' onChange={handleDateChange}/>
                    </label>
                    <label> Godzina
                        <input type='time' value={time} name='time' onChange={handleTimeChange}/>
                    </label>
                    <label> Uwagi dla kuriera (opcjonalne)
                        <textarea className='note-input'  value={note} name='note' onChange={handleNoteChange}/>
                    </label>
                </div>
            </div>
            <div className='form-btns'>
                <button onClick={() => context.setStepDecrement()}>Wstecz</button>
                <button onClick={() => {
                    if(address.length > 2 && city.length>2 && postCode.length>5 && phoneNumber.length >8 && date !== '' && time !== ''){
                        context.setStepIncrement()
                    } else {
                        setError('Podaj wszystkie dane!')
                    }
                }}>Dalej</button>
                <span className='error-text'>{error}</span>
            </div>
        </div>
    );

}

export default FormStep4;