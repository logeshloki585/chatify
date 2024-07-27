const express = require('express');
const { join } = require('node:path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
    path: '/api/socket.io',
    cors: {
        origin: '*'
    }
});

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    const userId = socket.id;
    console.log('User connected:', userId);

    socket.on('chat-message', (msg, time) => {
        io.emit('chat-message', { msg, time, userId });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', userId);
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
