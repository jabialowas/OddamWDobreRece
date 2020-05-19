import React from 'react';
import {BrowserRouter as Router, NavLink} from "react-router-dom";
import {Link} from 'react-scroll'

function Navbar() {
    return (
        <>
            <div>
                <ul>
                    <li><NavLink to='/logowanie'>Zaloguj</NavLink></li>
                    <li><NavLink to='/rejestracja'>Załóż konto</NavLink></li>
                </ul>
            </div>
            <div>

                <ul>
                    <li><NavLink to='/'>Start</NavLink></li>
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