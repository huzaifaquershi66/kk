import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Price = () => {
  return (
    <>
      <div className="bg-gray-100">
        <div className='h-[300px] w-full overflow-hidden relative m-0 p-0'>
          <img
            className='h-full w-full object-cover transition-opacity duration-700'
            src="https://cdn.pixabay.com/photo/2015/05/14/14/01/advertise-766823_1280.jpg"
            alt='Slider Image'
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl font-league font-extrabold text-white bg-black bg-opacity-70 p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              Price Table
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center mt-10">
          <h2 className="text-5xl font-bold font-league text-gray-800">Do Not Any Hidden Charge</h2>
          <h3 className="text-4xl font-semibold font-league text-gray-800 mt-4">Choose Your Pricing Plan</h3>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
          {/* Pricing Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 transition-transform transform hover:scale-105 duration-300 relative">
            <h4 className="text-2xl font-bold font-sansing text-center  mb-4">Left Chest Logo</h4>
            <p className="text-gray-600 mb-4 font-sansing">Get your logo embroidered on the left chest for a professional look.</p>
            <h5 className="font-semibold text-center font-raleway text-3xl mb-2">$8</h5>
            <ul className="list-disc list-inside mb-4 text-gray-800">
              <li className="flex items-center font-sansing">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                Fast Turnaround
              </li>
              <li className="flex items-center font-sansing">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                High-Quality Stitching
              </li>
              <li className="flex items-center font-sansing">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                Custom Sizes Available
              </li>
            </ul>
            <div className="flex justify-center mt-6 font-sansing">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105">
                Contact Us
              </button>
            </div>
          </div>

          {/* Pricing Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 transition-transform transform hover:scale-105 duration-300 relative">
            <h4 className="text-2xl font-bold text-center mb-4 font-sansing">Cap Logo</h4>
            <p className="text-gray-600 mb-4 font-sansing">Customize your cap with your brand's logo for a unique style.</p>
            <h5 className="font-semibold text-center text-3xl font-raleway mb-2">$10</h5>
            <ul className="list-disc list-inside mb-4 text-gray-800">
              <li className="flex items-center font-sansing">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                Premium Fabric
              </li>
              <li className="flex items-center font-sansing">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                Personalization Options
              </li>
              <li className="flex items-center font-sansing">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                Multiple Colors Available
              </li>
            </ul>
            <div className="flex justify-center mt-6">
              <button className="bg-blue-600 font-sansing text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105">
                Contact Us
              </button>
            </div>
          </div>

          {/* Pricing Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 transition-transform transform hover:scale-105 duration-300 relative">
            <h4 className="text-2xl font-bold text-center mb-4 font-sansing">Pocket Size 5x5</h4>
            <p className="text-gray-600 mb-4 font-sansing">Perfect for smaller designs, get your logo in a 5x5 format.</p>
            <h5 className="font-semibold text-center text-3xl font-raleway mb-2">$8</h5>
            <ul className="list-disc list-inside mb-4 text-gray-800">
              <li className="flex items-center">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2 font-sansing" />
                Detailed Embroidery
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2 font-sansing" />
                Customizable Colors
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2 font-sansing" />
                Great for Promotional Items
              </li>
            </ul>
            <div className="flex justify-center mt-6">
              <button className="bg-blue-600 font-sansing text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105">
                Contact Us
              </button>
            </div>
          </div>

          {/* Pricing Card 4 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 transition-transform transform hover:scale-105 duration-300 relative">
            <h4 className="text-2xl font-bold text-center mb-4 font-sansing">Jacket Back Logo</h4>
            <p className="text-gray-600 mb-4 font-sansing">Make a statement with a large logo on the back of your jacket.</p>
            <h5 className="font-semibold text-center text-3xl font-raleway mb-2">$35</h5>
            <ul className="list-disc list-inside mb-4 text-gray-800">
              <li className="flex items-center font-sansing">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                Large Format Printing
              </li>
              <li className="flex items-center font-sansing">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                Durable Materials
              </li>
              <li className="flex items-center font-sansing">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                Perfect for Teams
              </li>
            </ul>
            <div className="flex justify-center mt-6">
              <button className="bg-blue-600 font-sansing text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105">
                Contact Us
              </button>
            </div>
          </div>

          {/* New Pricing Card: Vector Pricing */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 transition-transform transform hover:scale-105 duration-300 relative h-[480px]">
            <h4 className="text-2xl font-bold text-center mb-4 font-sansing">Vector Pricing</h4>
            <p className="text-gray-600 font-sansing mb-4">Transform your designs into scalable vector graphics for any use.</p>
            <h5 className="font-semibold text-black font-raleway">Prices:</h5>
            <ul className="list-disc list-inside mb-4">
              <li className="text-black font-sansing">One Color Vector - <span className="font-semibold font-raleway">$8</span></li>
              <li className="text-black font-sansing">Full Color Vector - <span className="font-semibold font-raleway">$35</span></li>
            </ul>
            <div className="flex justify-center mt-6">
              <button className="bg-green-400 font-sansing text-white px-6 py-2 rounded-md hover:bg-white hover:text-green-600 transition duration-300 shadow-md transform hover:scale-105">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Price;
