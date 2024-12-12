import React, { useState, useEffect, useMemo } from 'react';
import { ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom'; // Ensure react-router-dom is installed
const Step1 = () => {
  const [riskLevel, setRiskLevel] = useState(5);

  const handleRiskChange = (e) => {
    setRiskLevel(parseInt(e.target.value));
  };

  // Generate data for risk levels 1 to 10
  const stockData = useMemo(() => generateStockData(), []);

  return (
    <div className="flex flex-col md:flex-row items-center">
      {/* Graph and Slider */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        {/* Graph */}
        <div className="relative w-full max-w-md mb-8">
          <svg viewBox="0 0 300 200" className="w-full h-auto">
            {/* Axes */}
            <line x1="30" y1="170" x2="280" y2="170" stroke="#ccc" strokeWidth="2" />
            <line x1="30" y1="170" x2="30" y2="20" stroke="#ccc" strokeWidth="2" />

            {/* Lines for risk levels 1 to 10 */}
            {stockData.map(({ risk, points }) => {
              const opacity = risk === riskLevel ? 1 : 0.2;
              const strokeWidth = risk === riskLevel ? 3 : 1;
              const color = risk === riskLevel ? '#A5D6A7' : '#888';

              const pathData = points
                .map((point, i) =>
                  i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`
                )
                .join(' ');

              return (
                <path
                  key={risk}
                  d={pathData}
                  fill="none"
                  stroke={color}
                  strokeWidth={strokeWidth}
                  opacity={opacity}
                />
              );
            })}
          </svg>

          {/* Labels */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute left-0 bottom-0 mb-2 ml-2 text-gray-600 text-sm">
              Growth
            </div>
            <div className="absolute right-0 bottom-0 mb-2 mr-2 text-gray-600 text-sm">
              Time
            </div>
          </div>
        </div>

        {/* Risk Slider */}
        <div className="flex flex-col items-center">
          <input
            type="range"
            min="1"
            max="10"
            value={riskLevel}
            onChange={handleRiskChange}
            className="slider"
            style={{
              marginBottom: '10px',
            }}
          />
          <div
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#A5D6A7',
              fontSize: '1.25rem',
              fontWeight: 'bold',
            }}
          >
            Risk Level: {riskLevel}
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:px-12">
        <h3 className="text-3xl font-bold mb-4" style={{ color: '#A5D6A7' }}>
          Step 1: Pick Your Risk Level
        </h3>
        <p
          className="text-gray-700 mb-4 text-lg"
          style={{ fontFamily: 'Open Sans, sans-serif' }}
        >
          Start by exploring various Sharia-compliant investment options. Understand the risks,
          rewards, and strategies to see what resonates with your financial goals.
        </p>
        <a href="/articles" className="text-gold font-semibold hover:underline text-lg">
          Read our in-depth articles
        </a>
      </div>

      {/* Embedded Styles */}
      <style jsx>{`
        .slider {
          -webkit-appearance: none;
          width: 200px;
          height: 15px;
          background: #d3d3d3;
          border-radius: 10px;
          outline: none;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .slider:hover {
          opacity: 1;
        }
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 30px;
          height: 30px;
          background: #A5D6A7;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 30px;
          height: 30px;
          background: #A5D6A7;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

// Generate stock-like data for the graph
const generateStockData = () => {
  const data = [];
  const numPoints = 20; // Number of data points
  let maxOverallValue = 0; // To normalize y-values later

  // First, generate all data
  for (let risk = 1; risk <= 10; risk++) {
    const points = [];
    let value = 0; // Starting from zero
    const meanReturn = 0.02 + risk * 0.005; // Higher risk levels have higher mean returns
    const volatility = 0.01 + risk * 0.01; // Higher risk levels have higher volatility

    for (let i = 0; i <= numPoints; i++) {
      const randomShock = (Math.random() - 0.5) * 2 * volatility;
      value += meanReturn + randomShock;
      if (value < 0) value = 0; // Prevent negative values
      points.push({ x: i, y: value });
    }
    data.push({ risk, points });
    const maxValue = Math.max(...points.map((p) => p.y));
    if (maxValue > maxOverallValue) maxOverallValue = maxValue;
  }

  // Now normalize y-values to fit the SVG coordinate system
  const xScale = 250 / numPoints; // Scaling x-values to fit within 250px width (from x=30 to x=280)
  const yScale = 140 / maxOverallValue; // Scaling y-values to fit within 140px height (from y=170 to y=30)

  // Adjust points to fit within the SVG viewBox
  const adjustedData = data.map(({ risk, points }) => {
    const adjustedPoints = points.map(({ x, y }) => ({
      x: x * xScale + 30, // Shift x to start from 30px
      y: 170 - y * yScale, // Invert y and shift to start from y=170px
    }));
    return { risk, points: adjustedPoints };
  });

  return adjustedData;
};
const Step2 = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row-reverse items-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      {/* Image of a Phone */}
      <div className="w-full md:w-1/2 flex justify-center">
        <motion.img
          src="trading_212.png" // Replace with your actual image path
          alt="Make Your First Investment"
          className="w-64 h-auto"
          whileHover={{ scale: 1.3, rotate: +10 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {/* Text Content */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:px-12">
        <h3 className="text-3xl font-bold mb-4" style={{ color: '#A5D6A7' }}>
          Step 2: Make Your First Investment
        </h3>
        <p className="text-gray-700 mb-4 text-lg" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          Use our recommended Trading 212 Pies or your preferred brokerage account to invest in
          tailored portfolios. Set up recurring investments for consistent growth.
        </p>
        <a
          href="/brokerage-options"
          className="text-gold font-semibold hover:underline text-lg"
        >
          Learn about brokerage options
        </a>
      </div>
    </motion.div>
  );
};

const Step3 = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      {/* Animated Man Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <motion.img
          src="legs back.webp" // Replace with your actual animated image path
          alt="Sit Back and Relax"
          className="w-64 h-auto"
          whileHover={{ scale: 1.3, rotate: -10 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {/* Text Content */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:px-12">
        <h3 className="text-3xl font-bold mb-4" style={{ color: '#A5D6A7' }}>
          Step 3: Sit Back and Relax
        </h3>
        <p className="text-gray-700 mb-4 text-lg" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          Monitor your portfolio performance regularly. Subscribe to our email updates to receive
          quarterly allocation changes, market insights, and tailored recommendations.
        </p>
        <a
          href="/subscribe"
          className="text-gold font-semibold hover:underline text-lg"
        >
          Subscribe to our email list
        </a>
      </div>
    </motion.div>
  );
};
const PortfolioOptimizer = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);   
    const [portfolioData, setPortfolioData] = useState(null);
    const [, setSelectedAsset] = useState(null);
    const navigate = useNavigate();
    
   // Fetch aggressive portfolio data
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch(
          'https://safinabackend.azurewebsites.net/api/portfolio/optimize',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              initial_investment: 1000,
              risk_tolerance: 10, // Assuming 10 represents aggressive
            }),
          }
        );

        if (!response.ok) throw new Error('Failed to fetch portfolio data');
        const data = await response.json();
        setPortfolioData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPortfolioData();
  }, []);
  
    useEffect(() => {
      if (
        portfolioData &&
        portfolioData.dashboard_data &&
        portfolioData.dashboard_data.asset_info
      ) {
        setSelectedAsset(portfolioData.dashboard_data.asset_info[0]);
      }
    }, [portfolioData, setSelectedAsset]);

    useEffect(() => {
      const fetchArticles = async () => {
        try {
          const response = await fetch('https://safinabackend.azurewebsites.net/api/articles');
          if (!response.ok) throw new Error('Failed to fetch articles');
          const data = await response.json();
          setArticles(data.slice(0, 3)); // Only take the first 3 articles
          setLoading(false);
        } catch (err) {
          console.error(err);
          setError(true);
          setLoading(false);
        }
      };
  
      fetchArticles();
    }, []);
  
    const openArticle = (id) => {
      navigate(`/articles/${id.toLowerCase()}`); // Ensure your routes are set up accordingly
    };
  
    if (loading) {
      return (
        <section id="research">
          <div className="container mx-auto px-4 py-20 text-center">
            <p className="text-xl">Loading...</p>
          </div>
        </section>
      );
    }
  
    if (error) {
      return (
        <section id="research">
          <div className="container mx-auto px-4 py-20 text-center">
            <p className="text-xl text-red-500">Failed to load articles. Please try again later.</p>
          </div>
        </section>
      );
    }

  
  
    return (
      <div className="relative min-h-screen text-gray-900 font-sans overflow-hidden">
  {/* Hero Section */}
  <section className="relative w-full h-[85vh] flex items-center justify-center px-4 md:px-8">
    {/* Static Gradient Background */}
    <div className="absolute inset-0 -z-10">
      <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-emerald-400 to-yellow-400">
        {/* Optional Decorative Patterns */}
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-800 to-transparent opacity-10 rounded-full blur-2xl"
          style={{ transform: 'translate(-50%, -50%)' }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tr from-yellow-500 to-transparent opacity-10 rounded-full blur-2xl"
          style={{ transform: 'translate(50%, 50%)' }}
        ></div>
      </div>
    </div>

    {/* Content Container */}
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <h1
        className="text-4xl md:text-6xl font-semibold tracking-tight mb-6"
        style={{
          fontFamily: 'Lora, serif',
          color: '#FFFFFF',
          textShadow: '2px 2px 6px rgba(0,0,0,0.2)',
        }}
      >
        Empowering Your Investments with Intelligent Insights
      </h1>

      <p
        className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto"
        style={{
          fontFamily: 'Open Sans, sans-serif',
          color: '#1F2937',
          textShadow: '1px 1px 4px rgba(0,0,0,0.1)',
        }}
      >
        Unlock sustainable growth through data-driven strategies and expert guidance.
      </p>

      <div className="flex flex-col items-center space-y-6 md:space-y-8">
        {/* Primary CTA Button */}
        <a
          href="#how-to-invest"
          className="relative inline-block px-10 py-4 text-lg font-semibold rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl focus:outline-none"
          style={{
            backgroundColor: '#006C5B',
            color: '#FFFFFF',
          }}
        >
          Start Investing
        </a>
      </div>
    </div>
  </section>

  {/* Embedded Styles */}
  <style jsx>{`
    .bg-gradient-to-br {
      background: linear-gradient(135deg, #006c5b 0%, #fdbb2d 100%);
    }
  `}</style>


<section
  id="construction"
  className="relative py-20 overflow-hidden bg-gradient-to-b from-emerald-100 via-white to-yellow-50"
>
  {/* Subtle Pattern Overlay */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage:
        'radial-gradient(circle at 20% 20%, rgba(0, 0, 0, 0.03) 1px, transparent 1px), radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
      backgroundSize: '50px 50px',
      opacity: 0.5,
    }}
  ></div>

  {/* Decorative Top Left Shape */}
  <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-400 rounded-full filter blur-3xl opacity-60"></div>

  {/* Decorative Bottom Right Shape */}
  <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-300 rounded-full filter blur-2xl opacity-50"></div>

  {/* Center Highlight Shape */}
  <div className="absolute inset-x-1/2 top-1/4 w-48 h-48 bg-emerald-200 opacity-20 rounded-full filter blur-2xl transform -translate-x-1/2"></div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">

      {/* Left Content */}
      <div>
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2
            className="text-6xl font-extrabold mb-4 leading-tight"
            style={{ 
              fontFamily: 'Lora, serif',
              background: 'linear-gradient(90deg, #a78bfa, #fda4af 30%, #6ee7b7 60%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1.2',
            }}
          >
            Build Real Wealth
          </h2>
          <p
            className="text-xl font-semibold"
            style={{ fontFamily: 'Open Sans, sans-serif', color: '#4A4A4A' }}
          >
            Curated portfolios blending the best of:
          </p>
          <ul 
            className="list-disc list-inside text-lg pl-4" 
            style={{ fontFamily: 'Open Sans, sans-serif', color: '#555' }}
          >
            <li className="mb-1">Equity</li>
            <li className="mb-1">Sukuk</li>
            <li className="mb-1">Real Estate</li>
            <li className="mb-1">Commodities</li>
          </ul>
          <p
            className="text-sm text-gray-500"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            *Past performance isn’t indicative of future results.
          </p>
        </motion.div>
      </div>

      {/* Chart Area */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {portfolioData && (
          <div 
            className="relative p-6 rounded-3xl shadow-xl bg-white/50 backdrop-blur-xl border border-white/30"
            style={{ 
              boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 
                className="text-2xl font-bold"
                style={{ 
                  fontFamily: 'Lora, serif', 
                  color: '#333' 
                }}
              >
                Investment Growth
              </h3>
              <div className="text-sm text-gray-600" style={{fontFamily:'Open Sans, sans-serif'}}>
                (10-year view)
              </div>
            </div>

            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={portfolioData.dashboard_data.performance.dates.map((date, idx) => ({
                    date: new Date(date).toLocaleDateString('en-US', {
                      month: 'short',
                      year: '2-digit',
                    }),
                    Portfolio:
                      portfolioData.dashboard_data.performance.series.find(
                        (s) => s.name === 'Portfolio'
                      )?.values[idx] || 0,
                    SP500:
                      portfolioData.dashboard_data.performance.series.find(
                        (s) => s.name === 'S&P 500'
                      )?.values[idx] || 0,
                  }))}
                  margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4B5563" stopOpacity={0.2}/>
                      <stop offset="100%" stopColor="#4B5563" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSP500" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tick={{
                      fill: '#4B5563',
                      fontSize: '14px',
                      fontFamily: 'Lora, serif',
                    }}
                    tickLine={false}
                    axisLine={{ stroke: '#D1D5DB' }}
                  />
                  <YAxis
                    orientation="right"
                    tick={{
                      fill: '#4B5563',
                      fontSize: '14px',
                      fontFamily: 'Lora, serif',
                    }}
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                    axisLine={{ stroke: '#D1D5DB' }}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value) => `${(value * 100).toFixed(2)}%`}
                    contentStyle={{
                      background: '#ffffff',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                      padding: '8px 12px',
                      fontFamily: 'Lora, serif',
                      fontSize: '14px',
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: '16px',
                      color: '#4B5563',
                      fontFamily: 'Lora, serif',
                      fontWeight: '500',
                    }}
                    iconType="circle"
                    iconSize={10}
                    align="center"
                    layout="horizontal"
                  />
                  <Area
                    type="monotone"
                    dataKey="Portfolio"
                    stroke="#4B5563"
                    fill="url(#colorPortfolio)"
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                  <Area
                    type="monotone"
                    dataKey="SP500"
                    stroke="#10B981"
                    fill="url(#colorSP500)"
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Neon Highlight Tag */}
            <div
              className="absolute bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              style={{
                top: '80px',
                left: '20px',
                fontFamily: 'Lora, serif',
                transform: 'rotate(-5deg)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                animation: 'pulseBadge 2s infinite',
                cursor: 'default',
              }}
            >
              +300% Growth!
            </div>
          </div>
        )}
      </motion.div>
    </div>
  </div>

  {/* Custom CSS Animations */}
  <style jsx>{`
    @keyframes pulseBadge {
      0% { transform: scale(1) rotate(-5deg); }
      50% { transform: scale(1.05) rotate(-5deg); }
      100% { transform: scale(1) rotate(-5deg); }
    }

    .recharts-surface {
      background-color: transparent;
    }
    .recharts-tooltip-wrapper {
      transition: all 0.2s ease;
    }
    .recharts-legend-item {
      font-family: 'Lora, serif';
      font-size: 14px;
      font-weight: bold;
    }
  `}</style>
