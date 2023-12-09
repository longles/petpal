import React, { useState, useEffect } from 'react';
import { shelterAPIService } from '../../services/userAPIService';
import { Link } from 'react-router-dom';

const ShelterCard = ({ manageFlag = false, shelterId }) => {
  const [shelterDetails, setShelterDetails] = useState(null);

  const fetchShelterDetail = async () => {
    try {
        console.log(`fetching ${shelterId}`)
      const shelterAPI = shelterAPIService();
      const response = await shelterAPI.getShelterDetail(shelterId);
      if (response.success) {
        console.log(response)
        setShelterDetails(response.data);
      }
    } catch (error) {
      console.error(`Error fetching shelter detail for ID ${shelterId}:`, error);
    }
  };

  useEffect(() => {
    fetchShelterDetail();
  }, [shelterId]); // Depend on shelterId so it refetches if the ID changes

  if (!shelterDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-md-3 mb-4 d-flex justify-content-center align-items-stretch">
      <Link to={`/shelterDetail/${shelterId}`} style={{ textDecoration: 'none' }}>
        <div className="card listing-box">
          <div className="card-body">
            <h4 className="card-title">{shelterDetails.name}</h4>
            <p className="card-text">{shelterDetails.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShelterCard;