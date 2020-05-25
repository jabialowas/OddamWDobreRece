import React from 'react';

import { withFirebase } from '../Firebase';
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import {ReactComponent as Decoration} from "../../assets/Decoration.svg";
import './SignOut.scss'
const SignOutButton = ({ firebase }) => (
    <li  onClick={firebase.doSignOut}>
        Wyloguj
    </li>
);

export const SignOut = () => {
    return (
        <div className='form-cnt'>
            <h2 className='form-title'>Wylogowanie nastąpiło pomyślnie!</h2>
            <Decoration/>
            <br/>
        <div className="form-btns">
            <Link to={ROUTES.LANDING}>
                <button type='button' className='signIn-btn'>Strona główna</button>
            </Link>
        </div>
        </div>
    )
}

export default withFirebase(SignOutButton);
