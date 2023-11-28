import React from 'react';
import { useParams } from 'react-router-dom';

import '../../styles/shelterdetail.module.css';
import '../../styles/listings.module.css';
import PetCard from '../shared/PetCard';
import ReviewCard from '../shared/ReviewCard';

function ShelterDetail() {
  const { shelterId } = useParams(); // Assuming you have a shelterId parameter

  return (
    <div className="shelterdetail-main min-vh-100">
      {/* Shelter details content */}
      <div className="text-center my-4 mx-auto">
        <h1 className="d-inline-block position-relative">Doggycares Inc.</h1>
      </div>

      <div className="mx-3 mx-md-5">
        <div className="d-flex justify-content-center mb-10">
          <div className="col-12 col-md-8 px-4 py-2 mb-4">
            <h1 className="m-0">It's our mission to improve and save animal lives </h1>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-center">
          <div className="col-12 col-xl-7 col-xxl-8 pe-xl-4 mb-2 d-flex flex-column justify-content-between">
            <div className="border rounded px-4 py-2 mb-4 flex-expand">
              <h2>About Us</h2>
              <p className="text-center mb-0">
                Since our founding in 1982, we have saved thousands of pets and given them forever homes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a mollis velit. Donec eros risus, vehicula id ipsum at, convallis sollicitudin tellus. Ut non finibus metus. In convallis nulla id sagittis mattis. Etiam dignissim dolor quis bibendum tincidunt. Nulla laoreet lectus ac mollis egestas. Praesent faucibus elementum velit. Nulla massa dolor, euismod eget quam nec, finibus hendrerit nisi. Integer a blandit magna. Quisque vulputate magna non diam porttitor, nec venenatis lacus elementum.
              </p>
            </div>
            <div className="border rounded px-2 px-xl-4 py-4">
              <div className="text-center mb-4 mx-auto">
                <h2 className="d-inline-block position-relative mb-0">Pets</h2>
              </div>

              <div className="pet-container d-flex flex-wrap flex-column flex-sm-row justify-content-between">
                {/* Sample pet cards */}
                <PetCard petId={1}/>
                {/* Repeat similar blocks for additional pets */}
              </div>
              <div className="d-flex justify-content-end mt-3 px-2 px-xl-4 py-2 py-sm-0">
                <a className="text-end" href="#">View All</a>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8 col-xl-5 col-xxl-4 mb-2">
            <div className="border rounded-top py-2">
              <h2 className="text-center">Contact Information</h2>
              <p className="text-center mb-0"><span style={{ fontWeight: 'bold' }}>Email: </span>info@doggycares.com</p>
              <p className="text-center mb-0"><span style={{ fontWeight: 'bold' }}>Phone: </span>888-123-4567</p>
            </div>
            <div className="border py-2">
              <h2 className="text-center">Location</h2>
              <p className="text-center mb-0">1234 Shelter Avenue, Cityville, State</p>
              {/* You may add a map integration here */}
            </div>
            <div className="border rounded-bottom py-2">
              <h2 className="text-center">Reviews</h2>

              <ReviewCard id={1}/>

              <div className="col-12 d-flex justify-content-center mt-3 px-2 px-xl-4 py-2 py-sm-0">
                <ul className="pagination">
                  <li className="page-item"><a className="page-link" href="#">First</a></li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">Last</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <PetDetailsModal petId={1} petName={"Buddy"} image={"../../assets/images/sample_pet_image_1.jpg"}/> */}
    </div>
  );
}

export default ShelterDetail;