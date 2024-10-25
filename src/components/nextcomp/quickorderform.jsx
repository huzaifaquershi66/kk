import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Login from '../Login'; // Adjust the import path
import Signup from '../Signup'; // Import Signup component

const QuickOrderForm = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false); // New state for showing signup
  const [formData, setFormData] = useState({
    designName: "",
    customerName: "",
    customerEmail: "",
    height: "",
    width: "",
    phone: "",
    colorOptions: "",
    format: ".cdr", // Default format
    expectedDelivery: "",
    comments: "",
    file: null,
    selectedColor: 1, // Default color option
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const colorOptions = [
    { colors: 1, price: 8 },
    { colors: 2, price: 13 },
    { colors: 3, price: 18 },
    { colors: 4, price: 23 },
    { colors: 5, price: 28 },
    { colors: 6, price: 33 },
  ];

  const fileFormats = [
    { value: ".cdr", label: "Corel Draw" },
    { value: ".ai", label: "Adobe Illustrator" },
    { value: ".eps", label: "EPS Format" },
    { value: ".wmf", label: "WMF Format" },
    { value: ".jpg", label: "JPG Format" },
    { value: ".bmp", label: "BMP Format" },
    { value: ".pdf", label: "PDF Format" },
    { value: "others", label: "Others" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowLogin(true);
      return; // Prevent form submission if not authenticated
    }
    console.log(formData);
    // Handle form submission logic here
  };


  const handleLoginRedirect = () => {
    navigate('/login');
   // Redirect to login page
  };
  console.log(isAuthenticated);

  return (
    <>
      {/* {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />} Render Signup if showSignup is true */}




        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-300 to-orange-500">
          <div className="w-full bg-white p-10 shadow-lg rounded-2xl">
            <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
              Quick Vector Form
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Design Name */}
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Design Name *
              </label>
              <input
                type="text"
                name="designName"
                className="w-full p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
                value={formData.designName}
                onChange={handleChange}
                placeholder="Enter Design Name"
                required
              />
{/* Step 2 & 3: Customer Name and Customer Email */}
{!isAuthenticated && (
  <>
    {/* Step 2: Customer Name */}
    <label className="block font-semibold font-raleway text-gray-800 mb-1">
      Customer Name *
    </label>
    <input
      type="text"
      name="customerName"
      className="w-full p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
      value={formData.customerName}
      onChange={handleChange}
      placeholder="Enter Customer Name"
      required
    />

    {/* Step 3: Customer Email */}
    <label className="block font-semibold font-raleway text-gray-800 mb-1">
      Customer Email *
    </label>
    <input
      type="email"
      name="customerEmail"
      className="w-full p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
      value={formData.customerEmail}
      onChange={handleChange}
      placeholder="Enter Customer Email"
      required
    />
  </>
)}

              {/* Step 4: Phone Number */}
              {/* <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
              /> */}

              {/* Step 5: Size in Inches */}
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Size in Inches
              </label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  name="height"
                  className="w-1/2 p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Height"
                />
                <input
                  type="number"
                  name="width"
                  className="w-1/2 p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
                  value={formData.width}
                  onChange={handleChange}
                  placeholder="Width"
                />
              </div>

              {/* Step 6: Select Color Options */}
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Select Color Options *
              </label>
              <select
                name="colorOptions"
                className="w-full p-4 border font-raleway border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
                value={formData.colorOptions}
                onChange={handleChange}
                required
              >
                {colorOptions.map((option) => (
                  <option key={option.colors} value={option.colors}>
                    {option.colors} Colors - ${option.price}
                  </option>
                ))}
              </select>

              {/* Step 7: Upload File */}
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Upload File *
              </label>
              <input
                type="file"
                name="file"
                accept=".cdr,.ai,.eps,.wmf,.jpg,.bmp,.pdf"
                onChange={handleFileChange}
                required
                className="border border-gray-300 rounded-lg p-2 mb-5 w-full"
              />

              {/* Step 8: File Format Selection */}
              <label className="block font-semibold text-gray-800 mb-1">
                Select Format *
              </label>
              <select
                name="format"
                className="w-full p-4 border font-raleway border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
                value={formData.format}
                onChange={handleChange}
                required
              >
                {fileFormats.map((format) => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>

              {/* Step 9: Expected Delivery Date */}
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Expected Delivery Date *
              </label>
              <input
                type="date"
                name="expectedDelivery"
                className="w-full p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
                value={formData.expectedDelivery}
                onChange={handleChange}
                required
              />

              {/* Step 10: Additional Comments */}
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Comments
              </label>
              <textarea
                name="comments"
                className="w-full p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Add any comments or additional information here"
                rows="4"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Checkout
              </button>
            </form>
          </div>
        </div>
   
    </>
  );
};

export default QuickOrderForm;
