import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Allocation from './pages/Allocation';
import Assets from './pages/Assets';
import Research from './pages/Research';
import About from './pages/About';
import "./index.css";

function PortfolioOptimizer() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div>
        {/* Transparent Navigation Bar */}
        <header
          className="fixed top-0 left-0 w-full"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
            backdropFilter: 'blur(10px)', // Adds elegance with slight blur
            zIndex: 1000,
          }}
        >
          <div className="container mx-auto px-6 sm:px-8 lg:px-10 flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={`${process.env.PUBLIC_URL}/safina_invest_logo-removebg-preview.png`}
                alt="Safina Invest Logo"
                style={{
                  width: '80px',
                  height: 'auto',
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex space-x-4">
              <Link className="text-white hover:text-green-600" to="/allocation">Allocation</Link>
              <Link className="text-white hover:text-green-600" to="/assets">Assets</Link>
              <Link className="text-white hover:text-green-600" to="/research">Research</Link>
              <Link className="text-white hover:text-green-600" to="/about">About</Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="sm:hidden text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                padding: '10px',
                borderRadius: '50%',
                backgroundColor: isMobileMenuOpen ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              {isMobileMenuOpen ? '✖' : '☰'}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <nav
              className="sm:hidden fixed top-16 left-0 w-3/4 h-full bg-gray-800 bg-opacity-80 p-6 space-y-6"
              style={{
                borderRadius: '0 20px 20px 0', // Elegant rounded edge
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Link
                className="block text-white hover:text-green-600 text-lg py-2"
                to="/allocation"
                onClick={() => setMobileMenuOpen(false)}
              >
                Allocation
              </Link>
              <Link
                className="block text-white hover:text-green-600 text-lg py-2"
                to="/assets"
                onClick={() => setMobileMenuOpen(false)}
              >
                Assets
              </Link>
              <Link
                className="block text-white hover:text-green-600 text-lg py-2"
                to="/research"
                onClick={() => setMobileMenuOpen(false)}
              >
                Research
              </Link>
              <Link
                className="block text-white hover:text-green-600 text-lg py-2"
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          )}
        </header>

        {/* Page Content */}
        <div className="mt-16"> {/* Push content below the navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allocation" element={<Allocation />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/research" element={<Research />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default PortfolioOptimizer;
