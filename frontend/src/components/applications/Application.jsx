import React, { useState, useEffect } from 'react';
import { applicationAPIService } from '../../services/applicationAPIService';

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [statusOption, setStatusOption] = useState(1); // Assuming 1-4 represent different sort options
    const [dateOption, setDateOption] = useState('last_updated_asc');
    const [petNameFilter, setPetNameFilter] = useState('');
    const applicationService = applicationAPIService();

    const fetchApplications = async () => {
        try {
            const response = await applicationService.getApplicationList({
                status: statusOption,
                date_sort: dateOption,
                pet_name: petNameFilter,
            }, 1);
            setApplications(response); // Assuming the API returns an array of applications
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const handleSortChange = (e) => {
        setStatusOption(e.target.value);
    };

    const handleDateChange = (e) => {
        setDateOption(e.target.value);
    };

    const handlePetNameFilterChange = (e) => {
        setPetNameFilter(e.target.value);
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const applyFilters = (e) => {
        e.preventDefault();
        fetchApplications({
            status: statusOption,
            date_sort: dateOption,
            pet_name: petNameFilter
        });
    };

    return (
        <div className="container main-content">
            <h2 className="mb-4">My Applications</h2>
            <div className="row">
                <div className="col-md-3">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Sort By</h5>
                            <form onSubmit={applyFilters}>
                                <div className="mb-3">
                                    <select className="form-select" value={statusOption} onChange={handleSortChange}>
                                        <option value="1">Pending</option>
                                        <option value="2">Approved</option>
                                        <option value="3">Denied</option>
                                        <option value="4">Withdrawn</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <select className="form-select" value={dateOption} onChange={handleDateChange}>
                                        <option value="last_updated_asc">Last Updated Asc</option>
                                        <option value="last_updated_desc">Last Updated Desc</option>
                                        <option value="created_at_asc">Created At Asc</option>
                                        <option value="created_at_desc">Created At Desc</option>
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
                                <button type="submit" className="btn btn-primary">Apply Filters</button>
                            </form>
                        </div>
                    </div>
                    {/* Additional filter options can be added here */}
                </div>

                <div className="col-md-9">
                    {/* {applications.map((application) => (
                        <PetCard
                            key={application.id}
                            imageUrl={application.imageUrl}
                            name={application.name}
                            status={application.status}
                            submissionDate={application.submissionDate}
                            applicationId={application.id}
                        />
                    ))} */}
                </div>
            </div>
        </div>
    );
};

export default Applications;
