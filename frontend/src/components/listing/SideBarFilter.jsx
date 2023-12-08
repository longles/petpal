import React, { useEffect, useState } from 'react';
import FilterRow from './FilterRow';
import { shelterAPIService } from '../../services/userAPIService';
import SideBarSorter from './SideBarSorter'; // Import SideBarSorter

const SideBarFilter = ({ updateFilters }) => {

  const shelterAPI = shelterAPIService();
  const statusOptions = ['Any', 'Adopted', 'Available'];
  const breedOptions = ['Any', 'Ragdoll', 'Labrador', 'Parrot'];
  const sizeOptions = ['Any', 'Small', 'Medium', 'Large'];
  const colourOptions = ['Any', 'Yellow', 'Black', 'White', 'Brown', 'Grey', 'Red', 'Blue', 'Green'];
  const sexOptions = ['Any', 'Male', 'Female'];
  const speciesOptions = ['Any', 'Dog', 'Cat', 'Bird'];
  const [shelterOptions, setShelterOptions] = useState(['Any']);
  const [filterValueMap, setFilterValueMap] = useState({
    status: {
      adopted: 1,
      available: 2,
    },
    sex: {
      unknown: 0,
      male: 1,
      female: 2,
    },
    size: {
      large: 1,
      medium: 2,
      small: 3,
    },
    colour: {
      unknown: 0,
      yellow: 1,
      black: 2,
      white: 3,
      brown: 4,
      grey: 5,
      red: 6,
      blue: 7,
      green: 8,
    },
    species: {
      unknown: 0,
      dog: 1,
      cat: 2,
      bird: 3,
    },
    breed: {
      unknown: '0',
      ragdoll: '1',
      labrador: '2',
      parrot: '3',
    },
    shelter: {},
    species: {
      unknown: 0,
      dog : 1,
      cat : 2, 
      bird : 3,
    }
  });

  useEffect(() => {
    const fetchShelterList = async () => {
      try {
        const response = await shelterAPI.getShelterList(1);
        if (response.success) {
          const updatedShelterOptions = ['Any'];
          const shelterMap = {};

          response.data.results.forEach((shelter) => {
            updatedShelterOptions.push(shelter.shelter_name);
            shelterMap[shelter.shelter_name.toLowerCase()] = shelter.id;
          });

          setShelterOptions(updatedShelterOptions);
          setFilterValueMap((prevMap) => ({ ...prevMap, shelter: shelterMap }));
        }
      } catch (error) {
        console.error('Error fetching shelter list:', error);
      }
    };

    fetchShelterList();
  }, []);

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const selectedFilters = {};

    for (let [key, value] of formData.entries()) {
      if (value !== 'Any') {
        if (filterValueMap[key]) {
          const selectedValue = value.toLowerCase();
          selectedFilters[key] = filterValueMap[key][selectedValue];
        } else {
          selectedFilters[key] = value;
        }
      }
    }
    updateFilters(selectedFilters);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Filter</h5>
        <form id="filterForm" onSubmit={handleFilterSubmit}>
          {/* Status filter */}
          <FilterRow name="Status" options={statusOptions} />
          
        {/* species filter */}
          <FilterRow name="Species" options={speciesOptions} />

          {/* Breed filter */}
          <FilterRow name="Breed" options={breedOptions} />

          {/* Size filter */}
          <FilterRow name="Size" options={sizeOptions} />

          {/* Colour filter */}
          <FilterRow name="Colour" options={colourOptions} />

          {/* Sex filter */}
          <FilterRow name="Sex" options={sexOptions} />

          {/* shelter filter */}
          <FilterRow name="Shelter" options={shelterOptions} />

          <button type="submit" className="btn btn-primary">Apply Filters</button>
        </form>
      </div>
    </div>
  );
};

export default SideBarFilter;
