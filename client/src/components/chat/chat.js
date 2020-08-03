import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/user/user.selectors';
import {
  subscribeToChat,
  loadChatHistory,
  sendMessage } from '../../socket.utils';


const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  //Load Room's Chat History
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
    <div className="chat">
      <h1>Live Chat:</h1>
      <input
        type="text"
        name="name"
        value={message}
        onChange={e => setMessage(e.target.value)} />
      <button onClick={()=> {
        setChat(oldChats => [message, ...oldChats]);
        console.log(chat);
        sendMessage(message);
      }}>Send</button>
      { chat.map((m,i) => <p key={i}>{m}</p>) }
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  user: selectUser
});

export default connect(mapStateToProps)(Chat);
