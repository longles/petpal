import React from 'react';

const getDetailsModalId = (petId) => {
  return `petDetailsModal${petId}`;
}

function PetDetailsModal({ petId }) {
  const modalId = getDetailsModalId(petId);
  let petName = "TestPet" //should get from api call
  let image = '../../assets/images/sample_pet_image_1.jpg'
  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-scrollable custom-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id={`${modalId}Label`}>{petName}</h3>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <img src={image} alt={`Pet: ${petName}`} className="img-fluid" />
            {/* Add pet details content here */}
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#applicationModal${petId}`}>
              Adopt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default PetDetailsModal;
export {getDetailsModalId};