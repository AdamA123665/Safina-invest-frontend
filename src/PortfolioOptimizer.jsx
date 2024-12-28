// src/PortfolioOptimizer.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

// Import the new Navbar and Footer
import Navbar from './Navbar';
import Footer from './Footer';

import './index.css'; // your global styles

function PortfolioOptimizer() {
  return (
    <Router>
      {/* Always show the Navbar at the top */}
      <Navbar />

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
        </Routes>
      </div>

      {/* Always show the Footer at the bottom */}
      <Footer />
    </Router>
  );
}

export default PortfolioOptimizer;
