import React from 'react';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles/layout.css';
import NavBar from './components/shared/NavBar.jsx';
import ShelterDetail from './components/shelter/ShelterDetail.jsx';
import Login from './components/auth/Login.jsx';
import SignUp from './components/auth/SignUp.jsx'
import LandingPage from './components/landing/LandingPage.jsx';
import PetListingsPage from './components/listing/listings.jsx';
import Applications from './components/application/Application.jsx';
import ProfileSeeker from "./components/profile/ProfileSeeker.jsx";
import ProfileShelter from "./components/profile/ProfileShelter.jsx";
import ShelterManagement from './components/shelter/ShelterManagement.jsx';
import ApplicationFormUpdateModal from './components/application/ApplicationFormUpdateModal.jsx';
import PetUpdateModal from './components/shared/PetUpdateModal.jsx';
import ApplicationForms from './components/application/ApplicationForm.jsx';

const RootLayout = () => {
    return (<div id="body">
        <div id="content-wrap">
            <NavBar />
            <Outlet />
        </div>
        <footer className="footer">
            <div className="container">
                <p>Copyright &copy; 2023 | Pet Pal </p>
            </div>
        </footer>
    </div>)
}

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [{
                path: "",
                element: <LandingPage />,
            },
            {
                path: "shelterdetail/:shelterId/",
                element: <ShelterDetail />,
            },
            {
                path: "pets/manage/",
                element: <ShelterManagement />,
            },
            {
                path: "accounts/login/",
                element: <Login />
            },
            {
                path: "accounts/",
                element: <SignUp />
            },
            {
                path: "accounts/seekers/",
                element: <ProfileSeeker />
            },
            {
                path: "accounts/shelters/",
                element: <ProfileShelter />
            },
            {
                path: "pets/",
                element: <PetListingsPage />,
            },
            {
                path: "applications/",
                element: <Applications />
            },
            {
                path: "appform/",
                element: <ApplicationForms />
            },
            {
                path: "test/",
                element: <ApplicationFormUpdateModal />
            }]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
