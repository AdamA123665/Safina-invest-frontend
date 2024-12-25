import React, {
  useState,
  useRef
} from 'react';
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
  Legend
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { FaInfoCircle } from 'react-icons/fa';
import {
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Percent,
  AlertTriangle,
  Info
} from 'lucide-react';

// ===========================
// 1) Hard-coded Risk Profiles
// ===========================
const riskProfiles = {
  1: {
    label: 'Ultra Conservative',
    color: '#4ADE80',
    description: 'Capital preservation is your top priority',
  },
  2: {
    label: 'Very Conservative',
    color: '#86EFAC',
    description: 'Focus on stability with minimal growth',
  },
  3: {
    label: 'Conservative',
    color: '#BAF5D0',
    description: 'Steady, reliable growth with low risk',
  },
  4: {
    label: 'Moderately Conservative',
    color: '#FDE68A',
    description: 'Balanced approach leaning towards safety',
  },
  5: {
    label: 'Balanced',
    color: '#FCD34D',
    description: 'Equal focus on growth and protection',
  },
  6: {
    label: 'Moderately Aggressive',
    color: '#FBBF24',
    description: 'Growth-oriented with calculated risks',
  },
  7: {
    label: 'Aggressive',
    color: '#F59E0B',
    description: 'High growth potential with higher volatility',
  },
  8: {
    label: 'Very Aggressive',
    color: '#EA580C',
    description: 'Maximum growth with substantial risk',
  },
  9: {
    label: 'Ultra Aggressive',
    color: '#DC2626',
    description: 'Pursuing exceptional returns',
  },
  10: {
    label: 'Maximum Growth',
    color: '#B91C1C',
    description: 'Seeking the highest possible returns',
  },
};

// ===========================
// 2) Reusable UI Components
// ===========================
const Slider = ({ value, onChange, min, max, step = 1, className }) => (
  <input
    type="range"
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    min={min}
    max={max}
    step={step}
    className={`w-full ${className}`}
    style={{
      accentColor: riskProfiles[value]?.color ?? '#4ADE80',
    }}
  />
);

