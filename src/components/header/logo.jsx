import React from 'react';

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-5xl font-bold text-blue-600">
        7 Star Digitizing
      </div>
      <div className="text-xl mt-2 text-gray-600">
        Where Creativity Meets Quality
      </div>
      <div className="mt-4">
        <img
          src="your-image-url-here" // Replace with your logo image URL
          alt="7 Star Digitizing Logo"
          className="w-32 h-32"
        />
      </div>
    </div>
  );
};

export default Logo;
