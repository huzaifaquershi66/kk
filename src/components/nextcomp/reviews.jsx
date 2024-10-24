import React from "react";

const Reviews = () => {
  const reviews = [
    {
      name: "Ali Khan",
      review: "Great service and quality prints! Highly recommended.",
      rating: 5,
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Sara Ahmed",
      review: "The caps turned out amazing. Very satisfied!",
      rating: 4,
      imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Usman Malik",
      review: "Fast delivery and excellent customer service.",
      rating: 5,
      imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Fatima Noor",
      review: "Good quality prints but a bit pricey.",
      rating: 4,
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <h2 className="text-4xl font-bold text-center font-raleway text-gray-800 mb-10">
        Customer Reviews
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-xl p-6 transition-transform transform hover:scale-105 duration-300 relative overflow-hidden"
          >
            <div className="flex items-center mb-4">
              <img
                src={review.imageUrl}
                alt={review.name}
                className="w-14 h-14 rounded-full border-2 border-gray-300 mr-4"
              />
              <div>
                <h3 className="text-lg font-manrope font-semibold text-gray-800">
                  {review.name}
                </h3>
                <div className="flex text-yellow-500">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15.27L16.18 18 14.54 11.97 20 7.24l-6.91-.59L10 1 7.91 6.65 1 7.24l5.46 4.73L3.82 18z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 font-sans text-base italic mb-4">{review.review}</p>
            <div className="absolute bottom-2 right-2 text-gray-400 text-xs">
              {/* Optional timestamp or review date can be added here */}
              {/* e.g., "Just now" or "2 days ago" */}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-100 opacity-50"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
