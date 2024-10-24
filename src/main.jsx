import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App'; // Main App component
import Home from './components/home/home'; // Home component
 // Optional: A 404 not found component
import './index.css'; // Ensure your CSS is being loaded
import Price from './components/price/Price';
import Vector from "./components/vector"
import Order from './components/Order';
import Aboutus from './components/aboutus';
import Contact from './components/contact';
import TermsAndConditions from './components/Terms';
import PreviousMap from 'postcss/lib/previous-map';
import Privacy from './components/Privacy';
// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App component will render here
    children: [
      {
        path: '', // Default route that renders when the path is '/'
        element: <Home />, // Render the Home component
      },
      {
        path:"/price",
        element:<Price/>
      },
      {
        path:"/vector",
        element:<Vector/>
      },
      {
        path:"/order",
        element:<Order/>
      },
      {
        path:"/about",
        element:<Aboutus/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path:"/terms",
        element:<TermsAndConditions/>
      },
      {
        path:"/privacy",
        element:<Privacy/>
      }
   
   
   
    ],
  },
]);

const Main = () => {
  return (
    <RouterProvider router={router} /> // Set up the router provider
  );
};

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main /> {/* Main component ko yahan render karein */}
  </React.StrictMode>
);