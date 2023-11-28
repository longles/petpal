import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from './components/shared/NavBar';
import ShelterDetail from './components/shelter/ShelterDetail';

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
  ]);

  return (
    <div>
      <NavBar />
      <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
