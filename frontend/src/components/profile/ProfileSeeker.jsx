import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import '../../styles/layout.css'
import '../../styles/profile.scoped.css'
import {Link} from 'react-router-dom'
import {seekerAPIService} from "../../services/userAPIService.js";
import { useNavigate } from 'react-router-dom';

function ProfileSeeker() {
    const navigate = useNavigate();

    if (localStorage.user_type !== "petseeker") {
        console.log("usertype wrong")
      navigate("/404")
    }

    const {seekerId} = useParams(); // Make sure to destructure seekerId from useParams
    const [seekerDetails, setSeekerDetails] = useState({
        username: '',
        email: '',
        name: '',
        bio: '',
        profilePic: '',
        phoneNum: ''
    });
    const [validationError, setValidationError] = useState("")

    useEffect(() => {
        if (localStorage.user_type !== "petseeker") {
            console.log("usertype wrong");
            navigate("/404");
        }
        const seekerProfileAPI = seekerAPIService();
        seekerProfileAPI.getSeekerDetail(seekerId)
            .then(res => {
                if (res.success) {
                    setSeekerDetails({
                        username: res.data.username,
                        email: res.data.email,
                        name: res.data.name,
                        bio: res.data.bio,
                        profilePic: res.data.profile_pic,
                        phoneNum: res.data.phone_num
                    });
                } else {
                    setValidationError(res.message);
                }
            })
            .catch(err => console.error('Error when fetching seeker details:', err));
    }, [seekerId]);

    return (
        <div className="container my-5">
            <div className="card">
                {/* TODO: change the src to profilePic */}
                <img className="card-img-top" src="https://via.placeholder.com/80x40" alt={seekerDetails.name}/>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Username</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {seekerDetails.username}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Your Real Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {seekerDetails.name}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Bio</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {seekerDetails.bio}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {seekerDetails.email}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Phone Number</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {seekerDetails.phoneNum}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-12">
                            <Link to="/accounts/seekers/" className="btn btn-info edit-btn">Edit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileSeeker;
