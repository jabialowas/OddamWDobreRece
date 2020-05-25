import React, {useState} from 'react';
import {useFormik} from "formik";
import * as ROUTES from "../../../constants/routes";
import './SignInForm.scss'
import {Link} from "react-router-dom";
const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Proszę wpisać e-mail';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Błędny adres e-mail.';
    } else if (values.password === '' ) {
        errors.password = 'Proszę wpisać hasło'
    } else if (values.password.length < 6 ) {
        errors.password = 'Hasło powinno mieć min. 6 znaków'
    }
    return errors;
};
const INITIAL_STATE = {
    email: '',
    password: ''
}




function SignInForm(props) {
    const [authError, setAuthError] = useState(null);
    const formik = useFormik({
        initialValues: {
            ...INITIAL_STATE
        },
        validate,
        onSubmit: (values,event) => {

            props.firebase
                .doSignInWithEmailAndPassword(values.email, values.password)
                .then(authUser => {console.log(authUser);
                    props.history.push(ROUTES.LANDING)
                })
                .catch(error => setAuthError(error));
            event.preventDefault();
        },
    });
    return (
        <div className='signIn-form'>
            <span className='error'>{authError ? "Email oraz hasło nie zgadzają się" : ''}</span>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input
                    type="email"
                    id='email'
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />

                    {formik.errors.email ? <span className='error'>{formik.errors.email && formik.touched.email && formik.errors.email}</span> : "" }

            <label htmlFor='password'>Hasło</label>
                <input
                    type="password"
                    id='password'
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordOne}
                />
               {formik.errors.password ? <span className='error'>{formik.errors.password && formik.touched.password && formik.errors.password}</span> : "" }
                <div className="form-btns">
                    <Link to={ROUTES.SIGN_UP} ><button type='button' className='signUp-btn'>Zarejestruj </button></Link>

                <button className='signIn-btn' type="submit">
                    Zaloguj
                </button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;