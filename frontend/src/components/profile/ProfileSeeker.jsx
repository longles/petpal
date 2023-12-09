import React, {useState} from 'react'
import ViewProfileSeeker from "./ViewProfileSeeker.jsx";
import EditProfileSeeker from "./EditProfileSeeker.jsx";
import { useNavigate } from 'react-router-dom';

function ProfileSeeker() {
    const navigate = useNavigate();
    if (localStorage.user_type !== "petseeker") {
        console.log("wrong usertype");
        console.log("you are a");
        console.log(localStorage.user_type);
        navigate("/404");
      }
    const userId = localStorage.getItem('user_object_id');
    const [editMode, setEditMode] = useState(false);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleReturn = () => {
        setEditMode(false);
    }

    return (
        <div>
            {editMode ? (
                <EditProfileSeeker id={userId} returnHandler={handleReturn} editMode={editMode}/>
            ) : (
                <ViewProfileSeeker id={userId} editHandler={handleEdit} editMode={editMode}/>
            )}
        </div>
    );
}

export default ProfileSeeker;
