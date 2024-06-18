import { NextRequest, NextResponse } from 'next/server';
import { Server } from 'socket.io'
import cors from 'cors';
import { message } from 'antd';

// Create a new instance of the CORS middleware
const corsMiddleware = cors();

// const SocketHandler = (req, res) => {
//   if (res.socket.server.io) {
//     console.log('Socket is already running')
//   } else {
//     console.log('Socket is initializing')
//     const io = new Server(res.socket.server)
//     res.socket.server.io = io
//   }
//   res.end()
// }

// export default SocketHandler

export async function GET(req, res) {

  // const socket =  require("socket.io");

  // socket.on("connect_error", (err) => {
  //   console.log(`connect_error due to ${err.message}`);
  // });
  try {
    // if (res.socket.server.io) {
    //   console.log('Socket is already running');
    // } else {
      console.log('Socket is initializing');
      const io = new Server(res.socket.server, {
        // Set also 'polling' for allowing http protocol as fallbacks
        transports: ['websocket',],
      });
      // const io = new Server(res.socket.server);
      // res.socket.server.io = io;

      io.on('connection', (socket) => {
        console.log('a user connected');
        // Add your socket event listeners here
      });
    // }
    // corsMiddleware(req, res, () => {
    //   res.socket.server.io = io;
    //   res.end();
    // });

    return NextResponse.json({
      message: 'connection is successful'
    })


  } catch (error) {
    console.log(error, 'err')
    return NextResponse.json({
      err: error,
      message: 'connection failed'
    })
  }
};
