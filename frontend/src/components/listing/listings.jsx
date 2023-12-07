import React, { useState, useEffect, useCallback } from 'react';
import PetCard from '../shared/PetCard';
import SideBarFilter from './SideBarFilter';
import { petAPIService } from '../../services/petAPIService';

const PetListingsPage = ({ manageFlag = false, defaultFilters = {} }) => {
  const [petIDs, setPetIDs] = useState([]);
  const petAPI = petAPIService();

  const updateFilters = useCallback((newFilters) => {
    fetchPetList(newFilters);
  }, []);

  const fetchPetList = useCallback(async (filters = {}) => {
    try {
      const page = 1;
      const response = await petAPI.getPetList(filters, page);
      if (response.success) {
        setPetIDs(response.data.results.map((pet) => pet.id));
      }
    } catch (error) {
      console.error('Error fetching pet list:', error);
    }
  }, [petAPI]);

  useEffect(() => {
    fetchPetList(defaultFilters);
  }, []);

  return (
    <div>
      <div className="container main-content">
        <h2 className="mb-4">{manageFlag ? "Our Pets" : "Adoption Listings"}</h2>
        <div className="row">
          <SideBarFilter updateFilters={updateFilters} />
          <div className="col-md-9">
            <div className="row no-gutters">
              {petIDs.map((petID) => (
                <PetCard manageFlag={manageFlag} key={petID} petId={petID} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetListingsPage;
