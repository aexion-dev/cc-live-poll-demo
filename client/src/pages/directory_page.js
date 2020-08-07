import React, { useState, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../redux/user/user.selectors';
import { connectUserStart, disconnectUserStart } from '../redux/user/user.actions';
import './directory_page.scss';

import SelectMode from '../components/select-mode/select-mode';
import LivePage from './live_page';

const Directory = ({ user, connectUserStart, disconnectUserStart, match }) => {
  const { name, socket } = user;

  useEffect(() => {
    if(!socket) {
      connectUserStart(user);
    }

    return () => {
      disconnectUserStart(user);
    }
  }, []);

  return (
    <div className="directory-page">
      <Route exact path={`${match.path}`} component={SelectMode} />
      <Route exact path={`${match.path}/:socketId`} component={LivePage} />
      <Route exact path={`${match.path}/:socketId/:topic/:speaker`} component={LivePage} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  connectUserStart: (user) => dispatch(connectUserStart(user)),
  disconnectUserStart: (user) => dispatch(disconnectUserStart(user)),
});

const mapStateToProps = createStructuredSelector({
  user: selectUser
});


export default connect(mapStateToProps, mapDispatchToProps)(Directory);
