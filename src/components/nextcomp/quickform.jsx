import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData, setStep } from '../store/orderSlice';
import { useSelector } from 'react-redux'; // Adjust import according to your setup
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
    colorOptions: '',
    expectedDelivery: '',
    comments: '',
  });
  const [submissionMessage, setSubmissionMessage] = useState('');

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
    console.log(formData);

    // Set the submission message
    setSubmissionMessage('Your form has been submitted successfully!');

    // Reset form data
    dispatch(setFormData({
      designName: '',
      customerName: '',
      customerEmail: '',
      phone: '',
      format: '',
      location: '',
      file: null,
      height: '',
      width: '',
      colorOptions: '',
      expectedDelivery: '',
      comments: ''
    }));

    // Reset step to the initial step
    dispatch(setStep(1));
  };

  const navigate = useNavigate()
  const handleLoginRedirect = () => {
    navigate('/login');
   // Redirect to login page
  };
  console.log(isAuthenticated)
 

  return (
    <>
  
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-300 to-orange-500">
      <div className="w-full bg-white p-10 shadow-lg rounded-2xl"> {/* Removed max-w for full screen width */}
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

        

            <div>
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full p-4 border border-gray-300 rounded-lg"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                required
              />
            </div>

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
                <option value="LeftChest">Left Chest Price $8</option>
                <option value="CapsPrice">Caps Price $8</option>
                <option value="Pocket">Pocket Size 5X5 Price $8</option>
                <option value="JacketBack">Jacket Back Price $35</option>
              </select>
            </div>

            <div>
              <label className="block font-raleway font-semibold text-gray-800 mb-1">
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
                Color Options *
              </label>
              <input
                type="text"
                name="colorOptions"
                className="w-full p-4 border border-gray-300 rounded-lg"
                value={formData.colorOptions}
                onChange={handleChange}
                placeholder="Color Options"
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
            Submit
          </button>
        </form>
      </div>
    </div>

   </>
 );
};

export default QuickOrderForm;
