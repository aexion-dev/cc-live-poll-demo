import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/button';
import Form from 'react-bootstrap/Form';
import './home_page.scss';

const HomePage = () => (
  <div className="homepage d-flex align-items-center">
    <Container className="mb-5">
      <Row>
        <Col>
          <h1 className="text-center">Live Event Polling Demo</h1>
        </Col>
      </Row>
      <Row className="mt-5 d-flex justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Your Name</Form.Label>
              <Form.Control
                type="input"
                aria-describedby="name"
                placeholder="John Smith" />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5 d-flex justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4} className="d-flex flex-row justify-content-center">
          <Link to="/speaker" className="px-4">
            <Button>Speaker</Button>
          </Link>
          <Link to="/view" className="px-4">
            <Button>Attendee</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  </div>
)

export default HomePage;
