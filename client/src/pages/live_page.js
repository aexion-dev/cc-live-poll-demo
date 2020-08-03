import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../redux/user/user.selectors';
import { joinSession } from '../socket.utils';
//import { loadSessionStart } from '../redux/session/session.actions';
import Chat from '../components/chat/chat';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './live_page.scss';

const LivePage = ({ user, match }) => {
  const [key, setKey] = useState('chat');
  const { name, socket } = user;

  useEffect(() => {
    if(socket) {
      joinSession(match.params.socketId);
    }
  }, [socket]);

  return (
    <div className="live-page-wrapper">
      <div className="live-page">
        <div className="live-stream">
          <section className="live-stage">
            <div className="stage-content">
              <div className="video-stream">
              </div>
            </div>
          </section>
        </div>
        <div className="live-sidebar">
          <Tabs
            id="live-tab-options"
            activeKey={key}
            onSelect={(k) => setKey(k)}>
            <Tab eventKey="chat" title="Chat">
              <Chat />
            </Tab>
            <Tab eventKey="questions" title="Questions">

            </Tab>
            <Tab eventKey="polls" title="Polls">

            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  user: selectUser
});

// const mapDispatchToProps = (dispatch) => ({
//   loadSessionStart: (sessionId) => dispatch(loadSessionStart(sessionId))
// });

export default connect(mapStateToProps)(LivePage);
