import React, { useState, useEffect } from 'react';
import PetCard from '../shared/PetCard';
import SideBarFilter from './SideBarFilter';


  const PetListingsPage = () => {
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
              <PetCard name='Buddy' photo={pho} description={desc}/>
              <PetCard name='Buddy' photo={pho} description={desc}/>
              <PetCard name='Buddy' photo={pho} description={desc}/>

              {/* petcard end */}

            </div>
          </div>
        </div>

        {/* Submit Application Modal */}
      </div>
    </div>

      

    );
  }
  

export default PetListingsPage;