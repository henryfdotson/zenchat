const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
// Ensure that socket.io can communicate across ports securely.
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

// Events

// On a new connection... 
io.on("connection", (socket) => {
    console.log(socket.id);

    // On a join room...
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    });

    // On a send message..
    socket.on("send_message", (data) => {
        // Emit a receive_message type event to the specified room
        socket.to(data.room).emit("receive_message", data);
        // console.log(data.message);
    });

    // On a disconnection...
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});


server.listen(3001, () => {
    console.log("Server running");
});