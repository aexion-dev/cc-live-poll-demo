import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/home_page';
import DirectoryPage from './pages/directory_page';
import Chat from './components/chat/chat';

const App = () => {

  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/speaker' component={Chat}/>
        <Route path='/live' component={DirectoryPage}/>
      </Switch>
    </div>
  );
}

export default App;
