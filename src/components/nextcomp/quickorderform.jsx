import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../store/vectorSlice';

const QuickOrderForm = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const [formData, setFormDataState] = useState(() => {
    const savedData = localStorage.getItem('quickOrderForm');
    return savedData ? JSON.parse(savedData) : {
      designName: '',
      customerName: '',
      customerEmail: '',
      phone: '',
      format: 'Corel Draw', // Default format
      location: '',
      file: null,
      fileUrl: null,
      height: '',
      width: '',
      colorName: '',
      expectedDelivery: '',
      comments: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('quickOrderForm', JSON.stringify(formData));
  }, [formData]);

  const locationOptions = [
    { value: "One Color Vector", price: 8 },
    { value: "Two Color Vector", price: 13 },
    { value: "Three Color Vector", price: 18 },
    { value: "Four Color Vector", price: 23 },
    { value: "Five Color Vector", price: 28 },
    { value: "Six Color Vector", price: 33 },
  ];

  const formatOptions = [
    { value: "Corel Draw" },
    { value: "Adobe Illustrator" },
    { value: "EPS Format" },
    { value: "WMF Format" },
    { value: "JPG Format" },
    { value: "BMP Format" },
    { value: "PDF Format" },
    { value: "Others" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'marketing');

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dgb4spjyk/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setFormDataState((prevData) => ({
          ...prevData,
          file: file,
          fileUrl: data.secure_url,
        }));
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const uniqueId = Date.now();
    const selectedLocation = formData.location
      ? locationOptions.find(option => option.value === formData.location)
      : locationOptions[0]; // Default to first location

    const price = selectedLocation ? selectedLocation.price : 0;
    const formatToSubmit = formData.format || 'Corel Draw';

    const newOrder = {
      id: uniqueId,
      designName: formData.designName,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      phone: formData.phone,
      format: formatToSubmit,
      location: selectedLocation.value,
      price: price,
      height: formData.height,
      width: formData.width,
      colorName: formData.colorName,
      fileUrl: formData.fileUrl,
      expectedDelivery: formData.expectedDelivery,
      comments: formData.comments,
    };

    dispatch(addOrder(newOrder));

    const form = new FormData();
    form.append('sid', '1694715');
    form.append('mode', '2CO');
    form.append('li_0_type', 'Digitizing Order');
    form.append('li_0_name', `${formData.designName} ID:-${uniqueId}`);
    form.append('li_0_price', price.toString());
    form.append('li_0_recurrence', 'No');

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
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Quick Vector Form
        </h2>

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
                {formatOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                No.of Colors
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
