import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form submission logic here
    alert('Thank you! Your message has been submitted.');
  };

  return (
    <>
    <div className='h-[600px] w-full overflow-hidden relative m-0 p-0'>
    <img
      className='h-full w-full object-cover transition-opacity duration-700'
      src="https://t3.ftcdn.net/jpg/06/08/82/50/360_F_608825085_MuQopoWCJQJ8BUa4u2z1DECXtkuoVLmj.jpg"
      alt='Slider Image'
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-league font-extrabold text-white bg-black bg-opacity-70 p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
    Contact Us
      </h2>
    </div>
  </div> 
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-16">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-gray-100 drop-shadow-lg">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-300">
            Get in touch with us for any inquiries or questions.
          </p>
        </div>

        {/* Contact Information & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-bold text-gray-100 mb-6">7 STAR DIGITIZING</h2>
            <p className="text-lg text-gray-300 mb-6">
              L370/4E, Sector 14-A, <br /> North Karachi, Karachi, Sindh, <br /> Pakistan.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              <strong>Email:</strong> <a href="mailto:admin@7stardigitizing.com" className="text-blue-400">admin@7stardigitizing.com</a>
            </p>
            <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <img
                className="w-full h-64 object-cover"
                src="https://aeontrisl.pk/wp-content/uploads/2023/12/Guide-to-Buying-Property-in-Karachi-Pakistan.jpg"
                alt="North Karachi"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-4xl font-semibold text-gray-100 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 text-lg mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-lg mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-lg mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                  rows="6"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ContactUs;
