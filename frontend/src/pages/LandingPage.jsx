import { useState } from "react";
import AboutUs from "../components/AboutUs";
import AvarageRealtor from "../components/AvarageRealtor";
import Clients from "../components/Clients";
import Footer from "../components/Footer";
import GallerySection from "../components/GallerySection";
import HeroSection from "../components/HeroSection";
import LearnMoreFooter from "../components/LearnMoreFooter";
// import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import WhyChooseUs from "../components/WhyChooseUs";
import axios from "axios";
import { backendURL } from "../main";

export default function LandingPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubs = async () => {
    console.log(formData)
    if (formData.email) {
      setLoading(true);
      const res = await axios.post(`${backendURL}/addsubscriber`, formData);
      console.log(res.data);
      if (res.data.success) {
        alert("Subscribed Successfully");
      }else {
        alert(res.data.message);
      }
    }
    setLoading(false);
    // clear formdata
    setFormData({ email: "" });
  };
  return (
    <div className=" font-sans text-gray-800">
      {/* Navbar
      <Navbar/> */}

      {/* Hero Section */}
      <section className="relative h-[90vh] w-full">
        <HeroSection/>
      </section>

      {/* Section: Not Your Average Realtor */}
      <section className="px-8 md:px-16 py-20 bg-white">
        <AvarageRealtor/>
      </section>

      {/* Section: Why Choose Us */}
      <section className="px-8 md:px-16 py-20 bg-gray-50">
        <WhyChooseUs/>
      </section>

        {/* Gallery Section */}
        <GallerySection/>

      {/* Section: About Us */}
      <section className="px-8 md:px-16 py-20 bg-white">
        <AboutUs/>
      </section>

      {/* Section: Our Projects (Horizontal Scroll) */}
      <section className="px-8 md:px-16 py-20 bg-gray-50">
        <Projects/>
      </section>

      {/* Section: Happy Clients (Horizontal Scroll) */}
      <section className="px-8 md:px-16 py-20 bg-white">
        <Clients/>
      </section>

      {/* Section: CTA + Footer */}
      <LearnMoreFooter/>

      {/* Footer Top Navigation + Subscribe in One Line */}
        <div className="bg-blue-600 px-8 py-4 text-white flex flex-row justify-between items-center">
          
          {/* Left: Navigation Links */}
          <div className="flex flex-row gap-6 text-sm font-medium">
            <span className="cursor-pointer hover:text-blue-200 transition-colors">Home</span>
            <span className="cursor-pointer hover:text-blue-200 transition-colors">Services</span>
            <span className="cursor-pointer hover:text-blue-200 transition-colors">Projects</span>
            <span className="cursor-pointer hover:text-blue-200 transition-colors">Testimonials</span>
            <span className="cursor-pointer hover:text-blue-200 transition-colors">Contact</span>
          </div>

          {/* Right: Subscribe Section */}
          <div className="flex flex-row gap-2 items-center">
            <span className="text-sm font-medium">Subscribe us</span>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="px-3 bg-blue-400 py-2 rounded-l text-white text-sm focus:outline-none focus:ring-2 focus:ring-white w-48"
            />
            <button
              onClick={handleSubs}
              className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-r text-sm font-medium transition-colors"
            >
              {loading ? "Loading" : "Subscribe"}
            </button>
          </div>

        </div>


      {/* Footer Bottom */}
      <Footer/>
    </div>
  );
}