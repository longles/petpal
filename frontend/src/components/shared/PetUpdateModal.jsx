import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { petAPIService } from '../../services/petAPIService';
import { shelterAPIService } from '../../services/userAPIService';
import ColourOptions from './ColorOptions';

export function getUpdateModalId(petId) {
  return `petUpdateModal${petId}`;
}

function PetUpdateModal({ petId }) {
  const petAPI = petAPIService();
  const shelterAPI = shelterAPIService();
  const [petDetails, setPetDetails] = useState(null);
  const [shelterDetails, setShelterDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const modalId = getUpdateModalId(petId);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [formInitialized, setFormInitialized] = useState(false);

  const fetchPetDetail = async () => {
    try {
      const response = await petAPI.getPetDetail(petId);
      if (response.success) {
        setPetDetails(response.data);
        return response.data.shelter;
      }
    } catch (error) {
      console.error(`Error fetching pet detail for ID ${petId}:`, error);
    }
  };

  const fetchShelterDetail = async (shelterId) => {
    try {
      const response = await shelterAPI.getShelterDetail(shelterId);
      if (response.success) {
        setShelterDetails(response.data);
      }
    } catch (error) {
      console.error(`Error fetching shelter detail for ID ${shelterId}:`, error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const shelterId = await fetchPetDetail();
      if (shelterId) {
        await fetchShelterDetail(shelterId);
      }
      setLoading(false);
    };
    fetchData();
  }, [petId]);

  useEffect(() => {
    if (petDetails) {
      reset(petDetails);
      setFormInitialized(true);
    }
  }, [petDetails, reset]);

  const onSubmit = async (data) => {
    console.log(data);
    const response = await petAPI.updatePet(petId, data);
    if (response.success) {
      console.log('Update successful');
    } else {
      console.log('Update failed');
    }
  };

  if (loading || !petDetails || !shelterDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-scrollable custom-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id={`${modalId}Label`}>Update {petDetails.name}</h3>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)} id="petUpdateForm" className="mx-2 px-md-5">
                <div className="my-1">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input className="form-control" id="name" {...register('name')} />
                </div>
                <div className="my-1">
                    <label className="form-label" htmlFor="breed">Breed</label>
                    <input className="form-control" id="breed" {...register('breed')} />
                </div>
                <div className="my-1">
                    <label className="form-label" htmlFor="gender">Gender</label>
                    <select className="form-select" id="gender" {...register('gender')}>
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    </select>
                </div>
                <div className="my-1">
                    <label className="form-label" htmlFor="dob">Date of Birth</label>
                    <input className="form-control" id="dob" type="date" {...register('birth_date')} />
                </div>
                <div className="my-1">
                    <label className="form-label" htmlFor="size">Size</label>
                    <select className="form-select" id="size" {...register('size')} >
                      <option value="1">Large</option>
                      <option value="2">Medium</option>
                      <option value="3">Small</option>
                    </select>
                </div>
                <div className="my-1">
                    <label className="form-label" htmlFor="color">Color</label>
                    <select className="form-select" id="color" {...register('colour')} >
                      <ColourOptions/>
                    </select>
                </div>
                <div className="my-2">
                    <label htmlFor="weight">Weight</label>
                    <textarea className="form-control" id="weight" {...register('weight')}></textarea>
                </div>
                <div className="my-2">
                    <label htmlFor="location">Location</label>
                    <input className="form-control" id="location" {...register('location')} />
                </div>
                <div className="my-2">
                    <label htmlFor="medical_history">Medical History</label>
                    <textarea className="form-control" id="medical_history" {...register('medical_history')}></textarea>
                </div>
                <div className="my-2">
                    <label htmlFor="behaviour">Behaviour</label>
                    <textarea className="form-control" id="behaviour" {...register('behaviour')}></textarea>
                </div>
                <div className="my-2">
                    <label htmlFor="special_needs">Special Needs</label>
                    <textarea className="form-control" id="special_needs" {...register('special_needs')}></textarea>
                </div>
                <div className="my-2">
                    <label htmlFor="comments">Comments</label>
                    <textarea className="form-control" id="comments" {...register('comments')}></textarea>
                </div>
                <div className="my-2 d-flex justify-content-center">
                    <div className="col-3">
                    <button type="submit" className="form-control btn btn-primary">Update</button>
                    </div>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetUpdateModal;
