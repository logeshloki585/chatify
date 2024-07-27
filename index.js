const express = require('express');
const { join } = require('node:path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer); // Default path is used

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

httpServer.listen(3000, () => {
    console.log('Server running on port 3000');
});

// const domain = window.location.origin;
//         const socket = io(domain, { path: '/api/socket.io/' }); 