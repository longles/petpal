import React, { useState } from 'react';
import '../../styles/layout.css';
import '../../styles/profile.css';

const EditProfileSeeker = () => {
    // temporary placeholders
    const [username, setUsername] = useState('handsome_guy12345');
    const [bio, setBio] = useState("I'm the richest guy on this planet.");
    const [firstName, setFirstName] = useState('Bill');
    const [lastName, setLastName] = useState('Gates');
    const [email, setEmail] = useState('imrich@mail.utoronto.ca');
    const [mobile, setMobile] = useState('');
    const [location, setLocation] = useState('This, That, and The Other Streets');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    // Event handlers
    const handleProfileSave = () => {
    };

    const handleSecuritySave = () => {
    };

    // JSX
    return (
        <div>
            {/* Profile Edit Form */}
            <div className="container my-5">
                <h2>Edit Profile</h2>
                <form>
                    {/* Username */}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleProfileSave}>Save</button>
                    <a href="profile_seeker.html" className="btn btn-dark">Discard Changes</a>
                </form>

                <h2>Security and Privacy</h2>
                <form>
                    <button type="button" className="btn btn-primary" onClick={handleSecuritySave}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileSeeker;
