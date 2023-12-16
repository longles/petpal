import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../../styles/layout.css';
import '../../styles/profile.scoped.css'
import {shelterAPIService} from '../../services/userAPIService'

const EditProfileShelter = (props) => {
    const shelterId = props.id;

    const [shelterDetails, setShelterDetails] = useState({
            name: "",
            location: "",
            phone_num: "",
            mission: "",
            about_us: ""
        }
    );

    useEffect(() => {
        const shelterProfileAPI = shelterAPIService();
        shelterProfileAPI.getShelterDetail(shelterId)
            .then(res => {
                if (res.success) {
                    setShelterDetails({
                        name: res.data.name,
                        location: res.data.location,
                        phone_num: res.data.phone_num,
                        mission: res.data.mission,
                        about_us: res.data.about_us
                    });
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => console.error('Error when fetching shelter details:', err));
    }, [shelterId]);

    const [validationError, setValidationError] = useState("");

    console.log("shelterDetails");
    console.log(shelterDetails);

    // Event handlers
    function handleProfileChange(event) {
        setShelterDetails(prevState => {
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
            ...shelterDetails,
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
        shelterAPIService().updateShelter(shelterId, formData).then(response => {
            if (response.success) {
                setValidationError("");
                console.log(response.data);
                window.location.reload();
            } else {
                setValidationError(response.message);
            }
        });
    };

    return (
        <div className="container my-5">
            <h2>Edit Shelter Information</h2>
            {validationError !== "" &&
                <div className="alert alert-danger alert-dismissible fade show">{validationError}</div>}
            <form onSubmit={handleProfileSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Shelter Name</label>
                    <input type="text" className="form-control" id="username" placeholder="Name of your shelter"
                           name="name"
                           value={shelterDetails.name}
                           onChange={handleProfileChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Shelter Location</label>
                    <input type="text" className="form-control" id="location"
                           name="location"
                           value={shelterDetails.location} onChange={handleProfileChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="mission">Mission Statement</label>
                    <input type="text" className="form-control" id="mission"
                           name="mission"
                           value={shelterDetails.mission} onChange={handleProfileChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="about_us">About Us</label>
                    <textarea type="text" className="form-control" id="about_us" rows="3"
                           name="about_us"
                           value={shelterDetails.about_us} onChange={handleProfileChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone_num">Mobile</label>
                    <input type="text" className="form-control" id="phone_num" placeholder="xxx-xxx-xxxx"
                           name="phone_num"
                           value={shelterDetails.phone_num} onChange={handleProfileChange}
                    />
                    <small className="form-text text-muted">We'll never share your phone number with anyone
                        else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="profilePic">Change Shelter Pic</label>
                    <input type="file" className="form-control" id="profilePic"
                           name="profilePic"
                           onChange={handleImageChange}/>
                </div>
                <button className="btn btn-primary">Save</button>
                <button className="btn btn-dark" onClick={props.returnHandler}>Discard Changes</button>
            </form>
        </div>
    )
}

export default EditProfileShelter;
