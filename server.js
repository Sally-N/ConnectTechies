const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require("socket.io");

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

// app.prepare().then(() => {
const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
});

const io = new Server(server);

io.on('connection', socket => {
    console.log('Client connected', socket.id);
    //io.to(socket.id)

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('message', (data) => {
        console.log('Client disconnected data,', data);
        io.emit('topic', data )
    });


    
});

server.listen(3001, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
});
// });