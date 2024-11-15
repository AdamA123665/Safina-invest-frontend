// src/pages/Allocation.jsx

import React, { useState, useEffect } from 'react';
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
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';

function Allocation() {
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [riskTolerance, setRiskTolerance] = useState(5);
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleInvestmentChange = (e) => {
    setInitialInvestment(Number(e.target.value));
  };

  const handleOptimizeClick = () => {
    fetchPortfolioData();
  };

  return (
    <section id="allocation" className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-green-800">Portfolio Allocation</h1>
          <p className="text-xl text-gray-700 mt-4 max-w-2xl mx-auto">
            Customize your investment portfolio by selecting your initial investment amount and risk tolerance. Our optimizer will generate a tailored portfolio to suit your needs.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row md:space-x-12">
          {/* Left Side: Input Form and Explainers */}
<div className="md:w-1/3">
  {/* Investment Input */}
  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
    <h2 className="text-2xl font-bold text-green-700 mb-4">Customize Your Portfolio</h2>
    <div className="space-y-6">
      {/* Initial Investment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Initial Investment ($)
        </label>
        <input
          type="number"
          value={initialInvestment}
          onChange={handleInvestmentChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          min="100"
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
        Optimize Portfolio
      </button>
      {/* Loading and Error Messages */}
      {isLoading && (
        <p className="text-green-600 text-center font-medium">Optimizing portfolio...</p>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  </div>

  {/* Risk Tolerance Explainer */}
  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
    <div className="flex items-center mb-4">
      <FaInfoCircle className="text-green-600 h-6 w-6 mr-2" />
      <h3 className="text-xl font-bold text-green-700">Understanding Risk Tolerance</h3>
    </div>
    <p className="text-gray-700">
      Risk tolerance is a measure of how much risk you're willing to take on in your
      investments. A higher risk tolerance (10/10) indicates you're comfortable with more
      volatility for the chance of higher returns. A lower risk tolerance (1/10) means you
      prefer stable investments with lower returns.
    </p>
  </div>

  {/* Metrics Explainer */}
  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
    <div className="flex items-center mb-4">
      <FaInfoCircle className="text-green-600 h-6 w-6 mr-2" />
      <h3 className="text-xl font-bold text-green-700">Key Metrics Explained</h3>
    </div>
    <ul className="list-disc list-inside text-gray-700 space-y-2">
      <li>
        <strong>Expected Return:</strong> The anticipated average return of your portfolio.
      </li>
      <li>
        <strong>Volatility (Risk):</strong> A measure of how much the portfolio's returns
        may fluctuate.
      </li>
      <li>
        <strong>Sharpe Ratio:</strong> Indicates the risk-adjusted return; higher is better.
      </li>
      <li>
        <strong>Max Drawdown:</strong> The maximum observed loss from a peak to a trough.
      </li>
      <li>
        <strong>Sortino Ratio:</strong> A risk-adjusted return metric that only considers downside
        volatility, providing a more accurate measure of risk.
      </li>
    </ul>
  </div>

  {/* S&P 500 Explainer */}
  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
    <div className="flex items-center mb-4">
      <FaInfoCircle className="text-green-600 h-6 w-6 mr-2" />
      <h3 className="text-xl font-bold text-green-700">What is the S&P 500?</h3>
    </div>
    <p className="text-gray-700">
      The S&P 500 is a stock market index that tracks the performance of 500 of the largest
      companies in the United States. It is widely considered to be one of the best indicators
      of the overall health of the US stock market and economy. By comparing your portfolio's
      performance to the S&P 500, you can see how your investments are doing relative to the
      broader market.
    </p>
  </div>

  {/* Asset Allocation Methodology */}
  <div className="bg-white rounded-xl shadow-lg p-6">
    <div className="flex items-center mb-4">
      <FaInfoCircle className="text-green-600 h-6 w-6 mr-2" />
      <h3 className="text-xl font-bold text-green-700">Our Methodology</h3>
    </div>
    <p className="text-gray-700">
      Our asset allocator is powered by over 10 years of market data and trained using
      advanced statistical models to find the optimal investment allocation for your risk
      preferences. We leverage historical data, machine learning, and complex optimization
      algorithms to create a well-diversified portfolio tailored to your needs. This ensures
      that your investments are backed by data-driven insights to maximize returns while
      minimizing risk.
    </p>
  </div>
</div>


          {/* Right Side: Charts and Metrics */}
          <div className="md:w-2/3 mt-12 md:mt-0">
            {portfolioData ? (
              <>
                {/* Asset Allocation Pie Chart */}
                {/* Right Side: Charts and Metrics */}
<div className="md:w-2/3 mt-12 md:mt-0">
  {portfolioData ? (
    <>
      {/* Asset Allocation Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-4">Your Asset Allocation</h2>
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Asset Allocation Table */}
          <div className="lg:w-1/2">
            <div className="space-y-4">
              {Object.entries(portfolioData.portfolio_metrics.Weights).map(
                ([assetName, weight], index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 bg-gray-50 rounded-lg shadow-sm"
                    style={{ borderLeft: `8px solid ${COLORS[index % COLORS.length]}` }}
                  >
                    <span className="font-semibold text-gray-700 flex-grow">{assetName}</span>
                    <span className="font-bold text-gray-800">{(weight * 100).toFixed(2)}%</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Asset Allocation Pie Chart */}
          <div className="lg:w-1/2">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={Object.entries(portfolioData.portfolio_metrics.Weights).map(
                    ([name, value], idx) => ({
                      name,
                      value: value * 100,
                      color: COLORS[idx % COLORS.length],
                    })
                  )}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                >
                  {Object.entries(portfolioData.portfolio_metrics.Weights).map(
                    (entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    )
                  )}
                </Pie>
                <RechartsTooltip formatter={(value) => `${value.toFixed(2)}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </>
  ) : (
    <div className="text-center mt-12">
      <p className="text-xl text-gray-600">Enter your investment details to see your optimized portfolio.</p>
    </div>
  )}
</div>


                {/* Risk Metrics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-6 mb-8"
                >
                  <h2 className="text-2xl font-bold text-green-700 mb-4">Portfolio Risk Metrics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {portfolioData.dashboard_data.risk_metrics.labels.map((label, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
                      >
                        <span className="font-semibold text-gray-700">{label}</span>
                        <span className="text-gray-800">
                          {(portfolioData.dashboard_data.risk_metrics.values[idx] * 100).toFixed(2)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Historical Performance vs. S&P 500 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-xl shadow-lg p-6 mb-8"
                >
                  <h2 className="text-2xl font-bold text-green-700 mb-4">
                    Historical Performance vs. S&P 500
                  </h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                      data={portfolioData.dashboard_data.performance.dates.map((date, idx) => ({
                        date,
                        Portfolio:
                          portfolioData.dashboard_data.performance.series.find(
                            (s) => s.name === 'Portfolio'
                          )?.values[idx] || 0,
                        'S&P 500':
                          portfolioData.dashboard_data.performance.series.find(
                            (s) => s.name === 'S&P 500'
                          )?.values[idx] || 0,
                      }))}
                    >
                      <XAxis dataKey="date" tick={{ fill: '#6B7280' }} />
                      <YAxis
                        tick={{ fill: '#6B7280' }}
                        tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
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

                {/* Projected Portfolio Growth */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-green-700 mb-4">
                    Projected Portfolio Growth (Next 10 Years)
                  </h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                      data={portfolioData.dashboard_data.projected_returns.years.map(
                        (year, idx) => ({
                          year,
                          '5th Percentile':
                            portfolioData.dashboard_data.projected_returns['5th_percentile'][
                              idx
                            ] * initialInvestment,
                          Mean:
                            portfolioData.dashboard_data.projected_returns['mean'][idx] *
                            initialInvestment,
                          '95th Percentile':
                            portfolioData.dashboard_data.projected_returns['95th_percentile'][
                              idx
                            ] * initialInvestment,
                        })
                      )}
                    >
                      <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                      <YAxis
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                        domain={['auto', 'auto']}
                      />
                      <RechartsTooltip
                        formatter={(value) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Mean"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="5th Percentile"
                        stroke="#F59E0B"
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="95th Percentile"
                        stroke="#10B981"
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </>
            ) : (
              <div className="text-center mt-12">
                <p className="text-xl text-gray-600">Enter your investment details to see your optimized portfolio.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Allocation;
