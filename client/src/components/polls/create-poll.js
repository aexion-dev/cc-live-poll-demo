import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';

const CreatePoll = () => {
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    question: "",
    options: ["", ""]
  });

  const handleChange = (event) => {
    setFormValues({...formValues, question: event.target.value});
  }

  const handleOptionChange = (event) => {
    setFormValues({
      ...formValues,
      options: {
        ...formValues.options,
        [event.target.id]: event.target.value
      }
    });
  }

  const addClick = () => {
    setFormValues({
      ...formValues,
      options: {
        ...formValues.options,
        [Object.keys(formValues.options).length]: ""
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
    console.log(formValues);
  }

  return (
    <div className="new-poll-form d-flex flex-column align-items-center h-100 w-100">
      {
        !showForm &&
        <Button
          onClick={() => setShowForm(!showForm)}
          className="toggle-form m-2 w-50">New Poll</Button>
      }
      {
        showForm &&
          <Form onSubmit={handleSubmit} className="w-100 h-100">
            <Form.Group controlId="pollQuestion">
              <Form.Label>Question</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="Enter your question" onChange={handleChange}/>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="pollOptions">
                <Form.Label>Options</Form.Label>
                {
                  Object.keys(formValues.options).map((option, idx) => (
                    <InputGroup key={idx} className="mt-4">
                      <Form.Control type="text" onChange={handleOptionChange} />
                      {idx > 1 &&
                        <InputGroup.Append>
                          <Button variant="dark" onClick={removeClick.bind(null, idx)}>-</Button>
                        </InputGroup.Append>
                      }
                    </InputGroup>
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
                <Button onClick={() => setShowForm(!showForm)} className="mx-3 rounded-lg">
                  Cancel
                </Button>
              </ButtonGroup>
            </Form.Row>
          </Form>
      }
    </div>
  )
}

export default CreatePoll;
