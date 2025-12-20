import React from 'react'

const AboutUs = () => {
  return (
    <>
      
        <h2 className="text-center text-2xl font-semibold text-blue-700 mb-6">
          About Us
        </h2>
        <p className="max-w-3xl mx-auto text-center text-gray-600 mb-10">
          We are a full-service real estate team dedicated to building lasting relationships through trust, transparency, and exceptional service. More than just agents, we’re your strategic partners in every transaction — guiding you with market expertise, personalized strategies, and unwavering support. Whether you’re buying your first home or selling a luxury property, our mission is simple: deliver outstanding results that exceed your expectations, every single time.
        </p>
        <div className="flex justify-center">
          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-600 hover:text-white">
            Learn More
          </button>
        </div>
    </>
  )
}

export default AboutUs
