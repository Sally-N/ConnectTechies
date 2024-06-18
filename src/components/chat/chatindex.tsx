// import { useEffect } from 'react'
// import io from 'socket.io-client'
// let socket

// const ChatI = () => {
//   useEffect(() => socketInitializer(), [])

//   const socketInitializer = async () => {
//     await fetch('/api/socket')
//     socket = io()

//     socket.on('connect', () => {
//       console.log('connected')
//     })
//   }

//   return null
// }

// export default ChatI;

import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Input, Row } from 'antd';
import { useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const ChatInterfaceComponent = () => {
    useEffect(() => {
        const initializeSocket = async () => {
            // await fetch('/api/socket', {
            //     method: "GET"
            // });

            socket = io('http://localhost:3000', {
                path: "/socket.io",
                transports: ["websocket"],
            });

            const connection_timeout = setTimeout(function () {
                socket.close()
            }, 5000)

            socket.on('open', () => {
                console.log("socket opened");
            })

            socket.on('connect', () => {
                console.log('connected');
                clearTimeout(connection_timeout)
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

        initializeSocket();
    }, []);

    return (
        <Row>
            <Row>

            </Row>
            <Row>
                <Input />
            </Row>
        </Row>
    );
};

export default ChatInterfaceComponent;
