import React from 'react';

const TermsAndConditions = () => {
  return (
    <>
    <div className='h-[600px] w-full overflow-hidden relative m-0 p-0'>
    <img
      className='h-full w-full object-cover transition-opacity duration-700'
      src="https://www.dynamicptmichigan.com/wp-content/uploads/2021/10/TC-1.png"
      alt='Slider Image'
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-league font-extrabold text-white bg-black bg-opacity-70 p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
    Terms & Conditions
      </h2>
    </div>
  </div> 
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-16 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-raleway drop-shadow-lg">Terms and Conditions</h1>
          <p className="mt-4 text-lg text-gray-300 font-raleway">
            Please review our terms and conditions below before using our services.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl font-semibold mb-4 font-raleway">7StarDigitizing Terms</h2>
            <p className="text-lg text-gray-300 mb-6 font-raleway">
              We will communicate with you primarily through e-mail. To read the complete 7StarDigitizing.com Terms and Conditions, please see below.
            </p>
            <p className="text-lg text-gray-300 mb-6 font-raleway">
              You agree that 7StarDigitizing.com reserves the right to revise the Terms at any time, for any reason, and without notice, including the right to terminate the Service or any part of the Service. Terms may be changed or updated at any time, but you can always find the most recent version here. We suggest that you periodically check this page to make sure you are up to date.
            </p>
            <p className="text-lg text-gray-300 mb-6 font-raleway">
              By entering and using the Site, you indicate that you accept the Terms and that you agree to be bound by and subject to them. Acceptance of the Terms creates a binding legal agreement between you and 7StarDigitizing.com that you will use the Service only in a manner that is consistent with the Terms.
            </p>
            <p className="text-lg text-gray-300 mb-6 font-raleway">
              All the information, Content, image files, software, and materials offered by our Service are protected by U.S. and international copyright laws and by other applicable laws. You understand that 7StarDigitizing.com is unable to provide you with permission to copy, display or distribute material for which you do not own the copyright, and we do not provide others with such rights to your Content (unless you give us permission to do so).
            </p>
            <p className="text-lg text-gray-300 mb-6 font-raleway">
              7StarDigitizing.com has the absolute right to terminate your membership or exclude you from the Site if you use our Service to violate the intellectual property rights of third parties. 7StarDigitizing.com will have no obligation or liability of customers provided Files (images, Embroidery files).
            </p>
            <p className="text-lg text-gray-300 mb-6 font-raleway">
              You agree and acknowledge that 7StarDigitizing.com, in its sole discretion, may terminate your Membership (or any part thereof) or use of the Service, and remove and discard any Content including, but not limited to, any and all information, communications, image files, or any other content within the Service, at any time, without notice, for any reason.
            </p>
            <p className="text-lg text-gray-300 mb-6 font-raleway">
              You can report abuse of these Terms to <a href="mailto:admin@7stardigitizing.com" className="text-blue-400">admin@7stardigitizing.com</a>.
            </p>
          </div>

          {/* Images Section */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <img
                className="w-full h-64 object-cover"
                src="https://majesticsitemanagement.co.uk/wp-content/uploads/2023/06/Terms-and-Conditions-.jpeg"
                alt="Terms and Conditions"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <img
                className="w-full h-64 object-cover"
                src="https://cdn.betterproposals.io/blog/media.npr.org/assets/img/2020/03/04/accept_terms_wide-d65e4c6e4c775f09d49a6bf8b299cebe037f4459-s800-c85.jpg"
                alt="Legal Document"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <img
                className="w-full h-64 object-cover"
                src="https://img.freepik.com/premium-photo/terms-conditions-businessman-reviewing-terms-conditions-agreement-office-terms-conditions_36325-3006.jpg"
                alt="Reading Terms"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default TermsAndConditions;
