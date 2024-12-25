import React, { useState, useEffect, useRef, memo } from 'react';
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
  AreaChart,
  Area,
} from 'recharts';
import { FaInfoCircle } from 'react-icons/fa';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { TrendingUp, Percent, AlertTriangle } from 'lucide-react'; // Added missing imports
import { FiExternalLink } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import { format, parseISO } from 'date-fns';

// Reusable Slider Component with step of 1
const Slider = ({ value, onValueChange, min, max, step = 1, className }) => (
  <input
    type="range"
    value={value}
    onChange={(e) => onValueChange(Number(e.target.value))}
    min={min}
    max={max}
    step={step}
    className={`w-full ${className}`}
  />
);

// Reusable Input Component
const Input = ({ className, value, onChange, ...props }) => (
  <input
    value={value}
    onChange={onChange}
    className={`border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

// Reusable Button Component
const Button = ({
  children,
  onClick,
  variant,
  className,
  disabled,
  ...props
}) => {
  let baseStyles =
    'px-6 py-3 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all';
  let variantStyles = '';

  switch (variant) {
    case 'outline':
      variantStyles =
        'border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-50';
      break;
    default:
      variantStyles = 'bg-blue-600 text-white hover:bg-blue-700';
      break;
  }

  if (disabled) {
    variantStyles += ' opacity-50 cursor-not-allowed';
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Reusable Alert Component
const Alert = ({ children, className }) => (
  <div
    className={`flex items-start space-x-2 p-4 border-l-4 border-yellow-500 bg-yellow-100 ${className}`}
  >
    {children}
  </div>
);

// Reusable AlertDescription Component
const AlertDescription = ({ children, className }) => (
  <div className={`ml-2 text-sm text-yellow-700 ${className}`}>
    {children}
  </div>
);

// Reusable Tooltip for Risk Metrics
const MetricTooltip = ({ text }) => (
  <div className="absolute z-20 p-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
    {text}
  </div>
);

// Memoized AreaChart Component
const MemoizedAreaChart = memo(({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data}>
      <XAxis
        dataKey="month"
        tickFormatter={(tick) => tick.split('-')[1]}
        interval={11}
        stroke="#6B7280"
      />
      <YAxis
        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        stroke="#6B7280"
      />
      <RechartsTooltip
        formatter={(value) => [`$${value.toFixed(2)}`, 'Portfolio Value']}
        labelFormatter={(label) => label}
      />
      <defs>
        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="value"
        stroke="#3B82F6"
        fill="url(#colorValue)"
        strokeWidth={2}
      />
    </AreaChart>
  </ResponsiveContainer>
));

// Memoized PieChart Component (Converted to Doughnut)
const MemoizedPieChart = memo(({ data, colors }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        dataKey="allocation"
        nameKey="ticker"
        cx="50%"
        cy="50%"
        innerRadius={80} // Added for doughnut effect
        outerRadius={120}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${entry.ticker}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <RechartsTooltip />
    </PieChart>
  </ResponsiveContainer>
));

// Step Indicator Component
const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="w-full mb-12">
    <div className="relative">
      <div className="h-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((num) => (
          <div key={num} className="relative flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm
                shadow-lg transition-all duration-300
                ${
                  num <= currentStep
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white transform scale-110'
                    : 'bg-white text-gray-400'
                }`}
            >
              {num}
            </div>
            <div
              className={`mt-2 text-sm font-medium ${
                num <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {['Profile', 'Portfolio', 'Review'][num - 1]}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Main PortfolioJourney Component
const PortfolioJourney = () => {
  const [step, setStep] = useState(1);
  const [riskTolerance, setRiskTolerance] = useState(5);
  const [initialInvestment, setInitialInvestment] = useState('');
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeMetric, setActiveMetric] = useState(null);
  const [expandedTicker, setExpandedTicker] = useState(null);

  const assetRefs = useRef({});

  const COLORS = [
    '#4ADE80',
    '#86EFAC',
    '#FDE68A',
    '#FBBF24',
    '#FF6666',
    '#AAEEBB',
    '#BBBBBB',
    '#7744DD',
  ];

  const trading212Links = {
    1: 'https://www.trading212.com/ultra-conservative',
    2: 'https://www.trading212.com/very-conservative',
    3: 'https://www.trading212.com/conservative',
    4: 'https://www.trading212.com/moderately-conservative',
    5: 'https://www.trading212.com/balanced',
    6: 'https://www.trading212.com/moderately-aggressive',
    7: 'https://www.trading212.com/aggressive',
    8: 'https://www.trading212.com/very-aggressive',
    9: 'https://www.trading212.com/ultra-aggressive',
    10: 'https://www.trading212.com/maximum-growth',
  };

  // Function to fetch portfolio data
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
            initial_investment: parseFloat(initialInvestment),
            risk_tolerance: riskTolerance,
          }),
        }
      );
      if (!response.ok) throw new Error('Failed to fetch portfolio data');
      const data = await response.json();
      setPortfolioData(data);
      setStep(2); // Move to Portfolio step after successful fetch
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  // Handlers for Investment Amount
  const handleInitialInvestmentChange = (e) => {
    const inputVal = e.target.value;

    // Allow empty input or digits
    if (inputVal === '' || /^\d*\.?\d*$/.test(inputVal)) {
      setInitialInvestment(inputVal);
    }
  };

  const handleInitialInvestmentBlur = () => {
    let numericVal = parseFloat(initialInvestment);

    // If empty or invalid, set to min by default
    if (isNaN(numericVal)) {
      numericVal = 100;
    }

    // Clamp to range
    if (numericVal < 100) numericVal = 100;
    if (numericVal > 1000000) numericVal = 1000000;

    setInitialInvestment(numericVal.toString());
  };

  // Handlers for Risk Tolerance
  const handleRiskChange = (e) => {
    setRiskTolerance(Number(e.target.value));
  };

  // Handler for Optimize Button
  const handleOptimizeClick = () => {
    fetchPortfolioData();
  };

  // Handle Metric Tooltip Click
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target)
      ) {
        setActiveMetric(null);
      }
    };

    if (activeMetric) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMetric]);

  // Handler to Toggle Asset Expansion
  const toggleExpand = (ticker) => {
    setExpandedTicker((prevTicker) =>
      prevTicker === ticker ? null : ticker
    );
  };

  // Asset Cards Ref Assignment
  const assetRefsHandler = (ticker, element) => {
    assetRefs.current[ticker] = element;
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12 bg-gray-100 min-h-screen">
      {/* Step Indicator */}
      <StepIndicator currentStep={step} totalSteps={3} />

      {/* Step 1: Risk Input */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-6">
            What's Your Risk Tolerance? (1-10)
          </h2>
          <div className="space-y-8">
            {/* Risk Slider */}
            <div>
              <div className="flex items-center space-x-6">
                <span className="text-2xl font-bold">{riskTolerance}</span>
                <Slider
                  value={riskTolerance}
                  onValueChange={handleRiskChange}
                  max={10}
                  min={1}
                  step={1}
                  className="flex-1"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Conservative</span>
                <span>Aggressive</span>
              </div>
            </div>

            {/* Risk Profile Display */}
            <div
              className="p-6 border-l-4 rounded-lg relative"
              style={{
                borderLeftColor:
                  riskTolerance <= 3
                    ? '#4ADE80'
                    : riskTolerance <= 7
                    ? '#FDE68A'
                    : '#FBBF24',
                backgroundColor: '#f9fafb',
              }}
            >
              <div className="flex items-start space-x-4">
                <FaInfoCircle
                  className="flex-shrink-0 w-6 h-6 mt-1 cursor-pointer"
                  style={{
                    color:
                      riskTolerance <= 3
                        ? '#4ADE80'
                        : riskTolerance <= 7
                        ? '#FDE68A'
                        : '#FBBF24',
                  }}
                  onClick={() =>
                    setActiveMetric(
                      activeMetric === 'riskProfile' ? null : 'riskProfile'
                    )
                  }
                />
                <div>
                  <h4
                    className="font-semibold text-xl"
                    style={{
                      color:
                        riskTolerance <= 3
                          ? '#4ADE80'
                          : riskTolerance <= 7
                          ? '#FDE68A'
                          : '#FBBF24',
                    }}
                  >
                    {riskTolerance <= 3
                      ? 'Conservative'
                      : riskTolerance <= 7
                      ? 'Balanced'
                      : 'Aggressive'}
                  </h4>
                  <p className="text-base text-gray-600">
                    {riskTolerance <= 3
                      ? 'Capital preservation is your top priority.'
                      : riskTolerance <= 7
                      ? 'Balanced approach with equal focus on growth and protection.'
                      : 'Growth-oriented with higher volatility.'}
                  </p>
                </div>
              </div>
              {activeMetric === 'riskProfile' && (
                <div ref={tooltipRef}>
                  <MetricTooltip text="This profile determines the balance between risk and return in your portfolio." />
                </div>
              )}
            </div>

            {/* Investment Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investment Amount (Min £100, Max £1,000,000)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  £
                </span>
                <Input
                  type="text"
                  value={initialInvestment}
                  onChange={handleInitialInvestmentChange}
                  onBlur={handleInitialInvestmentBlur}
                  className="pl-8"
                  placeholder="Enter amount"
                />
              </div>
              {/* Removed amountError since setAmountError is unused */}
            </div>

            {/* Analyze Portfolio Button */}
            <Button
              onClick={handleOptimizeClick}
              className="w-full"
              disabled={
                !initialInvestment ||
                parseFloat(initialInvestment) < 100 ||
                parseFloat(initialInvestment) > 1000000 ||
                isLoading
              }
            >
              {isLoading ? 'Analyzing...' : 'Analyze Portfolio'}
            </Button>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>
        </motion.div>
      )}

      {/* Step 2: Optimized Portfolio */}
      {step === 2 && portfolioData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Optimized Portfolio
          </h2>
          {/* Asset Allocation and Performance Charts */}
          <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
            {/* Left Column */}
            <div className="flex-1 space-y-6">
              {/* Portfolio Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Expected Return */}
                <div className="relative p-6 bg-white shadow-lg rounded-xl flex items-center space-x-4">
                  <TrendingUp className="text-blue-600 w-6 h-6" />
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-500">Expected Return</span>
                      <FaInfoCircle
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => setActiveMetric('Expected Return')}
                      />
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      {portfolioData.dashboard_data.risk_metrics.values[0].toFixed(2)}%
                    </div>
                  </div>
                  {activeMetric === 'Expected Return' && (
                    <div ref={tooltipRef}>
                      <MetricTooltip text={portfolioData.dashboard_data.risk_metrics.labels[0]} />
                    </div>
                  )}
                </div>

                {/* Volatility */}
                <div className="relative p-6 bg-white shadow-lg rounded-xl flex items-center space-x-4">
                  <Percent className="text-blue-600 w-6 h-6" />
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-500">Volatility</span>
                      <FaInfoCircle
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => setActiveMetric('Volatility')}
                      />
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      {portfolioData.dashboard_data.risk_metrics.values[1].toFixed(2)}%
                    </div>
                  </div>
                  {activeMetric === 'Volatility' && (
                    <div ref={tooltipRef}>
                      <MetricTooltip text={portfolioData.dashboard_data.risk_metrics.labels[1]} />
                    </div>
                  )}
                </div>

                {/* Sharpe Ratio */}
                <div className="relative p-6 bg-white shadow-lg rounded-xl flex items-center space-x-4">
                  <TrendingUp className="text-blue-600 w-6 h-6" />
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-500">Sharpe Ratio</span>
                      <FaInfoCircle
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => setActiveMetric('Sharpe Ratio')}
                      />
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      {portfolioData.dashboard_data.risk_metrics.values[2].toFixed(2)}
                    </div>
                  </div>
                  {activeMetric === 'Sharpe Ratio' && (
                    <div ref={tooltipRef}>
                      <MetricTooltip text={portfolioData.dashboard_data.risk_metrics.labels[2]} />
                    </div>
                  )}
                </div>

                {/* Max Drawdown */}
                <div className="relative p-6 bg-white shadow-lg rounded-xl flex items-center space-x-4">
                  <AlertTriangle className="text-blue-600 w-6 h-6" />
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-500">Max Drawdown</span>
                      <FaInfoCircle
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => setActiveMetric('Max Drawdown')}
                      />
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      {portfolioData.dashboard_data.risk_metrics.values[3].toFixed(2)}%
                    </div>
                  </div>
                  {activeMetric === 'Max Drawdown' && (
                    <div ref={tooltipRef}>
                      <MetricTooltip text={portfolioData.dashboard_data.risk_metrics.labels[3]} />
                    </div>
                  )}
                </div>
              </div>

              {/* Allocations List */}
              <div className="space-y-4">
                {Object.entries(portfolioData.portfolio_metrics.Weights).map(
                  ([assetName, weight], index) => {
                    const assetInfo = portfolioData.dashboard_data.asset_info.find(
                      (asset) => asset.name === assetName
                    );
                    const assetTicker = assetInfo ? assetInfo.ticker : assetName;
                    const assetAllocationPercentage = (weight * 100).toFixed(2);
                    const assetAllocationAmount = (
                      weight * parseFloat(initialInvestment)
                    ).toFixed(2);
                    const ytdReturn =
                      portfolioData.dashboard_data.performance.series.find(
                        (s) => s.name === assetName
                      )?.ytd_return || 0;

                    const isExpanded = expandedTicker === assetTicker;

                    return (
                      <motion.div
                        key={assetTicker}
                        ref={(el) => assetRefsHandler(assetTicker, el)}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={`bg-gray-50 rounded-xl shadow-md border-2 transition-all duration-300 ${
                          isExpanded ? 'p-6' : 'p-4'
                        } hover:shadow-lg`}
                        style={{ borderColor: COLORS[index % COLORS.length] }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{
                                backgroundColor: COLORS[index % COLORS.length],
                              }}
                            />
                            <div>
                              <div className="font-medium text-lg text-gray-800">
                                {assetTicker}
                              </div>
                              <div className="text-sm text-gray-500">
                                {assetName}
                              </div>
                            </div>
                          </div>
                          {/* Display Allocation Percentage and Amount */}
                          <div className="flex flex-col items-end">
                            <span className="font-medium text-gray-800">
                              {assetAllocationPercentage}%
                            </span>
                            <span className="text-sm text-gray-500">
                              (£{assetAllocationAmount})
                            </span>
                            {/* Display YTD Return */}
                            {ytdReturn !== null && (
                              <span
                                className={`text-sm ${
                                  ytdReturn >= 0 ? 'text-green-700' : 'text-red-600'
                                }`}
                              >
                                YTD: {ytdReturn.toFixed(2)}%
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => toggleExpand(assetTicker)}
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
                              <p className="text-sm mt-4 mb-4 text-gray-700">
                                {assetInfo ? assetInfo.description : 'No description available.'}
                              </p>
                              {/* Performance Graph */}
                              {portfolioData.dashboard_data.performance.series.find(
                                (s) => s.name === assetName
                              ) && (
                                <ResponsiveContainer width="100%" height={200}>
                                  <LineChart
                                    data={portfolioData.dashboard_data.performance.dates.map(
                                      (date, idx) => ({
                                        date,
                                        value:
                                          portfolioData.dashboard_data.performance.series.find(
                                            (s) => s.name === assetName
                                          )?.values[idx] || 0,
                                      })
                                    )}
                                  >
                                    <XAxis
                                      dataKey="date"
                                      tickFormatter={(dateStr) => {
                                        const parsedDate = parseISO(dateStr);
                                        return format(parsedDate, 'MMM yyyy');
                                      }}
                                      tick={{ fill: '#6B7280', fontSize: 12 }}
                                      axisLine={{ stroke: '#E5E7EB' }}
                                      tickLine={{ stroke: '#E5E7EB' }}
                                    />
                                    <YAxis
                                      tick={{ fill: '#6B7280', fontSize: 12 }}
                                      tickFormatter={(value) =>
                                        `${(value * 100).toFixed(0)}%`
                                      }
                                      axisLine={{ stroke: '#E5E7EB' }}
                                      tickLine={{ stroke: '#E5E7EB' }}
                                    />
                                    <RechartsTooltip
                                      formatter={(value) =>
                                        `${(value * 100).toFixed(2)}%`
                                      }
                                      labelFormatter={(label) => {
                                        const parsed = parseISO(label);
                                        return format(parsed, 'do MMM yyyy');
                                      }}
                                    />
                                    <Line
                                      type="monotone"
                                      dataKey="value"
                                      stroke={COLORS[index % COLORS.length]}
                                      strokeWidth={3}
                                      dot={false}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1">
              {/* Asset Allocation Pie Chart */}
              <div className="h-96 my-8 bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold mb-4">Asset Allocation</h3>
                <MemoizedPieChart
                  data={Object.entries(portfolioData.portfolio_metrics.Weights).map(
                    ([name, value], idx) => ({
                      name,
                      allocation: (value * 100).toFixed(2),
                      ticker: name,
                    })
                  )}
                  colors={COLORS}
                />
              </div>

              {/* Backtested Portfolio */}
              <div className="relative p-6 mb-6 bg-white shadow-lg rounded-xl">
                {/* Compounded Return Box */}
                <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
                  10 Year Compounded Return: {portfolioData.dashboard_data.performance.compounded_return.toFixed(2)}%
                </div>

                <h3 className="text-2xl font-bold mb-6">Historical Performance</h3>
                <div className="h-96">
                  <MemoizedAreaChart data={portfolioData.dashboard_data.performance.historical} />
                </div>
                <Alert className="mt-6">
                  <AlertDescription className="text-sm text-gray-600">
                    Past performance is not indicative of future results. The above simulation is based on historical data and includes reinvestment of dividends but does not account for taxes, fees, or market conditions that may affect actual performance.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>

          {/* Back to Portfolio Button */}
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="w-1/2 sm:w-1/3"
            >
              Back to Portfolio
            </Button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Review and Invest */}
      {step === 3 && portfolioData && (
        <section className="relative py-16 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
          {/* Soft decorative shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-200 rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2" />

          <motion.div
            className="relative z-10 max-w-4xl mx-auto text-center px-4"
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
                    src="/trading212-removebg-preview.png"
                    alt="Trading 212 icon"
                    className="w-8 h-8 mr-3"
                  />
                  Invest with 1 Click at Trading 212
                </h3>
                <p className="text-gray-700 mb-6">
                  Based on your chosen risk tolerance, we’ve curated a recommended pre-built portfolio. Get started quickly and confidently.
                </p>

                {/* Risk Tolerance Display */}
                <div className="mb-6">
                  <span className="block text-gray-700 font-semibold mb-2">
                    Your Chosen Risk Level:
                  </span>
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

                <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
                  {/* Header */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Invest in Your Portfolio with Just One Click
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Simply click the button below to go to Trading 212, add funds to your portfolio, and you’re all set to grow your investments effortlessly.
                    </p>
                  </div>

                  {/* Call-to-Action Button */}
                  <div className="text-center">
                    <a
                      href={trading212Links[riskTolerance]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                    >
                      View Trading 212 Portfolio
                    </a>
                  </div>
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
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center font-bold text-yellow-800">1</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Add Funds</span>
                      <p className="text-sm text-gray-600">Deposit money into your chosen brokerage account.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center font-bold text-yellow-800">2</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Find Your Assets</span>
                      <p className="text-sm text-gray-600">Search for the ticker symbols of the assets you identified.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
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

          {/* Back to Portfolio Button */}
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="w-1/2 sm:w-1/3"
            >
              Back to Portfolio
            </Button>
          </div>
          </section>
      )}
    </div>
  );
};

export default PortfolioJourney;
