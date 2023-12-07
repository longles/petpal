import React from 'react';
import { useState,useEffect } from 'react';
import { petAPIService } from '../../services/petAPIService';
import { shelterAPIService } from '../../services/userAPIService';


export function getUpdateModalId(petId) {
    return `petUpdateModal${petId}`;
  }

function PetUpdateModal({ petId }) {
    const [petDetails, setPetDetails] = useState(null);
    const modalId = getUpdateModalId(petId)

    const [shelterDetails, setShelterDetails] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const fetchPetDetail = async () => {
      try {
        const petAPI = petAPIService();
        const response = await petAPI.getPetDetail(petId);
        if (response.success) {
          setPetDetails(response.data);
          console.log("Fetched pet details:", response.data);
          return response.data.shelter;
        }
      } catch (error) {
        console.error(`Error fetching pet detail for ID ${petId}:, error`);
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
  
    useEffect(() => {
      const fetchData = async () => {
        const shelterId = await fetchPetDetail();
        if (shelterId) {
          await fetchShelterDetail(shelterId);
          setLoading(false);
        }
      };
      fetchData();
    }, [petId]);
  
    if (loading || !petDetails || !shelterDetails) {
      return <div>Loading...</div>;
    }
  
  function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const currentDate = new Date();
  
    const timeDifference = currentDate - birthDate;

    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
    const ageInYears = timeDifference / millisecondsInYear;
  
    const roundedAge = Math.round(ageInYears * 10) / 10;
  
    return roundedAge;
  }
    let breed = petDetails.breed
    let photo = petDetails.photo === null ? '/assets/images/sample_pet_image_2.jpg' : petDetails.photo;
    let age = calculateAge(petDetails.birth_date)
    let description = petDetails.comments
  
    let medicalHistory = petDetails.medical_history
    let specialRequirements = petDetails.special_needs
  
    //shelter info
    let shelterName = shelterDetails.shelter_name
    let shelterAddress = shelterDetails.shelter_name
    let petName = 'a'

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
                        <form id="petcreation" className="mx-2 px-md-5">
                            <div className="my-4">
                                <h1>Basic Information</h1>
                            </div>
                            <div className="d-flex flex-wrap">
                                <div className="col-12 col-md-6 d-flex justify-content-start">
                                    <div className="d-flex flex-column">
                                        <img src="./images/select_image.png" alt="Pet" />
                                        <label htmlFor="petphoto" className="my-2 btn btn-primary">Upload Photo</label>
                                        <input className="form-control d-none" id="petphoto" type="file" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex justify-content-end">
                                    <div className="d-flex flex-column w-75">
                                        <div className="my-1">
                                            <label className="form-label" htmlFor="name">Name</label>
                                            <input className="form-control" id="name" value="Buddy" />
                                        </div>
                                        <div className="my-1">
                                            <label className="form-label" htmlFor="breed">Breed</label>
                                            <input className="form-control" id="breed" value="Golden Retriever" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex justify-content-start">
                                    <div className="w-75 my-1">
                                        <label className="form-label" htmlFor="gender">Gender</label>
                                        <select className="form-select" id="gender">
                                            <option value="" disabled hidden>Select...</option>
                                            <option value="M" selected>Male</option>
                                            <option value="F">Female</option>
                                            <option value="O">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex justify-content-end">
                                    <div className="w-75 my-1">
                                        <label className="form-label" htmlFor="dob">Date of Birth</label>
                                        <input className="form-control" id="dob" type="date" value="2021-9-10" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex justify-content-start">
                                    <div className="w-75 my-1">
                                        <label className="form-label" htmlFor="size">Size</label>
                                        <input className="form-control" id="size" value="50cm" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 d-flex justify-content-end">
                                    <div className="w-75 my-1">
                                        <label className="form-label" htmlFor="color">Color</label>
                                        <input className="form-control" id="color" value="golden brown" />
                                    </div>
                                </div>
                            </div>
                            <div className="my-4">
                                <h1>Additional Information</h1>
                            </div>
                            <div className="my-2">
                                <label htmlFor="location">Location</label>
                                <input className="form-control" id="location" value="1234 Shelter Ave, Toronto ON" />
                            </div>
                            <div className="my-2">
                                <label htmlFor="medical_history">Medical History</label>
                                <textarea className="form-control" id="medical_history">Some comments...</textarea>
                            </div>
                            <div className="my-2">
                                <label htmlFor="behaviour">Behaviour</label>
                                <textarea className="form-control" id="behaviour">Some comments...</textarea>
                            </div>
                            <div className="my-2">
                                <label htmlFor="special_needs">Special Needs</label>
                                <textarea className="form-control" id="special_needs">Some special needs...</textarea>
                            </div>
                            <div className="my-2">
                                <label htmlFor="comments">Comments</label>
                                <textarea className="form-control" id="comments">Some comments...</textarea>
                            </div>
                            <div className="my-2 d-flex justify-content-center">
                                <div className="col-3">
                                    <input className="form-control btn btn-primary" type="submit" />
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
