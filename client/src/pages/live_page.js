import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Chat from '../components/chat/chat';

const LivePage = () => {

  const [key, setKey] = useState('chat');

  return (
    <div className="live-page">
      <div className="live-stream">
        <section className="live-stage">
          <div className="stage-content">
            <Image src="https://s3.amazonaws.com/talkstar-photos/uploads/0a95ffba-8cfe-4d9c-8913-736275f78bf9/MatthewWalker_2019-embed.jpg" fluid />
          </div>
        </section>
      </div>
      <div className="live-sidebar">
        <Tabs
          id="controlled-tab-example"
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
  )
};

export default LivePage;
