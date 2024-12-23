import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom'; // Ensure react-router-dom is installed
import { ArrowRight, TrendingUp, Wallet, Settings } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
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
          const color = risk === riskLevel ? '#065F46' : '#888';

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

    <div className="flex flex-col items-center w-full">
{/* Slider Bar with Gradient */}
<div className="relative w-full">
  <div className="flex items-center justify-between w-full">
    {/* Left Label */}
    <span className="text-sm text-gray-600">Low Risk</span>
    {/* Slider */}
    <input
      type="range"
      min="1"
      max="10"
      value={riskLevel}
      onChange={handleRiskChange}
      className="slider w-full appearance-none h-3 rounded-full bg-gradient-to-r from-green-500 to-red-500 focus:outline-none mx-2"
      style={{
        marginBottom: '16px',
      }}
    />
    {/* Right Label */}
    <span className="text-sm text-gray-600">High Risk</span>
  </div>
</div>


      {/* Risk Level Display */}
      <div
        style={{
          fontFamily: 'Open Sans, sans-serif',
          color: '#065F46',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginTop: '10px',
        }}
      >
        Risk Level: {riskLevel}
      </div>
    </div>
  </div>


      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:px-12">
  <h3 className="text-3xl font-bold mb-6" style={{ color: '#065F46' }}>
    Step 1: Pick Your Risk Level
  </h3>
  <p
    className="text-gray-700 mb-6 text-lg"
    style={{ fontFamily: 'Open Sans, sans-serif' }}
  >
    Choosing the right risk level means understanding how much you can afford to lose while pursuing growth. Take our fun, interactive quiz to help you decide!
  </p>
  <p className="text-gray-700 text-lg font-semibold mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
    Learn More:
  </p>
  <div className="space-y-4">
    <div className="flex items-center space-x-3">
      <span className="text-emerald-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m-1 4h1m8-4h-1v4h-1m-1-4h1" />
        </svg>
      </span>
      <a
        href="/articles/understanding-investing-risk"
        className="text-emerald-600 font-semibold hover:text-emerald-700 text-lg transition-colors duration-200"
        style={{ fontFamily: 'Open Sans, sans-serif' }}
      >
        Understanding Risk
      </a>
    </div>
    <div className="flex items-center space-x-3">
      <span className="text-emerald-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a2 2 0 100-4H7a2 2 0 100 4h4" />
        </svg>
      </span>
      <a
        href="/assets"
        className="text-emerald-600 font-semibold hover:text-emerald-700 text-lg transition-colors duration-200"
        style={{ fontFamily: 'Open Sans, sans-serif' }}
      >
        Exploring Asset Classes
      </a>
    </div>
  </div>
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
          background: #065F46;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 30px;
          height: 30px;
          background: #065F46;
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
      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:px-12">
  <h3 className="text-3xl font-bold mb-6" style={{ color: '#065F46' }}>
    Step 2: Build Your Risk-Adjusted Portfolio
  </h3>
  <p className="text-gray-700 mb-6 text-lg" style={{ fontFamily: 'Open Sans, sans-serif' }}>
    Input your investment amount and risk level into our model to receive tailored allocations. Powered by over 10 years of backtested data, our process combines rigorous analysis with proven strategies—no guesswork involved.
  </p>
  <div className="space-y-4">
    <div className="flex items-center space-x-3">
      <span className="text-emerald-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7-7.5H5" />
        </svg>
      </span>
      <a
        href="/Allocation"
        className="text-emerald-600 font-semibold hover:text-emerald-700 text-lg transition-colors duration-200"
        style={{ fontFamily: 'Open Sans, sans-serif' }}
      >
        Explore Asset Allocation
      </a>
    </div>
    <div className="flex items-center space-x-3">
      <span className="text-emerald-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a2 2 0 100-4H7a2 2 0 100 4h4" />
        </svg>
      </span>
      <a
        href="/research"
        className="text-emerald-600 font-semibold hover:text-emerald-700 text-lg transition-colors duration-200"
        style={{ fontFamily: 'Open Sans, sans-serif' }}
      >
        Learn About Our Methodology
      </a>
    </div>
  </div>
