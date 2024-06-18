// const express = require('express');
// const { PrismaClient } = require('@prisma/client');
// const cors = require('cors');
// const http = require('http');
// //const { Server } = require('socket.io');
// require('dotenv').config();
// const socketIo = require('socket.io');


// const prisma = new PrismaClient();
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // const io = new Server(server, {
// //   cors: {
// //     origin: 'http://localhost:3000',
// //     methods: ['GET', "POST"],
// //     allowedHeaders: ['Content-Type'],
// //     credentials: true,
    
// //   }
// // })

// app.use(cors());
// app.use(express.json());

// app.post('/chat', async (req: any, res: any) => {
//   const { message, recipientId, senderId, status } = req.body;
//   const newMessage = await prisma.message.create({

//     data: {
//       message,
//       senderId,
//       recipientId,
//       status

//     },
//     include: {
//       user: true
//     }
//   });
//   io.emit('newMessage', newMessage);
//   res.json(newMessage);
//   return newMessage
// });

// app.get('/chat', async (req: any, res: any) => {
//   console.log(5);
//   return 5;
//   // const userChats = await prisma.message.findMany({
//   //   include: {
//   //     user: true
//   //   }
//   // });
//   // res.json(userChats);
// });

// io.on('connection', (socket: any) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

//   socket.on('chat message', (message : string) => {
//     io.emit('chat message', message);
//   });
// });

// const PORT = process.env.PORT;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });