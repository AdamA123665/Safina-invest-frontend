import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Allocation from './pages/Allocation';
import Assets from './pages/assets';
import Research from './pages/Research';
import About from './pages/about';

function PortfolioOptimizer() {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '20px', padding: '10px', backgroundColor: '#333' }}>
        <Link style={{ color: 'white', textDecoration: 'none' }} to="/">Home</Link>
        <Link style={{ color: 'white', textDecoration: 'none' }} to="/allocation">Allocation</Link>
        <Link style={{ color: 'white', textDecoration: 'none' }} to="/assets">Assets</Link>
        <Link style={{ color: 'white', textDecoration: 'none' }} to="/research">Research</Link>
        <Link style={{ color: 'white', textDecoration: 'none' }} to="/contact">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allocation" element={<Allocation />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/research" element={<Research />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default PortfolioOptimizer;
