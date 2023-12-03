import React, { useState } from 'react';
import PetDetailsModal from './PetDetailsModal';
import ApplicationModal from './ApplicationModal';

const PetCard = ({ name, photo, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

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
        <img src={photo} className="card-img-top" alt={name} />
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{description}</p>
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
