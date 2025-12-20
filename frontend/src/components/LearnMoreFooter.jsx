import React from 'react'
import LearnImage from "../assets/LearnMoreimage.png"
const LearnMoreFooter = () => {
  return (
    <>
        <section className="relative h-[55vh] w-full">
        <img
          src="/assets/LearnMoreImage.png"
          alt="Living Room"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <h2 className="max-w-2xl text-xl md:text-2xl font-medium mb-6 leading-relaxed">
            Learn more about our listing process, as well as our additional
            staging and design work.
          </h2>
          <button className="bg-white text-gray-800 px-8 py-3 rounded-md text-sm font-medium hover:bg-blue-500 hover:text-white">
            LEARN MORE
          </button>
        </div>
      </section>

          </>
  )
}

export default LearnMoreFooter
