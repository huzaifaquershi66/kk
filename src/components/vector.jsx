import React from 'react';
import QuickOrderForm from './nextcomp/quickorderform';

const Vector = () => {
  return (
    <>
      <div className='bg-gray-200'>
        <div className='h-[300px] w-full overflow-hidden relative m-0 p-0'>
          <img
            className='h-full w-full object-cover transition-opacity duration-700'
            src="https://www.unite.ai/wp-content/uploads/2023/05/AI-Graphic-design-tools.png"
            alt='Slider Image'
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl font-bold text-white">Vector Design Tools</h2>

            {/* Description Paragraph */}
            <div className="text-center mt-4 p-4 bg-black bg-opacity-50 rounded-lg shadow-lg">
              <p className="text-lg font-bold text-white">
                Create stunning vector designs effortlessly with our advanced tools.
                Enjoy a seamless experience from concept to completion!
              </p>
            </div>
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="max-w-7xl mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First Image */}
          <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <img
              className="w-full h-48 object-cover"
              src="https://i.graphicmama.com/blog/wp-content/uploads/2017/08/14092035/38.jpg"
              alt="Vector Design 1"
            />
          </div>

          {/* Second Image */}
          <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <img
              className="w-full h-48 object-cover"
              src="https://assets-global.website-files.com/5e6a544cadf84b1393e2e022/611ab0780dfa1bdf8271567f_Rugby_Tsevis.png"
              alt="Vector Design 2"
            />
          </div>

          {/* Third Image */}
          <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <img
              className="w-full h-48 object-cover"
              src="https://img.pikbest.com/backgrounds/20211225/luxury-background-vector-design-red-and-black_6195836.jpg!w700wp"
              alt="Vector Design 3"
            />
          </div>
        </div>
      </div>

      <QuickOrderForm />
    </>
  );
}

export default Vector;
