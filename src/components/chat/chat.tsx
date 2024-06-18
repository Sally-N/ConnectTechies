// import React from "react"
// import { Paragraph, Text } from "@/Utils/Theme/customTheme"
// import { Avatar, Col, Row } from "antd"



// export const ChatComponent = () => {
//     return (
//         <Row>
//             <Row className="chat-header" justify={'space-between'} align={'middle'} style={{position: 'fixed', height: '30px'}}>
//                 <Col span={4}>
//                     <Avatar>AB</Avatar>
//                 </Col>
//                 <Col span={20}>
//                     <Text>Anne Hathaway</Text>
//                 </Col>

//             </Row>
//             <Row>

//             </Row>
//             <Col span={24}>
//                 <Row>
//                     <Col span={7}>
//                         <Avatar>AB</Avatar>
//                     </Col>
//                     <Col span={24}>
//                         <Text>Anne Hathaway</Text>
//                         <Paragraph>If you are still facing issues, you can manually load the environment variables in your command line session before running the Prisma command:</Paragraph>
//                     </Col>
//                 </Row>
//             </Col>
//         </Row>
//     )
// }
// pages/index.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your server URL

const Index = () => {
  const [messages, setMessages] = useState<String[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat message', (message ) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
        socket.off('chat message');
      };
    }, []);

  const sendMessage = () => {
    socket.emit('chat message', newMessage);
    console.log(newMessage, 'nwm')
    setNewMessage('');
  };

  return (
    <div>
      <h1>Real-Time Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Index;