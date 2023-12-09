import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import '../../styles/layout.css'
import '../../styles/profile.scoped.css'
import {Link} from 'react-router-dom'
import {shelterAPIService} from "../../services/userAPIService.js";
import { useNavigate } from 'react-router-dom';

function ProfileShelter() {
    const navigate = useNavigate()
    const {shelterId} = useParams();
    const [shelterDetails, setShelterDetails] = useState({
        name: '',
        email: '',
        location: '',
        mission: '',
        aboutUs: '',
        profilePic: '',
        phoneNum: ''
    });
    const [validationError, setValidationError] = useState("")

    useEffect(() => {
        if (localStorage.user_type !== "petshelter") {
            console.log("wrong usertype");
            console.log("you are a");
            console.log(localStorage.user_type);
            navigate("/404");
          }
        const shelterProfileAPI = shelterAPIService();
        shelterProfileAPI.getShelterDetail(shelterId)
            .then(res => {
                if (res.success) {
                    setShelterDetails({
                        name: res.data.name,
                        email: res.data.email,
                        location: res.data.location,
                        mission: res.data.mission,
                        aboutUs: res.data.about_us,
                        profilePic: res.data.profile_pic,
                        phoneNum: res.data.phone_num
                    });
                } else {
                    setValidationError(res.message);
                }
            })
            .catch(err => console.error('Error when fetching shelter details:', err));
    }, [shelterId]);

    return (
        <div className="container my-5">
            <div className="card">
                {/* TODO: Use profile_pic */}
                <img className="card-img-top" src="https://via.placeholder.com/80x40" alt="User Image"/>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Shelter Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {shelterDetails.shelterName}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Shelter Location</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {shelterDetails.location}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Mission Statement</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {shelterDetails.mission}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">About Us</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {shelterDetails.aboutUs}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {shelterDetails.email}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Phone Number</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {shelterDetails.phoneNum}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-12">
                            <Link to="/accounts/shelters/" className="btn btn-info edit-btn">Edit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileShelter;