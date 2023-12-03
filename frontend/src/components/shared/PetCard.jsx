import React, { useState, useEffect } from 'react';
import { petAPIService } from '../../services/petAPIService';
import PetDetailsModal from './PetDetailsModal';
import ApplicationModal from './ApplicationModal';

// PetCard should take in a petid and fetch info from the server
const PetCard = ({ petId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [petDetails, setPetDetails] = useState(null);

  const fetchPetDetail = async () => {
    try {
      const petAPI = petAPIService();
      const response = await petAPI.getPetDetail(petId);
      if (response.success) {
        setPetDetails(response.data);
      }
    } catch (error) {
      console.error(`Error fetching pet detail for ID ${petId}:`, error);
    }
  };

  useEffect(() => {
    fetchPetDetail();
  }, [petId]);

  if (!petDetails) {
    return <div>Loading...</div>;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openApplicationModal = () => {
    setIsApplicationModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
  };

  return (
    <div className="col-md-4 mb-4 d-flex align-items-stretch">
      <div className="card listing-box">
        <img src={petDetails.photo} className="card-img-top" alt={petDetails.name} />
        <div className="card-body">
          <h4 className="card-title">{petDetails.name}</h4>
          <p className="card-text">{petDetails.comments}</p>
          <div>
            <button className="btn btn-primary" onClick={openModal}>
              Details
            </button>
            {isModalOpen && (
              <PetDetailsModal
                closeModal={closeModal}
                openApplicationModal={openApplicationModal}
              />
            )}
          </div>
        </div>
      </div>
      {isApplicationModalOpen && (
        <ApplicationModal
          show={isApplicationModalOpen}
          closeModal={closeApplicationModal}
        />
      )}
    </div>
  );
};

export default PetCard;
