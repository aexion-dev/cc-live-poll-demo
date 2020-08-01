var http = require('http').createServer().listen(4000);
var io = require('socket.io').listen(http);

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
