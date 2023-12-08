import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PetCreationModal from '../shared/PetCreationModal';

import '../../styles/shelterdetail.scoped.css';
import '../../styles/listings.scoped.css';
import PetListingsPage from '../listing/listings';

function ShelterManagement() {
    const navigate = useNavigate()
    if (localStorage.user_type !== "petshelter") {
      navigate("/404")
    }
    
  return (
    <div>
      <PetListingsPage manageFlag={true} defaultFilters={{shelter: localStorage.user_object_id}}/>
    </div>
  );
}

export default ShelterManagement;