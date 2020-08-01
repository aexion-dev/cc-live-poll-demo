import io from 'socket.io-client';
let socket; //dont init, allow client to handle connection

export const initiateSocket = (room) => {
  socket = io();
  console.log(`Connecting to socket..`);

  if(socket && room)
    socket.emit('join', room);
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket..');
  if(socket)
    socket.disconnect();
}

export const switchRooms = (prevRoom, nextRoom) => {
  if(socket)
    socket.emit('switch', { prevRoom, nextRoom });
}

export const loadChatHistory = (cb) => {
  if(!socket)
    return (true);
    
  socket.on('joinResponse', msg => {
    console.log('Join Response received!')
    return cb(null, msg);
    });
}

export const subscribeToChat = (cb) => {
  if(!socket)
    return (true);

  socket.on('chat', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}

export const sendMessage = (room, message) => {
  if(socket)
    socket.emit('chat', { message, room });
}
