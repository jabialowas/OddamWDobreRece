import React from 'react';
import {BrowserRouter as Router, NavLink, Link} from "react-router-dom";
import {
    Link as ScrollLink,
    DirectLink,
    Element,
    Events,
    animateScroll,
    scrollSpy,
    scroller
} from "react-scroll";
import './Navbar.scss'
import * as ROUTES from '../../constants/routes'
import SignOutButton from "../SignOut/SignOut";
import {AuthUserContext} from '../Session'
import {LANDING} from "../../constants/routes";


const activeStyle = {

    'outline': '0.75px solid #3C3C3C'
}
const NavbarNonAuth = () => (
    <>
        <ul className='navbar-login'>
            <li><NavLink to={ROUTES.SIGN_IN}>Zaloguj</NavLink></li>
            <li><NavLink className='register' to={ROUTES.SIGN_UP}>Załóż konto</NavLink></li>
        </ul>
        <ul className='navbar-nav'>
            <li><NavLink activeStyle={activeStyle} to={ROUTES.LANDING}>Start</NavLink></li>
            <li><ScrollLink   to='fourSteps'
                        spy={true}
                        smooth={true}
                        duration={500}>O co chodzi?</ScrollLink></li>
            <li><ScrollLink  to='aboutUs'
                spy={true}
                smooth={true}
                duration={500}>O nas</ScrollLink ></li>
            <li><ScrollLink
                to='whoWeHelp'
                spy={true}
                smooth={true}
                duration={500}>Fundacja i organizacje</ScrollLink ></li>
            <li><ScrollLink  to='contact'
                spy={true}
                smooth={true}
                duration={500}>Kontakt</ScrollLink ></li>
        </ul>
        </>
)

const NavbarAuth = ()=> (

    <AuthUserContext.Consumer>
        {authUser =>
            <>
        <ul className='navbar-login'>
            <li>Witaj {authUser.email}</li>
            <li><NavLink className='register'to={ROUTES.APP_FORM}>Oddaj rzeczy</NavLink></li>
            <NavLink to={ROUTES.SIGN_OUT}>{<SignOutButton/>}</NavLink>
        </ul>
                <ul className='navbar-nav'>
                    <li ><NavLink activeStyle={activeStyle} to={ROUTES.LANDING}>Start</NavLink></li>
                    <li ><ScrollLink   to='fourSteps'
                                      spy={true}
                                      smooth={true}
                                      duration={500}>O co chodzi?</ScrollLink></li>
                    <li><ScrollLink  to='aboutUs'
                                     spy={true}
                                     smooth={true}
                                     duration={500}>O nas</ScrollLink ></li>
                    <li><ScrollLink
                        to='whoWeHelp'
                        spy={true}
                        smooth={true}
                        duration={500}>Fundacja i organizacje</ScrollLink ></li>
                    <li><ScrollLink  to='contact'
                                     spy={true}
                                     smooth={true}
                                     duration={500}>Kontakt</ScrollLink ></li>
                </ul>
            </>}
    </AuthUserContext.Consumer>

)
const Navbar = () => (

<div className='navbar'><AuthUserContext.Consumer>
    {authUser => authUser  ?  <NavbarAuth /> : <NavbarNonAuth />}</AuthUserContext.Consumer>
</div>
)


export default Navbar;