import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const QuickOrderForm = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    designName: "",
    height: "",
    width: "",
    colorOptions: "",
    expectedDelivery: "",
    comments: "",
    file: null,
  });

  const navigate = useNavigate();

  const colorOptions = [
    { colors: 1, price: 8 },
    { colors: 2, price: 13 },
    { colors: 3, price: 18 },
    { colors: 4, price: 23 },
    { colors: 5, price: 28 },
    { colors: 6, price: 33 },
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
      return;
    }

    const selectedColorOption = colorOptions.find(option => option.colors === parseInt(formData.colorOptions));
    const price = selectedColorOption ? selectedColorOption.price : 0;

    // Create a unique ID for the item
    const uniqueId = Date.now(); // Using current timestamp as a unique ID

    const form = new FormData();
    form.append('sid', '1694715');
    form.append('mode', '2CO');
    form.append('li_0_type', 'Digitizing Order');
    // Combine design name with unique ID
    form.append('li_0_name', `${formData.designName} ID:-${uniqueId}`);
    form.append('li_0_price', price);
    form.append('li_0_recurrence', 'No');

    // Create a hidden form to submit
    const hiddenForm = document.createElement('form');
    hiddenForm.action = "https://www.2checkout.com/checkout/spurchase"; 
    hiddenForm.method = "post";

    for (const [key, value] of form.entries()) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        hiddenForm.appendChild(input);
    }

    document.body.appendChild(hiddenForm);
    hiddenForm.submit();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-300 to-orange-500">
      <div className="w-full bg-white p-10 shadow-lg rounded-2xl">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Quick Vector Form</h2>
        <form onSubmit={handleSubmit}>
          <label className="block font-semibold text-gray-800 mb-1">Design Name *</label>
          <input
            type="text"
            name="designName"
            className="w-full p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
            value={formData.designName}
            onChange={handleChange}
            placeholder="Enter Design Name"
            required
          />

          <label className="block font-semibold text-gray-800 mb-1">Size in Inches</label>
          <div className="flex space-x-4 mb-5">
            <input
              type="number"
              name="height"
              className="w-1/2 p-4 border border-gray-300 rounded-lg"
              value={formData.height}
              onChange={handleChange}
              placeholder="Height"
            />
            <input
              type="number"
              name="width"
              className="w-1/2 p-4 border border-gray-300 rounded-lg"
              value={formData.width}
              onChange={handleChange}
              placeholder="Width"
            />
          </div>

          <label className="block font-semibold text-gray-800 mb-1">Select Color Options *</label>
          <select
            name="colorOptions"
            className="w-full p-4 border font-raleway border-gray-300 rounded-lg mb-5"
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

          <label className="block font-semibold text-gray-800 mb-1">Upload File *</label>
          <input
            type="file"
            name="file"
            accept=".cdr,.ai,.eps,.wmf,.jpg,.bmp,.pdf"
            onChange={handleFileChange}
            required
            className="border border-gray-300 rounded-lg p-2 mb-5 w-full"
          />

          <label className="block font-semibold text-gray-800 mb-1">Expected Delivery Date *</label>
          <input
            type="date"
            name="expectedDelivery"
            className="w-full p-4 border border-gray-300 rounded-lg mb-5"
            value={formData.expectedDelivery}
            onChange={handleChange}
            required
          />

          <label className="block font-semibold text-gray-800 mb-1">Comments</label>
          <textarea
            name="comments"
            className="w-full p-4 border border-gray-300 rounded-lg mb-5"
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
  );
};

export default QuickOrderForm;
