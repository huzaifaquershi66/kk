import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { db } from '../../firebase'; // Import your Firebase configuration
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth' // Import Firestore functions

const QuickOrderForm = () => {
  const [rushOrder, setRushOrder] = useState(false)
  const auth = getAuth(); // Get the Firebase Auth instance
  const user = auth.currentUser; // Get the currently signed-in user

  const isAuthenticated = !!user;
  const navigate = useNavigate();

  const [formData, setFormDataState] = useState(() => {
    const savedData = localStorage.getItem('quickOrderForm');
    return savedData
      ? JSON.parse(savedData)
      : {
          designName: '',
     
        
          format: 'Corel Draw',
          location: '',
          file: null,
          fileUrl: null,
          height: '',
          width: '',
          colorName: '',
          expectedDelivery: '',
          comments: '',
          numberOfColors: locationOptions[0].value
        };
  });

  useEffect(() => {
    localStorage.setItem('quickOrderForm', JSON.stringify(formData));
  }, [formData]);

  const locationOptions = [
    { value: 'One Color Vector', price: 8 },
    { value: 'Two Color Vector', price: 13 },
    { value: 'Three Color Vector', price: 18 },
    { value: 'Four Color Vector', price: 23 },
    { value: 'Five Color Vector', price: 28 },
    { value: 'Six Color Vector', price: 33 },
  ];

  const formatOptions = [
    { value: 'Corel Draw' },
    { value: 'Adobe Illustrator' },
    { value: 'EPS Format' },
    { value: 'WMF Format' },
    { value: 'JPG Format' },
    { value: 'BMP Format' },
    { value: 'PDF Format' },
    { value: 'Others' },
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
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dgb4spjyk/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
  
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const selectedLocation = formData.numberOfColors
      ? locationOptions.find(option => option.value === formData.numberOfColors)
      : locationOptions[0];
  
    const basePrice = selectedLocation ? selectedLocation.price : 0;
    const price = rushOrder ? basePrice + 5 : basePrice;
  
    const newOrder = {
      uid: user.uid,
      id: uniqueId,
      designName: formData.designName,
  
 
      format: formData.format || 'Corel Draw',
      location: selectedLocation.value,
      price: price,
      height: formData.height,
      width: formData.width,
      colorName: formData.colorName,
      fileUrl: formData.fileUrl,
      expectedDelivery: formData.expectedDelivery,
      status: "Pending",
      comments: formData.comments,
      isRush: rushOrder,
      createdAt: new Date(),
    };
    console.log("New order data:", newOrder);

    try {
      const docRef = await addDoc(collection(db, 'vectors'), newOrder);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
      // Display error message to user if needed
    }

    // Proceed to payment or any further action
    const form = new FormData();
    form.append('sid', '1694715');
    form.append('mode', '2CO');
    form.append('li_0_type', 'Digitizing Order');
    form.append('li_0_name', `${formData.designName} ID:-${uniqueId}`);
    form.append('li_0_price', price.toString());
    form.append('li_0_recurrence', 'No');

    const hiddenForm = document.createElement('form');
    hiddenForm.action = 'https://www.2checkout.com/checkout/spurchase';
    hiddenForm.method = 'post';

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
    <div className="flex items-center justify-center min-h-screen overflow-y-auto">
    <div className="w-full max-h-[96vh] bg-white p-10 shadow-lg rounded-2xl">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Quick Vector Form
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className='xl:w-[1250px] w-full'>
            <label htmlFor="designName" className="block font-raleway font-semibold text-gray-800 mb-1">
              Design Name *
            </label>
            <input
              type="text"
              name="designName"
              id="designName"
              className="w-full p-4 border border-gray-300 rounded-lg"
              value={formData.designName}
              onChange={handleChange}
              placeholder="Enter Design Name"
              required
            />
          </div>
          <div className="col-span-full flex items-center">
              <input
                type="checkbox"
                id="rushOrder"
                checked={rushOrder}
                onChange={() => setRushOrder(prev => !prev)} // Toggle the rush order state
                className="mr-2"
              />
              <label htmlFor="rushOrder" className="font-semibold text-gray-800">
                Rush Order (+$5)
              </label>
              </div>

          {/* <div>
            <label htmlFor="customerName" className="block font-semibold font-raleway text-gray-800 mb-1">
              Customer Name *
            </label>
            <input
              type="text"
              name="customerName"
              id="customerName"
              className="w-full p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter Customer Name"
              required
            />
          </div> */}
          {/* <div>
            <label htmlFor="customerName" className="block font-semibold font-raleway text-gray-800 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              name="companyname"
              id="companyname"
              className="w-full p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
              value={formData.companyname}
              onChange={handleChange}
              placeholder="Enter Company name"
              required
            />
          </div> */}
{/* 
          <div>
            <label htmlFor="phone" className="block font-semibold font-raleway text-gray-800 mb-1">
              Phone Number *
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="w-full p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              required
            />
          </div> */}
{/* 
          <div>
            <label htmlFor="customerEmail" className="block font-semibold font-raleway text-gray-800 mb-1">
              Customer Email *
            </label>
            <input
              type="email"
              name="customerEmail"
              id="customerEmail"
              className="w-full p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
              value={formData.customerEmail}
              onChange={handleChange}
              placeholder="Enter Customer Email"
              required
            />
          </div> */}

          <div>
            <label htmlFor="format" className="block font-semibold font-raleway text-gray-800 mb-1">
              Select Format *
            </label>
            <select
              name="format"
              id="format"
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
            <label htmlFor="numberOfColors" className="block font-semibold font-raleway text-gray-800 mb-1">
              No. of Colors *
            </label>
            <select
              name="numberOfColors"
              id="numberOfColors"
              className="w-full p-4 border border-gray-300 rounded-lg"
              value={formData.numberOfColors}
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
            <label htmlFor="file" className="block font-semibold font-raleway text-gray-800 mb-1">
              Upload Design File
            </label>
            <input
              type="file"
              name="file"
              id="file"
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
            <label htmlFor="colorName" className="block font-raleway font-semibold text-gray-800 mb-1">
              Name of Color *
            </label>
            <input
              type="text"
              name="colorName"
              id="colorName"
              className="w-full p-4 border border-gray-300 rounded-lg"
              value={formData.colorName}
              onChange={handleChange}
              placeholder="Enter Color Name"
              required
            />
          </div>

          <div>
            <label htmlFor="expectedDelivery" className="block font-raleway font-semibold text-gray-800 mb-1">
              Expected Delivery *
            </label>
            <input
              type="date"
              name="expectedDelivery"
              id="expectedDelivery"
              className="w-full p-4 border border-gray-300 rounded-lg"
              value={formData.expectedDelivery}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="comments" className="block font-raleway font-semibold text-gray-800 mb-1">
              Comments
            </label>
            <textarea
              name="comments"
              id="comments"
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
