import React, { useState, useEffect } from 'react';
import ShelterCard from '../shared/ShelterCard';
import { shelterAPIService } from '../../services/userAPIService';
import Pagination from 'react-bootstrap/Pagination';

const PAGE_SIZE = 10; // Define the number of items per page

const ShelterListing = () => {
  const [shelterIDs, setShelterIDs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const shelterAPI = shelterAPIService();

  const fetchShelterList = async (page) => {
    try {
      const response = await shelterAPI.getShelterList(page);
      if (response.success) {
        setShelterIDs(response.data.results.map((shelter) => shelter.id));
        setTotalPages(Math.ceil(response.data.count / PAGE_SIZE));
      }
    } catch (error) {
      console.error('Error fetching shelter list:', error);
    }
  };

  useEffect(() => {
    fetchShelterList(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <div className="mt-5">
        <div className="d-flex mb-4 align-items-center justify-content-center">
          <h2 className="me-2 my-auto">Shelter Listings</h2>
        </div>
        
        <div className="">
            <div className="d-flex flex-wrap justify-content-around no-gutters">
              {shelterIDs.map((shelterId) => (
                <ShelterCard key={shelterId} shelterId={shelterId} />
              ))}
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Pagination>{paginationItems}</Pagination>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterListing;
