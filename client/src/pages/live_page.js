import React, { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Chat from '../components/chat/chat';
import './live_page.scss';

const LivePage = () => {

  const [key, setKey] = useState('chat');

  useEffect(() => {
    //
  });

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
              <div>Questions</div>
            </Tab>
            <Tab eventKey="polls" title="Polls">
              <div>Polls</div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
};

export default LivePage;
