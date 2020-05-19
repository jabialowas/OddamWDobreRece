import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, NavLink
} from 'react-router-dom'
import logo from '../../logo.svg';
import './App.scss';
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Navbar from "../Navbar/Navbar";

function App() {
    return (
        <>
            <Router>
                <Navbar/>

                <Switch>
                    <Route exact path='/'>
                        <Home/>
                    </Route>
                    <Route path='/logowanie'>
                        <Login/>
                    </Route>
                    <Route path='/rejestracja'>
                        <Register/>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
