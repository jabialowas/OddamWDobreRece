import React from 'react';
import {compose} from "recompose";
import {withRouter} from "react-router-dom";
import {withFirebase} from "../Firebase";
import SignInForm from "./SignInForm";
import {ReactComponent as Decoration} from "../../assets/Decoration.svg";
import './SignIn.scss'


const SignInFormValidate = compose(
    withRouter,
    withFirebase,
)(SignInForm)


function SignIn() {
    return (
        <div className='signIn-cnt'>
            <h2 className='form-title'>Zaloguj się</h2>
            <Decoration/>
        <SignInFormValidate/>
        </div>
    );
}

export default SignIn;