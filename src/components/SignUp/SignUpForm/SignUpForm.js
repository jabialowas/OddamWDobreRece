import React from 'react';
import {useFormik} from "formik";
import Firebase from "../../Firebase";
import * as ROUTES from '../../../constants/routes'
import { Link, withRouter } from 'react-router-dom';


const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Błędny adres e-mail.';
    } else if (values.passwordOne !== '' && values.passwordTwo !== '' &&values.passwordOne !== values.passwordTwo) {
        errors.passwordOne = 'Hasło musi być identyczne.'
    }
    return errors;
};

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
        onSubmit: (values,event) => {

            props.firebase
                .doCreateUserWithEmailAndPassword(values.email, values.passwordOne)
                .then(authUser => props.history.push(ROUTES.LANDING))
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
                            id='passwordOne'
                            name="passwordOne"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.passwordOne}
                        />
                        {formik.errors.passwordOne && formik.touched.passwordOne && formik.errors.passwordOne}
                        <input
                        type="password"
                        id='passwordTwo'
                        name="passwordTwo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.passwordTwo}
                    />
                        {formik.errors.passwordTwo && formik.touched.passwordTwo && formik.errors.passwordTwo}
                        <button type="submit">
                            Submit
                        </button>
                    </form>
        </div>
    );
}
export default SignUpForm;