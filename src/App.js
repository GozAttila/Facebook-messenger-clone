import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {auth} from "./firebase";
import {useStateValue} from "./store/StateProvider";

import {SET_USER} from "./store/actionTypes";

import './App.css';
import Home from "./Home";
import Login from "./Login";


function App() {
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {

        auth.onAuthStateChanged((authUser) => {

            if (authUser) {
                dispatch({
                    type: SET_USER,
                    user: authUser,
                });
            } else {
                dispatch({
                    type: SET_USER,
                    user: null,
                });
            }
        });
    }, []);

    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
