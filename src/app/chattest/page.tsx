'use client';
import React, { useEffect, useState } from 'react';

import io from 'socket.io-client';
const socket = io('http://localhost:3000');

const ChatTest = () => {

    useEffect(() => {
        socket.on('message2', (data) => {
            console.log("Recieved from SERVER ::", data)
            // Execute any command
        })
    }, [socket]);


    return (
    
        <div>Hello World!</div>
    
    );
};

export default ChatTest;