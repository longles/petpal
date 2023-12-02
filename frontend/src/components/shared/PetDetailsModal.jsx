import React, { useState } from 'react';
import { Modal, Button, Nav } from 'react-bootstrap';

const PetDetailsModal = ({ closeModal }) => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
  };

  return (
    <Modal show={true} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Pet Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src="../../assets/images/sample_pet_image_1.jpg" alt="Pet Image" className="img-fluid" />
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
            <p>Breed: Golden Retriever</p>
            <p>Age: 2 years 3 months</p>
            <p>Buddy is a friendly Golden Retriever looking for a loving home.</p>
            <hr />
            <h5><a href="shelterdetail.html">Doggycares Inc.</a></h5>
            <p>1234 Shelter Ave, Toronto ON</p>
          </div>
          <div className={`tab-pane ${activeTab === 'tab2' ? 'active' : ''}`} id="tab2">
            <p>Up-to-date vaccinations, including rabies, distemper, and parvovirus.</p>
            <p>Recent heartworm test and prevention history.</p>
            <hr />
            <p>Neutered/Spayed: No</p>
          </div>
          <div className={`tab-pane ${activeTab === 'tab3' ? 'active' : ''}`} id="tab3">
            <p>Applicant must have a secure fenced yard with a minimum height of 6-foot.</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" data-bs-toggle="modal" data-bs-target="#applicationModal1">
          Adopt
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PetDetailsModal;