import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/user/user.selectors';
import { selectChat } from '../../redux/session/session.selectors';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import {
  subscribeToChat,
  loadChatHistory,
  sendMessage } from '../../socket.utils';
import './chat.scss';


const Chat = ({ user, chat }) => {
  const [message, setMessage] = useState('');
  const [localChat, setLocalChat] = useState([]);
  //const [chat, setChat] = useState([]);

  // useEffect(() => {
  //   subscribeToChat((err, data) => {
  //     if(err)
  //       return;
  //
  //     setChat(oldChats => [data, ...oldChats]);
  //   });
  //
  //   // return () => {
  //   //   disconnectSocket();
  //   // }
  // }, []);

  return (
    <div className="chat d-flex flex-column h-100">
      <ListGroup as="ul">
        {
          chat.map((msg, idx) => (
            <ListGroup.Item
              as="li"
              key={idx}>
                {msg}
              </ListGroup.Item>
          ))
        }
      </ListGroup>
      <InputGroup className="mb-3 p-3">
        <Form.Control
          placeholder="Write your message.."
          aria-label="Send Message"
          aria-describedby="MessageBox"
          type="text"
          name="message"
          value={message}
          onChange={e => setMessage(e.target.value)} />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setLocalChat(oldChats => [message, ...oldChats]);
              console.log(localChat);
              sendMessage(message);
            }}>Send</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  )

  // return (
  //   <div className="chat">
  //     <h1>Live Chat:</h1>
  //     <input
  //       type="text"
  //       name="name"
  //       value={message}
  //       onChange={e => setMessage(e.target.value)} />
  //     <button onClick={()=> {
  //       setChat(oldChats => [message, ...oldChats]);
  //       console.log(chat);
  //       sendMessage(message);
  //     }}>Send</button>
  //     { chat.map((m,i) => <p key={i}>{m}</p>) }
  //   </div>
  // );
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  chat: selectChat,
});

export default connect(mapStateToProps)(Chat);
