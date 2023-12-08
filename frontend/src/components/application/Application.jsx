import React, { useState, useEffect } from 'react';
import { applicationAPIService } from '../../services/applicationAPIService';
import PetCard from './ApplicationTile';

const PAGE_SIZE = 5; // Number of items per page

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [statusOption, setStatusOption] = useState("0");
    const [dateOption, setDateOption] = useState('last_updated_asc');
    const [petNameFilter, setPetNameFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const applicationService = applicationAPIService();

    const fetchApplications = async (page) => {
        const response = await applicationService.getApplicationList({
            date_sort: dateOption,
            pet_name: petNameFilter,
            ...(statusOption !== '0' && { status: statusOption })
        }, page);

        if (!response.success) {
            console.error('Error fetching applications:', response.message);
            return;
        }

        setApplications(response.data.results);
        setTotalPages(Math.ceil(response.data.count / PAGE_SIZE));
    };

    useEffect(() => {
        fetchApplications(currentPage);
    }, [statusOption, dateOption, petNameFilter, currentPage]);

    const handleStatusChange = (e) => {
        setStatusOption(e.target.value);
    };

    const handleDateChange = (e) => {
        setDateOption(e.target.value);
    };

    const handlePetNameFilterChange = (e) => {
        setPetNameFilter(e.target.value);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const applyFilters = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchApplications(1); // Fetch the first page after applying filters
    };

    return (
        <div className="container main-content">
            <h2 className="mb-4">
                {localStorage.getItem('user_type') === 'petshelter'
                    ? 'Applications'
                    : 'My Applications'}
            </h2>
            <div className="row">
                <div className="col-md-3">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Sort By</h5>
                            <div className="mb-3">
                                <select className="form-select" value={dateOption} onChange={handleDateChange}>
                                    <option value="last_updated_asc">Last Updated Asc</option>
                                    <option value="last_updated_desc">Last Updated Desc</option>
                                    <option value="created_at_asc">Created At Asc</option>
                                    <option value="created_at_desc">Created At Desc</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Filter By</h5>
                            <div className="mb-3">
                                <select className="form-select" value={statusOption} onChange={handleStatusChange}>
                                    <option value="0">All</option>
                                    <option value="1">Pending</option>
                                    <option value="2">Approved</option>
                                    <option value="3">Denied</option>
                                    <option value="4">Withdrawn</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Filter by Pet Name"
                                    value={petNameFilter}
                                    onChange={handlePetNameFilterChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={applyFilters}>
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    {applications.map((application) => (
                        <PetCard
                            key={application.id}
                            petId={application.pet}
                            status={application.status}
                            submissionDate={application.created_at.split('T')[0]}
                            applicationId={application.id}
                            formId={application.form}
                            responses={application.responses}
                        />
                    ))}

                    {totalPages > 1 && (
                        <div className="pagination text-center" style={{ marginBottom: "1rem" }}>
                            <button
                                className="btn btn-primary"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className="page-info" style={{ margin: "0 10px" }}>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                className="btn btn-primary"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Applications;
