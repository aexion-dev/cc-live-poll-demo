import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createUserStart } from '../redux/user/user.actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/button';
import Form from 'react-bootstrap/Form';
import './home_page.scss';

const HomePage = ({ createUserStart, history, match }) => {
  const [formState, setFormState] = useState({
    name: ''
  });
  const [validated, setValidated] = useState(false);
  const { name } = formState;

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity() === true) {
      createUserStart(name);
      history.push(`${match.url}live`);
    }

    setValidated(true);
  }

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormState({...formState, [name]: value });
  }

  return (
    <div className="homepage d-flex align-items-center">
      <Container className="mb-5">
        <Row>
          <Col>
            <h1 className="text-center">Live Event Polling Demo</h1>
          </Col>
        </Row>
        <Row className="mt-5 d-flex justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Enter Your Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  aria-describedby="name"
                  placeholder="John Smith"
                  name='name'
                  value={name}
                  onChange={handleChange}/>
                  <Form.Control.Feedback type="invalid">
                    Please enter a display name.
                  </Form.Control.Feedback>
                  <Row className="px-5 mt-5 d-flex justify-content-center">
                    <Button type="submit" className="px-4">Start Demo</Button>
                  </Row>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  createUserStart: (name) => dispatch(createUserStart(name))
});

export default withRouter(connect(null, mapDispatchToProps)(HomePage));
