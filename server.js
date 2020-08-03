const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const initialState = require('./initialState');
global.state = initialState.config;

const session = require('./controllers/session');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const io = socketIo(server);

const socketHistory = {};

io.on('connection', (socket) => {
  console.log(`Client ${socket.id} has connected`);
  let socketRoom;

  socket.on('disconnecting', () => {
    if(socketRoom === socket.id) {
      console.log(`Session ${socketRoom} is closing down`);
      socket.to(socketRoom).emit('sessionClosing', socketRoom);
      session.closeSession(socketRoom);
    } else {
      console.log(`Client ${socket.id} has left ${socketRoom}`);
      session.leaveSession(socket.id, socketRoom);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} has disconnected`);
    socketRoom = null;
  });

  socket.on('join', (room) => {
    console.log(`Client ${socket.id} is joining Session ${room}`)
    const index = session.selectIndex(room);

    if(session.sessionExists(room)) {
      console.log("Session Found! ID: ", room);
      session.joinSession(socket.id, room);
      socket.join(room);
      socketRoom = room;
      console.log('SESSION',state.sessions[index]);
      socket.emit('joinResponse', socketHistory[room]);
    } else if (room === socket.id) {
      console.log("Creating New Session ID: ", room);
      session.createSession(room);
      socketRoom = room;
      socket.emit('joinResponse', socketHistory[room]);
    } else {
      console.log("Session Not Found!");
    }
  });

  socket.on('sessionClosing', (room) => {
    if(socketRoom === room) {
      socket.leave(room);
      socketRoom = null;
    }
  });

  socket.on('chat', (data) => {
    const { message, room } = data;
    console.log(`msg: ${message}, room: ${socketRoom}`);
    socket.broadcast.to(socketRoom).emit('chat', message);
    socketHistory[socketRoom] = socketHistory[socketRoom]
      ? [data.message, ...socketHistory[socketRoom]]
      : [data.message];
  });
});

server.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port: ' + port);
});
