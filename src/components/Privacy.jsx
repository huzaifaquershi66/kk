import React from 'react';

const PrivacyPolicy = () => {
  return (
    <>
       <div className='h-[300px] w-full overflow-hidden relative m-0 p-0'>
        <img
          className='h-full w-full object-cover transition-opacity duration-700'
          src="https://www.securitymagazine.com/ext/resources/Issues/2019/July/SEC0719-Privacy-Feat-slide1_900px.jpg"
          alt='Slider Image'
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-league font-extrabold text-white bg-black bg-opacity-70 p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        Privacy policy
          </h2>
        </div>
      </div> 
    <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 py-16 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-raleway drop-shadow-lg">Privacy Policy</h1>
          <p className="mt-4 text-lg font-raleway text-gray-300">
            Your privacy is important to us, and we take great care to protect it.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl font-semibold mb-4 font-raleway">Personal Information Protection</h2>
            <p className="text-lg text-gray-300 mb-6 font-raleway">
              Your personal information is protected. 7StarDigitizing.com does not publish or share your company information with any outside parties. All information will be transmitted securely and will not be released to any other organization. We use the information you provide lawfully and ethically. We are the sole owner of the information and will not sell, trade, rent, or give away your details to any third parties unless we have your consent or are required to do so by law.
            </p>
            <p className="text-lg text-gray-300 mb-6 font-raleway">
              7StarDigitizing.com web site does not ask or require a credit card number or information at any stage of the order process.
            </p>
            <p className="text-lg text-gray-300 mb-6 font-raleway">
              If you have any questions regarding the above Privacy Policy, feel free to send us an email at <a href="mailto:admin@7stardigitizing.com" className="text-blue-400">admin@7stardigitizing.com</a>.
            </p>

            {/* Refund Policy */}
            <h2 className="text-3xl font-semibold mb-4 font-raleway">Refund Policy</h2>
            <p className="text-lg text-gray-300 mb-6 font-raleway">
              If you are not 100% satisfied with your purchase, within 30 days from the purchase date, we will fully refund the cost of your order. Please send a scanned copy of the sample to <a href="mailto:admin@7stardigitizing.com" className="text-blue-400">admin@7stardigitizing.com</a>.
            </p>
            <p className="text-lg text-gray-300 mb-6 font-raleway">
              Customers are urged to run sample sew outs before moving to full production.
            </p>
          </div>

          {/* Images Section */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <img
                className="w-full h-64 object-cover"
                src="https://cloudinary.hbs.edu/hbsit/image/upload/s--TVkX_4JC--/f_auto,c_fill,h_375,w_750,/v20200101/405485CC24CDD4B99A62C0F87B02E356.jpg"
                alt="Privacy"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <img
                className="w-full h-64 object-cover"
                src="https://www.zdnet.com/a/img/resize/48b06526656fabea52176eee609639ba77c5335f/2022/03/01/db3a392d-0cee-4fd8-81dc-364e6825168e/zd-data-protection-and-privacy.jpg?auto=webp&fit=crop&height=1200&width=1200"
                alt="Data Security"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <img
                className="w-full h-64 object-cover"
                src="https://azira.com/wp-content/uploads/2023/08/thought-leadership-privacy-blog-yoast.webp"
                alt="Secure Information"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default PrivacyPolicy;
