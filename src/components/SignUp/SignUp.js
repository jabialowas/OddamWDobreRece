import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {FirebaseContext, withFirebase} from '../Firebase'
import {Formik} from "formik";
import SignUpForm from "./SignUpForm";
import {compose} from "recompose";

 const SignUpFormValidate = compose(
     withRouter,
     withFirebase,
 )(SignUpForm)

function SignUp() {
    return (
        <SignUpFormValidate/>
    );
}

export default SignUp;