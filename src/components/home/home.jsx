import React, { useState, useEffect } from 'react';
import QuickOrderForm from '../nextcomp/quickorderform';
import Services from "../nextcomp/services"
import Reviews from '../nextcomp/reviews';

const images = [
  'https://cdn.pixabay.com/photo/2016/08/12/00/38/title-1587327_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/11/29/01/34/man-1866572_1280.jpg',
  'https://shopgroove.pk/cdn/shop/products/Short-Sleeve-T-Shirt-Men-S-For-2021-Summer-Print-Black-White-Tshirt-Top-Tees-Classic-1.jpg?v=1664899421',
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsAnimating(false);
      }, 1000); // Animation duration
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <>
    <div className="bg-gray-50">
      <div className='h-[600px] w-full overflow-hidden relative m-0 p-0'>
        {/* Image Slider */}
        <img
          className='h-full w-full object-cover transition-opacity duration-700 m-0 p-0 '
          src={images[currentIndex]}
          alt='Slider Image'
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

        {/* Taglines */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-transform duration-1000 ${isAnimating ? 'scale-75 opacity-0' : 'scale-100 opacity-100'} ease-in-out`}>
          <h2 className="text-white font-poppins text-[35px] sm:text-[50px] md:text-[60px] lg:text-[75px] xl:text-[90px] z-50 font-extrabold drop-shadow-lg leading-tight px-6 animate-bounce">
            Best Prices, <br /> Fast Turnaround
          </h2>
          <h3 className="text-white font-sans text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] z-50 font-semibold drop-shadow-md leading-relaxed px-4 mt-4">
            100% satisfaction—7StarDigitizing delivers excellence in every stitch
          </h3>
        </div>

        {/* Button Section */}
        <div className="absolute inset-x-0 bottom-10 flex justify-center space-x-4">
          <button className="bg-indigo-600 text-white font-semibold text-lg px-6 py-3 rounded-lg shadow-lg transform transition duration-300 hover:bg-indigo-700 hover:shadow-xl active:scale-95 animate-bounce">
            About Us
          </button>
          <button className="bg-indigo-600 text-white font-semibold text-lg px-6 py-3 rounded-lg shadow-lg transform transition duration-300 hover:bg-indigo-700 hover:shadow-xl active:scale-95 animate-bounce">
            Contact Us
          </button>
        </div>
      </div>

      {/* Who We Are Section */}
      {/* <div className="bg-gray-100 text-gray-900 p-12 rounded-lg shadow-lg my-0 transition-transform duration-500 transform hover:scale-105 hover:shadow-xl relative overflow-hidden">
      <div className="bg-blue-200 text-gray-800 md:h-36 h-20 p-4 md:p-8 rounded-lg shadow-lg my-10 transition-transform duration-300 hover:scale-105 hover:shadow-xl animate-bounce animate-pulse">
  <h2 className="md:text-[60px] text-[30px] whitespace-nowrap font-bold text-center mb-6 text-gray-800 opacity-0 animate-fade-in delay-200">
    Who We Are
  </h2>
</div>



<div className="mt-8 bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg border-l-4 border-indigo-500 animate-pulse">
  <p className="text-lg text-center font-bold font-sansing mb-6 leading-relaxed opacity-0 animate-fade-in delay-400 animate-bounce">
    For all this, we are famous in the market as <span className="font-semibold text-red-600">7StarDigitizing.com</span>. We have over <span className="font-semibold text-yellow-600">24 years of Digitizing Experience</span>. We understand your Embroidery Machine; that is why we successfully provide you <span className="font-semibold text-green-600">Quality Digitizing Services</span>.
  </p>
  
  <p className="md:text-lg text-[15px] text-center font-sansing font-bold leading-relaxed opacity-0 animate-fade-in delay-600 animate-bounce">
    For Orders and Other Inquiry email us at: <a href="mailto:admin@7stardigitizing.com" className="underline text-blue-600 font-semibold hover:text-orange-600 transition-colors">admin@7stardigitizing.com</a>
  </p>
</div>



</div> */}

{/* Digitizing Service Section */}
<div className="bg-gray-100 text-gray-800 p-8 rounded-lg shadow-md ">
<div className="bg-blue-200 text-gray-800 md:h-36 h-20 p-4 md:p-8 rounded-lg shadow-lg my-10 transition-transform duration-300 hover:scale-105 hover:shadow-xl ">
  <h2 className="md:text-[60px] font-manrope text-[30px] whitespace-nowrap font-bold text-center mb-6 text-gray-800 opacity-0 animate-fade-in delay-200">
    Digitizing Service
  </h2>
</div>



  {/* Service Boxes */}
{/* Service Boxes */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Box 1 */}
  <div className="bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 border-l-4 border-indigo-500 hover:shadow-2xl animate-pulse">
    <h4 className="text-xl font-helveticaLight font-semibold mb-2">💲 $8 Flat Rate</h4>
    <p className='font-poppins font-semibold'>for Left chest size 5x5 inches (Unlimited Stitches One File)</p>
    <p className='font-poppins font-semibold'>(ie: for Cap, Cap back, Sleeves)</p>
  </div>

  {/* Box 2 */}
  <div className="bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 border-l-4 border-indigo-500 hover:shadow-2xl animate-pulse">
    <h4 className="text-xl font-semibold mb-2 font-helveticaLight">💲 $35 Flat Rate</h4>
    <p className='font-poppins font-semibold'>for Jacket Back logos (Unlimited Stitches One File)</p>
  </div>

  {/* Box 3 */}
  <div className="bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 border-l-4 border-indigo-500 hover:shadow-2xl animate-pulse">
    <h4 className="text-xl font-semibold mb-2 font-helveticaLight">🚀 Fast Turnaround</h4>
    <p className='font-poppins font-semibold'>8 - 24 hours fast turnaround time</p>
  </div>
</div>

{/* Additional Information in a Single Box */}
<div className="mt-8 bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg border-l-4 border-indigo-500 animate-pulse">
  <h4 className="text-xl font-semibold mb-2 font-helveticaLight">Additional Information</h4>
  <ul className="list-disc list-inside font-poppins font-semibold">
    <li>Digitized by well trained people</li>
    <li>100% satisfaction guaranteed</li>
    <li>There are no over billing & hidden charges</li>
    <li>Free stitch estimates</li>
    <li>Free conversion to other formats for embroidery designs</li>
    <li>Most editing is free, until you are satisfied</li>
  </ul>
</div>
</div>

{/* Vector Artwork Service Section */}
<div className="bg-gray-200 text-gray-800 p-8 rounded-lg shadow-md ">
<div className="bg-blue-200 text-gray-800 md:h-36 h-20 p-4 md:p-8 rounded-lg shadow-lg my-10 transition-transform duration-300 hover:scale-105 hover:shadow-xl  ">
  <h2 className="md:text-[60px] font-manrope text-[22px] whitespace-nowrap font-bold  text-center mb-6 text-gray-800 opacity-0 animate-fade-in delay-200">
    Vector Artwork Service
  </h2>
</div>

  {/* Vector Artwork Service Boxes */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Box 1 */}
  <div className="bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 border-l-4 border-indigo-500 hover:shadow-2xl animate-pulse">
    <h4 className="text-xl font-semibold mb-2 font-helveticaLight">💲 $25 Flat Rate</h4>
    <p className='font-poppins font-semibold'>For simple designs with 1-3 colors</p>
  </div>

  {/* Box 2 */}
  <div className="bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 border-l-4 border-indigo-500 hover:shadow-2xl animate-pulse">
    <h4 className="text-xl font-semibold mb-2 font-helveticaLight">💲 $40 Flat Rate</h4>
    <p className='font-poppins font-semibold'>For complex designs with 4+ colors</p>
  </div>
</div>


  {/* Additional Information in a Single Box */}
  <div className="mt-8 bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg border-l-4 border-indigo-500 animate-pulse">
    <h4 className="text-xl font-semibold mb-2 font-helveticaLight">Additional Information</h4>
    <ul className="list-disc list-inside font-poppins font-semibold">
        <li>Fast turnaround for vectorization</li>
        <li>Quality assurance before delivery</li>
        <li>Unlimited revisions until satisfied</li>
    </ul>
</div>

</div>
</div>
<Services/>
<Reviews/>
</>
  );
};

export default Home;
