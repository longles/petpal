import React from 'react';
import { Link, useParams } from 'react-router-dom';

import '../../styles/shelterdetail.css';
import '../../styles/layout.css';
import '../../styles/listings.css';

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
                <div className="col-12 col-sm-4 px-2 px-xl-4 py-2 py-sm-0">
                  <div className="card">
                    <img src="../../assets/images/sample_pet_image_1.jpg" className="card-img-top" alt="Sample Pet 1" />
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <h5 className="card-title me-2">Buddy</h5>
                      </div>
                      <div className="d-flex flex-wrap">
                        <div className="col-12 col-xxl-6 pe-xxl-2 mb-2 mb-xxl-0">
                          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#petDetailsModal1">Details</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

              <div className="rounded review-div col-12">
                <div className="d-flex mt-2 flex-wrap justify-content-between">
                  <div className="px-2">
                    <div className="d-flex">
                      <div className="review-profile-image-container me-2">
                        <img className="review-profile-image" src="../../assets/images/user1.jpg" alt="Reviewer 1"></img>
                      </div>
                      <p className="reviewer-name">John Doe</p>
                    </div>
                  </div>
                  <div className="px-2 ms-sm-auto mt-1">
                    <div className="d-flex justify-content-sm-end">
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    </div>
                  </div>
                </div>
                <p className="review-text mx-3 mt-2 mb-0">We adopted our lovely dog from Doggycares Inc. and had a fantastic experience. The staff was friendly and helpful, and the facilities were clean and well-maintained.</p>
              </div>

              {/* Add more reviews as needed */}

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
    </div>
  );
}

export default ShelterDetail;