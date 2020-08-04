import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/user/user.selectors';
import { selectPolls } from '../../redux/session/session.selectors';
import CreatePoll from './create-poll';
import Button from 'react-bootstrap/Button';
import './polls.scss';


const Polls = ({ user, polls, isSpeaker }) => {
  const [showForm, setShowForm] = useState(false);
  const { displayName, socket } = user;

  return (
    <div className="polls p-4 d-flex flex-column h-100">
    { !showForm &&
      polls.map(({question, options}, i) => (
        <div key={i} className="card">
          <div className="card-body">
            <h1>{question}</h1>
             { Object.keys(options).map((option, j) => <p key={j}>{option}</p>) }
          </div>
        </div>
      ))
    }
    {isSpeaker && !showForm &&
      <div className="d-flex flex-column align-items-center">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="toggle-form m-2 w-50">New Poll</Button>
      </div>
    }
    {isSpeaker && showForm &&
        <CreatePoll showForm={showForm} toggleForm={() => setShowForm(!showForm)} />
    }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  polls: selectPolls
});

export default connect(mapStateToProps)(Polls);
