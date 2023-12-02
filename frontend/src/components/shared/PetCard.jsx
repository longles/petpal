import React, { useState } from 'react';
import PetDetailsModal from './PetDetailsModal';

const PetCard = ({ name, photo, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            {isModalOpen && <PetDetailsModal closeModal={closeModal} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
