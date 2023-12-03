import React, { useState, useEffect } from 'react';
import PetCard from '../shared/PetCard';
import SideBarFilter from './SideBarFilter';
import {petAPIService} from '../../services/petAPIService'


  const PetListingsPage = () => {
    const [petIDs, setPetIDs] = useState([]);
    const petAPI = petAPIService();

    const fetchPetList = async()=>{
      try{
        const filters = {};
        const page = 1;
        const response = await petAPI.getPetList(filters, page);
        if (response.success){
          // petIDs is a list of fetched pet id
          const petIDs = response.data.results.map((pet) => pet.id);
          setPetIDs(response.data.results.map((pet) => pet.id));

          // console.log(petIDs);
        }
        const response2 = await petAPI.getPetDetail(2);

        // console.log(response);
        // console.log(response2);
      }catch (error) {
        console.error('Error fetching pet list:', error);
      }
      
    }

    useEffect(() => {
      fetchPetList();
    }, []);

    //testing data
    let pho = '/assets/images/sample_pet_image_1.jpg'
    let desc = 'Buddy is a friendly Golden Retriever looking for a loving home.'
    return (
      <div>
      <div className="container main-content">
        <h2 className="mb-4">Adoption Listings</h2>
        <div className="row">
          <SideBarFilter/>
          
          {/* Pet Listings */}
          <div className="col-md-9">
            <div className="row no-gutters">
              {/* petcard */}
              {petIDs.map((petID) => (
                <PetCard key={petID} petId={petID} />
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