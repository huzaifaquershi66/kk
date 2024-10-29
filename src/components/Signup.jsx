// src/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth,db } from '../../firebase'; // Import your firebase configuration
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc,doc, } from 'firebase/firestore';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    fullName: '',
    phone: '',
    company: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Import Firestore methods
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Create user with email and password using Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
  
      // Create a user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        phone: formData.phone,
        company: formData.company,
        uid: user.uid // Store the user's UID
      });
  
      alert('Signup successful!');
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      alert(error.message); // Show error if signup fails
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Signup</h2>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="border border-gray-300 p-3 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 p-3 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="border border-gray-300 p-3 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border border-gray-300 p-3 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company Name"
          className="border border-gray-300 p-3 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="border border-gray-300 p-3 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg w-full hover:bg-blue-700 transition duration-200">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
