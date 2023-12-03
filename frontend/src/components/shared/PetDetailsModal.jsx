import React, { useState } from 'react';
import { Modal, Button, Nav } from 'react-bootstrap';
import '../../styles/listings.scoped.css';

// pet detail should get a pet id and fetch info from server
const PetDetailsModal = ({ closeModal, openApplicationModal }) => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
  };

  const handleAdoptClick = () => {
    openApplicationModal();
  };

  let breed = 'Golden Retriever'
  let photo = "../../assets/images/sample_pet_image_1.jpg"
  let age = '2'
  let description = "Buddy is a friendly Golden Retriever looking for a loving home."
  let shelterName = "Doggycares Inc."
  let shelterAddress = "1234 Shelter Ave, Toronto ON"
  let medicalHistory = "Up-to-date vaccinations, including rabies, distemper, and parvovirus. Recent heartworm test and prevention history."
  let neuterStatus = "No"
  let specialRequirements = "Applicant must have a secure fenced yard with a minimum height of 6-foot."

  return (
    <Modal show={true} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Pet Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className='custom-modal'>
        <img src={photo} alt="Pet" className="img-fluid" />
        <span className="badge bg-success">Available for Adoption</span>

        <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabChange}>
          <Nav.Item>
            <Nav.Link eventKey="tab1">Information</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tab2">Medical History</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tab3">Special Requirements</Nav.Link>
          </Nav.Item>
        </Nav>

        <div className="tab-content">
          <div className={`tab-pane ${activeTab === 'tab1' ? 'active' : ''}`} id="tab1">
            <p>Breed: {breed}</p>
            <p>Age: {age} years</p>
            <p>{description}</p>
            <hr />
            <h5><a href="shelterdetail.html">{shelterName}</a></h5>
            <p>{shelterAddress}</p>
          </div>
          <div className={`tab-pane ${activeTab === 'tab2' ? 'active' : ''}`} id="tab2">
            {medicalHistory}
            <hr />
            <p>Neutered/Spayed: {neuterStatus}</p>
            <p></p>

          </div>
          <div className={`tab-pane ${activeTab === 'tab3' ? 'active' : ''}`} id="tab3">
            <p>{specialRequirements}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => openApplicationModal()}>
          Adopt
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PetDetailsModal;
