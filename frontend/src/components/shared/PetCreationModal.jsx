import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import { petAPIService } from '../../services/petAPIService';
import { applicationFormAPIService } from '../../services/applicationFormAPIService';
import ColourOptions from './ColorOptions';
import { useState, useEffect } from 'react';
import SelectApplicationFormModal from './SelectApplicationFormModal';
import ApplicationModal from './ApplicationModal';
import BreedsOptions from './BreedsOptions';

const petCreationSchema = yup.object({
  name: yup.string().required('Name is required'),
  breed: yup.number().required('Breed is required'),
  species: yup.number().required('Species is required'),
  sex: yup.number().required('Gender is required'),
  birth_date: yup.date().required('Date of Birth is required'),
  size: yup.number().required('Size is required'),
  weight: yup.number().required('Weight is required'),
  colour: yup.number().required('Color is required'),
  // location: yup.string().required('Location is required'),
  medical_history: yup.string().required('Medical History is required'),
  behaviour: yup.string().required('Behaviour is required'),
  special_needs: yup.string().required('Special Needs is required'),
  comments: yup.string().required('Comments are required'),
  form: yup.number().required('Form is required'),
}).required();

function PetCreationModal({ showModal, setShowModal }) {
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [selectedFormName, setSelectedFormName] = useState('');
  const [applicationForms, setApplicationForms] = useState([]);
  const appFormAPI = applicationFormAPIService();
  const petAPI = petAPIService();
  const [showSelectAppFormModal, setShowSelectAppFormModal] = useState(false);

  const closeModal = () => {setShowModal(false)}

  const openAppFormModal = () => {
    setShowSelectAppFormModal(true)
    closeModal()
  }
  const closeAppFormModal = () => {
    setShowSelectAppFormModal(false)
    setShowModal(true)
  }

  const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm({
    resolver: yupResolver(petCreationSchema)
  });

  const handleSelectForm = (formId, formName) => {
    setSelectedFormId(formId);
    setSelectedFormName(formName);
    setValue('form', formId); // This sets the value of 'form' field
    setShowModal(true)
    setShowSelectAppFormModal(false); // Close the selection modal
  };

  useEffect(() => {
    const fetchApplicationForms = async () => {
      const response = await appFormAPI.getApplicationFormList(1); // assuming page 1 for demo
      if (response.success) {
        setApplicationForms(response.data.results); // Update this line
        console.log(response.data.results); // Log the correct data
      } else {
        // Handle error
        console.error('Failed to fetch application forms:', response.message);
      }
    };

    fetchApplicationForms();
  }, []);

  const onSubmit = async (data) => {
    
    // Trigger validation for 'form' field
    const formattedData = {
      ...data,
      photo: data.photo[0],
      breed: parseInt(data.breed, 10),
      size: parseInt(data.size, 10),
      colour: parseInt(data.colour, 10),
      birth_date: formatDate(data.birth_date)
      // Add other fields that need conversion here
    };
  
    console.log(formattedData);

    let formdata = new FormData()

    for (const [key, value] of Object.entries(formattedData)) {
      console.log(key)
      formdata.append(key, value)
    }

    const response = await petAPI.createPet(formdata);
    if (response.success) {
      console.log('create successful');
      closeModal();
      window.location.reload(); //delete this if we do not want a refresh
    } else {
      console.log('create failed');
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
    <Modal show={showModal} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Pet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="photo" className="form-label">Photo</label>
            <input className="form-control" type="file" id="photo" {...register('photo')}/>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input className="form-control" id="name" {...register('name')} />
            {errors.name && <div className="error-notif">{errors.name.message}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="breed" className="form-label">Breed</label>
            <select className="form-select" id="breed" {...register('breed')} >
              <BreedsOptions/>
              </select>
              {errors.breed && <div className="error-notif">{errors.breed.message}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="species" className="form-label">Species</label>
            <select className="form-select" id="breed" {...register('species')} >
              <option value="0">Select...</option>
              <option value="1">Dog</option>
              <option value="2">Cat</option>
              <option value="3">Bird</option>
              </select>
              {errors.species && <div className="error-notif">{errors.species.message}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="sex" className="form-label">Sex</label>
            <select className="form-select" id="sex" {...register('sex')}>
              <option value="0">Unknown</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
            {errors.sex && <div className="error-notif">{errors.sex.message}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">Date of Birth</label>
            <input className="form-control" id="dob" type="date" {...register('birth_date')} />
            {errors.birth_date && <div className="error-notif">{errors.birth_date.message}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="size" className="form-label">Size</label>
            <select className="form-select" id="size" {...register('size')} >
              <option value="1">Large</option>
              <option value="2">Medium</option>
              <option value="3">Small</option>
            </select>
            {errors.size && <div className="error-notif">{errors.size.message}</div>}

          </div>
          <div className="mb-3">
            <label htmlFor="weight" className="form-label">Weight</label>
            <input className="form-control" id="weight" {...register('weight')} />
            {errors.weight && <div className="error-notif">{errors.weight.message}</div>}

          </div>
          <div className="mb-3">
            <label htmlFor="color" className="form-label">Colour</label>
            <select className="form-select" id="color" {...register('colour')} >
            <ColourOptions/>
            </select>
            {errors.colour && <div className="error-notif">{errors.colour.message}</div>}

          </div>
          {/* <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input className="form-control" id="location" {...register('location')} />
            {errors.location && <div className="error-notif">{errors.location.message}</div>}

          </div> */}
          <div className="mb-3">
            <label htmlFor="medical_history" className="form-label">Medical History</label>
            <textarea className="form-control" id="medical_history" {...register('medical_history')}></textarea>
            {errors.medical_history && <div className="error-notif">{errors.medical_history.message}</div>}

          </div>
          <div className="mb-3">
            <label htmlFor="behaviour" className="form-label">Behaviour</label>
            <textarea className="form-control" id="behaviour" {...register('behaviour')}></textarea>
            {errors.behaviour && <div className="error-notif">{errors.behaviour.message}</div>}

          </div>
          <div className="mb-3">
            <label htmlFor="special_needs" className="form-label">Special Needs</label>
            <textarea className="form-control" id="special_needs" {...register('special_needs')}></textarea>
            {errors.special_needs && <div className="error-notif">{errors.special_needs.message}</div>}

          </div>

          <div className="mb-3">
            <label htmlFor="comments" className="form-label">Comments</label>
            <textarea className="form-control" id="comments" {...register('comments')}></textarea>
            {errors.comments && <div className="error-notif">{errors.comments.message}</div>}

          </div>
          <Button variant="primary" onClick={openAppFormModal}>
          Select Application Form
        </Button>
        {selectedFormName && <span> Selected Form: {selectedFormName}</span>}
        {errors.form && <div className="error-notif">{errors.form.message}</div>}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
        <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>Create Pet</Button>
      </Modal.Footer>
    </Modal>
      <SelectApplicationFormModal
          show={showSelectAppFormModal}
          onHide={closeAppFormModal}
          forms={applicationForms}
          onSelectForm={handleSelectForm}
        />
      </>
  );
}
export default PetCreationModal;
