import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PetCreationModal from '../shared/PetCreationModal';

import '../../styles/shelterdetail.scoped.css';
import '../../styles/listings.scoped.css';
import PetListingsPage from '../listing/listings';

function ShelterManagement() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (localStorage.user_type !== "petshelter") {
        navigate("/404")
    }
    const openModal = () => {
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };
    let petId = 11;

  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>
        New Pet
      </button>
      {isModalOpen && (
        <PetCreationModal
          petId={petId}
          closeModal={closeModal}
        />
      )}
      <PetListingsPage manageFlag={true} defaultFilters={{shelter: localStorage.user_id}}/>
    </div>
  );
}

export default ShelterManagement;