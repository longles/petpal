import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import ViewProfileShelter from "./ViewProfileShelter.jsx";
import EditProfileShelter from "./EditProfileShelter.jsx";

function ProfileShelter() {
    const navigate = useNavigate();
    if (localStorage.user_type !== "petshelter") {
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
                <EditProfileShelter id={userId} returnHandler={handleReturn} editMode={editMode}/>
            ) : (
                <ViewProfileShelter id={userId} editHandler={handleEdit} editMode={editMode}/>
            )}
        </div>
    );
}

export default ProfileShelter;
