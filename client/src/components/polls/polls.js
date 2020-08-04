import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/user/user.selectors';
import { selectPolls } from '../../redux/session/session.selectors';
import CreatePoll from './create-poll';
import './polls.scss';


const Polls = ({ user, polls, isSpeaker }) => {
  const { displayName, socket } = user;

  if(isSpeaker) {
    return (
      <div className="polls p-4 d-flex flex-column h-100">
        <CreatePoll />
        {
            polls.map(({question, options}, idx) => (
              <div>{question}</div>
            ))
        }
      </div>
    )
  }

  return (
    <div>Polls</div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  polls: selectPolls
});

export default connect(mapStateToProps)(Polls);
