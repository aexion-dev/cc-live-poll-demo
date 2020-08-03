import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/user/user.selectors';
import { withRouter } from 'react-router-dom';
import { loadSessionList, subscribeToSessionList } from '../../socket.utils';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import CustomForm from '../custom-form/custom-form';
import Button from 'react-bootstrap/button';
import './select-mode.scss';

const streams = [
  {
    id: "A",
    name: "Gravity Falls",
    speaker: "John",
    speakerId: "ABCDE"
  },
  {
    id: "B",
    name: "Fun Games",
    speaker: "Bill",
    speakerId: "FGHIJK"
  },
  {
    id: "C",
    name: "Magic Show",
    speaker: "Henry",
    speakerId: "LMNOP"
  }
];

const SelectMode = ({ user, history, match }) => {
  const [sessions, setSessions] = useState([]);

  //Load Room's Chat History
  useEffect(() => {
    loadSessionList((err, data) => {
      if(err || !data)
        return;

      setSessions(data);
    })
  }, [])

  useEffect(() => {
    subscribeToSessionList((err, data) => {
      if(err)
        return;

      setSessions(sessionList => [data, ...sessionList]);
    });
  })

  const handleCreateSession = (formData) => {
    //Send User To Link
    const { name } = formData;
    console.log(user);
    history.push(`${match.url}/${user.socket}`);
  }

  const handleJoinSession = () => {

  }

  return (
    <div className="select-mode d-flex align-items-center h-100">
      <Container className="mb-5">
        <Row>
          <Col xs={12} lg={6} className="py-5 d-flex flex-column align-items-center">
            <h2 className="text-center mb-5">Create New Livestream</h2>
            <div className="w-75 px-5">
              <CustomForm
                formData={[
                {
                  name: "name",
                  label: "Enter Session Topic",
                  placeholder: "Health Benefits",
                  required: true
                }
              ]}
              buttonText={"Create Session"}
              onHandleSubmit={handleCreateSession} />
            </div>
          </Col>
          <Col xs={12} lg={6} className="py-5">
            <h2 className="text-center">Active Sessions</h2>
            <Row className="px-5 mt-5 d-flex justify-content-center">
              <Table responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Topic</th>
                    <th>Speaker</th>
                    <th>Connect</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    streams.map((stream, idx) => (
                      <tr key={idx}>
                        <td>{stream.id}</td>
                        <td>{stream.name}</td>
                        <td>{stream.speaker}</td>
                        <td>
                          <Button size="sm" className="px-4">Join</Button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectUser
});

export default withRouter(connect(mapStateToProps)(SelectMode));