</section>

    {/* About Section */}
    <section id="about" className="py-10 text-white" style = {{background:'#F9FAFB'}}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Title and Tagline */}
          <motion.h2
      className="text-4xl font-extrabold text-center mb-12"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{ fontFamily: 'Lora, serif', color: '#006C5B' }}
    >
      Support from start to end
    </motion.h2>

          {/* Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Learn */}
            <div className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gold mx-auto mb-4">
                {/* Icon for Learn */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2a7 7 0 00-7 7v3l-2 2v1h18v-1l-2-2V9a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#006C5B' }}>Learn</h3>
              <p className="text-gray-600 mb-6" style={{ color: '#1F2937' }}>
                Explore investment strategies, understand your options, and find
                solutions that align with your goals.
              </p>
              <Link
                to="/assets"
                className="inline-block px-4 py-2 bg-gold text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 transition"
              >
                Explore Assets
              </Link>
            </div>

            {/* Card 2: Manage */}
            <div className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gold mx-auto mb-4">
                {/* Icon for Manage */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 20h10a2 2 0 002-2V7a2 2 0 00-2-2h-5l-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#006C5B' }} >Manage</h3>
              <p className="text-gray-600 mb-6" style={{ color: '#1F2937' }}>
                Use our advanced tools and data-driven services to optimise your
                investments with data from the last 10+ years.
              </p>
              <Link
                to="/allocation"
                className="inline-block px-4 py-2 bg-gold text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 transition"
              >
                Allocation Tools
              </Link>
            </div>

            {/* Card 3: Prosper */}
            <div className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gold mx-auto mb-4">
                {/* Icon for Prosper */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#006C5B' }} >Prosper</h3>
              <p className="text-gray-600 mb-6" style={{ color: '#1F2937' }}>
                Stay informed with the latest investment news and explore
                tax-efficient growth strategies.
              </p>
              <Link
                to="/research"
                className="inline-block px-4 py-2 bg-gold text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 transition"
              >
                Research Insights
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Styles */}
      <style jsx>{`
        /* Colors */
        .bg-midnight-blue {
          background-color: ##F5F5F5;
        }
        .bg-gold {
          background-color: #A5D6A7;
        }

        /* Arrow Animation */
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }

        /* Hover Effects */
        .hover\\:shadow-2xl:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          h1 {
            font-size: 36px !important;
          }
          h2 {
            font-size: 28px !important;
          }
          p {
            font-size: 16px !important;
          }
        }
      `}</style>



{/* How to Invest Section */}
<section id="how-to-invest" className="relative py-20 overflow-hidden" style={{
    background: '#F4E7D3',
  }} >
  <div className="container mx-auto px-4">
    {/* Section Title */}
    <motion.h2
      className="text-5xl font-extrabold text-center mb-20"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      style={{ fontFamily: 'Lora, serif', color: '#A5D6A7' }}
    >
      Take Action
    </motion.h2>

    {/* Steps */}
    <div className="space-y-20">
      {/* Step 1 */}
      <Step1 />
      {/* Step 2 */}
      <Step2 />
      {/* Step 3 */}
      <Step3 />
    </div>
  </div>

  {/* Embedded Styles */}
  <style jsx>{`
    .text-gold {
      color: #A7A9AC;
    }
    .slider {
      -webkit-appearance: none;
      width: 200px;
      height: 15px;
      background: #d3d3d3;
      border-radius: 10px;
      outline: none;
      opacity: 0.7;
      transition: opacity .2s;
    }
    .slider:hover {
      opacity: 1;
    }
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 30px;
      height: 30px;
      background: #A5D6A7;
      border-radius: 50%;
      cursor: pointer;
    }
    .slider::-moz-range-thumb {
      width: 30px;
      height: 30px;
      background: #A5D6A7;
      border-radius: 50%;
      cursor: pointer;
    }
  `}</style>
</section>

<section id="research">
      {/* Research Section Background */}
<div className="relative py-20 overflow-hidden bg-research-gradient">
  {/* Decorative Abstract Shapes */}
  <div
    className="absolute top-0 left-0 w-[300px] h-[300px] bg-emerald-500 rounded-full opacity-20 blur-3xl"
    style={{ transform: 'translate(-50%, -50%)' }}
  ></div>
  <div
    className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-gold opacity-30 blur-2xl"
    style={{ transform: 'translate(50%, 50%)' }}
  ></div>

  {/* Subtle Decorative Lines */}
  <div
    className="absolute top-0 right-0 w-full h-full pointer-events-none"
    style={{
      backgroundImage:
        'url(/images/abstract-lines.svg)', // Replace with a subtle SVG or decorative element
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: 0.1,
    }}
  ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="space-y-8">
            {/* Title Section */}
            <div className="text-center">
              <h2
                className="text-5xl font-bold mb-4"
                style={{
                  fontFamily: 'Lora, serif',
                  color: '#006C5B',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                Explore Our Latest Research
              </h2>
            </div>

            {/* Articles Grid */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105"
                  >
                    {/* Image Section */}
                    <div className="relative">
                      {/* Handle image_url as an object */}
                      <img
                        src={
                          typeof article.image_url === 'object' && article.image_url.url
                            ? article.image_url.url
                            : 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A6f22b49f-c9e1-4ddf-9cc6-eead253330d0?source=next-article&fit=scale-down&quality=highest&width=1440&dpr=1'
                        }
                        alt={
                          typeof article.image_url === 'object' && article.image_url.alt
                            ? article.image_url.alt
                            : article.title
                        }
                        className="w-full h-40 sm:h-48 object-cover"
                        loading="lazy" // Lazy load images for performance
                      />
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white text-sm px-2 py-1 rounded-lg shadow-md">
                        {article.date
                          ? new Date(article.date).toLocaleDateString()
                          : 'No Date'}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3" style={{ color: '#A5D6A7' }}>
                        {article.title || 'No Title'}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {Array.isArray(article.content) && typeof article.content[0] === 'string'
                          ? article.content[0].length > 120
                            ? `${article.content[0].substring(0, 120)}...`
                            : article.content[0]
                          : typeof article.content === 'string'
                          ? article.content.length > 120
                            ? `${article.content.substring(0, 120)}...`
                            : article.content
                          : 'No preview available'}
                      </p>
                      <button
                        onClick={() => openArticle(article.id)}
                        className="text-yellow-500 font-semibold hover:underline"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  
<section
  id="contact"
  className="relative py-20 bg-cover bg-center"
  style={{ background: '#A5D6A7' }}
>
  <div className="relative container mx-auto px-4 text-center">
    <h2
      className="text-4xl font-bold mb-4 text-white"
      style={{ fontFamily: 'Lora, serif' }}
    >
      Contact Us
    </h2>
    <p
      className="text-lg mb-8 text-gray-200"
      style={{ fontFamily: 'Open Sans, sans-serif' }}
    >
      Have questions or need support? Get in touch with us.
    </p>
    <a
      href="mailto:support@safinabank.com"
      className="bg-gold text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-600 transition"
    >
      Email Us
    </a>
  </div>
</section>
      </div>
    );
  }
  
  export default PortfolioOptimizer;
  