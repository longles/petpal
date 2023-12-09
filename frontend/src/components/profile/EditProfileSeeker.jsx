import React, {useEffect, useState} from 'react';
import '../../styles/layout.css';
import '../../styles/profile.scoped.css'
import {seekerAPIService} from '../../services/userAPIService'

const EditProfileSeeker = (props) => {
    const seekerId = props.id;
    const [seekerDetails, setSeekerDetails] = useState({
        username: '',
        email: '',
        name: '',
        bio: '',
        profilePic: '',
        phoneNum: ''
    });

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
                    console.log(res.message);
                }
            })
            .catch(err => console.error('Error when fetching seeker details:', err));
    }, [seekerId]);

    const [securityData, setSecurityData] = useState({
        newPassword1: "",
        newPassword2: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [validationError, setValidationError] = useState("");

    // Event handlers
    function handleProfileChange(event) {
        setSeekerDetails(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    function handleSecurityChange(event) {
        setSecurityData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleProfileSubmit = (event) => {
        event.preventDefault();
        seekerAPIService().updateSeeker(props.id, seekerDetails).then(response => {
            if (response.success) {
                setValidationError("");
                setSuccessMessage("Profile updated successfully!");
                console.log(response.data);
            } else {
                setSuccessMessage("");
                setValidationError("Some of the fields are incorrect!");
            }
        });
    };

    const handleSecuritySubmit = (event) => {
        event.preventDefault();
        console.log(event);
    };

    // UI
    return (
        <div>
            {/* Profile Edit Form */}
            <div className="container my-5">
                <h2>Edit Profile</h2>
                <form onSubmit={handleProfileSubmit}>
                    {/* Username */}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Username"
                               name="username"
                               value={seekerDetails.username}
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
                        <label htmlFor="name">Your Name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Actual name"
                               name="name"
                               value={seekerDetails.firstName}
                               onChange={handleProfileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" aria-describedby="emailHelp">Email</label>
                        <input type="text" className="form-control" id="email" placeholder="email"
                               name="email"
                               value={seekerDetails.email}
                               onChange={handleProfileChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNum">Mobile</label>
                        <input type="text" className="form-control" id="mobile" placeholder="xxx-xxx-xxxx"
                               name="phoneNum"
                               defaultValue={seekerDetails.mobile} value={seekerDetails.mobile}
                               onChange={handleProfileChange}
                        />
                        <small className="form-text text-muted">We'll never share your phone number with anyone
                            else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="profilePic">Change Profile Pic</label>
                        <input type="file" className="form-control" id="profilePic"
                               name="profilePic"
                               value={seekerDetails.profilePic}
                               onChange={handleProfileChange}
                        />
                    </div>
                    <button className="btn btn-primary">Save</button>
                    <button className="btn btn-dark" onClick={props.returnHandler}>Back</button>
                </form>

                <h2>Security and Privacy</h2>
                <form onSubmit={handleSecuritySubmit}>
                    <div className="form-group">
                        <label htmlFor="newPassword1">New Password</label>
                        <input type="password" className="form-control" id="newPassword1" name="newPassword1"
                               value={securityData.newPassword1}
                               onChange={handleSecurityChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword2">Confirm New Password</label>
                        <input type="password" className="form-control" id="newPassword2" name="newPassword2"
                               value={securityData.newPassword2}
                               onChange={handleSecurityChange} required/>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                    <button className="btn btn-dark" onClick={props.returnHandler}>Back</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileSeeker;
