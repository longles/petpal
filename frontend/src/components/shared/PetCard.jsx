import React, { useState, useEffect, useCallback } from 'react';
import { petAPIService } from '../../services/petAPIService';
import PetDetailsModal from './PetDetailsModal';
import ApplicationModal from './ApplicationModal';
import PetUpdateModal, { getUpdateModalId } from './PetUpdateModal';

const PetCard = ({ manageFlag = false, petId, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [petDetails, setPetDetails] = useState(data);

    const fetchPetDetail = useCallback(async () => {
        try {
            const petAPI = petAPIService();
            const response = await petAPI.getPetDetail(petId);
            if (response.success) {
                setPetDetails(response.data);
            }
        } catch (error) {
            console.error(`Error fetching pet detail for ID ${petId}:`, error);
        }
    }, [petId]);

  useEffect(() => {
    if (petId) {
      fetchPetDetail();
    }
  }, [fetchPetDetail]);

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
        setIsModalOpen(false);
        setIsApplicationModalOpen(true);
    };

    const closeApplicationModal = () => {
        setIsApplicationModalOpen(false);
        setIsModalOpen(true);
    };

    const photo = petDetails.photo === null ? '/assets/images/select_image.png' : petDetails.photo;
    return (
        <div className="col-md-4 mb-4 d-flex align-items-stretch">
          <div className="card listing-box" style={{ width: '100%' }}>
            <div className="img-container" style={{ height: '200px', overflow: 'hidden' }}>
              <img src={photo} className="card-img-top" alt={petDetails.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="card-body">
              <h4 className="card-title">{petDetails.name}</h4>
              <p className="card-text">{petDetails.comments}</p>
                <div className="mt-auto">
                    {!manageFlag && (
                        <>
                            <button className="btn btn-primary" onClick={openModal}>
                                Details
                            </button>
                            {isModalOpen && (
                                <PetDetailsModal
                                    petId={petId}
                                    closeModal={closeModal}
                                    openApplicationModal={openApplicationModal}
                                />
                            )}
                        </>
                    )}
                    {manageFlag && (
                        <>
                            <button className="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target={"#" + getUpdateModalId(petId)}>Edit</button>
                            <PetUpdateModal petId={petId} />
                        </>
                    )}
                </div>
            </div>
        </div>
        {isApplicationModalOpen && (
            <ApplicationModal
                show={isApplicationModalOpen}
                closeModal={closeApplicationModal}
                petId={petId}
                formId={petDetails.form}
                shelterId={petDetails.shelter}
            />
        )}
    </div>
    );
};

export default PetCard;
