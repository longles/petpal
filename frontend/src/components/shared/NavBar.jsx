import React from 'react';

function NavBar() {
  // Retrieve userType from sessionStorage
  const userType = sessionStorage.getItem('userType') || 'none';

  const renderNoneNavbar = () => (
    <>

    </>
  )

  const renderShelterNavbar = () => (
    <>
        <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="sheltermanagement.html">Manage Pets</a>
        </li>
        <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="shelterdetail_shelter.html">Manage Shelter</a>
        </li>
    </>
    
  );

  const renderSeekerNavbar = () => (
    <>
        <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="listings.html">Adopt a Pet</a>
        </li>
    </>
  );


  const renderLogin = () => (
    <>
      <li className="nav-item dropdown">
        <a className="nav-link" href="login.html">Login</a>
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
          <li><a className="dropdown-item" href="profile_seeker.html">View Profile</a></li>
          <li><a className="dropdown-item" href="edit_profile_seeker.html">Update Profile</a></li>
          <li><a className="dropdown-item btn" data-bs-toggle="modal" data-bs-target="#notificationModal">Notifications</a></li>
        </ul>
      </li>
    </>
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="index.html">Pet Pal</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" style={{ backgroundColor: '#ff6600' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userType === 'seeker' && renderSeekerNavbar()}
            {userType === 'shelter' && renderShelterNavbar()}
            {/* Other common links */}
          </ul>
          <ul className="navbar-nav ml-auto">
            {userType === 'none' && renderLogin()}
            {userType !== 'none' && renderProfile()}
          </ul>
        </div>
      </div>
    </nav>
    
  );
}

export default NavBar;