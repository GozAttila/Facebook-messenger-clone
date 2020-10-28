import React, {forwardRef} from 'react';

import {Card, CardContent, Typography} from "@material-ui/core";

import "./Message.css";

const Message = forwardRef(({username, message}, ref) => {
    const isCurrentUser = username === message.username

    return (
        <div ref={ref} className={`message ${isCurrentUser && 'message_user'}`}>
            <Card className={isCurrentUser ? "message__userCard" : "message__guestCard"}>
                <CardContent>
                    {/*<Typography color="white" variant="h5" component="h2">*/}
                    <Typography variant="h5" component="h2">
                        {!isCurrentUser && `${message.username || "Unknown user"}: `}{message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
});

export default Message;