</div>
    </motion.div>
  );
};
const Step3 = () => {
  // Define your state and handlers inside the component:
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'success', 'error', 'loading'

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEmail('');
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://safinabackend.azurewebsites.net/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Subscription failed');
      }

      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

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
          src="legs back.webp"
          alt="Sit Back and Relax"
          className="w-64 h-auto"
          whileHover={{ scale: 1.3, rotate: -10 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:px-12">
        <h3 className="text-3xl font-bold mb-6" style={{ color: '#065F46' }}>
          Step 3: Invest and Relax
        </h3>
        <p
          className="text-gray-700 mb-6 text-lg"
          style={{ fontFamily: 'Open Sans, sans-serif' }}
        >
          Use our Trading 212 portfolio integration or your preferred brokerage account to invest.
          We recommend starting small by investing regularly each month. Subscribe to our email
          updates for quarterly allocation changes, market insights, and tailored recommendations.
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img
              src="/trading212-removebg-preview.png"
              alt="Trading 212 Logo"
              className="w-8 h-8"
            />
            <a
              href="/Allocation"
              className="text-emerald-600 font-semibold hover:text-emerald-700 text-lg transition-colors duration-200"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Trading 212 portfolios
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7-7.5H5" />
              </svg>
            </span>
            <a
              href="/research"
              className="text-emerald-600 font-semibold hover:text-emerald-700 text-lg transition-colors duration-200"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Learn About Brokerage Platforms
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <img src="/email.webp" alt="Email Icon" className="w-8 h-8" />
            <div>
              <button
                onClick={openModal}
                className="text-emerald-600 font-semibold hover:text-emerald-700 text-lg transition-colors duration-200"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Subscribe to Email Updates
              </button>

              {isModalOpen && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4"
                  aria-modal="true"
                  role="dialog"
                  aria-labelledby="subscription-modal-title"
                >
                  <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                    {/* Close Button */}
                    <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                      aria-label="Close Modal"
                    >
                      ✕
                    </button>

                    {/* Modal Content */}
                    <h2 id="subscription-modal-title" className="text-2xl font-bold text-emerald-700 mb-4">
                      Subscribe to Our Updates
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Enter your email below to receive the latest news, updates, and offers.
                    </p>

                    {status === 'success' ? (
                      <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded mb-4 text-emerald-700">
                        Thank you! You’re now subscribed.
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded mb-4"
                          placeholder="you@example.com"
                          disabled={status === 'loading'}
                        />
                        <button
                          type="submit"
                          className="w-full bg-emerald-600 text-white font-semibold py-2 rounded hover:bg-emerald-700 transition-colors duration-200"
                          disabled={status === 'loading'}
                        >
                          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                        </button>
                        {status === 'error' && (
                          <p className="text-red-600 text-sm mt-2">
                            There was an error subscribing. Please try again.
                          </p>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
const PortfolioOptimizer = () => {
  // State declarations
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [, setSelectedAsset] = useState(null);
  const navigate = useNavigate();
  const words = ['saving', 'investing', 'staying shariah compliant'];

  // Hooks related to hero scroll and parallax
  const [phase, setPhase] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const [flippedCard, setFlippedCard] = useState(null);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [isFinalPhase, setIsFinalPhase] = useState(false);

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

  // Set selected asset when portfolioData changes
  useEffect(() => {
    if (
      portfolioData &&
      portfolioData.dashboard_data &&
      portfolioData.dashboard_data.asset_info
    ) {
      setSelectedAsset(portfolioData.dashboard_data.asset_info[0]);
    }
  }, [portfolioData, setSelectedAsset]);

  // Fetch articles
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

  // Handle scroll for phase transitions
  useEffect(() => {
    const handleScroll = () => {
      if (isFinalPhase) return; // Do not update phases if final phase is reached

      const scrolled = window.scrollY;
      const vh = window.innerHeight;

      if (scrolled < vh) {
        setPhase(0);
        setTransitionProgress(0);
      } else if (scrolled < 2 * vh) {
        setPhase(1);
        setTransitionProgress(0);
      } else if (scrolled < 3 * vh) {
        setPhase(2);
        // Calculate transition progress between phase 2 and 3
        setTransitionProgress((scrolled - 2 * vh) / vh);
      } else {
        setPhase(3);
        setTransitionProgress(1);
        setIsFinalPhase(true); // Lock into final phase
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check in case the user is not at the top
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFinalPhase]); // Depend on isFinalPhase

  // Handle mouse move for parallax
  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x, y });
  };

  // Function to open an article
  const openArticle = (id) => {
    navigate(`/articles/${id.toLowerCase()}`); // Ensure your routes are set up accordingly
  };

  // Conditional rendering based on loading and error
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

  // Cards configuration
  const cards = [
    {
      title: 'Save',
      icon: Wallet,
      description: 'Smart Wealth Preservation',
      details:
        'Optimize your savings with AI-powered recommendations and automated strategies that align with Islamic principles.',
      link: '/savings',
    },
    {
      title: 'Invest',
      icon: TrendingUp,
      description: 'Data-Driven Growth',
      details:
        'Access carefully curated Shariah-compliant investment opportunities backed by advanced analytics.',
      link: '/invest',
    },
    {
      title: 'Tools',
      icon: Settings,
      description: 'Financial Planning',
      details:
        'Comprehensive suite of Islamic financial planning tools to help you make informed decisions.',
      link: '/tools',
    },
  ];

  return (
    <div
      className="w-full bg-gradient-to-br from-green-800 via-green-700 to-blue-800 text-white"
      onMouseMove={handleMouseMove}
      ref={heroRef}
    >
      {/* 
        =============================
          INITIAL HERO SECTION (Phases 0-2)
          Rendered only when not in final phase
        =============================
      */}
      {!isFinalPhase && (
        <div className="relative min-h-[300vh]">
          {/* Sticky container for text */}
          <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
            <div
              className={`text-center transition-all duration-700`}
              style={{
                transform: `translate3d(${(mousePos.x * 0.02).toFixed(2)}px, ${
                  (mousePos.y * 0.02).toFixed(2)
                }px, 0)`,
              }}
            >
              {/* Main Title */}
              <h1
                className="text-5xl md:text-7xl font-bold mb-4"
                style={{
                  transform: `translateY(-${transitionProgress * 50}px)`,
                  transition: 'transform 0.7s ease-out',
                }}
              >
                Grow your wealth
              </h1>
              {/* Subtitle with rotating words, hidden in phase 3 */}
              {phase < 3 && (
                <h2
                  className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 mb-6"
                  style={{
                    opacity: 1 - transitionProgress,
                    transition: 'opacity 0.7s ease-out',
                  }}
                >
                  by {words[phase < 3 ? phase : 2]}
                </h2>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 
        =============================
          FINAL HERO SECTION (Phase 3)
          Always rendered, positioning changes based on phase
        =============================
      */}
      <div
        className={`bg-green-900/80 backdrop-blur-md z-20 ${
          phase < 2 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          transition: 'opacity 0.7s ease-out, position 0.3s ease-out',
          opacity: phase < 2 ? 0 : phase >= 3 ? 1 : transitionProgress,
          position: isFinalPhase ? 'relative' : 'fixed', // Switch between fixed and relative
          top: isFinalPhase ? 'auto' : 0,
          left: isFinalPhase ? 'auto' : 0,
          right: isFinalPhase ? 'auto' : 0,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          {/* Static Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Grow your wealth</h1>
          {/* "Start Investing" Button */}
          {phase >= 3 && (
            <button
              className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg text-white font-semibold shadow-md"
              onClick={() => (window.location.href = '/invest')}
            >
              Start Investing
            </button>
          )}
          {/* Flip Cards */}
          {phase >= 3 && (
            <div
              className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8"
              style={{
                opacity: transitionProgress,
                transition: 'opacity 0.7s ease-out',
              }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="relative w-72 h-96 cursor-pointer perspective-1000"
                  style={{
                    // Slight tilt for casual stacked look
                    transform: `rotate(${(index - 1) * 1.5}deg)`,
                  }}
                  onMouseEnter={() => setFlippedCard(index)}
                  onMouseLeave={() => setFlippedCard(null)}
                >
                  <div
                    className={`absolute inset-0 transition-transform duration-700 transform-style-3d ${
                      flippedCard === index ? 'rotateY-180' : ''
                    }`}
                    style={{
                      transform:
                        flippedCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* Front side */}
                    <div className="absolute inset-0 bg-green-800/80 rounded-2xl overflow-hidden backface-hidden flex flex-col items-center justify-center p-6">
                      <card.icon className="w-16 h-16 text-blue-400 mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                      <p className="text-gray-200 text-center">{card.description}</p>
                    </div>

                    {/* Back side */}
                    <div className="absolute inset-0 bg-green-800/90 rounded-2xl p-6 backface-hidden flip-card-back rotateY-180">
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                          <p className="text-gray-200">{card.details}</p>
                        </div>
                        <a
                          href={card.link}
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mt-4"
                        >
                          Learn More <ArrowRight className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Spacer with Dynamic Margin-Top */}
      <div
        style={{
          marginTop: isFinalPhase ? '0' : '300vh',
          transition: 'margin-top 0.3s ease-out',
        }}
      >
        

        {/* 
          =============================
            DATA/ANALYTICS SECTION
          =============================
        */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text / CTA */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-green-800">
                  Driven by Data
                </h2>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  Make informed decisions with our advanced analytics and real-time market insights.
                  Our data-driven approach ensures optimal performance while maintaining strict
                  Shariah compliance.
                </p>
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg text-white font-semibold shadow-md"
                  onClick={() => (window.location.href = '/analytics')}
                >
                  Explore Analytics <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Chart + Stat Boxes */}
              <div className="bg-gray-100 rounded-2xl p-8 shadow-lg">
                {/* Volatility & YTD Return */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                  {/* Volatility */}
                  <div className="flex-1 bg-green-100 border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Volatility
                    </span>
                    <span className="text-2xl font-bold text-green-700">12.5%</span>
                  </div>
                  {/* YTD Return */}
                  <div className="flex-1 bg-green-100 border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      YTD Return
                    </span>
                    <span className="text-2xl font-bold text-green-700">+8.7%</span>
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
  <LineChart 
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
      <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
      </linearGradient>
    </defs>
    <XAxis
      dataKey="date"
      axisLine={false}
      tickLine={false}
      tick={{ fill: '#6B7280' }}
    />
    <YAxis
      axisLine={false}
      tickLine={false}
      tick={{ fill: '#6B7280' }}
      domain={['auto', 'auto']}
    />
    <Tooltip
      contentStyle={{
        backgroundColor: '#F3F4F6',
        border: 'none',
        borderRadius: '0.5rem',
        color: '#374151',
      }}
    />
    <Line
      type="monotone"
      dataKey="Portfolio"
      stroke="#10B981"
      strokeWidth={3}
      dot={false}
      fill="url(#performanceGradient)"
      fillOpacity={1}
    />
    <Line
      type="monotone"
      dataKey="SP500"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeDasharray="5 5"
      dot={false}
      fill="url(#projectedGradient)"
      fillOpacity={1}
    />
  </LineChart>
</ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>




<section
      id="about"
      className="relative py-20"
      style={{ background: "#F9FAFB" }}
    >
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(0,0,0,0.03) 1px, transparent 1px), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          opacity: 0.4,
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
        {/* Heading Area */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h2
            className="text-5xl font-extrabold mb-4 leading-snug"
            style={{
              fontFamily: "Lora, serif",
              color: "#006C5B",
            }}
          >
            Covering the A to Z of ethical investing
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto text-gray-700"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            From gaining foundational knowledge to optimizing your portfolio and
            staying ahead with insightful research, we’re here to guide you at
            every stage of your investing journey.
          </p>
        </motion.div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card Data Array for Reusability */}
          {[ 
            {
              title: "Learn",
              description:
                "Explore asset classes, understand your risk apetite, and find solutions that align with your goals.",
              link: "/assets",
              linkLabel: "Explore Assets",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
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
              ),
            },
            {
              title: "Manage",
              description:
                "Use our advanced tools and data-driven services to optimize your investments with insights spanning over a decade.",
              link: "/allocation",
              linkLabel: "Allocation Tools",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
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
              ),
            },
            {
              title: "Prosper",
              description:
                "Stay informed with the latest investment news and resources to help your wealth flourish.",
              link: "/research",
              linkLabel: "Research Insights",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 5l7 7-7 7"
                  />
                </svg>
              ),
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {/* Icon Circle */}
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-200 mx-auto mb-6">
                <div className="text-#065F46">{card.icon}</div>
              </div>

              {/* Title */}
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#006C5B", fontFamily: "Lora, serif" }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-6">
                {card.description}
              </p>

              {/* CTA Button */}
              <Link
                to={card.link}
                className="inline-block px-5 py-3 font-semibold rounded-md shadow-md text-white transition"
                style={{
                  backgroundColor: "#006C5B",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005345")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#006C5B")}
              >
                {card.linkLabel}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Embedded Styles */}
      <style jsx>{`
        /* Additional Hover Animation */
        .shadow-2xl {
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 32px !important;
          }
          p {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>


{/* How to Invest Section */}
<section id="how-to-invest" className="relative py-20 overflow-hidden bg-green-50  "  >
  <div className="container mx-auto px-4">
    {/* Section Title */}
    <motion.h2
      className="text-5xl font-extrabold text-center mb-20"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      style={{ fontFamily: 'Lora, serif', color: '#065F46' }}
    >
      Begin Your Journey
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
      background: #065F46;
      border-radius: 50%;
      cursor: pointer;
    }
    .slider::-moz-range-thumb {
      width: 30px;
      height: 30px;
      background: #065F46;
      border-radius: 50%;
      cursor: pointer;
    }
  `}</style>
</section>

<section id="research">
      {/* Research Section Background */}
      <div
    className="relative py-20 overflow-hidden"
    style={{ backgroundColor: '#f7f7f7' }} // Light grey background
  >

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
                          article.image_url
                            ? article.image_url
                            : 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A6f22b49f-c9e1-4ddf-9cc6-eead253330d0?source=next-article&fit=scale-down&quality=highest&width=1440&dpr=1'
                        }
                        alt={article.title || 'No Title'}
                        className="w-full h-40 sm:h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 bg-green-800 text-white text-sm px-2 py-1 rounded-lg shadow-md">
                        {article.date
                          ? new Date(article.date).toLocaleDateString()
                          : 'No Date'}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3" style={{ color: '#065F46' }}>
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
                        className="text-green-800 font-semibold hover:underline"
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
  className="relative py-20"
  style={{ background: '#f7f7f7' }} // Soft pastel blue background for a clean and professional look
>
  <div className="container mx-auto px-4 text-center">
    <h2
      className="text-5xl font-extrabold mb-6"
      style={{
        fontFamily: 'Lora, serif',
        color: '#333', // Dark grey for better readability
      }}
    >
      Get in Touch
    </h2>
    <p
      className="text-lg mb-8"
      style={{
        fontFamily: 'Open Sans, sans-serif',
        color: '#555', // Neutral grey for a soft tone
      }}
    >
      Have questions or need support? We're here to help. Reach out to us for assistance or to learn more about our services.
    </p>
    <a
      href="mailto:support@safinabank.com"
      className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-emerald-600 transition"
      style={{
        fontFamily: 'Open Sans, sans-serif',
      }}
    >
      Email Us
    </a>
    <div
      className="mt-12 text-sm text-gray-500"
      style={{
        fontFamily: 'Open Sans, sans-serif',
      }}
    >
      <p>© 2024 Safina Bank. All rights reserved.</p>
    </div>
  </div>

  {/* Subtle Decorative Divider */}
  <div
    className="absolute bottom-0 w-full h-2"
    style={{
      background: 'linear-gradient(to right, #065F46, #E8F5E9)',
    }}
  ></div>
</section>
      </div>
      </div>
    );
  }
  export default PortfolioOptimizer;
  