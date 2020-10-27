import React, {useEffect, useState} from "react";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

import './App.css';
import Message from "./Message";

function App() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {username: 'Creator', message: 'All start here'},
        {username: 'Moderator', message: 'You can start typing'}
    ]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        setUsername(prompt('Please, enter your username'))
    }, [])

    const sendMessage = (event) => {
        event.preventDefault();
        setMessages([...messages, {username: username, message: input}]);
        setInput('');
    }

    return (
        <div className="app">
            <h1>Hello Messenger</h1>
            <h2>Welcome {username}</h2>

            <form>
                <FormControl>
                    <InputLabel>Enter a message...</InputLabel>
                    <Input value={input} onChange={event => setInput(event.target.value)}/>
                    <Button
                        disabled={!input}
                        variant="contained"
                        color="primary"
                        type='submit'
                        onClick={sendMessage}>
                        Send Message
                    </Button>
                </FormControl>

            </form>

            {messages.map((message, index) => (
                <Message key={index} username={username} message={message}/>
            ))}
        </div>
    );
}

export default App;
