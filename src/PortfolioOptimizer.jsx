import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Allocation from './pages/Allocation';
import Assets from './pages/Assets';
import Research from './pages/Research';
import About from './pages/About';
import "./index.css";

function PortfolioOptimizer() {
  return (
    <Router>
      <div>
        {/* Transparent Navigation Bar */}
        <header
          className="absolute top-0 left-0 w-full"
          style={{
            backgroundColor: 'transparent', // Transparent background
            zIndex: 1000,
          }}
        >
          <div className="container mx-auto px-6 sm:px-8 lg:px-10 flex justify-between items-center h-16">
            {/* Logo acts as Home Link */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={`${process.env.PUBLIC_URL}/safina_invest_logo-removebg-preview.png`}
                alt="Safina Invest Logo"
                style={{ width: '100px', height: 'auto', paddingTop: '5px' }}
              />
            </Link>
            <nav className="hidden sm:flex space-x-4">
              <Link className="text-white hover:text-green-600" to="/allocation">Allocation</Link>
              <Link className="text-white hover:text-green-600" to="/assets">Assets</Link>
              <Link className="text-white hover:text-green-600" to="/research">Research</Link>
              <Link className="text-white hover:text-green-600" to="/about">About</Link>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allocation" element={<Allocation />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/research" element={<Research />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default PortfolioOptimizer;
