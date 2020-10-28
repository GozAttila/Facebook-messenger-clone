import React, {useEffect, useState} from "react";
import firebase from "firebase";
import FlipMove from "react-flip-move";

import db from "./firebase";

import {Button, FormControl, InputLabel, Input, IconButton} from "@material-ui/core";
import SendRoundedIcon from '@material-ui/icons/SendRounded';

import './App.css';
import Message from "./Message";

function App() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        db
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
            })
    }, [])

    useEffect(() => {
        setUsername(prompt('Please, enter your username'))
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
        <div className="app">
            <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
                 alt="messenger logo"/>
            <h1>Hello Messenger</h1>
            <h2>Welcome {username}</h2>

            <form className="app__form">
                <FormControl className="app__formControl">
                    {/*<InputLabel>Enter a message...</InputLabel>*/}
                    <Input className="app__input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)}/>
                    <IconButton
                        className="app__iconButton"
                        disabled={!input}
                        variant="contained"
                        color="primary"
                        type='submit'
                        onClick={sendMessage}>
                        <SendRoundedIcon/>
                    </IconButton>
                </FormControl>

            </form>
            <FlipMove>
                {messages.map(({id, message}) => (
                    <Message key={id} username={username} message={message}/>
                ))}
            </FlipMove>
        </div>
    );
}

export default App;
