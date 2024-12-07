// src/pages/Allocation.jsx

import React, { useState, useEffect, useRef } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';
import { FaInfoCircle } from 'react-icons/fa';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';

function Allocation() {
  const assetRefs = useRef({});
  const [initialInvestment] = useState(1000);
  const [riskTolerance, setRiskTolerance] = useState(5);
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [showMetricModal, setShowMetricModal] = useState(false);
  const [showSPInfo, setShowSPInfo] = useState(false);
  const [expandedAsset, setExpandedAsset] = useState(null);

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
    fetchPortfolioData();
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
          {/* Step 1: Risk Tolerance Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Step 1: Select Your Risk Tolerance
            </h2>
            <div className="space-y-6">
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
              {/* Step 2: Portfolio Visualization */}
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
                    {/* Asset Allocation Table */}
                    <div className="space-y-4">
                      {Object.entries(portfolioData.portfolio_metrics.Weights).map(([assetName, weight], index) => {
                        // Find the asset's ticker from asset_info
                        const assetInfo = portfolioData.dashboard_data.asset_info.find(
                          (asset) => asset.name === assetName
                        );
                        const assetTicker = assetInfo ? assetInfo.ticker : assetName;

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
                            <span className="font-bold text-gray-800">{(weight * 100).toFixed(2)}%</span>
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

              {/* How to Implement Your Portfolio */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  Step 3: Implement Your Portfolio
                </h2>
                <p className="text-gray-700">
                  Ready to invest? Learn how to implement your optimized portfolio
                  step-by-step.
                </p>
                <a
                  href="/how-to-implement"
                  className="text-green-600 underline mt-2 inline-block"
                >
                  Read the Article
                </a>
              </motion.div>

              {/* Portfolio vs. S&P 500 Performance */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-6 relative"
              >
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  Portfolio Performance vs. S&P 500
                  <FaInfoCircle
                    className="text-green-600 h-5 w-5 ml-2 cursor-pointer inline-block"
                    onClick={() => setShowSPInfo(true)}
                  />
                </h2>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={portfolioData.dashboard_data.performance.dates.map(
                      (date, idx) => ({
                        date,
                        Portfolio:
                          portfolioData.dashboard_data.performance.series.find(
                            (s) => s.name === 'Portfolio'
                          )?.values[idx] || 0,
                        'S&P 500':
                          portfolioData.dashboard_data.performance.series.find(
                            (s) => s.name === 'S&P 500'
                          )?.values[idx] || 0,
                      })
                    )}
                  >
                    <XAxis dataKey="date" tick={{ fill: '#6B7280' }} />
                    <YAxis
                      tick={{ fill: '#6B7280' }}
                      tickFormatter={(value) =>
                        `${(value * 100).toFixed(0)}%`
                      }
                    />
                    <RechartsTooltip
                      formatter={(value) => `${(value * 100).toFixed(2)}%`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Portfolio"
                      stroke="#10B981"
                      dot={false}
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="S&P 500"
                      stroke="#EF4444"
                      dot={false}
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
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
                  {portfolioData &&
                    portfolioData.dashboard_data.asset_info.map(
                      (asset, index) => {
                        // Assign a color to the asset
                        const color = COLORS[index % COLORS.length];
                        
                        // Prepare performance data for the graph
                        const performanceData =
                          portfolioData.dashboard_data.performance.dates.map(
                            (date, idx) => ({
                              date,
                              value:
                                portfolioData.dashboard_data.performance.series.find(
                                  (s) => s.name === asset.name
                                )?.values[idx] || 0,
                            })
                          );

                        // Check if this specific asset is expanded
                        const isExpanded = expandedAsset === asset.ticker;

                        return (
                          <motion.div
                            key={index}
                            ref={(el) => (assetRefs.current[asset.ticker] = el)} // Assign ref here
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className={`bg-gray-50 rounded-xl shadow-md border-2 transition-all duration-300 ${
                              isExpanded ? 'p-6' : 'p-4'
                            }`}
                            style={{
                              borderColor: color,
                            }}
                          >
                            <div className="flex justify-between items-center">
                              <h3
                                className="text-lg md:text-xl font-bold"
                                style={{ color: color }}
                              >
                                {asset.name}
                              </h3>
                              <button
                                onClick={() => toggleExpand(asset.ticker)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                {isExpanded ? (
                                  <ChevronUpIcon className="h-6 w-6" />
                                ) : (
                                  <ChevronDownIcon className="h-6 w-6" />
                                )}
                              </button>
                            </div>
                            <p className="text-sm text-gray-600">
                              Ticker:{' '}
                              <span className="font-medium">
                                {asset.ticker}
                              </span>
                            </p>
                            {isExpanded && (
                              <div className="mt-4">
                                <p className="text-sm mb-4 text-gray-700">
                                  {asset.info}
                                </p>
                                <ResponsiveContainer width="100%" height={200}>
                                  <LineChart data={performanceData}>
                                    <XAxis
                                      dataKey="date"
                                      tick={{ fill: '#6B7280' }}
                                    />
                                    <YAxis
                                      tick={{ fill: '#6B7280' }}
                                      tickFormatter={(value) =>
                                        `${(value * 100).toFixed(0)}%`
                                      }
                                    />
                                    <RechartsTooltip
                                      formatter={(value) =>
                                        `${(value * 100).toFixed(2)}%`
                                      }
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
                              </div>
                            )}
                          </motion.div>
                        );
                      }
                    )}
                </div>
              </motion.div>
              {/* Upcoming Additions Section */}
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
    {/* Commodity Fund */}
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 128, 0, 0.2)" }}
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition"
    >
      <img
        src="/icons/commodity.svg"
        alt="Commodity Fund Icon"
        className="w-16 h-16 mb-4"
      />
      <h3 className="text-xl font-semibold text-green-700 mb-2">
        Macro Fund
      </h3>
      <p className="text-gray-700 text-center mb-4">
        Unlock the potential of high-performing commodities and protect your portfolio against market volatility.
      </p>
      <a
        href="/funds"
        className="text-green-600 underline hover:text-green-800 transition"
      >
        Learn More
      </a>
    </motion.div>

    {/* Tech Equity Fund */}
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 128, 0, 0.2)" }}
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition"
    >
      <img
        src="/icons/tech.svg"
        alt="Tech Equity Fund Icon"
        className="w-16 h-16 mb-4"
      />
      <h3 className="text-xl font-semibold text-green-700 mb-2">
        Tech Equity Fund
      </h3>
      <p className="text-gray-700 text-center mb-4">
        Invest in the technology shaping tomorrow with exposure to industry leaders and innovators.
      </p>
      <a
        href="/funds"
        className="text-green-600 underline hover:text-green-800 transition"
      >
        Learn More
      </a>
    </motion.div>

    {/* Crypto Fund */}
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 128, 0, 0.2)" }}
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition"
    >
      <img
        src="/icons/crypto.svg"
        alt="Crypto Icon"
        className="w-16 h-16 mb-4"
      />
      <h3 className="text-xl font-semibold text-green-700 mb-2">
        Crypto Investments
      </h3>
      <p className="text-gray-700 text-center mb-4">
        Dive into the digital frontier and gain exposure to the world of blockchain and cryptocurrency.
      </p>
      <a
        href="/crypto-article"
        className="text-green-600 underline hover:text-green-800 transition"
      >
        Read the Article
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
        href="/funds"
        className="bg-white text-green-700 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition"
      >
        Explore Funds
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
