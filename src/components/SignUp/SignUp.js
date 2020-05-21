import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {FirebaseContext, withFirebase} from '../Firebase'
import {Formik} from "formik";
import SignUpForm from "./SignUpForm";
import {compose} from "recompose";
import './SignUp.scss'
import {ReactComponent as Decoration} from "../../assets/Decoration.svg";


 const SignUpFormValidate = compose(
     withRouter,
     withFirebase,
 )(SignUpForm)

function SignUp() {
    return (
        <div className='form-cnt'>
            <h2 className='form-title'>Załóż konto</h2>
            <Decoration/>
            <br/>
        <SignUpFormValidate/>
        </div>
    );
}

export default SignUp;