import React, {useEffect, useState} from 'react';
import '../../styles/layout.css';
import '../../styles/profile.scoped.css'
import {seekerAPIService} from '../../services/userAPIService'
import {Link} from "react-router-dom";
import defaultProfilePic from '../../assets/images/default_profile_pic.jpeg'

const EditProfileSeeker = (props) => {
    const seekerId = localStorage.getItem('user_object_id');
    const [seekerDetails, setSeekerDetails] = useState({
        name: '',
        bio: '',
        phoneNum: ''
    });

    useEffect(() => {
        const seekerProfileAPI = seekerAPIService();
        seekerProfileAPI.getSeekerDetail(seekerId)
            .then(res => {
                if (res.success) {
                    setSeekerDetails({
                        name: res.data.name,
                        bio: res.data.bio,
                        phoneNum: res.data.phone_num
                    });
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => console.error('Error when fetching seeker details:', err));
    }, [seekerId]);

    const [validationError, setValidationError] = useState("");

    console.log(seekerDetails);

    // Event handlers
    function handleProfileChange(event) {
        setSeekerDetails(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    // image uploading
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        // Check if any file is selected
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleProfileSubmit = (event) => {
        event.preventDefault();
        const allData = {
            name: seekerDetails.name,
            bio: seekerDetails.bio,
            phone_num: seekerDetails.phoneNum,
            profile_pic: image
        };

        let formData = new FormData();
        for (const [key, value] of Object.entries(allData)) {
            if (key === "profile_pic" && !value) {
                continue;
            }
            console.log(key);
            formData.append(key, value);
        }
        seekerAPIService().updateSeeker(seekerId, formData).then(response => {
            if (response.success) {
                setValidationError("");
                console.log(response.data);
                window.location.reload();
            } else {
                setValidationError(response.message);
            }
        });
    };

    // UI
    return (
        <div>
            {/* Profile Edit Form */}
            <div className="container my-5">
                <h2>Edit Profile</h2>
                {validationError !== "" &&
                    <div className="alert alert-danger alert-dismissible fade show">{validationError}</div>}
                <form onSubmit={handleProfileSubmit}>
                    {/* Username */}
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Actual name"
                               name="name"
                               value={seekerDetails.name}
                               onChange={handleProfileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <textarea className="form-control" id="bio" rows="3"
                                  name="bio"
                                  value={seekerDetails.bio}
                                  onChange={handleProfileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNum">Mobile</label>
                        <input type="text" className="form-control" id="mobile" placeholder="xxx-xxx-xxxx"
                               name="phoneNum"
                               value={seekerDetails.phoneNum}
                               onChange={handleProfileChange}
                        />
                        <small className="form-text text-muted">We'll never share your phone number with anyone
                            else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="profilePic">Change Profile Pic</label>
                        <input type="file" className="form-control" id="profilePic"
                               name="profilePic"
                               onChange={handleImageChange}
                        />
                    </div>
                    <button className="btn btn-primary">Save</button>
                    <button className="btn btn-dark" onClick={props.returnHandler}>Discard Changes</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileSeeker;
