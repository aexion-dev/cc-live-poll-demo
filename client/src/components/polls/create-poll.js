import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/user/user.selectors';
import { selectPolls } from '../../redux/session/session.selectors';
import { sendPollMessage } from '../../redux/session/session.actions';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';

const CreatePoll = ({ user, polls, sendPollMessage, showForm, toggleForm }) => {
  const [formValues, setFormValues] = useState({
    question: "",
    options: []
  });
  const { socket } = user;

  const handleChange = (event) => {
    setFormValues({...formValues, question: event.target.value});
  }

  const handleOptionChange = (event) => {
    setFormValues({
      ...formValues,
      options: {
        ...formValues.options,
        [event.target.id]: {
          content: event.target.value,
          votes: 0
        }
      }
    });
  }

  const addClick = () => {
    const test = { text:"blank", votes:0};
    setFormValues({
      ...formValues,
      options: {
        ...formValues.options,
        [Object.keys(formValues.options).length]: {
          content: "",
          votes: 0
        },
      }
    });
  }

  const removeClick = (idx) => {
    const options = {...formValues.options};
    delete options[idx];
    setFormValues({ ...formValues, options: options });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendPollMessage({
      ...formValues,
      senderId: socket,
      voteComplete: false
    });
    toggleForm();
    setFormValues({
      question: "",
      options: []
    });
  }

  return (
    <div className="new-poll-form d-flex flex-column align-items-center h-100 w-100">
      {
        showForm &&
          <Form onSubmit={handleSubmit} className="w-100 h-100">
            <Form.Group controlId="pollQuestion">
              <Form.Label>Question</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="Enter your question" onChange={handleChange}/>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Options</Form.Label>
                {
                  Object.keys(formValues.options).map((option, idx) => (
                    <Form.Group key={idx} controlId={idx}>
                      <InputGroup className="mt-4">
                        <Form.Control as="input" type="text" onChange={handleOptionChange} />
                          <InputGroup.Append>
                            <Button variant="dark" onClick={removeClick.bind(null, idx)}>-</Button>
                          </InputGroup.Append>
                      </InputGroup>
                    </Form.Group>
                  ))
                }
              </Form.Group>
            </Form.Row>
            <Button size="sm" variant="light" onClick={addClick}>Add Option</Button>
            <Form.Row className="mt-5">
              <ButtonGroup as={Col}>
                <Button className="mx-3 rounded-lg" variant="primary" type="submit">
                  Create Poll
                </Button>
                <Button onClick={() => toggleForm()} className="mx-3 rounded-lg">
                  Cancel
                </Button>
              </ButtonGroup>
            </Form.Row>
          </Form>
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  polls: selectPolls,
  user: selectUser
});

const mapDispatchToProps = (dispatch) => ({
  sendPollMessage: (msg) => dispatch(sendPollMessage(msg))
});


export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
