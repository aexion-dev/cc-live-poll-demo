import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/button';

const HomePage = () => (
  <div className="homepage">
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center">Live Event Polling Demo</h1>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="d-flex justify-content-end">
          <Link to="/speaker">
            <Button>Speaker</Button>
          </Link>
        </Col>
        <Col className="d-flex justify-content-start">
          <Link to="/view">
            <Button>Attendee</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  </div>
)

export default HomePage;
