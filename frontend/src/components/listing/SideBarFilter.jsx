import React from 'react';
import FilterRow from './FilterRow';

const SideBarFilter = ({ updateFilters }) => {
  const statusOptions = ['Any', 'Adopted', 'Available'];
  const breedOptions = ['Any', 'Ragdoll', 'Labrador', 'Parrot'];
  const sizeOptions = ['Any', 'Small', 'Medium', 'Large'];
  const colourOptions = ['Any', 'Yellow', 'Black', 'White', 'Brown', 'Grey', 'Red', 'Blue', 'Green'];
  const sexOptions = ['Any', 'Male', 'Female'];

  const handleFilterSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission
  
  
    const form = event.target;
    const formData = new FormData(form);
    const selectedFilters = {};

    for (let [key, value] of formData.entries()) {
      if (value !== 'Any') {
        selectedFilters[key] = value;
      }
    }
    console.log('Selected Filters:', selectedFilters);
    updateFilters(selectedFilters);
  };

  return (
    <div className="col-md-3 filter-sidebar">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Sort By</h5>
          <form>
            <div className="mb-3">
              <select className="form-select" id="sort">
                <option value="Date: Descending">Newest</option>
                <option value="Date: Ascending">Oldest</option>
              </select>
            </div>
          </form>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Filter</h5>
          <form id="filterForm" onSubmit={handleFilterSubmit}>
            {/* Status filter */}
            <FilterRow name="Status" options={statusOptions} />
            
            {/* Breed filter */}
            <FilterRow name="Breed" options={breedOptions} />

            {/* Size filter */}
            <FilterRow name="Size" options={sizeOptions} />

            {/* Colour filter */}
            <FilterRow name="Colour" options={colourOptions} />

            {/* Sex filter */}
            <FilterRow name="Sex" options={sexOptions} />

            <button type="submit" className="btn btn-primary">Apply Filters</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SideBarFilter;
