import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db,auth } from '../../firebase';
import { getAuth } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore';

const QuickOrderFormagain = () => {
  const [rushOrder, setRushOrder] = useState(false);
  const auth = getAuth(); // Get the Firebase Auth instance
  const user = auth.currentUser; // Get the currently signed-in user

  const isAuthenticated = !!user;

  const navigate = useNavigate();

  const [formData, setFormDataState] = useState(() => {
    const savedData = localStorage.getItem('quickOrderForm');
    return savedData ? JSON.parse(savedData) : {
      designName: '',
      customerName: '',
      companyname: '',
      customerEmail: '',
      phone: '',
      format: 'dst - Tajima',
      location: '',
      file: null,
      fileUrl: null,
      height: '',
      width: '',
      colorName: '',
      numberOfColors: '',
      fabric: '',
      expectedDelivery: '',
      comments: '',
      
    };
  });

  useEffect(() => {
    localStorage.setItem('quickOrderForm', JSON.stringify(formData));
  }, [formData]);

  const locationOptions = [
    { value: "LeftChest", price: 8 },
    { value: "CapsPrice", price: 8 },
    { value: "Pocket", price: 8 },
    { value: "JacketBack", price: 35 },
  ];

  const formatOptions = [
    { value: "dst - Tajima" },
    { value: "tap - Happy" },
    { value: "dsb - Barudan" },
    { value: "dsz - Zsk" },
    { value: "emb - Wilcom" },
    { value: "cnd - Melco, Amaya" },
    { value: "pes - Brother" },
    { value: "pxf - Pulse" },
    { value: "exp - Melco, Amaya" },
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const selectedLocation = formData.location
   ? locationOptions.find(option => option.value === formData.location)
   : locationOptions[0];

      const basePrice = selectedLocation ? selectedLocation.price : 0;
      const price = rushOrder ? basePrice + 5 : basePrice;

    const newOrder = {
      id: uniqueId,
      uid: user.uid,
      designName: formData.designName,
  
      format: formData.format,
      location: selectedLocation.value,
      price: price,
      height: formData.height,
      width: formData.width,
      colorName: formData.colorName,
      numberOfColors: formData.numberOfColors,
      fabric: formData.fabric,
      fileUrl: formData.fileUrl,
      expectedDelivery: formData.expectedDelivery,
      status: "Pending",
      comments: formData.comments,
      isRush: rushOrder,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, 'orders'), newOrder);
      alert('Order submitted successfully');
      setFormDataState({
        designName: '',
        customerName: '',
        customerEmail: '',
        phone: '',
        format: 'dst - Tajima',
        location: '',
        file: null,
        fileUrl: null,
        height: '',
        width: '',
        colorName: '',
        numberOfColors: '',
        fabric: '',
        expectedDelivery: '',
        comments: '',
      });

      // 2Checkout payment form submission
      const form = new FormData();
      form.append('sid', '1694715');
      form.append('mode', '2CO');
      form.append('li_0_type', 'Digitizing Order');
      form.append('li_0_name', `${formData.designName} ID:-${uniqueId}`);
      form.append('li_0_price', price);
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
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div className="flex items-center overflow-x-hidden overflow-y-auto justify-center min-h-screen   ">
    <div className="w-full bg-white max-h-[96vh]  p-10 shadow-lg rounded-2xl">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Quick Order Form
      </h2>
  
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className='xl:w-[1250px] w-full'>
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
  
          <div>
            <label className="block font-semibold font-raleway text-gray-800 mb-1">
              Select Format *
            </label>
            <select
              name="format"
              className="w-full p-4 border border-gray-300 rounded-lg"
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
          className="mb-10 bg-blue-600 font-raleway text-white p-3 rounded-lg w-full"
        >
          Checkout
        </button>
      </form>
    </div>
  </div>

  
  );
};

export default QuickOrderFormagain;