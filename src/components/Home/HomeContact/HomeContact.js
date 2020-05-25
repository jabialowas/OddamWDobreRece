import React, {useState} from 'react';
import './HomeContact.scss'

import {ReactComponent as Decoration} from "../../../assets/Decoration.svg";
import {useFormik} from "formik";
import axios from 'axios';
import './HomeContact.scss'

const INITIAL_STATE = {
    email: '',
    name: '',
    message: '',
}

const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Proszę wpisać e-mail';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Podany email jest nieprawidłowy!';
        } else if (values.name.length === 0) {
            errors.name = 'Podane imię jest nieprawidłowe!'
        } else if (values.message.length < 120) {
            errors.message = 'Wiadomość musi mieć conajmniej 120 znaków!'
        }

        return errors;
    }
;

function HomeContact(props) {
    const [sendMessage, setSendMessage] = useState('')
    const formik = useFormik({
        initialValues: {
            ...INITIAL_STATE
        },
        validate,
        onSubmit: (values, event) => {
            axios.post('https://fer-api.coderslab.pl/v1/portfolio/contact', values,{
                'Content-Type': 'application/json'
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    if(res.data.status==='success'){
                        setSendMessage('Wiadomość została wysłana! Wkrótce się skontaktujemy')
                        formik.values = INITIAL_STATE;
                    }
                })

            event.preventDefault();
        },
    });

    return (
        <div className='contact-cnt'>
            <div className='contact-title-cnt'>
            <h2 className='contact-title'>Skontaktuj się z nami</h2>
            <Decoration/>
                <p className="send-success">{sendMessage}</p>
            </div>
            <div className='contact-form-cnt'>
                <form onSubmit={formik.handleSubmit}>
                    <div className="contact-form-row">
                        <div className="contact-form-col">
                            <label htmlFor='name'>Wpisz swoje imię<br/>
                            </label>
                            <input
                                placeholder='Krzysztof'
                                type="text"
                                id='name'
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {formik.errors.name ? <span
                                className='error'>{formik.errors.name && formik.touched.name && formik.errors.name}</span> : ""}
                        </div>
                        <div className="contact-form-col">
                            <label htmlFor='email'>Wpisz swoj email<br/>
                            </label>
                            <input
                                placeholder='abc@xyz.pl'
                                type="email"
                                id='email'
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.errors.email ? <span
                                className='error'>{formik.errors.email && formik.touched.email && formik.errors.email}</span> : ""}
                        </div>
                    </div>
                    <div className="contact-form-row">
                        <div className="contact-form-col">
                            <label htmlFor='message'>Wpisz swoją wiadmość<br/>
                            </label>
                            <textarea
                                placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

                                id='message'
                                name="message"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.message}
                            />
                            {formik.errors.message ? <span
                                className='error'>{formik.errors.message && formik.touched.message && formik.errors.message}</span> : ""}
                        </div>
                    </div>
                    <div className="form-btns">
                        <button className='signIn-btn' type="submit" disabled={!formik.errors}>
                            Wyślij
                        </button>
                    </div>
                </form>
            </div>
            <footer className='contact-footer'><span className='footer-copyr'>Copyright by Coders Lab</span>
                <div className="footer-social">
                <a href=""><img src={require("../../../assets/Facebook.svg")} alt=""/></a>
                <a href=""><img src={require("../../../assets/Instagram.svg")} alt=""/></a>
                </div>
            </footer>

        </div>
    );
}

export default HomeContact;