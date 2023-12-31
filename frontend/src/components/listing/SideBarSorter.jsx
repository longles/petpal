import React, { useState } from 'react';

const SideBarSorter = ({ sortOrder, setSortOrder }) => {

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    console.log("Sort Order Changed: ", event.target.value); // Add this line for debugging
  };

  const applySort = () => {
    console.log("Applying Sort: ", sortOrder); // Add this line for debugging
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Sort By</h5>
        <div className="mb-3">
          <select className="form-select" onChange={handleSortChange} value={sortOrder}>
            <option value="-birth_date">Latest Birth Date</option>
            <option value="birth_date">Earliest Birth Date</option>
            <option value="weight">Largest Weight First</option>
            <option value="-weight">Smallest Weight First</option>
          </select>
        </div>
        {/* <button onClick={applySort} className="btn btn-primary">Apply Sort</button> */}
      </div>
    </div>
  );
};

export default SideBarSorter;
