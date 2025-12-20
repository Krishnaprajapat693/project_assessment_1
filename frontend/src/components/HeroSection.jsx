
import { useState } from 'react';
import heroImg from "../assets/herosectionImg.jpg"
import axios from 'axios'
import { backendURL } from '../main';

const HeroSection = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Handle form submission logic here
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      mobileNumber: formData.get('mobileNumber'),
      city: formData.get('city'),

    };
    //console.log(data);
    try {
      // api endpoint change hai
      const res = await axios.post(`${backendURL}/addcontactform`, data);
       console.log(res.data);
      if(res.data.succeess) {
        alert("Successfully saved")
      }
    }catch(e) {
      console.log(e);
    }finally{
      // want to set empty string in all form data
      e.target.reset();
      setLoading(false);
    }
  }
  return (
    <>
        <img
              src={heroImg}
              alt="Consultation"
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-black/30" />
    
            <div className="relative z-10 h-full flex items-center px-8 md:px-16">
              <div className="grid md:grid-cols-2 gap-12 w-full items-center">
                {/* Left Text */}
                <div className="text-white max-w-xl">
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    Consultation,
                    <br />
                    Design,
                    <br />& Marketing
                  </h1>
                </div>
    
                {/* Form Card */}
                <div className="bg-blue-900/90 p-8 rounded-lg text-white max-w-md ml-auto">
                  <h3 className="text-xl font-semibold mb-6">
                    Get a Free Consultation
                  </h3>
                  <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                    <input
                      name='name'
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded bg-transparent border border-white/40 placeholder-white/70"
                    />
                    <input
                      name='email'
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded bg-transparent border border-white/40 placeholder-white/70"
                    />
                    <input
                      name='mobileNumber'
                      type="text"
                      placeholder="Your Project"
                      className="w-full px-4 py-3 rounded bg-transparent border border-white/40 placeholder-white/70"
                    />
                    <input
                      name='city'
                      type="text"
                      placeholder="Area, City"
                      className="w-full px-4 py-3 rounded bg-transparent border border-white/40 placeholder-white/70"
                    />
                    <button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium"
                    >
                      {loading ? "Loading..." : "Get Quick Quote"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
    
    </>
            
  )
}

export default HeroSection
