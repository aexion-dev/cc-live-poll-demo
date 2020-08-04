import io from 'socket.io-client';
let socket; //dont init, allow client to handle connection

export const initiateSocket = async () => {
  return new Promise((resolve, reject) => {
    socket = io();
    console.log(`Connecting to socket..`);

    socket.on('connect', () => {
      resolve(socket.id);
    });
  })
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket..');
  console.log(socket);
  if(socket)
    socket.off('connect');
    socket.disconnect();
}

export const loadSessionList = (cb) => {
  if(!socket)
    return (true);

  socket.on('loadSessions', msg => {
    console.log('Recieved Sessions List!');
    return cb(null, msg);
    });
}

export const subscribeToSessionList = (cb) => {
  if(!socket)
    return (true);

  socket.on('sessionUpdate', sessions => {
    console.log('Session Update received!');
    return cb(null, sessions);
  })
}

export const joinSession = async (sessionId) => {
  return new Promise((resolve, reject) => {
    console.log(`Joining room ${sessionId}..`);

    if(socket && sessionId) {
      socket.emit('join', sessionId);

      socket.on('loadSessionHistory', (data) => {
        resolve(data);
      })
    }
  })
}

export const emitChatMessage = (message) => {
  if(socket)
    socket.emit('chat', message);
}

export const subscribeToChat = (cb) => {
  if(!socket)
    return (true);

  socket.on('chat', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}

export const loadSessionHistory = (cb) => {
  if(!socket)
    return (true);

  socket.on('joinResponse', msg => {
    console.log('Join Response received!');
    return cb(null, msg);
    });
}
