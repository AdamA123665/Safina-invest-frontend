import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Allocation from './pages/Allocation';
import Assets from './pages/Assets';
import Funds from './pages/Funds';
import Research from './pages/Research';
import About from './pages/About';
import Trial from './pages/Trial';
import Test2 from './pages/Test2';
import "./index.css";
import ArticleDetailsPage from './pages/ArticleDetailsPage';
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
          <Route path="/Funds" element={<Funds />} />
          <Route path="/trial" element={<Trial />} />
          <Route path="/Test2" element={<Test2 />} />
          <Route path="/articles/:id" element={<ArticleDetailsPage />} />
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
              src={`${process.env.PUBLIC_URL}/safina_invest_logo.png`}
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
  <Link
    className="px-4 py-2 text-gray-800 bg-gray-100 rounded-full shadow-md hover:bg-green-600 hover:text-white transition-transform transform hover:scale-105 active:scale-95"
    to="/assets"
  >
    Learn
  </Link>
  <Link
    className="px-4 py-2 text-gray-800 bg-gray-100 rounded-full shadow-md hover:bg-green-600 hover:text-white transition-transform transform hover:scale-105 active:scale-95"
    to="/allocation"
  >
    Invest
  </Link>
  <Link
    className="px-4 py-2 text-gray-800 bg-gray-100 rounded-full shadow-md hover:bg-green-600 hover:text-white transition-transform transform hover:scale-105 active:scale-95"
    to="/research"
  >
    Research
  </Link>
  <Link
    className="px-4 py-2 text-gray-800 bg-gray-100 rounded-full shadow-md hover:bg-green-600 hover:text-white transition-transform transform hover:scale-105 active:scale-95"
    to="/about"
  >
    About
  </Link>
  <Link
    className="px-4 py-2 text-gray-800 bg-gray-100 rounded-full shadow-md hover:bg-green-600 hover:text-white transition-transform transform hover:scale-105 active:scale-95"
    to="/Funds"
  >
    Funds
  </Link>
  <Link
    className="px-4 py-2 text-gray-800 bg-gray-100 rounded-full shadow-md hover:bg-green-600 hover:text-white transition-transform transform hover:scale-105 active:scale-95"
    to="/trial"
  >
    trial
  </Link>
  <Link
    className="px-4 py-2 text-gray-800 bg-gray-100 rounded-full shadow-md hover:bg-green-600 hover:text-white transition-transform transform hover:scale-105 active:scale-95"
    to="/Test2"
  >
    Test2
  </Link>
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
    className="sm:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-95 flex flex-col justify-center items-center space-y-8 transition-opacity duration-300 ease-in-out"
    style={{
      backdropFilter: 'blur(6px)',
    }}
  >
    {/* Close Button */}
    <button 
      className="absolute top-6 right-6 text-white focus:outline-none"
      onClick={() => setMobileMenuOpen(false)}
      aria-label="Close menu"
    >
      <svg 
        className="w-8 h-8 hover:text-green-100 transition-transform transform hover:scale-110"
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        viewBox="0 0 24 24" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>

    <div className="flex flex-col space-y-8 text-center">
    <Link
        className="text-white text-2xl font-semibold hover:text-green-300 transition-transform transform hover:scale-105"
        to="/assets"
        onClick={() => setMobileMenuOpen(false)}
      >
        Learn
      </Link>
      <Link
        className="text-white text-2xl font-semibold hover:text-green-300 transition-transform transform hover:scale-105"
        to="/allocation"
        onClick={() => setMobileMenuOpen(false)}
      >
        Invest
      </Link>
      <Link
        className="text-white text-2xl font-semibold hover:text-green-300 transition-transform transform hover:scale-105"
        to="/research"
        onClick={() => setMobileMenuOpen(false)}
      >
        Research
      </Link>
      <Link
        className="text-white text-2xl font-semibold hover:text-green-300 transition-transform transform hover:scale-105"
        to="/about"
        onClick={() => setMobileMenuOpen(false)}
      >
        About
      </Link>
      <Link
        className="text-white text-2xl font-semibold hover:text-green-300 transition-transform transform hover:scale-105"
        to="/Funds"
        onClick={() => setMobileMenuOpen(false)}
      >
        Funds
      </Link>
    </div>
  </nav>
)}
    </header>
  );
}
export default PortfolioOptimizer;
