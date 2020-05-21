import React from 'react';
import {useFormik} from "formik";
import Firebase from "../../Firebase";
import * as ROUTES from '../../../constants/routes'
import {Link, withRouter} from 'react-router-dom';
import "./SignUpForm.scss"

const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Proszę wpisać e-mail';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Błędny adres e-mail.';
        } else if (values.passwordOne !== '' && values.passwordTwo !== '' && values.passwordOne !== values.passwordTwo) {
            errors.passwordTwo = 'Hasło musi być identyczne.'
        } else if (values.passwordOne === '') {
            errors.passwordOne = 'Wpisz hasło'
        } else if (values.passwordOne.length < 6) {
            errors.passwordOne = 'Hasło powinno mieć min. 6 znaków'
        }

        return errors;
    }
;

const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
}

function SignUpForm(props) {
    const formik = useFormik({
        initialValues: {
            ...INITIAL_STATE
        },
        validate,
        onSubmit: (values, event) => {

            props.firebase
                .doCreateUserWithEmailAndPassword(values.email, values.passwordOne)
                .then(authUser => props.history.push(ROUTES.LANDING))
                .catch(error => console.log(error));
            event.preventDefault();
        },
    });
    return (
        <div className='form'>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='email'>Email<br/>{formik.errors.email ? <span
                    className='error'>{formik.errors.email && formik.touched.email && formik.errors.email}</span> : ""}
                </label>
                <input
                    type="email"
                    id='email'
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />

                <label htmlFor='passwordOne'>Hasło<br/>{formik.errors.passwordOne ? <span
                    className='error'>{formik.errors.passwordOne && formik.touched.passwordOne && formik.errors.passwordOne}</span> : ""}
                </label>
                <input
                    type="password"
                    id='passwordOne'
                    name="passwordOne"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordOne}
                />

                <label htmlFor='passwordTwo'>Powtórz hasło<br/>{formik.errors.passwordTwo ? <span
                    className='error'>{formik.errors.passwordTwo && formik.touched.passwordTwo && formik.errors.passwordTwo}</span> : ""}
                </label>
                <input
                    type="password"
                    id='passwordTwo'
                    name="passwordTwo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordTwo}
                />

                <div className="form-btns">
                    <Link to={ROUTES.SIGN_IN}>
                        <button type='button' className='signUp-btn'>Zaloguj się</button>
                    </Link>

                    <button className='signIn-btn' type="submit" disabled={!formik.errors}>
                        Załóż konto
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm;