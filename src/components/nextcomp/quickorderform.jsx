import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faUpload } from "@fortawesome/free-solid-svg-icons";

const QuickOrderForm = () => {
  const [step, setStep] = useState(1);
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

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-300 min-h-screen p-10 font-sans">
      <div className="w-full max-w-4xl bg-white p-10 shadow-lg rounded-2xl transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Quick Vector Form
        </h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              {/* Design Name */}
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

              {/* Customer Name */}
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
            </div>
          )}

          {step === 2 && (
            <div>
              {/* Customer Email */}
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

              {/* Phone Number */}
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
              />
            </div>
          )}

          {step === 3 && (
            <div>
              {/* Size in Inches */}
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

              {/* Select Color Options */}
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

              {/* Upload File */}
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Upload File *
              </label>
              <input
                type="file"
                name="file"
                accept=".cdr,.ai,.eps,.wmf,.jpg,.bmp,.pdf"
                onChange={handleFileChange}
                required
                className="border border-gray-300 rounded-lg p-2 mb-5"
              />

              {/* File Format Selection */}
              <label className="block font-semibold text-gray-800 mb-1">
                Select  Format *
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

              {/* Expected Delivery Date */}
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Expected Delivery Date *
              </label>
              <input
                type="date"
                name="expectedDelivery"
                className="w-full p-4 border font-raleway border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
                value={formData.expectedDelivery}
                onChange={handleChange}
                required
              />

              {/* Comments */}
              <label className="block font-semibold font-raleway text-gray-800 mb-1">
                Comments
              </label>
              <textarea
                name="comments"
                className="w-full p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-purple-600"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Add any comments or instructions..."
              />
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button type="button" onClick={handlePrev} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
                Back
              </button>
            )}
            {step < 3 ? (
              <button type="button" onClick={handleNext} className="bg-purple-600 text-white px-4 py-2 rounded-lg">
                Next
              </button>
            ) : (
              <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg">
                Submit Order
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickOrderForm;
