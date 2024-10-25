import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setStep } from '../store/orderSlice';
import { useNavigate } from 'react-router-dom';

const QuickOrderForm = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [formData, setFormDataState] = useState({
    designName: '',
    customerName: '',
    customerEmail: '',
    phone: '',
    format: '',
    location: '',
    file: null,
    height: '',
    width: '',
    colorName: '',
    numberOfColors: '',
    fabric: '',
    expectedDelivery: '',
    comments: '',
  });
  const [submissionMessage, setSubmissionMessage] = useState('');

  const locationOptions = [
    { value: "LeftChest", price: 8 },
    { value: "CapsPrice", price: 8 },
    { value: "Pocket", price: 8 },
    { value: "JacketBack", price: 35 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormDataState((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
  
    const uniqueId = Date.now();
    const selectedLocation = locationOptions.find(option => option.value === formData.location);
    const price = selectedLocation ? selectedLocation.price : 0;
  
    console.log("Selected Location:", formData.location);
    console.log("Calculated Price:", price);
  
    const form = new FormData();
    form.append('sid', '1694715');
    form.append('mode', '2CO');
    form.append('li_0_type', 'Digitizing Order');
    form.append('li_0_name', `${formData.designName} ID:-${uniqueId}`);
    form.append('li_0_price', price);
    form.append('li_0_recurrence', 'No');
  
    for (const [key, value] of form.entries()) {
      console.log(key, value);
    }
  
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
  
    // Reset form data
    // ...
  };
  

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-300 to-orange-500">
      <div className="w-full bg-white p-10 shadow-lg rounded-2xl">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Quick Order Form
        </h2>

        {submissionMessage && (
          <div className="mb-4 p-2 text-green-600 bg-green-200 rounded">
            {submissionMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-raleway font-semibold text-gray-800 mb-1">
                Design Name *
              </label>
              <input
                type="text"
                name="designName"
                className="w-full p-4 border border-gray-300 rounded-lg"
                value={formData.designName}
                onChange={handleChange}
                placeholder="Enter Design Name"
                required
              />
            </div>

            {!isAuthenticated && (
              <>
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

            <div>
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Select Format *
              </label>
              <select
                name="format"
                className="w-full p-4 border font-raleway border-gray-300 rounded-lg"
                value={formData.format}
                onChange={handleChange}
                required
              >
                <option value="dst - Tajima">dst - Tajima</option>
                <option value="tap - Happy">tap - Happy</option>
                <option value="dsb - Barudan">dsb - Barudan</option>
                <option value="dsz - Zsk">dsz - Zsk</option>
                <option value="emb - Wilcom">emb - Wilcom</option>
                <option value="cnd - Melco, Amaya">cnd - Melco, Amaya</option>
                <option value="pes - Brother">pes - Brother</option>
                <option value="pxf - Pulse">pxf - Pulse</option>
                <option value="exp - Melco, Amaya">exp - Melco, Amaya</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Select Location *
              </label>
              <select
                name="location"
                className="w-full p-4 border border-gray-300 rounded-lg"
                value={formData.location}
                onChange={handleChange}
                required
              >
                {locationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.value} Price ${option.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Upload Design File
              </label>
              <input
                type="file"
                name="file"
                className="w-full p-4 border border-gray-300 rounded-lg"
                onChange={handleFileChange}
                required
              />
            </div>

            <div>
              <label className="block font-raleway font-semibold text-gray-800 mb-1">
                Size in Inches
              </label>
              <div className="flex space-x-4 mb-5">
                <input
                  type="number"
                  name="height"
                  className="w-full p-4 border border-gray-300 rounded-lg"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Height"
                  required
                />
                <input
                  type="number"
                  name="width"
                  className="w-full p-4 border border-gray-300 rounded-lg"
                  value={formData.width}
                  onChange={handleChange}
                  placeholder="Width"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-raleway font-semibold text-gray-800 mb-1">
                Name of Color *
              </label>
              <input
                type="text"
                name="colorName"
                className="w-full p-4 border border-gray-300 rounded-lg"
                value={formData.colorName}
                onChange={handleChange}
                placeholder="Enter Color Name"
                required
              />
            </div>

            <div>
              <label className="block font-raleway font-semibold text-gray-800 mb-1">
                Number of Colors *
              </label>
              <input
                type="number"
                name="numberOfColors"
                className="w-full p-4 border border-gray-300 rounded-lg"
                value={formData.numberOfColors}
                onChange={handleChange}
                placeholder="Enter Number of Colors"
                required
              />
            </div>

            <div>
              <label className="block font-raleway font-semibold text-gray-800 mb-1">
                Fabric Type *
              </label>
              <input
                type="text"
                name="fabric"
                className="w-full p-4 border border-gray-300 rounded-lg"
                value={formData.fabric}
                onChange={handleChange}
                placeholder="Enter Fabric Type"
                required
              />
            </div>

            <div>
              <label className="block font-raleway font-semibold text-gray-800 mb-1">
                Expected Delivery *
              </label>
              <input
                type="date"
                name="expectedDelivery"
                className="w-full p-4 border border-gray-300 rounded-lg"
                value={formData.expectedDelivery}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block font-raleway font-semibold text-gray-800 mb-1">
                Comments
              </label>
              <textarea
                name="comments"
                className="w-full p-4 border border-gray-300 rounded-lg"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Additional Comments"
                rows="4"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 bg-blue-600 font-raleway text-white p-3 rounded-lg w-full"
          >
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuickOrderForm;
