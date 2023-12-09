import React, { useEffect, useState } from 'react';
import FilterRow from './FilterRow';
import { shelterAPIService } from '../../services/userAPIService';

const SideBarFilter = ({ manageFlag = false, updateFilters }) => {
  const shelterAPI = shelterAPIService();
  const statusOptions = ['Any', 'Adopted', 'Available'];
  const breedOptions = ['Any', 'Ragdoll', 'Siamese', 'Persian', 'Sphynx', 'Labrador', 'Golden Retriever', 'Bulldog', 'Beagle', 'Parrot', 'Cockatiel', 'Macaw', 'Canary'];
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
      siamese: '2',
      persian: '3',
      sphynx: '4',
      labrador: '5',
      goldenRetriever: '6',
      bulldog: '7',
      beagle: '8',
      parrot: '9',
      cockatiel: '10',
      macaw: '11',
      canary: '12',
    },
    shelter: {},
  });

  useEffect(() => {
    const fetchShelterList = async () => {
      try {
        const response = await shelterAPI.getShelterList(1);
        if (response.success) {
          const shelterMap = {};
          
          const addShelterOptions = [];

          response.data.results.forEach((shelter) => {
            addShelterOptions.push(shelter.name);
            shelterMap[shelter.name.toLowerCase()] = shelter.id;
          });

          addShelterOptions.sort((x, y) => x > y)

          const updatedShelterOptions = ['Any'].concat(addShelterOptions)
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
          {!manageFlag && <FilterRow name="Shelter" options={shelterOptions} />}

          <button type="submit" className="btn btn-primary">Apply Filters</button>
        </form>
      </div>
    </div>
  );
};

export default SideBarFilter;
