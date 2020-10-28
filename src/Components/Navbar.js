import React from 'react';
import {auth} from "../firebase";
import {useStateValue} from "../store/StateProvider";

import {Button} from "@material-ui/core";

import "./Navbar.css";
import AllInLogo from "../Assets/all_in_logo.png"

const Navbar = () => {
    const [{user}, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

    return (
        <div className="navbar">
            <img src={AllInLogo} className="navbar__logo" alt="All-In logo"/>
            <div className="navbar__welcome">Welcome <span>{user?.email.split("@")[0]}</span></div>
            <Button onClick={handleAuthentication}>Logout</Button>
        </div>
    );
};

export default Navbar;
