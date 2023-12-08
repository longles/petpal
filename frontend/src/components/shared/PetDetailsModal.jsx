import React, { useState, useEffect } from 'react';
import { Modal, Button, Nav } from 'react-bootstrap';
import '../../styles/listings.scoped.css';
import { petAPIService } from '../../services/petAPIService';
import { shelterAPIService } from '../../services/userAPIService';
import { Link } from 'react-router-dom';

// pet detail should get a pet id and fetch info from server
const PetDetailsModal = ({ petId, closeModal, openApplicationModal }) => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [petDetails, setPetDetails] = useState(null);
  const [shelterDetails, setShelterDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPetDetail = async () => {
    try {
      const petAPI = petAPIService();
      const response = await petAPI.getPetDetail(petId);
      if (response.success) {
        setPetDetails(response.data);
        console.log("Fetched pet details:", response.data);
        return response.data.shelter;
      }
    } catch (error) {
      console.error(`Error fetching pet detail for ID ${petId}:, error`);
    }
  };

  const fetchShelterDetail = async (shelterId) => {
    try {
      const shelterAPI = shelterAPIService();
      const response = await shelterAPI.getShelterDetail(shelterId);
      if (response.success) {
        setShelterDetails(response.data);
        console.log("Fetched shelter details:", response.data);
      }
    } catch (error) {
      console.error(`Error fetching shelter detail for ID ${shelterId}:`, error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const shelterId = await fetchPetDetail();
      if (shelterId) {
        await fetchShelterDetail(shelterId);
        setLoading(false);
      }
    };
    fetchData();
  }, [petId]);

  if (loading || !petDetails || !shelterDetails) {
    return <div>Loading...</div>;
  }


  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
  };

  const handleAdoptClick = () => {
    openApplicationModal();
  };

function calculateAge(birthDateString) {
  const birthDate = new Date(birthDateString);
  const currentDate = new Date();

  const timeDifference = currentDate - birthDate;

  // Calculate age in milliseconds, seconds, minutes, hours, and years
  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
  const ageInYears = timeDifference / millisecondsInYear;

  // Round the age to 1 decimal place
  const roundedAge = Math.round(ageInYears * 10) / 10;

  return roundedAge;
}
  let breed = petDetails.breed
  // set the default pic to sample pet image2 
  let photo = petDetails.photo === null ? '/assets/images/sample_pet_image_2.jpg' : petDetails.photo;
  let age = calculateAge(petDetails.birth_date)
  let description = petDetails.comments

  let medicalHistory = petDetails.medical_history
  let specialRequirements = petDetails.special_needs

  //shelter info
  let shelterId = shelterDetails.id
  let shelterName = shelterDetails.name
  let shelterAddress = shelterDetails.location

  return (
    <Modal show={true} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Pet Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className='custom-modal'>
        <img src={photo} alt="Pet" className="img-fluid" />
        {petDetails.status === 1 ? (
          <span className="badge bg-danger">Adopted</span>
        ) : (
          <span className="badge bg-success">Available for Adoption</span>
        )}
  

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
          {/* tab1 */}
          <div className={`tab-pane ${activeTab === 'tab1' ? 'active' : ''}`} id="tab1">
            <p>Breed: {breed}</p>
            <p>Age: {age} years</p>
            <p>{description}</p>
            <hr />
            <h5><Link to={`/shelterdetail/${shelterId}`}>{shelterName}</Link></h5>
            <p>{shelterAddress}</p>
          </div>
          {/* tab2 */}
          <div className={`tab-pane ${activeTab === 'tab2' ? 'active' : ''}`} id="tab2">
            <p>{medicalHistory}</p>
          </div>
          {/* tab3 */}
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


// const PetDetailsModal = ({ petId, closeModal, openApplicationModal }) => {return (<p>hello</p>)}
// export default PetDetailsModal;
