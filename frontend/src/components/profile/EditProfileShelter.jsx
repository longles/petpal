import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../../styles/layout.css';
import '../../styles/profile.css';
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
        oldPassword: "",
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

    return (
        <div className="container my-5">
            <h2>Edit Shelter Information</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Shelter Name</label>
                    <input type="text" className="form-control" id="username" placeholder="Username"
                           value="Animal Shelter"/>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Shelter Location</label>
                    <input type="text" className="form-control" id="location"
                           value="This, That, and The Other Streets"/>
                </div>
                <div className="form-group">
                    <label htmlFor="mission">Mission Statement</label>
                    <textarea className="form-control" id="mission" rows="3">It's our mission to improve and save animal lives</textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="aboutUsProfile">About Us</label>
                    <textarea className="form-control" id="aboutUsProfile" rows="3">Since our founding in 1982, we have saved thousands of pets and given them forever homes.</textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="email" aria-describedby="emailHelp">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="email"
                           value="imrich@mail.utoronto.ca"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" className="form-control" id="mobile" placeholder="(xxx) xxx-xxxx"/>
                    <small className="form-text text-muted">We'll never share your phone number with anyone
                        else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="profilePic">Change Shelter Pic</label>
                    <input type="file" className="form-control" id="profilePic"/>
                </div>
                <Link to="#" className="btn btn-primary" id="showAlert">Save</Link>
                <Link to="/profile_shelter" id="cancel" className="btn btn-dark">Discard Changes</Link>
                <a href="#" className="btn btn-primary" id="showAlert">Save</a>
                <a href="profile_shelter.html" id="cancel" className="btn btn-dark">Discard Changes</a>
            </form>

            <h2>Security and Privacy</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="oldPassword">Old Password</label>
                    <input type="password" className="form-control" id="oldPassword" value="Type your old password"/>
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" className="form-control" id="newPassword" value="NewPassword"/>
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword2">Confirm New Password</label>
                    <input type="password" className="form-control" id="newPassword2" value="NewPassword"/>
                </div>
                <a href="#" className="btn btn-primary" id="showAlert2">Submit</a>
            </form>
        </div>
    )
}