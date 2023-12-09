import React, {useState} from 'react'
import ViewProfileSeeker from "./ViewProfileSeeker.jsx";
import EditProfileSeeker from "./EditProfileSeeker.jsx";
import '../../styles/layout.css'
import '../../styles/profile.scoped.css'


function ProfileSeeker() {
    const userId = localStorage.getItem('user_id');
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
