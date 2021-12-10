import { Socket } from "socket.io"

const io = require('socket.io')(3001,  {
    cors: {
      origin: "*"
    }
  })

console.log("Server starting ...")


io.on("connection", (socket: Socket) => {
    console.log("New connection!");
    socket.broadcast.emit('playerConnect', socket.id)

    socket.on('localPlayerLocationUpdate', (pos, dir) => {
      //console.log('new location package', pos, dir)
      socket.broadcast.emit('playerLocationUpdate', socket.id, pos, dir)
    })

    socket.on('disconnect', (reason: string) => {
      socket.broadcast.emit('playerDisconnect', socket.id)
    })
});

