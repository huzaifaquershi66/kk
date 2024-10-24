import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto text-center">
        {/* Newsletter Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Newsletter</h2>
          <form className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-l-md border border-gray-300 focus:outline-none"
              required
            />
            <button className="bg-blue-500 text-white p-3 rounded-r-md hover:bg-blue-600 transition-colors">
              Subscribe
            </button>
          </form>
        </div>

        {/* Links Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 px-4">
          {/* Left Column */}
          <div className="flex flex-col md:flex-row md:space-x-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-blue-400 whitespace-nowrap">Home</a>
            <a href="#" className="hover:text-blue-400 whitespace-nowrap">About Us</a>
            <a href="#" className="hover:text-blue-400 whitespace-nowrap">Price</a>
            <a href="#" className="hover:text-blue-400 whitespace-nowrap">Order Now</a>
          </div>

          {/* Right Column */}
          <div className="flex flex-col md:flex-row md:space-x-6">
            <a href="#" className="hover:text-blue-400 whitespace-nowrap">Vector Now</a>
            <a href="#" className="hover:text-blue-400 whitespace-nowrap">Contact Us</a>
            <a href="#" className="hover:text-blue-400 whitespace-nowrap">Terms & Conditions</a>
            <a href="#" className="hover:text-blue-400 whitespace-nowrap">Privacy Policy</a>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="hover:text-blue-400 flex items-center whitespace-nowrap">
            <FontAwesomeIcon icon={faFacebook} className="mr-1 text-blue-500" /> Facebook
          </a>
          <a href="#" className="hover:text-blue-400 flex items-center whitespace-nowrap">
            <FontAwesomeIcon icon={faTwitter} className="mr-1 text-blue-500" /> Twitter
          </a>
          <a href="#" className="hover:text-blue-400 flex items-center whitespace-nowrap">
            <FontAwesomeIcon icon={faGooglePlusG} className="mr-1 text-blue-500" /> Google+
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm">
          <p className="whitespace-nowrap">Copyright © 2012 - 2025 | 7StarDigitizing.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
