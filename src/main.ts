import { Socket } from "socket.io"

const io = require('socket.io')(3001,  {
    cors: {
      origin: "*"
    }
  })

console.log("Server starting ...")

io.on("connection", (socket: Socket) => {
    console.log("New connection!");
});

