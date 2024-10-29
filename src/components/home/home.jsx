import React, { useState, useEffect } from 'react';
import QuickOrderForm from '../nextcomp/quickorderform';
import Services from "../nextcomp/services"
import Reviews from '../nextcomp/reviews';
import { Link } from 'react-router-dom';
import shirt from "../../assets/ani.png"
import vector from "../../assets/dj.png"
import jacketjss from "../../assets/jacketjss.png"
import ss from "../../assets/ss.png"
import mao from "../../assets/mao.png"

const images = [
  'https://cdn.pixabay.com/photo/2016/08/12/00/38/title-1587327_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/11/29/01/34/man-1866572_1280.jpg',
  'https://shopgroove.pk/cdn/shop/products/Short-Sleeve-T-Shirt-Men-S-For-2021-Summer-Print-Black-White-Tshirt-Top-Tees-Classic-1.jpg?v=1664899421',
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [overlayIndex, setOverlayIndex] = useState(0);

  const overlayImages = [
    shirt,
    vector,
    mao,
  ];
  
  

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setOverlayIndex((prevIndex) => (prevIndex + 1) % overlayImages.length);
        setIsAnimating(false);
      },700 ); // Transition duration for the slide-in effect
    }, 7000); // Change overlay image every 3 seconds

    return () => clearInterval(interval);
  }, [overlayImages.length]);

  const animationDuration =5000; // 3 seconds for both image and text

  
  useEffect(() => {
    const interval = setInterval(() => {
      // Show white background when changing the image
 // Show white background

      // Update image and text after 2 seconds
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Keep white background for 3 seconds

      // Hide white background after the image has changed
      setTimeout(() => {
        // setIsAnimating(false); // Hide white background
      }, 7000); // 3 seconds for white background + 1 second delay
    }, 7000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, [images.length]); // Ensure it works with the number of images
  const handleClick = (e) => {
    e.currentTarget.classList.add('animate-slide');
    setTimeout(() => {
      e.currentTarget.classList.remove('animate-slide');
    }, 500); // Remove class after animation duration
  };
  return (
    <>
    <div className="bg-gray-50">
    <div className='h-[520px] w-full overflow-hidden relative m-0 p-0 bg-transparent'>
      {/* Image Slider */}
      <img
        className={`h-full w-full object-cover bg-transparent transition-opacity duration-[1000ms] ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        src={"https://cdn.pixabay.com/photo/2016/08/12/00/38/title-1587327_1280.jpg"}
        alt='Slider Image'
      />
 <div className="absolute top-6 right-4">
        <img
          src={overlayImages[overlayIndex]}
          alt="Overlay"
          className={`md:h-[450px] h-[300px] w-[300px] md:w-[500px] object-contain transition-transform duration-1000 ${
            isAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
          }`}
          style={{
            transition: 'transform 1s ease-in-out, opacity 1s ease-in-out',
            background: 'none',
          }}
        />
      </div>

      {/* White Background Overlay */}
      <div className={`absolute inset-0 ${isAnimating ? 'opacity-100 transition-opacity duration-2000' : 'opacity-0'} rounded-lg z-10`}></div>

      {/* Taglines and Buttons */}
      <div className={`absolute z-50 inset-0 flex flex-col items-center justify-center text-center`}>
        <h2 className={`text-reveal fade-in-out font-poppins text-[25px] sm:text-[40px] md:text-[50px] lg:text-[65px] xl:text-[80px] font-extrabold px-6`}>
          Best Prices, 
        </h2>
        <h2 className={`text-reveal fade-in-out my-4 font-poppins text-[25px] sm:text-[40px] md:text-[50px] lg:text-[65px] xl:text-[80px] font-extrabold px-6`}>
         Fast Turnaround
        </h2>
        <h3 className={`text-reveal fade-in-out font-sans text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-semibold px-4 mt-4`}>
          100% satisfaction—7StarDigitizing delivers excellence in every stitch
        </h3>

        {/* Button Section */}
        <div className="flex justify-center space-x-4 mt-4 fade-in-out">
          <button className="bg-indigo-600 text-white font-semibold text-lg px-6 py-3 rounded-lg shadow-lg">
            About Us
          </button>
          <button className="bg-indigo-600 text-white font-semibold text-lg px-6 py-3 rounded-lg shadow-lg">
            Contact Us
          </button>
        </div>
      </div>
    </div>
 

{/* Digitizing Service Section */}
<div className="bg-gray-100 text-gray-800 p-8 rounded-lg shadow-md">
      {/* Heading for Digitizing Services */}
      <h2 className="md:text-[60px] font-manrope text-[30px] font-bold text-center mb-6 text-gray-800">
        Digitizing Services
      </h2>
      
      {/* Service Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-4 cursor-pointer gap-6">
        {/* Box 1 */}
        <div
          className="bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 border-l-4 border-indigo-500 hover:shadow-2xl click-effect"
        >
          <h4 className="text-xl font-helveticaLight font-semibold mb-2">💲 $8 Flat Rate</h4>
          <p className="font-poppins font-semibold">for Left chest size 5x5 inches (Unlimited Stitches One File)</p>
          <p className="font-poppins font-semibold">(ie: for Cap, Cap back, Sleeves)</p>
        </div>

        {/* Box 2 */}
        <div
          className="bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 border-l-4 border-indigo-500 hover:shadow-2xl click-effect"
        >
          <h4 className="text-xl font-semibold mb-2 font-helveticaLight">💲 $35 Flat Rate</h4>
          <p className="font-poppins font-semibold">for Jacket Back logos (Unlimited Stitches One File)</p>
        </div>

        {/* Box 3 */}
        <div
          className="bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 border-l-4 border-indigo-500 hover:shadow-2xl click-effect"
        >
          <h4 className="text-xl font-semibold mb-2 font-helveticaLight">🚀 Fast Turnaround</h4>
          <p className="font-poppins font-semibold">8 - 24 hours fast turnaround time</p>
        </div>

        {/* Additional Information */}
        <div
          className="bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 border-l-4 border-indigo-500 click-effect"
        >
          <h4 className="text-xl font-semibold mb-2 font-helveticaLight">Additional Information</h4>
          <ul className="list-disc list-inside font-poppins font-semibold text-sm">
            <li>Digitized by well-trained people</li>
            <li>100% satisfaction guaranteed</li>
            <li>There are no overbilling & hidden charges</li>
            {/* <li>Free stitch estimates</li>
            <li>Free conversion to other formats for embroidery designs</li>
            <li>Most editing is free until you are satisfied</li> */}
          </ul>
        </div>
      </div>
    </div>
{/* Vector Artwork Service Section */}
<div className="bg-gray-100 text-gray-800 p-8 rounded-lg shadow-md">
      {/* Heading for Digitizing Services */}
      <h2 className="md:text-[60px] font-manrope text-[30px] font-bold text-center mb-6 text-gray-800">
      Vector Artwork Service
      </h2>
      
      {/* Service Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-4 cursor-pointer gap-6">
        {/* Box 1 */}
        <div
          className="bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 border-l-4 border-indigo-500 hover:shadow-2xl click-effect"
        >
          <h4 className="text-xl font-semibold mb-1 font-helveticaLight">💲 $25 Flat Rate</h4>
          <p className="font-poppins font-semibold mb-0">For simple designs with 1-3 colors</p>
        </div>

        {/* Box 2 */}
        <div
          className="bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 border-l-4 border-indigo-500 hover:shadow-2xl click-effect"
        >
                    <h4 className="text-xl font-semibold mb-1 font-helveticaLight">💲 $40 Flat Rate</h4>
          <p className="font-poppins font-semibold mb-0">For complex designs with 4+ colors</p>
        
    
        </div>

        {/* Box 3 */}
        <div
          className="bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 border-l-4 border-indigo-500 hover:shadow-2xl click-effect"
        >
       <h4 className="text-xl font-semibold mb-1 font-helveticaLight">📦 Package Deal</h4>
       <p className="font-poppins font-semibold mb-0">Multiple designs at a discounted rate</p>
        </div>

        {/* Additional Information */}
        <div
          className="bg-gradient-to-r from-[#E0F7FA] to-[#FFEBEE] p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 border-l-4 border-indigo-500 click-effect"
        >
          <h4 className="text-xl font-semibold mb-2 font-helveticaLight">Additional Information</h4>
          <ul className="list-disc list-inside font-poppins font-semibold text-sm">
          <li>Fast turnaround for vectorization</li>
            <li>Quality assurance before delivery</li>
            <li>Unlimited revisions until satisfied</li>
            {/* <li>Free stitch estimates</li>
            <li>Free conversion to other formats for embroidery designs</li>
            <li>Most editing is free until you are satisfied</li> */}
          </ul>
        </div>
      </div>
    </div>
</div>
<Services/>
<Reviews/>
</>
  );
};

export default Home;
