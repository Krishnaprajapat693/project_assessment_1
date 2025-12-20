import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
            <div className="flex items-center gap-2 font-bold text-lg">
              <span className="text-blue-700">🏠</span>
              <span>Real Trust</span>
            </div>
            <nav className="hidden md:flex gap-8 text-sm font-medium">
                <Link to="/">Home</Link>
              <a href="#about">About Us</a>
              <a href="#projects">Our Projects</a>
              <a href="#clients">Testimonials</a>
            </nav>
            <Link to="/admin">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md text-sm">
                Admin
            </button>
        </Link>
    </header>
  )
}

export default Navbar
