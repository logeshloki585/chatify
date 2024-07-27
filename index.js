const express = require('express');
const { join } = require('node:path');

const app = express();
const httpServer = require("http").createServer(app);
const options = {
    path: "/api/socket.io",
    cors: {
        origin: "*"
    }
};
const io = require("socket.io")(httpServer, options);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    const userId = socket.id;
    console.log("user connected: " + userId);
    
    socket.on('chat-message', (msg,time) => {
        io.emit('chat-message', { msg, time, userId });
    });

    socket.on('disconnect', () => {
        console.log("user disconnected: " + userId);
    });
});

server.listen(3000, () => {
    console.log('server running on port 3000');
});
