import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../../styles/layout.css';
import '../../styles/profile.scoped.css'
import {shelterAPIService} from '../../services/userAPIService'

const EditProfileShelter = ({id}) => {
    const [profileData, setProfileData] = useState({
            shelterName: "",
            location: "",
            missionStatement: "",
            aboutUs: "",
            email: "",
            mobile: "",
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
        shelterAPIService().updateShelter(id, profileData).then(response => {
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

    return (
        <div className="container my-5">
            <h2>Edit Shelter Information</h2>
            <form onSubmit={handleProfileSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Shelter Name</label>
                    <input type="text" className="form-control" id="username" placeholder="Name of your shelter"
                           value={profileData.shelterName} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Shelter Location</label>
                    <input type="text" className="form-control" id="location"
                           value={profileData.location} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="mission">Mission Statement</label>
                    <textarea className="form-control" id="mission" rows="3"
                              value={profileData.missionStatement} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="aboutUsProfile">About Us</label>
                    <textarea className="form-control" id="aboutUsProfile" rows="3"
                              value={profileData.aboutUs} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email" aria-describedby="emailHelp">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="email"
                           value={profileData.email} onChange={handleProfileChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" className="form-control" id="mobile" placeholder="xxx-xxx-xxxx"
                           value={profileData.mobile} onChange={handleProfileChange}
                    />
                    <small className="form-text text-muted">We'll never share your phone number with anyone
                        else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="profilePic">Change Shelter Pic</label>
                    <input type="file" className="form-control" id="profilePic"
                           value={profileData.profilePic} onChange={handleProfileChange} />
                </div>
                <Link to="#" className="btn btn-primary" id="showAlert">Save</Link>
                <Link to="/profile_shelter" id="cancel" className="btn btn-dark">Discard Changes</Link>
                {/*<a href="#" className="btn btn-primary" id="showAlert">Save</a>*/}
                {/*<a href="profile_shelter.html" id="cancel" className="btn btn-dark">Discard Changes</a>*/}
            </form>

            <h2>Security and Privacy</h2>
            <form onSubmit={handleSecuritySubmit}>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" className="form-control" id="newPassword1"
                           value={securityData.newPassword1} onChange={handleSecurityChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword2">Confirm New Password</label>
                    <input type="password" className="form-control" id="newPassword2"
                           value={securityData.newPassword2} onChange={handleSecurityChange} />
                </div>
                <button className="btn btn-primary" id="showAlert2">Submit</button>
            </form>
        </div>
    )
}

export default EditProfileShelter;
