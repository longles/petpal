import React, { useState, useEffect, useCallback } from 'react';
import PetCard from '../shared/PetCard';
import SideBarFilter from './SideBarFilter';
import { petAPIService } from '../../services/petAPIService';
import SideBarSorter from './SideBarSorter';
import Pagination from 'react-bootstrap/Pagination';
import PetCreationModal from '../shared/PetCreationModal';

const PAGE_SIZE = 10; // Define the number of items per page

const ShelterListing = ({ manageFlag = false, defaultFilters = {} }) => {
  const [petIDs, setPetIDs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const petAPI = petAPIService();
  const [sortOrder, setSortOrder] = useState('-birth_date');
  const [petFilters, setPetFilters] = useState(defaultFilters)

  const updateFilters = useCallback((newFilters) => {
    setPetFilters(newFilters)
  }, []);

  const fetchPetList = useCallback(async (page = currentPage, sort = sortOrder) => {
    try {
      // Ensure sortOrder is included under the 'ordering' key
      console.log("Fetching with Sort Order: ", sort, " Page: ", page);
      const queryParams = { ...petFilters};
      console.log(queryParams)
      const response = await petAPI.getPetList(queryParams, page, sort);
      if (response.success) {
        setPetIDs(response.data.results.map((pet) => pet.id));
        setTotalPages(Math.ceil(response.data.count / PAGE_SIZE));
      }
    } catch (error) {
      console.error('Error fetching pet list:', error);
    }
  }, [petAPI, currentPage, sortOrder]);

  useEffect(() => {
    fetchPetList(currentPage, sortOrder);
  }, [petFilters, sortOrder,currentPage]);

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

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div>
      <div className="container main-content">
        <div className="d-flex mb-4 align-items-center">
          <h2 className="me-2 my-auto">{"Shelter Listings"}</h2>
        </div>
        
        <div className="row">
{/* how do i make this part centered? */}
          <div className="col-md-9">
            <div className="row no-gutters">
              {petIDs.map((petID) => (
                <PetCard manageFlag={manageFlag} key={petID} petId={petID} />
              ))}
              {/* <ShelterCard/> */}
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Pagination>{paginationItems}</Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterListing;
