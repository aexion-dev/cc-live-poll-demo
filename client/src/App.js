import React, { useState, useEffect, useRef } from 'react';
import {
  initiateSocket,
  disconnectSocket,
  subscribeToChat,
  switchRooms,
  loadChatHistory,
  sendMessage } from './socket.utils';

function App() {
  const rooms = ['A', 'B', 'C'];
  const [room, setRoom] = useState(rooms[0]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  //Keep track of previous room
  const prevRoomRef = useRef();
  useEffect(() => {
    prevRoomRef.current = room;
  });
  const prevRoom = prevRoomRef.current;

  useEffect(() => {
    if(prevRoom && room)
      switchRooms(prevRoom, room);
    else if(room)
      initiateSocket(room);

    setChat([]);
  }, [room]);

  useEffect(() => {
    loadChatHistory((err, data) => {
      if(err || !data)
        return;

      setChat(data);
    })
  }, [])

  useEffect(() => {
    subscribeToChat((err, data) => {
      if(err)
        return;

      setChat(oldChats => [data, ...oldChats]);
    });

    // return () => {
    //   disconnectSocket();
    // }
  }, []);

  return (
    <div className="App">
      <h1>Room: {room}</h1>
      {
        rooms.map((r, i) =>
        <button onClick={() => setRoom(r)} key={i}>{r}</button>)
      }

      <h1>Live Chat:</h1>
      <input
        type="text"
        name="name"
        value={message}
        onChange={e => setMessage(e.target.value)} />
      <button onClick={()=> {
        setChat(oldChats => [message, ...oldChats]);
        sendMessage(room,message);
      }}>Send</button>
      { chat.map((m,i) => <p key={i}>{m}</p>) }
    </div>
  );
}

export default App;
