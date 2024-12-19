// src/pages/Allocation.jsx

import React, { useState, useEffect, useRef } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { FaInfoCircle } from 'react-icons/fa';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi'; // Import this icon
import 'tailwindcss/tailwind.css';
import { LineChart, Line, XAxis, YAxis, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';
import { AnimatePresence } from 'framer-motion'
function Allocation() {
  const assetRefs = useRef({});
  const [riskTolerance, setRiskTolerance] = useState(5);
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [showMetricModal, setShowMetricModal] = useState(false);
  const [showSPInfo, setShowSPInfo] = useState(false);
  const [expandedAsset, setExpandedAsset] = useState(null);

  const trading212Links = {
    1: 'https://www.trading212.com/portfolio/ultra-conservative',
    2: 'https://www.trading212.com/portfolio/conservative',
    3: 'https://www.trading212.com/portfolio/moderately-conservative',
    4: 'https://www.trading212.com/portfolio/balanced',
    5: 'https://www.trading212.com/portfolio/moderate-growth',
    6: 'https://www.trading212.com/portfolio/growth',
    7: 'https://www.trading212.com/portfolio/aggressive-growth',
    8: 'https://www.trading212.com/portfolio/high-growth',
    9: 'https://www.trading212.com/portfolio/very-high-growth',
    10: 'https://www.trading212.com/pies/luatvsZ7RwGoK7rJ0vRXXSXTRqPt7',
  };



  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#FF6666',
    '#AAEEBB',
    '#BBBBBB',
    '#7744DD',
  ];

  useEffect(() => {
    // Fetch portfolio data initially or whenever needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPortfolioData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://safinabackend.azurewebsites.net/api/portfolio/optimize',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            initial_investment: initialInvestment,
            risk_tolerance: riskTolerance,
          }),
        }
      );
      if (!response.ok) throw new Error('Failed to fetch portfolio data');
      const data = await response.json();
      setPortfolioData(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const handleRiskChange = (e) => {
    setRiskTolerance(Number(e.target.value));
  };

  const handleOptimizeClick = () => {
    fetchPortfolioData();
  };

  const [initialInvestment, setInitialInvestment] = useState(''); // store as a string initially

  const handleInitialInvestmentChange = (e) => {
    const inputVal = e.target.value;
  
    // Only allow empty input or digits
    if (inputVal === '' || /^[0-9]*$/.test(inputVal)) {
      setInitialInvestment(inputVal);
    }
  };
  
  const handleInitialInvestmentBlur = () => {
    let numericVal = parseInt(initialInvestment, 10);
  
    // If empty or invalid, set to min by default
    if (isNaN(numericVal)) {
      numericVal = 100;
    }
  
    // Clamp to range
    if (numericVal < 100) numericVal = 100;
    if (numericVal > 1000000) numericVal = 1000000;
  
    setInitialInvestment(numericVal.toString());
  };

  const riskMetricExplanations = {
    'Expected Return': 'The anticipated average return of your portfolio.',
    Volatility: 'A measure of how much the portfolio’s returns may fluctuate.',
    'Sharpe Ratio': 'Indicates the risk-adjusted return; higher is better.',
    'Max Drawdown': 'The maximum observed loss from a peak to a trough.',
    'Sortino Ratio':
      'A risk-adjusted return metric that only considers downside volatility.',
  };

  const handleMetricInfoClick = (metric) => {
    setSelectedMetric(metric);
    setShowMetricModal(true);
  };

  const handleAssetClick = (assetTicker) => {
    // Expand the asset card
    setExpandedAsset((prevTicker) => (prevTicker === assetTicker ? null : assetTicker));

    // Scroll to the asset card if the ref exists
    if (assetRefs.current[assetTicker]) {
      assetRefs.current[assetTicker].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleExpand = (ticker) => {
    setExpandedAsset((prevTicker) => (prevTicker === ticker ? null : ticker));
  };

  return (
    <section
      id="allocation"
      className="py-20 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-green-800">
            Portfolio Allocation
          </h1>
          <p className="text-xl text-gray-700 mt-4 max-w-2xl mx-auto">
            Understanding your risk tolerance is crucial for building an optimal
            investment portfolio.
            <a
              href="/learn-more-about-risk"
              className="text-green-600 underline ml-1"
            >
              Learn more
            </a>
            .
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Step 1: Initial Investment and Risk Tolerance Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Step 1: Enter Your Investment Amount and Select Your Risk Tolerance
            </h2>
            <div className="space-y-6">
              {/* Initial Investment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  How much do you plan on investing? (Min £100, Max £1,000,000)
                </label>
                <input
                  type="text"
                  value={initialInvestment}
                  onChange={handleInitialInvestmentChange}
                  onBlur={handleInitialInvestmentBlur}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Risk Tolerance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Risk Tolerance: {riskTolerance}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={riskTolerance}
                  onChange={handleRiskChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Conservative</span>
                  <span>Moderate</span>
                  <span>Aggressive</span>
                </div>
              </div>

              {/* Optimize Button */}
              <button
                onClick={handleOptimizeClick}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Generate My Portfolio
              </button>

              {/* Loading and Error Messages */}
              {isLoading && (
                <p className="text-green-600 text-center font-medium">
                  Optimizing portfolio...
                </p>
              )}
              {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
          </motion.div>

          {portfolioData ? (
            <>
              {/* Step 2: Your Optimized Portfolio */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  Step 2: Your Optimized Portfolio
                </h2>
                {/* Asset Allocation Table and Pie Chart */}
                <div className="flex flex-col md:flex-row md:space-x-8">
                  {/* Asset Allocation Table */}
                  <div className="md:w-1/2">
                    <div className="space-y-4">
                      {Object.entries(portfolioData.portfolio_metrics.Weights).map(([assetName, weight], index) => {
                        // Find the asset's ticker from asset_info
                        const assetInfo = portfolioData.dashboard_data.asset_info.find(
                          (asset) => asset.name === assetName
                        );
                        const assetTicker = assetInfo ? assetInfo.ticker : assetName;

                        const assetAllocationPercentage = (weight * 100).toFixed(2);
                        const assetAllocationAmount = (weight * initialInvestment).toFixed(2);

                        return (
                          <div
                            key={index}
                            className="flex items-center p-2 bg-gray-50 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition"
                            style={{
                              borderLeft: `8px solid ${COLORS[index % COLORS.length]}`,
                            }}
                            onClick={() => handleAssetClick(assetTicker)}
                          >
                            <span className="font-semibold text-gray-700 flex-grow">{assetName}</span>
                            <span className="font-bold text-gray-800">
                              {assetAllocationPercentage}% (£{assetAllocationAmount})
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Asset Allocation Pie Chart */}
                  <div className="md:w-1/2 mt-6 md:mt-0">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={Object.entries(
                            portfolioData.portfolio_metrics.Weights
                          ).map(([name, value], idx) => ({
                            name,
                            value: value * 100,
                            color: COLORS[idx % COLORS.length],
                          }))}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                        >
                          {Object.entries(
                            portfolioData.portfolio_metrics.Weights
                          ).map((entry, idx) => (
                            <Cell
                              key={`cell-${idx}`}
                              fill={COLORS[idx % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value) => `${value.toFixed(2)}%`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Risk Metrics */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-green-700 mb-4">
                    Portfolio Risk Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {portfolioData.dashboard_data.risk_metrics.labels.map(
                      (label, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
                        >
                          <span className="font-semibold text-gray-700 flex items-center">
                            {label}
                            <FaInfoCircle
                              className="text-green-600 h-4 w-4 ml-2 cursor-pointer"
                              onClick={() => handleMetricInfoClick(label)}
                            />
                          </span>
                          <span className="text-gray-800">
                            {label === 'Volatility' ||
                            label === 'Max Drawdown'
                              ? `${(
                                  portfolioData.dashboard_data.risk_metrics
                                    .values[idx] * 100
                                ).toFixed(2)}%`
                              : portfolioData.dashboard_data.risk_metrics.values[
                                  idx
                                ].toFixed(2)}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </motion.div>

              <section className="relative py-16 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
  {/* Soft decorative shapes */}
  <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2" />
  <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-200 rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2" />

  <motion.div
    className="relative z-10 max-w-3xl mx-auto text-center px-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-4xl sm:text-5xl font-extrabold text-green-900 mb-6">
      Ready to Begin Your Investment Journey?
    </h2>
    <p className="text-lg text-gray-700 mb-8">
      Whether you prefer a ready-made portfolio or want to pick your own assets, we make it simple to get started. Choose your path and start growing your wealth.
    </p>
    <a
      href="/articles/brokerage-platforms"
      className="inline-flex items-center justify-center bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 hover:shadow-lg font-semibold transition-all duration-300"
    >
      Learn More About Brokerage Options
      <FiExternalLink className="ml-2 text-white" />
    </a>
  </motion.div>

  <div className="relative z-10 max-w-6xl mx-auto mt-16 px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
    {/* Trading 212 Portfolio Card */}
    <motion.div
      className="relative bg-white border border-blue-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative gradient for card */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-90 pointer-events-none rounded-xl" />

      <div className="relative p-8">
        <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
          <img
            src="/public/trading212-removebg-preview.png"
            alt="Trading 212 icon"
            className="w-8 h-8 mr-3"
          />
          Invest with Trading 212
        </h3>
        <p className="text-gray-700 mb-4">
          Based on your chosen risk tolerance, we’ve curated a recommended pre-built portfolio. Get started quickly and confidently.
        </p>

        {/* Risk Tolerance Display */}
        <div className="mb-6">
          <span className="block text-gray-700 font-semibold mb-2">Your Chosen Risk Level:</span>
          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 flex items-center justify-between">
            <span className="font-bold text-blue-800">Level {riskTolerance}</span>
            <span className="text-sm text-blue-600">
              {riskTolerance <= 3
                ? 'Lower Risk'
                : riskTolerance <= 7
                ? 'Moderate Risk'
                : 'Higher Risk'}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-800 mb-4 font-medium">
            Recommended Portfolio for Risk Level {riskTolerance}:
          </p>
          <a
            href={trading212Links[riskTolerance]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 hover:shadow-lg font-semibold transition duration-300"
          >
            View Trading 212 Portfolio
            <FiExternalLink className="ml-2 text-white" />
          </a>
        </div>
      </div>
    </motion.div>

    {/* Other Brokerages Card */}
    <motion.div
      className="relative bg-white border border-yellow-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-white opacity-90 pointer-events-none rounded-xl" />

      <div className="relative p-8">
        <h3 className="text-2xl font-bold text-yellow-800 mb-6 flex items-center">
          <img
            src="/icons/scale-invest.svg"
            alt="Brokerage icon"
            className="w-8 h-8 mr-3"
          />
          Invest via Other Brokerages
        </h3>
        <p className="text-gray-700 mb-6">
          If you prefer using another platform, these simple steps will guide you through the process:
        </p>

        <ul className="space-y-4 text-gray-700">
          <li className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center font-bold text-yellow-800">1</div>
            </div>
            <div>
              <span className="font-semibold text-gray-800">Add Funds</span>
              <p className="text-sm text-gray-600">Deposit money into your chosen brokerage account.</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center font-bold text-yellow-800">2</div>
            </div>
            <div>
              <span className="font-semibold text-gray-800">Find Your Assets</span>
              <p className="text-sm text-gray-600">Search for the ticker symbols of the assets you identified.</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center font-bold text-yellow-800">3</div>
            </div>
            <div>
              <span className="font-semibold text-gray-800">Invest</span>
              <p className="text-sm text-gray-600">Purchase shares. If share sizes limit your full investment, allocate the remainder elsewhere or keep it for future buys.</p>
            </div>
          </li>
        </ul>

        <p className="mt-8 text-gray-700 text-sm">
          Before committing, review fees, asset availability, and user experience. Choose what best supports your financial goals.
        </p>
      </div>
    </motion.div>
  </div>
</section>




<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="bg-white rounded-xl shadow-lg p-6"
>
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800">
      Portfolio vs. S&P 500
    </h2>
    <button
      type="button"
      onClick={() => setShowSPInfo(true)}
      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
      aria-label="More information"
    >
      <FaInfoCircle className="h-5 w-5" />
    </button>
  </div>

  <p className="text-gray-600 text-sm mb-6 max-w-md">
    Track how your portfolio’s returns compare against the S&P 500 benchmark over time.
  </p>

  <div className="w-full h-96">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={portfolioData.dashboard_data.performance.dates.map((date, idx) => ({
          date,
          Portfolio:
            portfolioData.dashboard_data.performance.series.find((s) => s.name === 'Portfolio')?.values[idx] || 0,
          'S&P 500':
            portfolioData.dashboard_data.performance.series.find((s) => s.name === 'S&P 500')?.values[idx] || 0,
        }))}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
      >
        <defs>
          <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity={0.7} />
            <stop offset="100%" stopColor="#10B981" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorSP500" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" stopOpacity={0.7} />
            <stop offset="100%" stopColor="#EF4444" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="date"
          tick={{ fill: '#4B5563', fontSize: 12 }}
          axisLine={{ stroke: '#E5E7EB' }}
          tickLine={{ stroke: '#E5E7EB' }}
          tickFormatter={(dateStr) => {
            const parsedDate = parseISO(dateStr);
            return format(parsedDate, 'MMM yyyy');
          }}
        />
        <YAxis
          tick={{ fill: '#4B5563', fontSize: 12 }}
          tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
          axisLine={{ stroke: '#E5E7EB' }}
          tickLine={{ stroke: '#E5E7EB' }}
        />
        <RechartsTooltip
          contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '10px' }}
          labelStyle={{ fontWeight: '600', marginBottom: '5px' }}
          formatter={(value) => `${(value * 100).toFixed(2)}%`}
          labelFormatter={(label) => {
            const parsed = parseISO(label);
            return format(parsed, 'do MMM yyyy');
          }}
        />
        <Legend
          verticalAlign="top"
          align="right"
          wrapperStyle={{ top: -10, right: 0, fontSize: '14px', color: '#4B5563' }}
        />

        {/* Portfolio Line */}
        <Line
          type="monotone"
          dataKey="Portfolio"
          stroke="#10B981"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 5, fill: '#10B981', strokeWidth: 2, stroke: '#ffffff' }}
          fill="url(#colorPortfolio)"
          fillOpacity={0.1}
        />

        {/* S&P 500 Line */}
        <Line
          type="monotone"
          dataKey="S&P 500"
          stroke="#EF4444"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 5, fill: '#EF4444', strokeWidth: 2, stroke: '#ffffff' }}
          fill="url(#colorSP500)"
          fillOpacity={0.1}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</motion.div>

{/* Asset Cards */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.8 }}
  className="bg-white rounded-xl shadow-lg p-6"
>
  <h2 className="text-2xl font-bold text-green-700 mb-4">
    Learn More About Your Assets
  </h2>

  {/* ETFs List */}
  <div className="space-y-6">
    {portfolioData && portfolioData.dashboard_data.asset_info.map((asset, index) => {
      // Assign a color to the asset
      const color = COLORS[index % COLORS.length];
      
      // Prepare performance data for the graph
      const performanceData =
        portfolioData.dashboard_data.performance.dates.map((date, idx) => ({
          date,
          value:
            portfolioData.dashboard_data.performance.series.find(
              (s) => s.name === asset.name
            )?.values[idx] || 0,
        }));

      // Calculate YTD return
      const thisYear = new Date().getFullYear();
      const thisYearData = performanceData.filter(
        (d) => new Date(d.date).getFullYear() === thisYear
      );

      let ytdReturn = null;
      if (thisYearData.length > 1) {
        const firstValue = thisYearData[0].value;
        const lastValue = thisYearData[thisYearData.length - 1].value;
        if (firstValue !== 0) {
          ytdReturn = ((lastValue / firstValue) - 1) * 100;
        }
      }

      // Check if this specific asset is expanded
      const isExpanded = expandedAsset === asset.ticker;

      return (
        <motion.div
          key={asset.ticker}
          ref={(el) => (assetRefs.current[asset.ticker] = el)} // Assign ref here
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`bg-gray-50 rounded-xl shadow-md border-2 transition-all duration-300 ${isExpanded ? 'p-6' : 'p-4'} hover:shadow-lg`}
          style={{ borderColor: color }}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3
                className="text-lg md:text-xl font-bold"
                style={{ color: color }}
              >
                {asset.name}
              </h3>
              <div className="text-sm text-gray-600 flex items-center space-x-4 mt-1">
                <span>
                  Ticker: <span className="font-medium">{asset.ticker}</span>
                </span>
                {ytdReturn !== null && (
                  <span>
                    YTD Return:{' '}
                    <span
                      className={`font-medium ${
                        ytdReturn >= 0 ? 'text-green-700' : 'text-red-600'
                      }`}
                    >
                      {ytdReturn.toFixed(2)}%
                    </span>
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => toggleExpand(asset.ticker)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              {isExpanded ? (
                <ChevronUpIcon className="h-6 w-6" />
              ) : (
                <ChevronDownIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Expandable Section */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="text-sm mt-4 mb-4 text-gray-700">{asset.info}</p>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={performanceData}>
                    <XAxis
                      dataKey="date"
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <YAxis
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      tickFormatter={(value) =>
                        `${(value * 100).toFixed(0)}%`
                      }
                    />
                    <RechartsTooltip
                      formatter={(value) => `${(value * 100).toFixed(2)}%`}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={color}
                      dot={false}
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    })}
  </div>
</motion.div>

              
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 1.5 }}
  className="bg-gray-50 rounded-xl shadow-lg p-8 mt-10"
>
  <h2 className="text-3xl font-extrabold text-green-700 text-center mb-6 drop-shadow-md">
    Future of Investing: What's Coming Next
  </h2>
  <p className="text-lg text-gray-700 text-center mb-8">
    We're bringing you the latest opportunities to diversify and grow. Explore the future of investing with our upcoming funds:
  </p>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    {/* Tactical Asset Allocation Fund */}
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 128, 0, 0.2)" }}
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition"
    >
      <img
        src="/public/TAA.jpg"
        alt="Tactical Asset Allocation Icon"
        className="w-16 h-16 mb-4"
      />
      <h3 className="text-xl font-semibold text-green-700 mb-2">
        Tactical Asset Allocation
      </h3>
      <p className="text-gray-700 text-center mb-4">
        Adapt your portfolio with precision using data-driven strategies to optimise risk and return across diverse markets.
      </p>
      <a
        href="/funds"
        className="text-green-600 underline hover:text-green-800 transition"
      >
        Learn More
      </a>
    </motion.div>

    {/* Savings Fund */}
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 128, 0, 0.2)" }}
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition"
    >
      <img
        src="/public/savings.jpg"
        alt="Savings Fund Icon"
        className="w-16 h-16 mb-4"
      />
      <h3 className="text-xl font-semibold text-green-700 mb-2">
        Savings Fund
      </h3>
      <p className="text-gray-700 text-center mb-4">
        Secure your future with our tailored savings solutions designed to grow steadily while protecting your capital.
      </p>
      <a
        href="/funds"
        className="text-green-600 underline hover:text-green-800 transition"
      >
        Learn More
      </a>
    </motion.div>

    {/* Private Markets Fund */}
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 128, 0, 0.2)" }}
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition"
    >
      <img
        src="/public/private markets.jpg"
        alt="Private Markets Icon"
        className="w-16 h-16 mb-4"
      />
      <h3 className="text-xl font-semibold text-green-700 mb-2">
        Private Markets
      </h3>
      <p className="text-gray-700 text-center mb-4">
        Access exclusive investment opportunities in private markets, including real estate, venture capital, and private equity.
      </p>
      <a
        href="/funds"
        className="text-green-600 underline hover:text-green-800 transition"
      >
        Learn More
      </a>
    </motion.div>
  </div>

  {/* Call-to-Action Banner */}
  <div className="mt-10 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-lg p-6 shadow-lg">
    <h3 className="text-2xl font-bold text-center">
      Your Portfolio, Powered by Innovation
    </h3>
    <p className="text-center text-lg mt-2">
      Stay ahead of the curve. Discover new ways to invest, grow, and achieve financial independence with our cutting-edge funds.
    </p>
    <div className="flex justify-center mt-4">
      <a
        href="/research"
        className="bg-white text-green-700 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition"
      >
        Explore Research
      </a>
    </div>
  </div>
</motion.div>

              {/* Methodology Explainer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  Our Methodology
                </h2>
                <p className="text-gray-700">
                  Our asset allocator is powered by over 10 years of market data
                  and trained using advanced statistical models to find the
                  optimal investment allocation for your risk preferences.
                </p>
                <a
                  href="/our-methodology"
                  className="text-green-600 underline mt-2 inline-block"
                >
                  Learn More
                </a>
              </motion.div>
            </>
          ) : (
            // If no portfolio data yet, display a placeholder
            <div className="text-center mt-12">
              <p className="text-xl text-gray-600">
                Adjust your risk tolerance above to generate your optimized
                portfolio.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Risk Metric Modal */}
      {showMetricModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setShowMetricModal(false)}
          ></div>
          <div className="bg-white rounded-xl shadow-lg p-6 z-10 max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              {selectedMetric}
            </h3>
            <p className="text-gray-700">
              {riskMetricExplanations[selectedMetric]}
            </p>
            <button
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              onClick={() => setShowMetricModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* S&P 500 Info Modal */}
      {showSPInfo && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setShowSPInfo(false)}
          ></div>
          <div className="bg-white rounded-xl shadow-lg p-6 z-10 max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              What is the S&P 500?
            </h3>
            <p className="text-gray-700">
              The S&P 500 is a stock market index that tracks the performance of
              500 large companies listed on stock exchanges in the United
              States. It is one of the most commonly followed equity indices.
            </p>
            <button
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              onClick={() => setShowSPInfo(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Allocation;
