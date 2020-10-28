import React, {forwardRef} from 'react';
import dayjs from "dayjs";

import {Card, CardContent, Typography} from "@material-ui/core";

import "./Message.css";

const Message = forwardRef(({username, message}, ref) => {
    const isCurrentUser = username === message.username

    const relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)

    return (
        <div ref={ref} className={`message ${isCurrentUser && 'message__user'}`}>
            <div className="message__time">{message.timestamp ? dayjs().from(dayjs(message.timestamp.seconds * 1000)) : ""}</div>
            <Card className={isCurrentUser ? "message__userCard" : "message__guestCard"}>
                <CardContent>
                    <div className="message__username">
                        {!isCurrentUser && `${message.username.split("@")[0] || "Unknown user"}`}
                    </div>
                    <Typography
                        className={`${isCurrentUser && 'message__userText'}`}
                        variant="h5"
                        component="h2"
                    >
                        {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
});

export default Message;
