import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage'
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';

function App() {
  

  return (
    <>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
