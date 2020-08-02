import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/home_page';
import LivePage from './pages/live_page';
import Chat from './components/chat/chat';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/speaker' component={Chat}/>
        <Route exact path='/view' component={LivePage}/>
      </Switch>
    </div>
  );
}

export default App;
