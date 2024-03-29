const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const initialState = require('./initialState');
global.state = initialState.config;

const session = require('./controllers/session');
const user = require('./controllers/user');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const io = socketIo(server);

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Create New User
app.post('/createuser', (req, res) => { user.createUser(req, res) });

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

  socket.on('join', async (room, topic, speaker) => {
    console.log(`Client ${socket.id} is joining Session ${room}`)
    const index = session.selectIndex(room);

    if(session.sessionExists(room)) {
      console.log("Session Found! ID: ", room);
      const sessionHistory = await session.joinSession(socket.id, room);
      await socket.join(room);
      await socket.emit('loadSessionHistory', sessionHistory);
      socketRoom = room;
    } else if (room === socket.id) {
      console.log("Creating New Session ID: ", room);
      const sessionHistory = await session.createSession(room, topic, speaker);
      await socket.emit('loadSessionHistory', sessionHistory);
      socketRoom = room;
    } else {
      console.log("Session Not Found!");
      //need to return client to select screen
    }
  });

  socket.on('sessionClosing', (room) => {
    if(socketRoom === room) {
      socket.leave(room);
      socketRoom = null;
    }
  });

  socket.on('connectionSuccess', (data) => {
    socket.emit('loadSessionsList', state.sessions);
  });

  socket.on('chat', (data) => {
    const { msg, senderId } = data;
    console.log(`[${senderId}]: ${msg}`);
    session.updateChat(socketRoom, data);
    socket.broadcast.to(socketRoom).emit('chat', data);
  });

  socket.on('poll', (data) => {
    const { senderId } = data;
    console.log(`[${senderId}]: Started Poll`);
    session.updatePolls(socketRoom, data);
    socket.broadcast.to(socketRoom).emit('poll', data);
  });

  socket.on('vote', (data) => {
    console.log(`[${socket.id}]: Sent Vote`);
    session.updateVotes(socketRoom, data);
    socket.broadcast.to(socketRoom).emit('vote', data);
  });
});

server.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port: ' + port);
});
