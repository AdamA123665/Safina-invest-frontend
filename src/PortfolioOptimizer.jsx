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
        {/* Header and Navigation Bar */}
        <header className="bg-gray-50 shadow">
          <div className="container mx-auto px-6 sm:px-8 lg:px-10 flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img
                src={`${process.env.PUBLIC_URL}/safina_invest_logo-removebg-preview.png`}
                alt="Safina Invest Logo"
                style={{ width: '100px', height: 'auto', paddingTop: '5px' }}
              />
              <span className="font-bold text-xl" style={{ color: '#228B22' }}>
                Safina Invest
              </span>
            </div>
            <nav className="hidden sm:flex space-x-4">
              <Link className="text-gray-800 hover:text-green-600" to="/">Home</Link>
              <Link className="text-gray-800 hover:text-green-600" to="/allocation">Allocation</Link>
              <Link className="text-gray-800 hover:text-green-600" to="/assets">Assets</Link>
              <Link className="text-gray-800 hover:text-green-600" to="/research">Research</Link>
              <Link className="text-gray-800 hover:text-green-600" to="/about">About</Link>
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
