import React from 'react';
import { useState,useEffect } from 'react';
import { petAPIService } from '../../services/petAPIService';
import { shelterAPIService } from '../../services/userAPIService';
import { statusOptions } from './filterMappings';
import  {useForm} from 'react-hook-form'


export function getUpdateModalId(petId) {
    return `petUpdateModal${petId}`;
  }

function PetUpdateModal({ petId }) {
    const petAPI = petAPIService();
    const [petDetails, setPetDetails] = useState(null);
    const modalId = getUpdateModalId(petId)
    const [shelterDetails, setShelterDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
    const fetchPetDetail = async () => {
        try {
          const response = await petAPI.getPetDetail(petId);
          if (response.success) {
            setPetDetails(response.data);
            setFormData(response.data); // Update formData here
            return response.data.shelter; // Return shelterId
          } else {
            //
          }
        } catch (error) {
          console.error(`Error fetching pet detail for ID ${petId}:`, error);
        }
      };
  
    const fetchShelterDetail = async (shelterId) => {
      try {
        const shelterAPI = shelterAPIService();
        const response = await shelterAPI.getShelterDetail(shelterId);
        if (response.success) {
          setShelterDetails(response.data);
          console.log("Fetched shelter details:", response.data);
        }
      } catch (error) {
        console.error(`Error fetching shelter detail for ID ${shelterId}:`, error);
      }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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

    if (loading || !petDetails || !shelterDetails) {
    return <div>Loading...</div>;
    }
  

    let photo = petDetails.photo === null ? '/assets/images/sample_pet_image_2.jpg' : petDetails.photo;

  
    let medicalHistory = petDetails.medical_history

  
    //shelter info

    let petName = petDetails.name

    let behaviour = petDetails.behaviour

      const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await petAPI.updatePet(petId, formData);
        if (response.success) {
          console.log('Update successful');
        } else {
          console.log('Update failed');
        }
      };
    return (
        <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable custom-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id={`${modalId}Label`}>Update {petName}</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {/* Modal Body */}
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} id="petcreation" className="mx-2 px-md-5">
                            <div className="my-4">
                                <h1>Basic Information</h1>
                            </div>
                            <div className="d-flex flex-wrap">
                                <div className="col-12 col-md-6 d-flex justify-content-start">
                                    <div className="d-flex flex-column">
                                    {/* fix photo size */}
                                        <img src={photo} alt="Pet" style={{maxWidth: '300px', maxHeight: '300px'}}/>  
                                        <label htmlFor="petphoto" className="my-2 btn btn-primary">Upload Photo</label>
                                        <input className="form-control d-none" id="petphoto" type="file" onChange={handleInputChange}/>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex justify-content-end">
                                    <div className="d-flex flex-column w-75">
                                        <div className="my-1">
                                            <label className="form-label" htmlFor="name">Name</label>
                                            <input className="form-control" id="name" name="name" value={formData.name|| ''}
                                             onChange={handleInputChange} />
                                        </div>
                                        <div className="my-1">
                                            <label className="form-label" htmlFor="breed">Breed</label>
                                            <input className="form-control" id="breed" name='breed' value={formData.breed || ''} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex justify-content-start">
                                    <div className="w-75 my-1">
                                        <label className="form-label" htmlFor="gender">Gender</label>
                                        <select className="form-select" id="gender" value={petDetails.sex}>
                                            <option value="" disabled hidden>Select...</option>
                                            <option value="Male" selected>Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex justify-content-end">
                                    <div className="w-75 my-1">
                                        <label className="form-label" htmlFor="dob">Date of Birth</label>
                                        <input className="form-control" id="dob" type="date" name='birth_date'
                                         value={formData.birth_date || ''} onChange={handleInputChange}/>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex justify-content-start">
                                    <div className="w-75 my-1">
                                        <label className="form-label" htmlFor="size">Size</label>
                                        <input className="form-control" id="size" name="breed" value={formData.breed || ''} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex justify-content-end">
                                    <div className="w-75 my-1">
                                        <label className="form-label" htmlFor="color">Color</label>
                                        <input className="form-control" id="color" name="colour" value={formData.colour|| ''} />
                                    </div>
                                </div>
                            </div>
                            <div className="my-4">
                                <h1>Additional Information</h1>
                            </div>
                            <div className="my-2">
                                <label htmlFor="location">Location</label>
                                <input className="form-control" id="location" name="location"
                                 value={formData.location} onChange={handleInputChange} />
                            </div>
                            <div className="my-2">
                                <label htmlFor="medical_history">Medical History</label>
                                <textarea className="form-control" id="medical_history" name="medical_history"
                                 value={formData.medical_history|| ''} onChange={handleInputChange}>{medicalHistory}</textarea>
                            </div>
                            <div className="my-2">
                                <label htmlFor="behaviour">Behaviour</label>
                                <textarea className="form-control" id="behaviour" name="behaviour"
                                 value={formData.behaviour|| ''} onChange={handleInputChange}>{behaviour}</textarea>
                            </div>
                            <div className="my-2">
                                <label htmlFor="special_needs">Special Needs</label>
                                <textarea className="form-control" id="special_needs" name="special_needs"
                                 value={formData.special_needs|| ''}>specialRequirements</textarea>
                            </div>
                            <div className="my-2">
                                <label htmlFor="comments">Comments</label>
                                <textarea className="form-control" id="comments" name="comments"
                                value={formData.comments|| ''}>{petDetails.comments}</textarea>
                            </div>
                            <div className="my-2 d-flex justify-content-center">
                                <div className="col-3">
                                    <button className="form-control btn btn-primary" type="submit" />
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
