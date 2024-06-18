
const { Server } = require("socket.io");

export function socketHandler(req, res){


// app.prepare().then(() => {

const io = new Server(res.socket.server);

res.socket.server.io = io;


io.on('connection', socket => {
    console.log('Client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


// });

}