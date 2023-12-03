import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles/layout.css';
import NavBar from './components/shared/NavBar.jsx';
import ShelterDetail from './components/shelter/ShelterDetail.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx'
import LandingPage from './components/landing/LandingPage.jsx';
import PetListingsPage from './components/listing/listings.jsx';
import ProfileSeeker from "./components/profile/ProfileSeeker.jsx";
import ProfileShelter from "./components/profile/ProfileShelter.jsx";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage/>,
    },
    {
      path: "/shelterdetail/",
      element: <ShelterDetail/>,
    },
    {
      path: "/login/",
      element: <Login/>
    },
    {
      path: "/accounts/",
      element: <Signup/>
    },
    {
      path: "/accounts/seekers/",
      element: <ProfileSeeker/>
    },
    {
      path: "/accounts/shelters/",
      element: <ProfileShelter/>
    },
    {
      path: "/pets/",
      element: <PetListingsPage/>
    }
  ]);

  return (
    <div>
      <NavBar />
      <RouterProvider router={router} />
      <footer className="footer">
        <div className="container">
            <p>Copyright &copy; 2023 | Pet Pal </p>
        </div>
      </footer>
    </div>
    
  );
}

export default App;
