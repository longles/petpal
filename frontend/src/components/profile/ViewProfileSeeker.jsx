import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import '../../styles/layout.css'
import '../../styles/profile.scoped.css'
import {Link} from 'react-router-dom'
import {seekerAPIService} from "../../services/userAPIService.js";
import defaultProfilePic from "../../assets/images/default_profile_pic.jpeg"

function ViewProfileSeeker(props) {
    const seekerId = props.id;
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
        const seekerProfileAPI = seekerAPIService();
        seekerProfileAPI.getSeekerDetail(seekerId)
            .then(res => {
                if (res.success) {
                    setSeekerDetails({
                        username: res.data.account.username,
                        email: res.data.account.email,
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

    console.log("profilePic: " + seekerDetails.profilePic);

    return (
        <div>
            <div className="container my-5">
                <div className="card">
                    <img className="card-img-top profile-pic"
                         src={seekerDetails.profilePic ? seekerDetails.profilePic : defaultProfilePic}
                         alt={seekerDetails.name}/>
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
                                <h6 className="mb-0">My Real Name</h6>
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
                                <button className="btn btn-info edit-btn" onClick={props.editHandler}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProfileSeeker;
