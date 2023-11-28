import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles/layout.css';
import NavBar from './components/shared/NavBar.jsx';
import ShelterDetail from './components/shelter/ShelterDetail.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx'


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
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
      path: "/signup/",
      element: <Signup/>
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
