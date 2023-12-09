import React, {useState, useEffect} from 'react';
import '../../styles/layout.css'
import '../../styles/profile.scoped.css'
import {shelterAPIService} from "../../services/userAPIService.js";
import defaultProfilePic from "../../assets/images/default_profile_pic.jpeg"

function ViewProfileShelter(props) {
    const shelterId = props.id;
    const [shelterDetails, setShelterDetails] = useState({
        username: '',
        email: '',
        name: '',
        location: '',
        missionStatement: '',
        aboutUs: '',
        profilePic: '',
        phoneNum: ''
    });
    const [validationError, setValidationError] = useState("")

    useEffect(() => {
        const shelterProfileAPI = shelterAPIService();
        shelterProfileAPI.getShelterDetail(shelterId)
            .then(res => {
                if (res.success) {
                    setShelterDetails({
                        username: res.data.account.username,
                        email: res.data.account.email,
                        name: res.data.name,
                        location: res.data.location,
                        missionStatement: res.data.missionStatement,
                        aboutUs: res.data.aboutUs,
                        profilePic: res.data.profile_pic,
                        phoneNum: res.data.phone_num
                    });
                } else {
                    setValidationError(res.message);
                }
            })
            .catch(err => console.error('Error when fetching seeker details:', err));
    }, [shelterId]);

    console.log("profilePic: " + shelterDetails.profilePic);

    return (
        <div>
            <div className="container my-5">
                <div className="card">
                    <img className="card-img-top profile-pic"
                         src={shelterDetails.profilePic ? shelterDetails.profilePic : defaultProfilePic}
                         alt={shelterDetails.name}/>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Username</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {shelterDetails.username}
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Shelter Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {shelterDetails.name}
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Location</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {shelterDetails.location}
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
                                <button className="btn btn-info edit-btn" onClick={props.editHandler}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProfileShelter;
