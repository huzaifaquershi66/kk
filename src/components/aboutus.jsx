import React from 'react'

const Aboutus = () => {
  return (
    <>
      <div className='h-[300px] w-full overflow-hidden relative m-0 p-0'>
        <img
          className='h-full w-full object-cover transition-opacity duration-700'
          src="https://blog.meridianhomesinc.com/hs-fs/hubfs/Designing%20and%20Building%20A%20Custom%20Home%20-%20Design%20Phase.jpg?width=800&height=600&name=Designing%20and%20Building%20A%20Custom%20Home%20-%20Design%20Phase.jpg"
          alt='Slider Image'
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-league font-extrabold text-white bg-black bg-opacity-70 p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        About Us
          </h2>
        </div>
      </div> 
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-16">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold font-poppins text-gray-100 drop-shadow-lg">About Us</h1>
          <p className="mt-4 text-lg text-gray-300 font-roboto max-w-xl mx-auto">
            We are dedicated to providing top-notch embroidery digitizing services since 1998.
          </p>
        </div>

        {/* Content & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-100 font-raleway mb-6">Team 7StarDigitizing</h2>
            <p className="text-lg text-gray-300 mb-6 font-raleway">
              Team 7StarDigitizing has been in the embroidery digitizing industry since 1998. We strive to provide the best digitizing service possible, in the least amount of time, at the lowest price around. Our collective working experience in the embroidery field has enhanced our ability to provide quality digitized products at a competitive price.
            </p>
            <p className="text-lg text-gray-300 mb-6 font-raleway">
              Our objective is to provide the best possible quality of digitizing services at a competitive price. We digitize your designs with care, knowing how the machine runs. We make every effort to create designs that will run smoothly on the machine with minimal thread breakage, ensuring the best production results.
            </p>
            <p className="text-lg text-gray-300 mb-6 font-raleway">
              We understand the demanding nature of embroidery work. While quality is our highest priority, timely delivery of our product is equally important. We maintain a next-day turnaround to meet your needs.
            </p>
            <p className="text-lg text-gray-300 font-raleway">
              The 7StarDigitizing Team thanks you for your interest in our services.
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="w-full h-full rounded-xl overflow-hidden shadow-xl transform transition duration-500 hover:scale-105">
              <img
                className="w-full h-full object-cover"
                src="https://i.ytimg.com/vi/OW_SgwWLfjA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBt_lbeCI0RcipCh5ttEEx1_35dzg"
                alt="Embroidery Work"
              />
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mt-16">
          <h2 className="text-4xl font-extrabold text-gray-100 text-center mb-12 font-raleway">Our Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <img
                className="w-full h-64 object-cover"
                src="https://i.ytimg.com/vi/W429UlJZvxk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCUWjUF7CKP-VGZGK_WzWiX_ND7_Q"
                alt="Embroidery Design"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <img
                className="w-full h-64 object-cover"
                src="https://digitizingone.com/wp-content/uploads/2021/10/Custom-Digitized-Embroidery-Designs.jpg"
                alt="Digitizing Design"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <img
                className="w-full h-64 object-cover"
                src="https://handembroidery.com/app/uploads/2021/06/Hand-Lock-Studio-1327-1440x1080-c-top.jpg"
                alt="Embroidery Machine"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Aboutus
