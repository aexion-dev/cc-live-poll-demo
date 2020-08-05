import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import './poll-card.scss';

const PollCard = ({ poll, index, isSpeaker }) => {
  const [answer, setAnswer] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { question, options, totalVotes } = poll;
  const responses = Object.keys(options).map(key => options[key]);

  const percentage = (partial, total) => {
    if(total > 0)
     return (100 * partial) / total;

    return 0;
  }

  const handleChange = (event) => {
    setAnswer(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(responses[answer]);
    setCompleted(true);
  }

  return (
    <Card key={index}>
        <Card.Body className="card-content">
          <Card.Title>{question}</Card.Title>
            { (isSpeaker || completed) &&
                responses.map(({content, votes}, i) => (
                  <div className="option-progress d-flex flex-row" key={i}>
                    <div className="option-content">{`${content} (${totalVotes})`}</div>
                    <ProgressBar className="w-100 my-2" now={votes} />
                    <div className="percent">{`${percentage(votes, totalVotes)}%`}</div>
                  </div>
                ))
            }
            { (!isSpeaker && !completed) &&
              <form onSubmit={handleSubmit}>
                {
                  responses.map(({content}, i) => (
                    <div key={i} className="form-check">
                      <label>
                        <input
                          type="radio"
                          name={`poll-card-${index}`}
                          value={i}
                          checked={answer == i}
                          onChange={handleChange}
                          className="form-check-input"
                        />
                        {content}
                      </label>
                    </div>
                  ))
                }
                <div className="form-group">
                  <button className="btn btn-primary mt-2" type="submit">
                    Submit Vote
                  </button>
                </div>
              </form>
            }
        </Card.Body>
    </Card>
  )
}

export default PollCard;
