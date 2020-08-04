import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/user/user.selectors';
import { selectChat } from '../../redux/session/session.selectors';
import { sendChatMessage } from '../../redux/session/session.actions';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import {
  subscribeToChat,
  sendMessage } from '../../socket.utils';
import './chat.scss';


const Chat = ({ user, chat, sendChatMessage }) => {
  const [message, setMessage] = useState('');
  const { displayName, socket } = user;
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

  const handleMessage = (msg) => {
    if(!user || !msg | msg.length < 1)
      return;

    const date = new Date();
    sendChatMessage({msg, displayName, senderId: socket, date});
  }

  return (
    <div className="chat d-flex flex-column h-100">
      <ListGroup as="ul" className="chat-history">
        {
          chat.map(({msg, senderId, displayName, date}, idx) => (
            <ListGroup.Item
              as="li"
              className={`border-0 ${senderId === socket ? 'user-message' : null}`}
              key={idx}>
                <div className="message-info">
                  <span className="message-info-name" >{displayName}</span>
                  <span className="message-info-time" >{date.toLocaleString()}</span>
                </div>
                <div className="message-body">
                  {msg}
                </div>
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
            onClick={() => {
              handleMessage(message);
            }}>Send</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  chat: selectChat,
});

const mapDispatchToProps = (dispatch) => ({
  sendChatMessage: (msg) => dispatch(sendChatMessage(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
