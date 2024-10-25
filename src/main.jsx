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
import OrderDashboard from './components/Dashboard';
import store from './components/store/store';
import Login from './components/Login';
import Signup from './components/Signup';

import './index.css'; // Ensure your CSS is being loaded



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
    path: '/admin',
    element: <OrderDashboard />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
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
  <Provider store={store}>
  
      <Main /> {/* Main component */}
   
  </Provider>
);
