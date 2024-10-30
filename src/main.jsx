import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App'; // Main App component
import Home from './components/home/home'; // Home component
import Price from './components/price/Price';
import Vector from './components/vector';
import Order from './components/Order';
import Aboutus from './components/aboutus';
import Contact from './components/contact';
import TermsAndConditions from './components/Terms';
import Privacy from './components/Privacy';


import Login from './components/Login';
import Signup from './components/Signup';
import Client from './components/Clientpanel';
import './index.css'; // Ensure your CSS is being loaded

import Admin from "./components/Admin"

// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App component will render here
    children: [
      {
        path: '',
        element: <Home />, // Render the Home component
      },
      {
        path: '/price',
        element: <Price />,
      },
      {
        path: '/vector',
        element: <Vector />,
      },
      {
        path: '/order',
        element: <Order />,
      },
      {
        path: '/about',
        element: <Aboutus />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/terms',
        element: <TermsAndConditions />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
      },
    
   
    ],
  },
 
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
 
  {
    path: '/adminpanel',
    element: <Admin />,
  },

  {
    path: '/clientpanel',
    element: <Client />,
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

  
      <Main /> 
   

);
