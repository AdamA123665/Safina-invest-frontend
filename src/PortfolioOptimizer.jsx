import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Allocation from './pages/Allocation';
import Assets from './pages/Assets';
import Research from './pages/Research';
import About from './pages/About';
import "./index.css";
import { XIcon, HomeIcon } from '@heroicons/react/outline';

  // Removed mt-16 from content wrapper
function PortfolioOptimizer() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
      <Navbar isMobileMenuOpen={isMobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      {/* Page Content */}
      <div> {/* Removed mt-16 */}
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
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // Change navbar background after 100px scroll
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-white bg-opacity-90 shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-10 flex justify-between items-center h-16">
        {/* Left Side: Home Button on non-home pages */}
        {!isHome && (
          <Link to="/" className="flex items-center space-x-2">
            <HomeIcon className="h-6 w-6 text-gray-800" />
            <span className="text-gray-800 font-semibold">Home</span>
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
          <Link className="text-gray-800 hover:text-green-600 transition" to="/allocation">Allocation</Link>
          <Link className="text-gray-800 hover:text-green-600 transition" to="/assets">Assets</Link>
          <Link className="text-gray-800 hover:text-green-600 transition" to="/research">Research</Link>
          <Link className="text-gray-800 hover:text-green-600 transition" to="/about">About</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden text-gray-800 focus:outline-none"
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
      {isMobileMenuOpen && (
        <nav
          className="sm:hidden fixed top-16 left-0 bg-gray-800 bg-opacity-90 p-4"
          style={{
            borderRadius: '0 10px 10px 0',
            boxShadow: '2px 0 12px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div className="flex flex-col space-y-4">
            <Link
              className="text-white text-lg hover:text-green-300 transition"
              to="/allocation"
              onClick={() => setMobileMenuOpen(false)}
            >
              Allocation
            </Link>
            <Link
              className="text-white text-lg hover:text-green-300 transition"
              to="/assets"
              onClick={() => setMobileMenuOpen(false)}
            >
              Assets
            </Link>
            <Link
              className="text-white text-lg hover:text-green-300 transition"
              to="/research"
              onClick={() => setMobileMenuOpen(false)}
            >
              Research
            </Link>
            <Link
              className="text-white text-lg hover:text-green-300 transition"
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
export default PortfolioOptimizer;
