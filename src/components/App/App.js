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
import {withFirebase} from "../Firebase";


function App(props) {
    const [authUser,setAuthUser] = useState(null);
console.dir(authUser);
    useEffect(() => {
        const listener = props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
            ? setAuthUser({authUser})
                : setAuthUser(null);
        })
        return () => {listener()};
    },[])
    return (
        <>
            <Router>
                <Navbar authUser={authUser}/>
                <Switch>
                    <Route exact path={ROUTES.LANDING} component={Home}/>
                    <Route path={ROUTES.SIGN_IN} component={SignIn}/>
                    <Route path={ROUTES.SIGN_UP} component={SignUp} />
                </Switch>
            </Router>
        </>
    );
}

export default withFirebase(App);
