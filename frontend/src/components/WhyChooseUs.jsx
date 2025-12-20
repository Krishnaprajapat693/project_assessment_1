import React from 'react'
import Potential from "../assets/potential.png"
import Design from "../assets/design.png"
import Marketing from "../assets/marketing.png"
const WhyChooseUs = () => {
  return (
    <>
        <h2 className="text-center text-2xl font-semibold text-blue-700 mb-12">
          Why Choose Us?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
        {[
            {
            title: "Potential ROI",
            icon: Potential, // 
            },
            {
            title: "Design",
            icon: Design, // 
            },
            {
            title: "Marketing",
            icon: Marketing, // 
            },
        ].map((item) => (
            <div
            key={item.title}
            className="bg-white p-6 rounded-xl shadow-sm text-center"
            >
            
            <img
                src={item.icon}
                alt={`${item.title} icon`}
                className="h-12 w-12 mx-auto mb-4 object-contain"
            />

            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">
                Maximize your returns with data-driven insights and strategic property decisions.
            </p>
            </div>
        ))}
        </div>
    </>
  )
}

export default WhyChooseUs
