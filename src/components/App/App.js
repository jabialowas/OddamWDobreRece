import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, NavLink
} from 'react-router-dom'
import logo from '../../logo.svg';
import './App.scss';
import Home from "../Home";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Navbar from "../Navbar";
import * as ROUTES from '../../constants/routes'
import {withAuthentication} from '../Session'
import {SignOut} from "../SignOut/SignOut";
import GiveThings from "../GiveThings";
import { useLocation } from "react-router-dom";
import AdminPage from "../Admin/Admin";
import Orders from "../Orders/Orders";


function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <>
            <Router>
                <ScrollToTop/>
                <Navbar/>
                <Switch>
                    <Route exact path={ROUTES.LANDING} component={Home} />
                    <Route path={ROUTES.SIGN_IN} component={SignIn}/>
                    <Route path={ROUTES.SIGN_UP} component={SignUp} />
                    <Route path={ROUTES.SIGN_OUT} component={SignOut} />
                    <Route path={ROUTES.APP_FORM} component={GiveThings}/>
                    <Route path={ROUTES.ADMIN} component={AdminPage}/>
                </Switch>
            </Router>
        </>
    );
}

export default withAuthentication(App);
