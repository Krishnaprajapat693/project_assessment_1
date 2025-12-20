import React from 'react'

import personI from "../assets/person1.png";
import personII from "../assets/person2.png";
import personIII from "../assets/person3.png";
const AvarageRealtor = () => {
  return (
    <>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div >
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-4">
              Not Your Average Realtor
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              We combine expert consultation, smart interior design, and targeted digital marketing to give you a seamless real estate experience — helping you sell faster, for more value, and with complete peace of mind.
            </p>
          </div>
          <div className="flex gap-6 justify-center">
            <img className="h-64 w-64 rounded-full bg-gray-200" 
            src={personI} 
            alt="consultation"
             />

            <img className="h-36 w-36 rounded-full bg-gray-200 self-end  " 
            src={personII} 
            alt="consultation"
             />
            
            <img className="h-36 w-36 rounded-full bg-gray-200" 
            src={personIII} 
            alt="consultation"
             />
          </div>
        </div>
    </>
  )
}

export default AvarageRealtor
