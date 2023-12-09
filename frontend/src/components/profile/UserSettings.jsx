import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import '../../styles/layout.css';
import '../../styles/profile.scoped.css'
import {accountAPIService} from "../../services/userAPIService.js";
import {seekerAPIService} from "../../services/userAPIService.js";
import {shelterAPIService} from "../../services/userAPIService.js";

function UserSettings() {
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');
    const userType = localStorage.getItem('user_type');
    const getUserDetail = userType === 'petseeker' ?
        seekerAPIService().getSeekerDetail : shelterAPIService().getShelterDetail;
    const deleteUser = userType === 'petseeker' ?
        seekerAPIService().deleteSeeker : shelterAPIService().deleteShelter;
    const [userData, setUserData] = useState({
        username: '',
        email: '',
    });

    useEffect(() => {
        getUserDetail(userId)
            .then(res => {
                if (res.success) {
                    setUserData({
                        username: res.data.account.username,
                        email: res.data.account.email
                    });
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => console.error('Error when fetching user data:', err));
    }, [userId]);

    const [securityData, setSecurityData] = useState({
        newPassword1: "",
        newPassword2: ""
    });

    const [validationErrorAccount, setValidationErrorAccount] = useState("");

// Event handlers
    function handleAccountChange(event) {
        setUserData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    const handleAccountSubmit = (event) => {
        event.preventDefault();
        accountAPIService().updateUser(userId, userData).then(response => {
            if (response.success) {
                setValidationErrorAccount("");
                console.log(response.data);
                window.location.reload();
            } else {
                setValidationErrorAccount("Some of the fields are incorrect!");
            }
        });
    };

    const [validationErrorPwd, setValidationErrorPwd] = useState("");

    function handleSecurityChange(event) {
        setSecurityData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }


    const handleSecuritySubmit = (event) => {
        event.preventDefault();
        if (securityData.newPassword1 !== securityData.newPassword2) {
            setValidationErrorPwd("Passwords do not match");
        } else {
            accountAPIService().updatePwd(userId, securityData.newPassword1).then(response => {
                if (response.success) {
                    setValidationErrorPwd("");
                    console.log(response.data);
                    window.location.reload();
                } else {
                    setValidationErrorPwd("Some of the fields are incorrect!");
                }
            });
        }
    };

    const [deleteError, setDeleteError] = useState("");

    const deleteAccount = () => {
        deleteUser(userId).then(response => {
            if (response.success) {
                setDeleteError("");
                console.log(response.data);
                navigate("/");
            } else {
                setDeleteError("Something went wrong. Account cannot be deleted!");
            }
        })
    }

    return (
        <div className="container my-5">
            <h2>Settings</h2>
            {validationErrorAccount !== "" && <div className="alert alert-danger alert-dismissible fade show">{validationErrorAccount}</div>}
            <form onSubmit={handleAccountSubmit}>
                {/* Username */}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Username"
                           name="username"
                           value={userData.username}
                           onChange={handleAccountChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" aria-describedby="emailHelp">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="email"
                           name="email"
                           value={userData.email}
                           onChange={handleAccountChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.</small>
                </div>
                <button className="btn btn-primary">Save</button>
            </form>

            <h2>Security and Privacy</h2>
            {validationErrorPwd !== "" && <div className="alert alert-danger alert-dismissible fade show">{validationErrorPwd}</div>}
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
            </form>
            <h2>Delete Account</h2>
            {deleteError !== "" && <div className="alert alert-danger alert-dismissible fade show">{deleteError}</div>}
            <Link to="/accounts/login" className="btn btn-danger" onClick={deleteAccount}>Delete</Link>
            <Link to="/" className="btn btn-dark">Back</Link>
        </div>
    )
}

export default UserSettings;
