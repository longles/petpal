import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button } from 'react-bootstrap';

function PetCreationModal({ closeModal }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle the form submission
    console.log(data);
  };

  return (
    <Modal show={true} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Pet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input className="form-control" id="name" {...register('name')} />
          </div>
          {/* Add more fields as needed */}
          <div className="mb-3">
            <label htmlFor="breed" className="form-label">Breed</label>
            <input className="form-control" id="breed" {...register('breed')} />
          </div>
          {/* add application form here */}
          <div className="mb-3">
            <label htmlFor="breed" className="form-label">Breed</label>
            <input className="form-control" id="breed" {...register('breed')} />
          </div>
          {/* ... other fields ... */}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
        <Button variant="primary" onClick={handleSubmit(onSubmit)}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PetCreationModal;
