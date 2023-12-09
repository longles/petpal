import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SelectApplicationFormModal = ({ show, onHide, forms, onSelectForm }) => {
    return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select Application Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {forms.map(form => (
      <Button key={form.id} variant="link" onClick={() => onSelectForm(form.id, form.name)}>
            {form.name}
          </Button>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectApplicationFormModal;
