// src/PortfolioOptimizer.jsx

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import your pages
import Home from './pages/Home';
import Allocation from './pages/Allocation';
import Assets from './pages/Assets';
import Funds from './pages/Funds';
import Research from './pages/Research';
import About from './pages/About';
import Trial from './pages/Trial';
import Test2 from './pages/Test2';
import ArticleDetailsPage from './pages/ArticleDetailsPage';
import Methodology from './pages/methodology'; // <-- NEW: Import the Methodology page

// Import the Navbar and Footer
import Navbar from './Navbar';
import Footer from './Footer';
import RouteChangeTracker from './pages/RouteChangeTracker'; // Existing component

import './index.css'; // Your global styles

/**
 * ScrollToTop Component
 * Automatically scrolls the window to the top whenever the route changes.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the window when the pathname changes
    window.scrollTo({
      top: 0,
      behavior: 'instant', // Change to 'smooth' for smooth scrolling
    });
  }, [pathname]);

  return null; // This component doesn't render anything
};

function PortfolioOptimizer() {
  return (
    <Router>
      {/* ScrollToTop listens to route changes and scrolls to top */}
      <ScrollToTop />

      {/* Always show the Navbar at the top */}
      <Navbar />

      {/* RouteChangeTracker logs page views */}
      <RouteChangeTracker />

      {/* Page Content */}
      <div className="pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allocation" element={<Allocation />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/research" element={<Research />} />
          <Route path="/about" element={<About />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/trial" element={<Trial />} />
          <Route path="/test2" element={<Test2 />} />
          <Route path="/articles/:id" element={<ArticleDetailsPage />} />

          {/* NEW: Methodology route */}
          <Route path="/methodology" element={<Methodology />} />
        </Routes>
      </div>

      {/* Always show the Footer at the bottom */}
      <Footer />
    </Router>
  );
}

export default PortfolioOptimizer;
