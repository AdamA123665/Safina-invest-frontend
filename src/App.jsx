// src/App.jsx

import React, { useEffect, useState } from 'react';
import PortfolioOptimizer from './PortfolioOptimizer';

function App() {
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    // Replace the URL with your actual data source
    fetch('/api/portfolio') // Example endpoint
      .then(response => response.json())
      .then(data => setPortfolioData(data))
      .catch(error => console.error('Error fetching portfolio data:', error));
  }, []);

  if (!portfolioData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-primary-green text-xl">Loading...</p>
      </div>
    );
  }

  return <PortfolioOptimizer portfolioData={portfolioData} />;
}

export default App;
