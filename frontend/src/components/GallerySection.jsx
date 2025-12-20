// GallerySection.jsx
import React from 'react';
import Gallery1 from "../assets/gallery1.png";
import Gallery2 from "../assets/gallery2.png";
import Gallery3 from "../assets/gallery3.png";

const GallerySection = () => {
  return (
    <section id='about' className="relative bg-white py-12 md:py-20 overflow-hidden">
      

      {/* Big Faded Blue Circle (Left Side) */}
      <div className="absolute -left-16 top-1/4 w-96 h-96 bg-blue-100 rounded-full opacity-20"></div>

      {/* Small Faded Blue Circle (Right Side) */}
      <div className="absolute right-16 bottom-16 w-64 h-64 bg-blue-50 rounded-full opacity-10"></div>

      {/* Light Blue Square (Behind Center Image) */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-50 rounded-lg opacity-30"></div>

      {/* Blue Square (Top Left of Center Image) */}
      <div className="absolute top-10 left-10 w-8 h-8 bg-blue-600"></div>

      {/* Orange L-shape (Bottom Left of Left Image) */}
      <div className="absolute bottom-10 left-10 w-12 h-12 border-4 border-orange-500 transform rotate-12"></div>

      {/* Blue L-shape (Top Right of Right Image) */}
      <div className="absolute top-10 right-10 w-12 h-12 border-4 border-blue-600 transform -rotate-12"></div>

      {/* Faded Grid Pattern (Top Right Corner) */}
      <div className="absolute top-10 right-10 w-40 h-20 opacity-20">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex">
            {Array.from({ length: 6 }).map((__, j) => (
              <div key={j} className="w-2 h-2 bg-blue-600 mx-1 my-1 rounded-sm"></div>
            ))}
          </div>
        ))}
      </div>

      {/* Main Content - Images  */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-4 md:gap-8 justify-center">

        {/* Left Image - Top */}
        <div className="relative md:self-start">
          <img
            src={Gallery3}
            alt="Real Estate Meeting"
            className="w-40 h-auto rounded-lg shadow-md object-cover border-2 border-gray-100"
          />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-4 border-orange-500 transform rotate-12"></div>
        </div>

        {/* Center Image - Larger & Slightly Overlapping */}
        <div className="relative z-10">
          <img
            src={Gallery1}
            alt="Agent Showing Property"
            className="w-72 h-auto rounded-xl shadow-lg object-cover border-2 border-blue-100"
          />
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-sm"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-100 rounded-lg"></div>
        </div>

        {/* Right Image - Bottom */}
        <div className="relative md:self-end">
          <img
            src={Gallery2}
            alt="Client Consultation"
            className="w-40 h-auto rounded-lg shadow-md object-cover border-2 border-gray-100"
          />
          <div className="absolute -top-2 -left-2 w-6 h-6 border-4 border-blue-600 transform -rotate-12"></div>
        </div>

      </div>

    </section>
  );
};

export default GallerySection;