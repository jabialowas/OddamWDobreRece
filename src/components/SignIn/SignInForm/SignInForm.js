import React from 'react';
import {useFormik} from "formik";
import * as ROUTES from "../../../constants/routes";

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Błędny adres e-mail.';
    } else if (values.password === '') {
        errors.passwordOne = 'Proszę wpisać hasło'
    }
    return errors;
};
const INITIAL_STATE = {
    email: '',
    password: ''

}
function SignInForm(props) {
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
                .catch(error => console.log(error));
            event.preventDefault();
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="email"
                    id='email'
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email && formik.errors.email}
                <input
                    type="password"
                    id='password'
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordOne}
                />
                {formik.errors.password && formik.touched.password && formik.errors.password}
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default SignInForm;