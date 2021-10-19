import { Socket } from "socket.io"

const io = require('socket.io')(3000)

console.log("hi")

io.on("connection", (socket: Socket) => {
    console.log("New connection!");
});

