import React from "react";

const Services = () => {
  const services = [
    {
      title: "Left Chest Printing",
      description: "Custom designs printed on the left chest of shirts.",
      price: "$8",
      imageUrl: "https://colmanandcompany.com/blog/wp-content/uploads/2019/08/left-chest-for-t-shirt-heat-transfers.jpg",
      icon: "📦", // Icon for illustration
    },
    {
      title: "Caps Printing",
      description: "Personalized caps with your unique designs.",
      price: "$8",
      imageUrl: "https://www.shutterstock.com/image-photo/cap-print-design-best-hd-600nw-2432365623.jpg",
      icon: "🧢", // Icon for illustration
    },
    {
      title: "Pocket Size Printing",
      description: "Prints for pocket-sized designs on shirts or jackets.",
      price: "$8",
      imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_rrqrNTBbaMAt3Tv2HvvYaKruayzq61px96VGqYbOMoHlRxCitHdfaYNaD78xwJ51XbkfqlOc7FWMb2MroVtjS-ZUs_ypQY5Qyel6_xn8Fn0EAzH2LQG1krCWCeWEr5PqRYVIFFPl7wOz/s1600/pocket+design+size.jpg",
      icon: "🪡", // Icon for illustration
    },
    {
      title: "Jacket Back Printing",
      description: "Stunning designs printed on the back of jackets.",
      price: "$35",
      imageUrl: "https://cdna.lystit.com/photos/asos/c77dd0cd/criminal-damage-Black-Denim-Jacket-With-Back-Print.jpeg",
      icon: "🧥", // Icon for illustration
    },
    {
      title: "Flat Rate - Simple Vector Designs",
      description: "For simple designs with 1-3 colors.",
      price: "$25",
      imageUrl: "https://img.freepik.com/premium-vector/flat-geometric-background_23-2148957201.jpg?semt=ais_hybrid",
      icon: "🎨", // Icon for illustration
    },
    {
      title: "Flat Rate - Complex Vector Designs",
      description: "For complex designs with 4+ colors.",
      price: "$40",
      imageUrl: "https://cdn.pixabay.com/photo/2016/08/24/04/31/lines-1616195_1280.png",
      icon: "🌈", // Icon for illustration
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white py-12">
      <h2 className="text-4xl font-bold text-center font-raleway text-gray-800 mb-10">Our Services</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 hover:shadow-2xl shadow-md">
            <img
              src={service.imageUrl}
              alt={service.title}
              className="h-48 w-full object-cover rounded-t-lg hover:opacity-75 transition-opacity duration-300"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-300 tracking-wide flex items-center">
                <span className="mr-2 text-3xl">{service.icon}</span>
                {service.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">{service.description}</p>
              <p className="mt-4 text-lg font-bold text-gray-800">{service.price}</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors duration-300">
                More Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
