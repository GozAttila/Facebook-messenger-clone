import React from 'react';

import {Card, CardContent, Typography} from "@material-ui/core";

import "./Message.css";

const Message = ({username, message}) => {
    const isCurrentUser = username === message.username

    return (
        <div className={`message ${isCurrentUser && 'message_user'}`}>
            <Card className={isCurrentUser ? "message__userCard" : "message__guestCard"}>
                <CardContent>
                    <Typography color="white" variant="h5" component="h2">
                        {message.username}: {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Message;
