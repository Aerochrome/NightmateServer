import { Socket } from "socket.io"

const io = require('socket.io')(3001,  {
    cors: {
      origin: "*"
    }
  })

console.log("Server starting ...")

var lastLocationUpdates = {}

io.on("connection", (socket: Socket) => {
    console.log("New connection!");
    socket.broadcast.emit('playerConnect', socket.id)

    sendLocationsToClient(socket)

    socket.on('localPlayerLocationUpdate', (pos, dir) => {
      //console.log('new location package', pos, dir)
      lastLocationUpdates[socket.id] = [pos, dir]
      socket.broadcast.emit('playerLocationUpdate', socket.id, pos, dir)
    })

    socket.on('disconnect', (reason: string) => {
      delete lastLocationUpdates[socket.id]
      socket.broadcast.emit('playerDisconnect', socket.id)
    })
});

function sendLocationsToClient(socket: Socket) {
  for (let [socketId, posVals] of Object.entries(lastLocationUpdates)) {
    if (socket.id === socketId) continue;

    socket.emit('playerLocationUpdate', socketId, posVals[0], posVals[1])
  }
}

