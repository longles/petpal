import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button } from 'react-bootstrap';
import { petAPIService } from '../../services/petAPIService';

function PetCreationModal({ closeModal }) {
  const petAPI = petAPIService();
  const { register, handleSubmit } = useForm();

  const onSubmit = async(data) => {
    const formattedData = {
      ...data,
      breed: parseInt(data.breed, 10),
      sex: data.sex === "Male" ? 1 : 2, // Assuming 1 for Male and 2 for Female
      size: parseInt(data.size, 10),
      colour: parseInt(data.colour, 10),
      // Add other fields that need conversion here
    };
  
    console.log(formattedData);
  
    const response = await petAPI.createPet(formattedData.name, formattedData);
    if (response.success) {
      console.log('create successful');
    } else {
      console.log('create failed');
    }
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
          <div className="mb-3">
            <label htmlFor="breed" className="form-label">Breed</label>
            <select className="form-select" id="breed" {...register('breed')} >
              <option value="0">Select...</option>
              <option value="1">Ragdoll</option>
              <option value="2">Labrador</option>
              <option value="3">Parrot</option>

              </select>
          </div>
          <div className="mb-3">
            <label htmlFor="sex" className="form-label">Gender</label>
            <select className="form-select" id="sex" {...register('sex')}>
              <option value="unknown">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">Date of Birth</label>
            <input className="form-control" id="dob" type="date" {...register('birth_date')} />
          </div>
          <div className="mb-3">
            <label htmlFor="size" className="form-label">Size</label>
            <input className="form-control" id="size" {...register('size')} />
          </div>
          <div className="mb-3">
            <label htmlFor="weight" className="form-label">Weight</label>
            <input className="form-control" id="weight" {...register('weight')} />
          </div>
          <div className="mb-3">
            <label htmlFor="color" className="form-label">Color</label>
            <select className="form-control" id="color" {...register('colour')} >
              <option value="0">Select...</option>
              <option value="1">Yellow</option>
              <option value="2">Black</option>
              <option value="3">White</option>
              <option value="4">Brown</option>
              <option value="5">Grey</option>
              <option value="6">Red</option>
              <option value="7">Blue</option>
              <option value="8">Green</option>

            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input className="form-control" id="location" {...register('location')} />
          </div>
          <div className="mb-3">
            <label htmlFor="medical_history" className="form-label">Medical History</label>
            <textarea className="form-control" id="medical_history" {...register('medical_history')}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="behaviour" className="form-label">Behaviour</label>
            <textarea className="form-control" id="behaviour" {...register('behaviour')}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="special_needs" className="form-label">Special Needs</label>
            <textarea className="form-control" id="special_needs" {...register('special_needs')}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="comments" className="form-label">Comments</label>
            <textarea className="form-control" id="comments" {...register('comments')}></textarea>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
        <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>Create Pet</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default PetCreationModal;
