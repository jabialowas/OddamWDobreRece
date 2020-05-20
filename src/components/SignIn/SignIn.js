import React from 'react';
import {compose} from "recompose";
import {withRouter} from "react-router-dom";
import {withFirebase} from "../Firebase";
import SignInForm from "./SignInForm";

const SignInFormValidate = compose(
    withRouter,
    withFirebase,
)(SignInForm)


function SignIn() {
    return (
        <SignInFormValidate/>
    );
}

export default SignIn;