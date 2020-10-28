import React from 'react';
import AllInLogo from "./Assets/all_in_logo.png"
import "./Navbar.css";
import {Button} from "@material-ui/core";
import {useStateValue} from "./store/StateProvider";
import {auth} from "./firebase";

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
