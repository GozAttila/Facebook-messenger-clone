import React, {useEffect, useState} from "react";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import {useHistory} from "react-router-dom";

import db from "../firebase";

import {FormControl, Input, IconButton} from "@material-ui/core";
import SendRoundedIcon from '@material-ui/icons/SendRounded';

import './Home.css';
import Message from "./Message";
import {useStateValue} from "../store/StateProvider";
import Navbar from "./Navbar";

function Home() {
    const [{user}, dispatch] = useStateValue();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (!user) history.push("/login")
    })

    useEffect(() => {
        db
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
            })
    }, [])

    useEffect(() => {
        setUsername(user?.email)
    }, [])

    const sendMessage = (event) => {
        event.preventDefault();

        db.collection('messages').add({
            message: input,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('');
    }

    return (
        <div className="home">

            <div className="home__navbar">
                <Navbar/>
            </div>

            <FlipMove className="home__flipMove">
                {messages.map(({id, message}) => (
                    <Message key={id} username={username} message={message}/>
                ))}
            </FlipMove>

            <div className="home__formContainer">
                <form className="home__form">
                    <FormControl className="home__formControl">

                        <Input
                            className="home__input"
                            placeholder="Enter a message..."
                            value={input}
                            onChange={event => setInput(event.target.value)}
                        />

                        <IconButton
                            className="home__iconButton"
                            disabled={!input}
                            variant="contained"
                            color="primary"
                            type='submit'
                            onClick={sendMessage}>

                            <SendRoundedIcon className="home__sendIcon"/>

                        </IconButton>

                    </FormControl>
                </form>
            </div>
        </div>
    );
}

export default Home;
