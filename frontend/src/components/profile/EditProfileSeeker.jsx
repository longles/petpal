import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../../styles/layout.css';
import '../../styles/profile.css';
import {seekerAPIService} from '../../services/userAPIService'

const EditProfileSeeker = ({id}) => {
    // temporary placeholders
    const [profileData, setProfileData] = useState({
            username: "",
            bio: "",
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            location: "",
            profilePic: ""
        }
    );

    const [securityData, setSecurityData] = useState({
        newPassword1: "",
        newPassword2: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [validationError, setValidationError] = useState("");

    // Event handlers
    function handleProfileChange(event) {
        setProfileData(prevState => {
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
        seekerAPIService().updateSeeker(id, profileData).then(response => {
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
                               defaultValue={profileData.username} value={profileData.username}
                               onChange={handleProfileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <textarea className="form-control" id="bio" rows="3"
                                  defaultValue={profileData.bio} value={profileData.bio}
                                  onChange={handleProfileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="First name"
                               defaultValue={profileData.firstName} value={profileData.firstName}
                               onChange={handleProfileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Last name"
                               defaultValue={profileData.lastName} value={profileData.lastName}
                               onChange={handleProfileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" aria-describedby="emailHelp">Email</label>
                        <input type="text" className="form-control" id="email" placeholder="email"
                               defaultValue={profileData.email} value={profileData.email}
                               onChange={handleProfileChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" className="form-control" id="mobile" placeholder="xxx-xxx-xxxx"
                               defaultValue={profileData.mobile} value={profileData.mobile}
                               onChange={handleProfileChange}
                        />
                        <small className="form-text text-muted">We'll never share your phone number with anyone
                            else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="text" className="form-control" id="location"
                               defaultValue={profileData.location} value={profileData.location}
                               onChange={handleProfileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profilePic">Change Profile Pic</label>
                        <input type="file" className="form-control" id="profilePic"
                               defaultValue={profileData.profilePic} value={profileData.profilePic}
                               onChange={handleProfileChange}
                        />
                    </div>
                    <button className="btn btn-primary">Save</button>
                    <button className="btn btn-dark">Back</button>
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
                    <button className="btn btn-dark">Back</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileSeeker;
