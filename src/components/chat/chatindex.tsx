import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Button, Input, Row } from 'antd';
import { read } from 'fs';
import { FormEvent, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const ChatInterfaceComponent = () => {
    const [chatMessage, setChatMessage] = useState('');
    useEffect(() => {
        // const initializeSocket = async (event: FormEvent<HTMLFormElement>) => {
        async function initializeSocket(event: FormEvent<HTMLFormElement>) {

            event.preventDefault
            // await fetch('/api/socket', {
            //     method: "GET"
            // });
            const formData = new FormData(event.currentTarget);

            socket = io('http://localhost:3000', {
                // path: "/socket.io",
                // transports: ["websocket"],
            });

            socket.on('open', () => {
                console.log("socket opened");
            })

            socket.on('connect', () => {
                console.log('connected');
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });

            socket.on('connect_error', (error) => {
                console.error('Connection Error:', error);
            });

            socket.on('error', (error) => {
                console.error('Socket Error:', error);
            });
        };
    }, []);


    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        socket = io('http://localhost:3001', {
            path: "/socket.io",
            transports: ["websocket"],
        });

        // socket.on('open', () => {
        //     console.log("socket opened");
        // })

        socket.on('connect', () => {
            console.log('connected');
        });

        // Emit the message to the server
        socket.emit('message', {
            senderId: '20',
            message: chatMessage,
            receiver: '24',
            read: 'sent',
        });

        // Clear the input field
        setChatMessage('');
    };

    return (
        <Row>
            <Row>

            </Row>
            <Row>
                <form onSubmit={handleFormSubmit}>
                    <Input value={chatMessage} onChange={(e) => (setChatMessage(e.target.value))} />
                    <Button type="primary" htmlType="submit">Submit</Button>
                </form>
            </Row>
        </Row>
    );
};

export default ChatInterfaceComponent;
