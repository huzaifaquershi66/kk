import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useLocation, Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth'

const Header = () => {
  const [toggleform, settoggleform] = useState(false);
  const location = useLocation(); // To get the current route
  const auth = getAuth(); // Get the Firebase Auth instance
  const user = auth.currentUser; // Get the currently signed-in user

  const isAuthenticated = !!user;

  const handletoggleform = () => {
    console.log("Toggling form", toggleform);
    settoggleform(!toggleform);
  };

  const isActive = (path) => {
    // Check if the current path matches the link path
    if (location.pathname === path) {
      return 'text-red-600'; // Active class for current page
    }
    return 'text-white'; // Default class for other links
  };

  useEffect(() => {
    if (toggleform) {
      document.body.style.overflow = 'hidden'; // Scroll ko disable karein
      document.body.style.position = 'fixed'; // Body ki position ko fixed karein
    } else {
      document.body.style.overflow = 'auto'; // Scroll ko enable karein
      document.body.style.position = 'relative'; // Position ko reset karein
    }
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup
      document.body.style.position = 'relative'; // Cleanup
    };
  }, [toggleform]);

  return (
    <>
      <header className="bg-gradient-to-r from-black to-gray-800 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-2">
          {/* Navigation Links */}
          <nav className="xl:flex space-x-8 hidden">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Price", path: "/price" },
              {
                name: isAuthenticated ? "Order Now" : "Login for Order",
                path: isAuthenticated ? "/order" : "/login"
              },
              ...(isAuthenticated ? [{ name: "Vector Now", path: "/vector" }] : []),
              ...(isAuthenticated ? [{ name: "Client Panel", path: "/client" }] : []),
              { name: "Contact Us", path: "/contact" },
              { name: "Terms and Conditions", path: "/terms" },
              { name: "Privacy Policy", path: "/privacy" }
            ].map((item) => (
              <Link
                to={item.path}
                className={`text-[16px] whitespace-nowrap font-helveticaLight font-bold transition duration-300 hover:text-orange-400 relative after:content-[''] after:block after:w-0 after:h-0.5 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full ${isActive(item.path)}`}
                key={item.name}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div onClick={handletoggleform} className='h-12 w-16 px-[15px] py-[6px] color2 xl:invisible visible'>
            <FontAwesomeIcon icon={faBars} className='text-[35px] cursor-pointer' />
          </div>

          {/* Get a Quote Button */}
          <div className="ml-auto mb-2">
            <Link to={isAuthenticated ? "/order" : "/login"}>
              <button className="color2 whitespace-nowrap text-white font-raleway text-[21px] px-8 py-3 rounded-md shadow-md hover:bg-orange-600 transition duration-300 h-16 text-lg flex items-center justify-center">
                {isAuthenticated ? "Order Now" : "Login for Order"}
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className={`h-[950px] visible lg:invisible bg-black absolute overflow-y-hidden -mt-48 border-r-[1px] border-slate-600 z-[9999] backing overflow-x-hidden w-full max-w-[400px] ${toggleform ? 'show mx-0' : ''}`} style={{ overflowY: 'auto' }}>
        <div className='my-32 mx-4 h-auto w-full font-sans'>
          <div className='flex items-center justify-between space-x-6 px-2'>
            <div className="flex items-center space-x-3">
              {/* Logo Icon */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full h-10 w-10 flex items-center justify-center shadow-lg border-2 border-white">
                <img src='https://www.hmigift.com/prod_fck/images/Digital-printing-picture.jpg' alt="7StarDigitizing Logo" className="object-cover h-full w-full rounded-full" />
              </div>
              {/* Logo Text */}
              <div>
                <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700 font-roboto drop-shadow-lg">
                  7StarDigitizing
                </h1>
                <p className="text-[12px] text-gray-300 font-helveticaLight">
                  Empowering Your Digital Dreams
                </p>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faXmark}
              className="text-[25px] text-white cursor-pointer translate-x-[-20px] hover:opacity-80 transition-opacity duration-200"
              onClick={handletoggleform}
            />
          </div>

          <div className='w-full h-[1px] my-5 bg-gray-300'></div>

          {/* Navigation Options */}
          <div className='flex flex-col space-y-4 my-4 mr-8'>
            {[
              "Home", 
              "About Us", 
              "Price", 
              isAuthenticated ? "Order Now" : "Login for Order", 
              ...(isAuthenticated ? ["Vector Now"] : []), 
              ...(isAuthenticated ? ["Client Panel"] : []), 
              "Contact Us", 
              "Terms & Conditions", 
              "Privacy Policy"
            ].map((item) => (
              <Link 
                key={item} 
                to={
                  item === "Home" ? "/" :
                  item === "About Us" ? "/about" :
                  item === "Price" ? "/price" :
                  item === "Order Now" ? "/order" :
                  item === "Vector Now" ? "/vector" :
                  item === "Client Panel" ? "/client" :
                  item === "Contact Us" ? "/contact" :
                  item === "Terms & Conditions" ? "/terms" :
                  item === "Privacy Policy" ? "/privacy" :
                  item === "Login for Order"?"/login":
                  "#"
                }
                onClick={() => settoggleform(false)}
                className={`w-full h-10 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-helveticaLight font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center text-[18px] ${isActive(item === "Home" ? "/" : (item === "Price" ? "/price" : `/${item.toLowerCase().replace(" ", "")}`))}`}>
                {item}
              </Link>
            ))}
          </div>

          {/* Bottom Section with Icons */}
          <div className='w-full h-[1px] bg-gray-300'></div>
        </div>
      </div>
    </>
  );
};

export default Header;
