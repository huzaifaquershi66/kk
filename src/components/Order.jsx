import React from 'react';
import QuickForm from './nextcomp/quickform';

const Order = () => {
  return (
    <>
   <div className='bg-gray-200'>
        <div className='h-[600px] w-full overflow-hidden relative m-0 p-0'>
          <img
            className='h-full w-full object-cover transition-opacity duration-700'
            src="https://shopgroove.pk/cdn/shop/products/Short-Sleeve-T-Shirt-Men-S-For-2021-Summer-Print-Black-White-Tshirt-Top-Tees-Classic-1.jpg?v=1664899421"
            alt='Slider Image'
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl font-bold text-white bg-black bg-opacity-70 p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              Order  Now
            </h2>
          </div>
        </div>

        {/* Description Paragraph */}
        <div className="text-center mt-4 p-4 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <p className="text-lg font-bold text-white">
            Create stunning  designs effortlessly with our advanced tools.
            Enjoy a seamless experience from concept to completion!
          </p>
        </div>

        {/* Image Gallery Section */}
        <div className="max-w-7xl mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First Image */}
          <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <img
              className="w-full h-48 object-cover"
              src="https://affixapparel.com/blog/wp-content/uploads/2023/03/ian-dooley-FoF0w-d6Z74-unsplash.jpg"
              alt="Vector Design 1"
            />
          </div>

          {/* Second Image */}
          <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <img
              className="w-full h-48 object-cover"
              src="https://silverhorseventures.com/wp-content/uploads/2022/06/A2-1-1-1024x1024.png"
              alt="Vector Design 2"
            />
          </div>

          {/* Third Image */}
          <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <img
              className="w-full h-48 object-cover"
              src="https://a.storyblok.com/f/132956/1080x1080/6515a10c45/print-2.jpg/m/fit-in/2280x0/filters:quality(75)"
              alt="Vector Design 3"
            />
          </div>
        </div>
      </div>
      <QuickForm />
    </>
  );
}

export default Order;
