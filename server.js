const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const io = socketIo(server);

const socketHistory = {};

io.on('connection', (socket) => {
  console.log(`Connected ${socket.id}`);
  let socketRoom;

  socket.on('disconnect', () =>
    console.log(`Disconnected: ${socket.id}`));
    socketRoom = null;

  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joining ${room}`)
    socket.join(room);
    socketRoom = room;
    socket.emit('joinResponse', socketHistory[room]);
  });

  socket.on('switch', (data) => {
    const { prevRoom, nextRoom } = data;
    if(prevRoom)
      socket.leave(prevRoom);

    if(nextRoom) {
      console.log(`Socket ${socket.id} switching to ${nextRoom}`)
      socket.join(nextRoom);
      socket.emit('joinResponse', socketHistory[nextRoom]);
    }

    socketRoom = nextRoom;
  })

  socket.on('chat', (data) => {
    const { message, room } = data;
    console.log(`msg: ${message}, room: ${socketRoom}`);
    socket.broadcast.to(socketRoom).emit('chat', message);
    socketHistory[socketRoom] = socketHistory[socketRoom]
      ? [data.message, ...socketHistory[socketRoom]]
      : [data.message];
  });
})

server.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port: ' + port);
});
