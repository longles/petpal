import React, { useState, useEffect } from 'react';
import PetCard from '../shared/PetCard';
import SideBarFilter from './SideBarFilter';
import {petAPIService} from '../../services/petAPIService'
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';


const PetListingsPage = ({manageFlag = false, defaultFilters = {}}) => {
  const [petIDs, setPetIDs] = useState([]);
  const petAPI = petAPIService();

  const filterValueMap = {
    status: {
      adopted: 1,
      available: 2,
    },
    sex: {
      unknown: 0,
      male: 1,
      female: 2,
    },
    size: {
      large: 1,
      medium: 2,
      small: 3,
    },
    colour: {
      unknown: 0,
      yellow: 1,
      black: 2,
      white: 3,
      brown: 4,
      grey: 5,
      red: 6,
      blue: 7,
      green: 8,
    },
    species: {
      unknown: 0,
      dog: 1,
      cat: 2,
      bird: 3,
    },
    breed: {
      unknown: '0',
      ragdoll: '1',
      labrador: '2',
      parrot: '3',
    },
  };

  const [selectedFilters, setSelectedFilters] = useState({
    status: 'Any',
    breed: 'Any',
    size: 'Any',
    colour: 'Any',
    sex: 'Any',
  });

    const updateFilters = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const fetchPetList = useCallback(async () => {
    try {
      // Construct filters based on selected options
      const filters = defaultFilters;

      for (const key in selectedFilters) {
        if (selectedFilters[key] !== 'Any') {
          const selectedValue = selectedFilters[key].toLowerCase();
          filters[key] = filterValueMap[key][selectedValue];
        }
      }

      const page = 1;
      console.log(filters)
      const response = await petAPI.getPetList(filters, page);
      if (response.success) {
        setPetIDs(response.data.results.map((pet) => pet.id));
      }
    } catch (error) {
      console.error('Error fetching pet list:', error);
    }
  }, [petAPI, selectedFilters]);

  useEffect(() => {
    fetchPetList();
  }, [selectedFilters]);

    //testing data
    let pho = '/assets/images/sample_pet_image_1.jpg'
    let desc = 'Buddy is a friendly Golden Retriever looking for a loving home.'
    return (
      <div>
      <div className="container main-content">
        <h2 className="mb-4">{manageFlag ? "Our Pets" : "Adoption Listings" }</h2>
        <div className="row">
        <SideBarFilter manageFlag={manageFlag} updateFilters={updateFilters} selectedFilters={selectedFilters} />
          
          {/* Pet Listings */}
          <div className="col-md-9">
            <div className="row no-gutters">
              {/* petcard */}
              {petIDs.map((petID) => (
                <PetCard manageFlag={manageFlag} key={petID} petId={petID} />
                ))}
            </div>
          </div>
        </div>

        {/* Submit Application Modal */}
      </div>
    </div>

      

    );
  }
  

export default PetListingsPage;