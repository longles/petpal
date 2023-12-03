import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const ApplicationModal = ({ closeModal, show }) => {
  return (
    <Modal show={show} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <h3 className="modal-title" id="adoptionFormModalLabel">Your Application</h3>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group controlId="peopleAtHome">
            <Form.Label>How many people live at home?</Form.Label>
            <Form.Control type="number" min="1" required />
          </Form.Group>

          <Form.Group controlId="reasonForAdoption">
            <Form.Label>Why do you want to adopt this pet?</Form.Label>
            <Form.Control as="textarea" rows={4} required />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Back
        </Button>
        <Button variant="primary" id="showAlert">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplicationModal;
