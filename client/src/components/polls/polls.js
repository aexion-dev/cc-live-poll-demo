import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/user/user.selectors';
import CreatePoll from './create-poll';
import './polls.scss';


const Polls = ({ user, isSpeaker }) => {
  const { displayName, socket } = user;

  if(isSpeaker) {
    return (
      <div className="polls p-4 d-flex flex-column h-100">
        <CreatePoll />
      </div>
    )
  }

  return (
    <div>Poll</div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectUser
});

export default connect(mapStateToProps)(Polls);
