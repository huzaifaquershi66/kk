import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faUpload } from "@fortawesome/free-solid-svg-icons";

const QuickOrderForm = () => {
  const [step, setStep] = useState(1); // Track the current step
  const [formData, setFormData] = useState({
    designName: "",
    customerName: "",
    customerEmail: "",
    height: "",
    width: "",
    phone: "",
    colorOptions: "",
    format: "Corel Draw",
    expectedDelivery: "",
    comments: "",
    file: null,
    selectedColor: "",
    fabric: "",
    location: "",
    numberOfColors: 1,
  });

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

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 min-h-screen p-10 font-sans">
      <div className="w-full max-w-4xl bg-white p-10 shadow-lg rounded-2xl transition-transform transform hover:scale-105">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Quick Order Form
        </h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              {/* Design Name */}
              <label className="block font-raleway font-semibold text-gray-800 mb-1">
                Design Name *
              </label>
              <input
                type="text"
                name="designName"
                className="w-full p-4 mb-5 border border-gray-300 rounded-lg"
                value={formData.designName}
                onChange={handleChange}
                placeholder="Enter Design Name"
                required
              />

              {/* Customer Name */}
              <label className="block font-raleway font-semibold text-gray-800 mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                name="customerName"
                className="w-full p-4 mb-5 border border-gray-300 rounded-lg"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter Customer Name"
                required
              />

              {/* Next Button */}
              <button
                type="button"
                className="bg-blue-600 font-raleway text-white p-3 rounded-lg"
                onClick={nextStep}
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {/* Customer Email */}
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Customer Email *
              </label>
              <input
                type="email"
                name="customerEmail"
                className="w-full p-4 mb-5 border border-gray-300 rounded-lg"
                value={formData.customerEmail}
                onChange={handleChange}
                placeholder="Enter Customer Email"
                required
              />

              {/* Phone Number */}
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full p-4 mb-5 border border-gray-300 rounded-lg"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                required
              />

              {/* Format Select */}
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Select Format *
              </label>
              <select
                name="format"
                className="w-full p-4 mb-5 border font-raleway border-gray-300 rounded-lg"
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

              {/* Location Select */}
              <label className="block font-raleway font-semibold text-gray-800 mb-1">
                Select Location *
              </label>
              <select
                name="location"
                className="w-full p-4 mb-5 font-raleway border border-gray-300 rounded-lg"
                value={formData.location}
                onChange={handleChange}
                required
              >
                <option value="LeftChest">Left Chest Price $8</option>
                <option value="CapsPrice">Caps Price $8</option>
                <option value="Pocket">Pocket Size 5X5 Price $8</option>
                <option value="JacketBack">Jacket Back Price $35</option>
              </select>

              {/* File Upload */}
              <label className="block font-raleway font-semibold text-gray-800 mb-1">
                Upload Design File
              </label>
              <input
                type="file"
                name="file"
                className="w-full p-4 mb-5 border border-gray-300 rounded-lg"
                onChange={handleFileChange}
                required
              />

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 font-raleway text-white p-3 rounded-lg"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="bg-blue-600 font-raleway text-white p-3 rounded-lg"
                  onClick={nextStep}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              {/* Height and Width */}
              <label className="block font-raleway font-semibold text-gray-800 mb-1">
                Size in Inches
              </label>
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

              {/* Fabric Type */}
              <label className="block font-raleway font-semibold text-gray-800 mb-1">
                Fabric Type *
              </label>
              <input
                type="text"
                name="fabric"
                className="w-full p-4 mb-5 border border-gray-300 rounded-lg"
                value={formData.fabric}
                onChange={handleChange}
                placeholder="Enter Fabric Type"
                required
              />

              {/* Number of Colors */}
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Number of Colors
              </label>
              <input
                type="number"
                name="numberOfColors"
                className="w-full p-4 mb-5 border border-gray-300 rounded-lg"
                value={formData.numberOfColors}
                onChange={handleChange}
                placeholder="Number of Colors"
              />

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 font-raleway text-white p-3 rounded-lg"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 font-raleway text-white p-3 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default QuickOrderForm;
