import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import {auth} from "../firebase";

import "./Login.css";
import AllInLogo from "../Assets/all_in_logo.png"
import MessengerLogo from "../Assets/messenger_logo.svg"
import {useStateValue} from "../store/StateProvider";

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if (user) history.push("/")
    })

    const signIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }


    return (
        <div className="login">

            <img src={AllInLogo} className="login__logo" alt="All-In logo"/>
            <div className="login__info">A simple<img src={MessengerLogo} alt="Messenger logo"/>clone</div>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>

                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the ALL-IN Conditions of Use. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className='login__registerButton'>Create your ALL-IN Account</button>

            </div>

        </div>
    );
};

export default Login;
