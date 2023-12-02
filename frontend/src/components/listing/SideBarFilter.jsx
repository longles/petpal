import React from 'react';

const SideBarFilter = () => {
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
          <form id="filterForm">
            <div className="mb-3">
              <label htmlFor="species" className="form-label">Species</label>
              <select className="form-select" id="species">
                <option value="Any">Any</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">Age</label>
              <input type="number" className="form-control" id="age" min="1" step="1" placeholder="Any" />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input type="text" className="form-control" id="location" placeholder="Any" />
            </div>
            <button type="submit" className="btn btn-primary">Apply Filters</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SideBarFilter;
