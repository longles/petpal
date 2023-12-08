import React, { useState } from 'react';
import NotificationModal from './NotificationModal';
import { authAPIService } from '../../services/authAPIService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = () => {
  // Retrieve userType from localStorage
  const userType = localStorage.getItem('user_type') || 'none';
  const logoutAPI = authAPIService()
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)

  const logoutFunc = () => {
    logoutAPI.logout()
    navigate("/")
  }

  const renderNoneNavbar = () => (
    <>
      <li className="nav-item">
        <Link className="nav-link active" to="/pets/">Pets</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link active" to="/shelters/">Shelters</Link>
      </li>
      
    </>
  )

  const renderShelterNavbar = () => (
    <>
        <li className="nav-item">
            <Link className="nav-link active" to="/pets/manage/">Manage Pets</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link active" to={`/shelterdetail/${localStorage.user_object_id}`}>View Shelter</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/applications/">Applications</Link>
        </li>
    </>

  );

  const renderSeekerNavbar = () => (
    <>
        <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/pets/">Pets</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/shelters/">Shelters</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/applications/">Applications</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/appform/">Application Forms</Link>
        </li>
    </>
  );


  const renderLogin = () => (
    <>
      <li className="nav-item dropdown">
        <Link className="nav-link" to="accounts/login">Login</Link>
      </li>
    </>
  )

  

  const renderProfile = () => (
    <>
      <li className="nav-item dropdown">
        <button className="nav-link dropdown-toggle" id="profileDropdown"
                            data-bs-toggle="dropdown" aria-expanded="false">
          Profile
        </button>
        <ul className="dropdown-menu" aria-labelledby="profileDropdown">
          <li><Link className="dropdown-item" to="/profile">View Profile</Link></li>
          <li><Link className="dropdown-item" to="/profile/edit">Update Profile</Link></li>
          <li><button className="dropdown-item btn" onClick={() => {setShowNotifications(true)}}>Notifications</button></li>
          <li><button className="dropdown-item btn" onClick={logoutFunc}>Logout</button></li>
        </ul>
      </li>
    </>
  )

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Pet Pal</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" style={{ backgroundColor: '#ff6600' }}></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userType === 'petseeker' && renderSeekerNavbar()}
              {userType === 'petshelter' && renderShelterNavbar()}
              {/* Other common links */}
            </ul>
            <ul className="navbar-nav ml-auto">
              {userType === 'none' && renderLogin()}
              {userType !== 'none' && renderProfile()}
            </ul>
          </div>
        </div>
      </nav>
      {userType !== 'none' && <NotificationModal showModal={showNotifications} setShowModal={setShowNotifications}/>}
    </>
    
    
  );
}

export default NavBar;