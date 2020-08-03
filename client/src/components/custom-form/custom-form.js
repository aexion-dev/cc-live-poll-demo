import React, { useState } from 'react';
import Button from 'react-bootstrap/button';
import Row from 'react-bootstrap/row';
import Form from 'react-bootstrap/Form';

const CustomForm = ({ formData, buttonText, onHandleSubmit }) => {
  const [formState, setFormState] = useState(formData);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity() === true) {
      onHandleSubmit(formState);
    }

    setValidated(true);
  }

  const handleChange = (event) => {
    const { value, name, id } = event.target;
    let curState = [...formState];
    curState[id] = ({...curState[id], [name]: value});
    setFormState(curState);
  }

  return (
    <div className="custom-form d-flex flex-column align-items-center">
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-100">
          {
            formData.map(({ name, label, required, placeholder}, idx) => (
              <Form.Group controlId={idx} key={idx}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  required={required}
                  type="text"
                  aria-describedby={name}
                  placeholder={placeholder}
                  name={name}
                  onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                  {`Please enter a ${name}`}
                </Form.Control.Feedback>
              </Form.Group>
            ))}
            <Row className="px-5 mt-5 d-flex justify-content-center">
              <Button type="submit" className="px-4">{buttonText}</Button>
            </Row>
      </Form>
    </div>
  )
}

export default CustomForm;
