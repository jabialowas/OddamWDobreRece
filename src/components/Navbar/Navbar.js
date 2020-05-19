import React from 'react';
import {BrowserRouter as Router, NavLink} from "react-router-dom";
import {Link} from 'react-scroll'
import './Navbar.scss'
import * as ROUTES from '../../constants/routes'
const activeStyle = {

    'outline': '0.75px solid #3C3C3C'
}
function Navbar() {
    return (
        <>
            <div className='navbar'>
                <ul className='navbar-login'>
                    <li><NavLink to={ROUTES.SIGN_IN}>Zaloguj</NavLink></li>
                    <li><NavLink className='register' to={ROUTES.SIGN_UP}>Załóż konto</NavLink></li>
                </ul>
                <ul className='navbar-nav'>
                    <li><NavLink activeStyle={activeStyle} to={ROUTES.LANDING}>Start</NavLink></li>
                    <li><Link>O co chodzi?</Link></li>
                    <li><Link>O nas</Link></li>
                    <li><Link>Fundacja i organizacje</Link></li>
                    <li><Link>Kontakt</Link></li>
                </ul>

            </div>
        </>

    );
}

export default Navbar;