const Input = ({ className, ...props }) => (
  <input
    className={`border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

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

const MetricTooltip = ({ text }) => (
  <div className="absolute z-20 p-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
    {text}
  </div>
);

// ===========================
// 3) Main Component
// ===========================
const PortfolioJourney = () => {
  // Steps
  const [step, setStep] = useState(1);

  // Form: risk + amount
  const [riskLevel, setRiskLevel] = useState(5);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');

  // API data
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Expansions
  const [expandedTicker, setExpandedTicker] = useState(null);
  const assetRefs = useRef({});
  const [activeMetric, setActiveMetric] = useState(null);
  const tooltipRef = useRef(null);

  // For chart colors
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

  // Trading 212 links
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

  // --------------------------
  // A) Step Indicator
  // --------------------------
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

  // --------------------------
  // B) Fetch from Real API
  // --------------------------
  const fetchPortfolioData = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const resp = await fetch(
        'https://safinabackend.azurewebsites.net/api/portfolio/optimize',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            initial_investment: Number(amount),
            risk_tolerance: riskLevel,
          }),
        }
      );
      if (!resp.ok) {
        throw new Error('Failed to fetch portfolio data');
      }
      const data = await resp.json();
      setPortfolioData(data);
    } catch (err) {
      setFetchError(err.message);
    }
    setIsLoading(false);
  };

  // --------------------------
  // Step 1: RiskInput
  // --------------------------
  const RiskInput = () => {
    const currentProfile = riskProfiles[riskLevel];

    const validateAmount = () => {
      if (!amount) {
        setAmountError('Investment amount is required.');
        return false;
      }
      const val = parseFloat(amount);
      if (isNaN(val) || val < 100) {
        setAmountError('Minimum investment amount is £100.');
        return false;
      }
      if (val > 1000000) {
        setAmountError('Maximum investment amount is £1,000,000.');
        return false;
      }
      setAmountError('');
      return true;
    };

    const handleAnalyze = async () => {
      if (!validateAmount()) return;
      await fetchPortfolioData();
      if (!fetchError) {
        setStep(2);
      }
    };

    return (
      <div className="space-y-8">
        <div className="space-y-6">
          <label className="text-2xl font-semibold">
            What's your risk tolerance? (1-10)
          </label>
          <div className="flex items-center space-x-6">
            <span className="text-2xl font-bold">{riskLevel}</span>
            <Slider
              value={riskLevel}
              onChange={(val) => setRiskLevel(val)}
              min={1}
              max={10}
              step={1}
              className="flex-1"
            />
          </div>
          {currentProfile && (
            <div
              className="p-4 border-l-4 rounded-lg relative"
              style={{
                borderLeftColor: currentProfile.color,
                backgroundColor: '#f9fafb',
              }}
            >
              <div className="flex items-start space-x-4">
                <Info
                  className="flex-shrink-0 w-6 h-6 mt-1"
                  style={{ color: currentProfile.color }}
                />
                <div>
                  <h4
                    className="font-semibold text-xl"
                    style={{ color: currentProfile.color }}
                  >
                    {currentProfile.label}
                  </h4>
                  <p className="text-base text-gray-600">
                    {currentProfile.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <label className="text-2xl font-semibold">
            Investment Amount (£)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              £
            </span>
            <Input
              type="text"
              className="pl-8"
              placeholder="Enter amount between £100 and £1,000,000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          {amountError && (
            <p className="text-red-500 text-sm">{amountError}</p>
          )}
        </div>

        <Button onClick={handleAnalyze} className="w-full mt-6">
          Analyze Portfolio
        </Button>
        {isLoading && (
          <p className="text-blue-600 text-center font-medium">
            Generating your portfolio...
          </p>
        )}
        {fetchError && (
          <p className="text-red-500 text-center">{fetchError}</p>
        )}
      </div>
    );
  };

  // --------------------------
  // Step 2 Subcomponents
  // --------------------------

  // 2A) PortfolioStats
  const PortfolioStats = () => {
    if (!portfolioData) return null;
    const { risk_metrics } = portfolioData.dashboard_data;
    const { labels, values } = risk_metrics;

    // Indices
    const idxExp = labels.indexOf('Expected Return');
    const idxVol = labels.indexOf('Volatility');
    const idxMD = labels.indexOf('Max Drawdown');
    const idxSR = labels.indexOf('Sharpe Ratio');

    const expReturn = idxExp >= 0 ? values[idxExp] * 100 : 0;
    const vol = idxVol >= 0 ? values[idxVol] * 100 : 0;
    const maxDraw = idxMD >= 0 ? values[idxMD] * 100 : 0;
    const sharpe = idxSR >= 0 ? values[idxSR] : 0;

    const metrics = [
      {
        id: 'expectedReturn',
        icon: TrendingUp,
        label: 'Expected Return',
        value: `${expReturn.toFixed(2)}%`,
        description:
          'The anticipated percentage gain of your portfolio over a specified period.',
      },
      {
        id: 'volatility',
        icon: Percent,
        label: 'Volatility',
        value: `${vol.toFixed(2)}%`,
        description:
          'Measures the fluctuation in your portfolio’s value, indicating risk level.',
      },
      {
        id: 'maxDrawdown',
        icon: AlertTriangle,
        label: 'Max Drawdown',
        value: `${maxDraw.toFixed(2)}%`,
        description:
          'The maximum observed loss from a peak to a trough of your portfolio.',
      },
      {
        id: 'sharpeRatio',
        icon: TrendingUp,
        label: 'Sharpe Ratio',
        value: sharpe.toFixed(2),
        description:
          'Indicates the risk-adjusted return of your portfolio.',
      },
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {metrics.map(({ id, icon: Icon, label, value, description }) => (
          <div
            key={id}
            className="relative p-6 bg-white shadow-lg rounded-xl flex items-center space-x-4"
          >
            <Icon size={24} className="text-blue-600" />
            <div>
              <div className="flex items-center space-x-1">
                <div className="text-sm text-gray-500">{label}</div>
                <Info
                  className="w-4 h-4 text-gray-500 cursor-pointer"
                  onClick={() =>
                    setActiveMetric(activeMetric === id ? null : id)
                  }
                />
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {value}
              </div>
            </div>
            {activeMetric === id && (
              <div ref={tooltipRef}>
                <MetricTooltip text={description} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // 2B) Doughnut Pie Chart for allocations
  const AllocationPie = () => {
    if (!portfolioData) return null;
    const weights = portfolioData.portfolio_metrics.Weights;
    // Convert to array
    const pieData = Object.entries(weights).map(([ticker, frac]) => ({
      ticker,
      value: frac * 100,
    }));

    return (
      <div className="h-96 my-8 bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4">Asset Allocation</h3>
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="ticker"
                cx="50%"
                cy="50%"
                innerRadius={80}   // Doughnut shape
                outerRadius={120}
              >
                {pieData.map((entry, idx) => (
                  <Cell
                    key={entry.ticker}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Pie>
              <RechartsTooltip
                formatter={(val) => `${val.toFixed(2)}%`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  // 2C) Expandable Asset Allocation List (on the left)
  //     Each row: Name in bold, Ticker, separate column for %,
  //     If expanded => show description + sub-chart
  const AssetAllocationsList = () => {
    if (!portfolioData) return null;
    const { asset_info, performance } = portfolioData.dashboard_data;
    const weights = portfolioData.portfolio_metrics.Weights;
    // build array
    const allocations = asset_info.map((a, idx) => {
      const frac = weights[a.name] ?? 0;
      return {
        name: a.name,
        ticker: a.ticker,
        description: a.info,
        allocation: (frac * 100).toFixed(2),
      };
    });

    return (
      <div className="space-y-4">
        {allocations.map((alloc, i) => {
          const color = COLORS[i % COLORS.length];
          // Build performance data for sub-chart
          const assetSeries = performance.series.find(
            (s) => s.name === alloc.name
          );
          const dates = performance.dates || [];
          const perfData = dates.map((d, idx) => ({
            date: d,
            value: assetSeries?.values[idx] || 0,
          }));

          // Calculate YTD
          const thisYear = new Date().getFullYear();
          const ytdData = perfData.filter(
            (p) => new Date(p.date).getFullYear() === thisYear
          );
          let ytdReturn = null;
          if (ytdData.length > 1) {
            const firstVal = ytdData[0].value;
            const lastVal = ytdData[ytdData.length - 1].value;
            if (firstVal !== 0) {
              ytdReturn = ((lastVal / firstVal) - 1) * 100;
            }
          }

          const isExpanded = expandedTicker === alloc.ticker;

          return (
            <div
              key={alloc.ticker}
              className="overflow-hidden bg-white shadow-lg rounded-xl"
              ref={(el) => (assetRefs.current[alloc.ticker] = el)}
            >
              <button
                onClick={() =>
                  setExpandedTicker(isExpanded ? null : alloc.ticker)
                }
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none relative"
              >
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4 items-center">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-lg text-gray-800">
                        {alloc.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        Ticker: {alloc.ticker}
                      </span>
                    </div>
                  </div>
                  {/* Right side columns: Allocation & YTD */}
                  <div className="flex items-center space-x-6">
                    {/* Allocation column */}
                    <div className="text-right">
                      <div className="font-medium text-lg text-gray-800">
                        {alloc.allocation}%
                      </div>
                      <div className="text-sm text-gray-500">
                        £
                        {amount
                          ? (
                              Number(amount) * (Number(alloc.allocation) / 100)
                            ).toLocaleString()
                          : '0'}
                      </div>
                    </div>
                    {/* YTD column */}
                    <div className="text-right">
                      <div
                        className={`font-medium text-lg ${
                          ytdReturn && ytdReturn >= 0
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {ytdReturn !== null ? `${ytdReturn.toFixed(2)}%` : '0%'}
                      </div>
                      <div className="text-sm text-gray-500">YTD</div>
                    </div>
                    {/* Expand icon */}
                    {isExpanded ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </div>
                </div>
                {/* Expandable body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="mt-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {/* Description */}
                      <p className="text-gray-600 mb-4">
                        {alloc.description}
                      </p>
                      {/* Sub-chart */}
                      <div className="w-full h-52 sm:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={perfData}>
                            <XAxis
                              dataKey="date"
                              tick={{ fill: '#6B7280', fontSize: 12 }}
                              tickFormatter={(ds) => format(parseISO(ds), 'MMM yy')}
                            />
                            <YAxis
                              tick={{ fill: '#6B7280', fontSize: 12 }}
                              tickFormatter={(val) =>
                                `${(val * 100).toFixed(0)}%`
                              }
                            />
                            <RechartsTooltip
                              formatter={(val) => `${(val * 100).toFixed(2)}%`}
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  // 2D) Portfolio vs. S&P 500 + 10-year
  const PortfolioVsSP = () => {
    if (!portfolioData) return null;
    const { dates, series } = portfolioData.dashboard_data.performance;
    if (!dates || !series?.length) return null;

    // Build line chart data
    const chartData = dates.map((date, i) => ({
      date,
      Portfolio: series.find((s) => s.name === 'Portfolio')?.values[i] || 0,
      'S&P 500': series.find((s) => s.name === 'S&P 500')?.values[i] || 0,
    }));

    // 10-Year annualized return
    let tenYearReturn = null;
    // If we have at least 120 months (10 years)
    if (dates.length >= 120) {
      const startIndex = dates.length - 120;
      const portfolioVals = series.find((s) => s.name === 'Portfolio')?.values;
      if (portfolioVals) {
        const firstFactor = portfolioVals[startIndex];
        const lastFactor = portfolioVals[portfolioVals.length - 1];
        if (firstFactor !== 0) {
          const annualized = Math.pow(lastFactor / firstFactor, 1 / 10) - 1;
          tenYearReturn = annualized * 100; // e.g. 12.34
        }
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6 mt-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800">
            Portfolio vs. S&P 500
          </h2>
          <FaInfoCircle className="text-gray-400" />
        </div>
        {tenYearReturn !== null && (
          <p className="text-gray-700 font-medium mb-2">
            10-Year Annualized Return: {tenYearReturn.toFixed(2)}%
          </p>
        )}
        <p className="text-gray-600 text-sm mb-6 max-w-md">
          Track how your portfolio’s returns compare against the S&P 500
          benchmark over time.
        </p>
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
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
                tickFormatter={(dStr) => format(parseISO(dStr), 'MMM yyyy')}
              />
              <YAxis
                tick={{ fill: '#4B5563', fontSize: 12 }}
                tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={{ stroke: '#E5E7EB' }}
              />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  padding: '10px',
                }}
                labelStyle={{
                  fontWeight: '600',
                  marginBottom: '5px',
                }}
                formatter={(val) => `${(val * 100).toFixed(2)}%`}
                labelFormatter={(label) => {
                  const parsed = parseISO(label);
                  return format(parsed, 'do MMM yyyy');
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{
                  top: -10,
                  right: 0,
                  fontSize: '14px',
                  color: '#4B5563',
                }}
              />
              {/* Portfolio line */}
              <Line
                type="monotone"
                dataKey="Portfolio"
                stroke="#10B981"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: '#10B981',
                  strokeWidth: 2,
                  stroke: '#ffffff',
                }}
                fill="url(#colorPortfolio)"
                fillOpacity={0.1}
              />
              {/* S&P 500 line */}
              <Line
                type="monotone"
                dataKey="S&P 500"
                stroke="#EF4444"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: '#EF4444',
                  strokeWidth: 2,
                  stroke: '#ffffff',
                }}
                fill="url(#colorSP500)"
                fillOpacity={0.1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    );
  };

  // Step 2 Container
  const OptimizedPortfolio = () => {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Optimized Portfolio
        </h2>

        <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
          {/* Left column: Stats + Asset Allocations */}
          <div className="flex-1 space-y-6">
            <PortfolioStats />
            <AssetAllocationsList />
          </div>

          {/* Right column: Pie chart + Historical */}
          <div className="flex-1">
            <AllocationPie />
            <PortfolioVsSP />
          </div>
        </div>

        {/* Step nav */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-12">
          <Button
            variant="outline"
            onClick={() => setStep(1)}
            className="w-full md:w-1/2"
          >
            Back
          </Button>
          <Button
            onClick={() => setStep(3)}
            className="w-full md:w-1/2"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  };

  // --------------------------
  // Step 3: Final CTA
  // --------------------------
  const FinalCTA = () => (
    <section className="relative py-16 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
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
          Whether you prefer a ready-made portfolio or want to pick your own
          assets, we make it simple to get started. Choose your path and start
          growing your wealth.
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
        {/* Trading 212 Card */}
        <motion.div
          className="relative bg-white border border-blue-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6 }}
        >
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
              Based on your chosen risk tolerance, we’ve curated a recommended
              pre-built portfolio. Get started quickly and confidently.
            </p>
            <div className="mb-6">
              <span className="block text-gray-700 font-semibold mb-2">
                Your Chosen Risk Level:
              </span>
              <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 flex items-center justify-between">
                <span className="font-bold text-blue-800">
                  Level {riskLevel}
                </span>
                <span className="text-sm text-blue-600">
                  {riskLevel <= 3
                    ? 'Lower Risk'
                    : riskLevel <= 7
                    ? 'Moderate Risk'
                    : 'Higher Risk'}
                </span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Invest in Your Portfolio with Just One Click
                </h2>
                <p className="text-gray-600 mt-2">
                  Simply click the button below to go to Trading 212, add funds
                  to your portfolio, and you’re all set to grow your investments
                  effortlessly.
                </p>
              </div>
              <div className="text-center">
                <a
                  href={trading212Links[riskLevel]}
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
              If you prefer using another platform, these simple steps will guide
              you through the process:
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center font-bold text-yellow-800">
                    1
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">
                    Add Funds
                  </span>
                  <p className="text-sm text-gray-600">
                    Deposit money into your chosen brokerage account.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center font-bold text-yellow-800">
                    2
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">
                    Find Your Assets
                  </span>
                  <p className="text-sm text-gray-600">
                    Search for the ticker symbols of the assets you identified.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center font-bold text-yellow-800">
                    3
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">
                    Invest
                  </span>
                  <p className="text-sm text-gray-600">
                    Purchase shares. If share sizes limit your full investment,
                    allocate the remainder elsewhere or keep it for future buys.
                  </p>
                </div>
              </li>
            </ul>
            <p className="mt-8 text-gray-700 text-sm">
              Before committing, review fees, asset availability, and user
              experience. Choose what best supports your financial goals.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          onClick={() => setStep(2)}
          className="w-1/2 sm:w-1/3"
        >
          Back to Portfolio
        </Button>
      </div>
    </section>
  );

  // --------------------------
  // Final Render
  // --------------------------
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12 bg-gray-100 min-h-screen">
      <StepIndicator currentStep={step} totalSteps={3} />

      {/* Step 1 */}
      {step === 1 && <RiskInput />}

      {/* Step 2 */}
      {step === 2 && portfolioData && <OptimizedPortfolio />}

      {/* Step 3 */}
      {step === 3 && portfolioData && <FinalCTA />}
    </div>
  );
};

export default PortfolioJourney;
