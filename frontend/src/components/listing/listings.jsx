import React, { useState, useEffect } from 'react';
import PetCard from '../shared/PetCard';
import PetDetailsModal from '../shared/PetDetailsModal';
import SideBarFilter from './SideBarFilter';

const petData = [
    {name: 'Buddy', image: '../../assets/images/sample_pet_image_1'},
    {name: 'Whiskers', image:'../../assets/images/sample_pet_image_2' },
    {name: 'Rocky',image:'../../assets/images/sample_pet_image_3' },
  ];

  const PetListingsPage = () => {
    return (
    //   <div>
    //     {/* Include your navigation bar here */}
  
    //     <div className="container main-content">
    //       <h2 className="mb-4">Adoption Listings</h2>
    //       <div className="row">
    //         {/* Include the sidebar filter component */}
    //         <SideBarFilter />
  
    //         {/* Pet Listings */}
    //         <div className="col-md-9">
    //           <div className="row no-gutters">
    //             {/* Mapping over petData and rendering PetCard for each pet */}
    //             {petData.map((pet, index) => (
    //               <PetCard
    //                 key={index}
    //                 name={pet.name}
    //                 image={pet.image}
    //                 description={pet.description}
    //               />
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
  
    //     {/* Include your PetDetailsModal or any other modals here */}
    //   </div>
    <div>
        hello world
    </div>
    );
  }
  

export default PetListingsPage;