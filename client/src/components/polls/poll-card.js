import React from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './poll-card.scss';

const PollCard = ({ question, options, totalVotes, index }) => {
  const responses = Object.keys(options).map(key => options[key]);

  const percentage = (partial, total) => {
    if(total > 0)
     return (100 * partial) / total;

    return 0;
  }

  return (
    <Card key={index}>
        <Card.Body className="card-content">
          <Card.Title>{question}</Card.Title>
            {
              responses.map(({content, votes}, i) => (
                <div className="option-progress d-flex flex-row" key={i}>
                  <div className="option-content">{`${content} (${totalVotes})`}</div>
                  <ProgressBar className="w-100 my-2" now={votes} />
                  <div className="percent">{`${percentage(votes, totalVotes)}%`}</div>
                </div>
              ))
            }
        </Card.Body>
    </Card>
  )
}

export default PollCard;
