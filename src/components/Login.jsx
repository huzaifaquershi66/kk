// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; // Import your firebase configuration
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in with email and password using Firebase
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert('Login successful!');
      navigate('/order'); // Redirect to admin panel
    } catch (error) {
      setError('Invalid email or password. Please try again.'); // Show error message
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); // Redirect to signup page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 p-2 rounded mb-4 w-full"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="border border-gray-300 p-2 rounded mb-4 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mb-4">
          Login
        </button>
        <div className="text-center mt-4">
          <p>Don’t have an account?</p>
          <button 
            type="button" 
            onClick={handleSignupRedirect} 
            className="mt-2 text-blue-500 underline"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
