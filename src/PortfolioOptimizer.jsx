import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Allocation from './pages/Allocation';
import Assets from './pages/Assets';
import Research from './pages/Research';
import About from './pages/About';
import "./index.css";
import { XIcon, HomeIcon } from '@heroicons/react/outline'; // Ensure you have heroicons installed

function PortfolioOptimizer() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <Router>
      <Navbar isMobileMenuOpen={isMobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
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
    </Router>
  );
}

function Navbar({ isMobileMenuOpen, setMobileMenuOpen }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header
      className="fixed top-0 left-0 w-full"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
        backdropFilter: 'blur(10px)', // Adds elegance with slight blur
        zIndex: 1000,
      }}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-10 flex justify-between items-center h-16">
        {/* Left Side: Home Button on non-home pages */}
        {!isHome && (
          <Link to="/" className="flex items-center space-x-2">
            <HomeIcon className="h-6 w-6 text-white" />
            <span className="text-white font-semibold">Home</span>
          </Link>
        )}

        {/* Right Side: Logo on home page */}
        {isHome && (
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
        )}

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex space-x-4">
          <Link className="text-white hover:text-green-600 transition" to="/allocation">Allocation</Link>
          <Link className="text-white hover:text-green-600 transition" to="/assets">Assets</Link>
          <Link className="text-white hover:text-green-600 transition" to="/research">Research</Link>
          <Link className="text-white hover:text-green-600 transition" to="/about">About</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden text-white focus:outline-none ml-2"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Mobile Menu"
        >
          {isMobileMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <Transition isOpen={isMobileMenuOpen}>
        <nav
          className={`sm:hidden fixed top-0 left-0 h-full w-3/4 bg-gray-800 bg-opacity-90 p-6 transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{
            borderRadius: '0 20px 20px 0', // Elegant rounded edge
            boxShadow: '2px 0 12px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div className="flex flex-col space-y-6">
            <Link
              className="text-white text-lg hover:text-green-600 transition"
              to="/allocation"
              onClick={() => setMobileMenuOpen(false)}
            >
              Allocation
            </Link>
            <Link
              className="text-white text-lg hover:text-green-600 transition"
              to="/assets"
              onClick={() => setMobileMenuOpen(false)}
            >
              Assets
            </Link>
            <Link
              className="text-white text-lg hover:text-green-600 transition"
              to="/research"
              onClick={() => setMobileMenuOpen(false)}
            >
              Research
            </Link>
            <Link
              className="text-white text-lg hover:text-green-600 transition"
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </nav>
      </Transition>
    </header>
  );
}

/**
 * Transition Component for handling mobile menu animations
 * You can use a library like react-transition-group or implement your own.
 * Here, I'll provide a simple implementation using CSS transitions.
 */

function Transition({ isOpen, children }) {
  return isOpen ? children : null;
}

export default PortfolioOptimizer;
