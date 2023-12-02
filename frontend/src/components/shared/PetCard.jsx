import React from 'react';

const PetCard = ({ name, image, description }) => {
  return (
    <div className="col-md-4 mb-4 d-flex align-items-stretch">
      <div className="card listing-box">
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{description}</p>
          {/* <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#petDetailsModal${id}`}>
            Details
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PetCard;

// import React from 'react';
// import PetDetailsModal, {getDetailsModalId} from './PetDetailsModal';
// import samplePetImage from '../../assets/images/sample_pet_image_1.jpg';

// function PetCard({ petId }) {
//   let detailsModalTarget = getDetailsModalId(petId)
//   let name="Buddy" 
//   // let image='../../assets/images/sample_pet_image_1.jpg'
//   return (
//     <div className="col-12 col-sm-4 px-2 px-xl-4 py-2 py-sm-0">
//       <div className="card">
//         <img src={samplePetImage} className="card-img-top" alt={`Pet: ${name}`} />
//         <div className="card-body">
//           <div className="d-flex align-items-center">
//             <h5 className="card-title me-2">{name}</h5>
//           </div>
//           <div className="d-flex flex-wrap">
//             <div className="col-12 col-xxl-6 pe-xxl-2 mb-2 mb-xxl-0">
//               <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${detailsModalTarget}`}>
//                 Details
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <PetDetailsModal petId={petId} petName={name} image={samplePetImage}/>
//     </div>
//   );
// }

// export default PetCard;
