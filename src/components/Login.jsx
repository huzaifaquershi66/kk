import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './store/authslice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve all users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Find the user that matches the email and password
    const storedUser = users.find(user => user.email === formData.email && user.password === formData.password);

    if (storedUser) {
      // Dispatch login action to update Redux state with the matched user
      dispatch(login(storedUser));
      alert('Login successful!');
      navigate('/order'); 
    } else {
      setError('Invalid email or password. Please make sure you are registered.');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 bg-gray-100">
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
          <p>If you are not registered, please signup</p>
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
