import React, { useState, useRef,  memo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  ChevronDown,
  ChevronUp,
  DollarSign,
  TrendingUp,
  Percent,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';

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

// Memoized Chart Components to Prevent Unnecessary Re-renders
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
      <Tooltip
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

const MemoizedPieChart = memo(({ data, colors }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={80}
        outerRadius={120}
        dataKey="allocation"
        nameKey="ticker"
        // Removed labels
      >
        {data.map((entry, index) => (
          <Cell key={entry.ticker} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      {/* Removed Legend to keep it clean */}
    </PieChart>
  </ResponsiveContainer>
));

const PortfolioJourney = () => {
  const [step, setStep] = useState(1);
  const [riskLevel, setRiskLevel] = useState(5);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [expandedTicker, setExpandedTicker] = useState(null);
  const [activeMetric, setActiveMetric] = useState(null);
  const tooltipRef = useRef(null);

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

  const portfolioStats = {
    expectedReturn: 12.5,
    volatility: 15.2,
    maxDrawdown: -25.4,
    sharpeRatio: 1.8,
  };

  const allocations = [
    {
      ticker: 'VTI',
      name: 'Vanguard Total Stock Market ETF',
      allocation: 40,
      ytdReturn: 15.2,
      description:
        'Broad US market exposure across all market capitalizations',
    },
    {
      ticker: 'VXUS',
      name: 'Vanguard Total International Stock ETF',
      allocation: 30,
      ytdReturn: 8.7,
      description: 'Comprehensive international equity exposure',
    },
    {
      ticker: 'BND',
      name: 'Vanguard Total Bond Market ETF',
      allocation: 20,
      ytdReturn: 3.2,
      description: 'Broad exposure to U.S. investment-grade bonds',
    },
    {
      ticker: 'BNDX',
      name: 'Vanguard Total International Bond ETF',
      allocation: 10,
      ytdReturn: 2.8,
      description: 'Exposure to international investment-grade bonds',
    },
  ];

  // Sample backtesting data - in production this would come from an API
  const backtestedData = Array.from({ length: 120 }, (_, i) => {
    const baseValue =
      10000 * Math.pow(1.008, i) * (1 + (Math.random() - 0.5) * 0.1);
    const startValue = 10000;
    return {
      month: `${2014 + Math.floor(i / 12)}-${String((i % 12) + 1).padStart(
        2,
        '0'
      )}`,
      value: baseValue,
      percentageGain: ((baseValue - startValue) / startValue) * 100,
    };
  });

  const COLORS = ['#4ADE80', '#86EFAC', '#FDE68A', '#FBBF24'];

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

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow empty input or valid numbers
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const validateAmount = () => {
    const numValue = parseFloat(amount);

    if (amount === '') {
      setAmountError('Investment amount is required.');
      return false;
    }
    if (numValue < 100) {
      setAmountError('Minimum investment amount is $100.');
      return false;
    }
    if (numValue > 1000000) {
      setAmountError('Maximum investment amount is $1,000,000.');
      return false;
    }
    setAmountError('');
    return true;
  };

  const RiskInput = () => {
    const currentRiskProfile = riskProfiles[Math.round(riskLevel)];

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
              onValueChange={(value) => setRiskLevel(value)}
              max={10}
              min={1}
              step={1} // Changed from 0.1 to 1
              className="flex-1"
            />
          </div>

          <div
            className="p-6 border-l-4 rounded-lg relative"
            style={{
              borderLeftColor: currentRiskProfile.color,
              backgroundColor: '#f9fafb',
            }}
          >
            <div className="flex items-start space-x-4">
              <Info
                className="flex-shrink-0 w-6 h-6 mt-1 cursor-pointer"
                style={{ color: currentRiskProfile.color }}
                onClick={() =>
                  setActiveMetric(
                    activeMetric === 'riskProfile' ? null : 'riskProfile'
                  )
                }
              />
              <div>
                <h4
                  className="font-semibold text-xl"
                  style={{ color: currentRiskProfile.color }}
                >
                  {currentRiskProfile.label}
                </h4>
                <p className="text-base text-gray-600">
                  {currentRiskProfile.description}
                </p>
              </div>
            </div>
            {activeMetric === 'riskProfile' && (
              <div ref={tooltipRef}>
                <MetricTooltip text="This profile determines the balance between risk and return in your portfolio." />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <label className="text-2xl font-semibold">Investment Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <Input
              type="number" // Reverted back to number
              value={amount}
              onChange={handleAmountChange}
              className="pl-12"
              placeholder="Enter amount between $100 and $1,000,000"
              min="100"
              max="1000000"
            />
          </div>
          {amountError && <p className="text-red-500 text-sm">{amountError}</p>}
        </div>

        <Button
          onClick={() => {
            if (validateAmount()) {
              setStep(2);
            }
          }}
          className="w-full mt-6"
          disabled={
            !amount ||
            Number(amount) < 100 ||
            Number(amount) > 1000000 ||
            amountError
          }
        >
          Analyze Portfolio
        </Button>
      </div>
    );
  };

  const BacktestedPortfolio = () => {
    // Calculate 10 Year Compounded Return
    const tenYearData = backtestedData.slice(-120); // Assuming monthly data
    const initialValue = tenYearData[0]?.value || 10000;
    const finalValue = tenYearData[tenYearData.length - 1]?.value || 10000;
    const compoundedReturn =
      ((finalValue / initialValue) ** (1 / 10) - 1) * 100;

    return (
      <div className="relative p-6 mb-6 bg-white shadow-lg rounded-xl">
        {/* Compounded Return Box */}
        <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
          10 Year Compounded Return: {compoundedReturn.toFixed(2)}%
        </div>

        <h3 className="text-2xl font-bold mb-6">Historical Performance</h3>
        <div className="h-96">
          <MemoizedAreaChart data={tenYearData} />
        </div>
        <Alert className="mt-6">
          <AlertDescription className="text-sm text-gray-600">
            Past performance is not indicative of future results. The above
            simulation is based on historical data and includes reinvestment of
            dividends but does not account for taxes, fees, or market conditions
            that may affect actual performance.
          </AlertDescription>
        </Alert>
      </div>
    );
  };

  const PortfolioStats = () => {
    const metrics = [
      {
        id: 'expectedReturn',
        icon: TrendingUp,
        label: 'Expected Return',
        value: `${portfolioStats.expectedReturn}%`,
        description:
          'The anticipated percentage gain of your portfolio over a specified period.',
      },
      {
        id: 'volatility',
        icon: Percent,
        label: 'Volatility',
        value: `${portfolioStats.volatility}%`,
        description:
          'Measures the fluctuation in your portfolio’s value, indicating risk level.',
      },
      {
        id: 'maxDrawdown',
        icon: AlertTriangle,
        label: 'Max Drawdown',
        value: `${portfolioStats.maxDrawdown}%`,
        description:
          'The maximum observed loss from a peak to a trough of your portfolio.',
      },
      {
        id: 'sharpeRatio',
        icon: TrendingUp,
        label: 'Sharpe Ratio',
        value: portfolioStats.sharpeRatio,
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
              <div className="text-lg font-semibold text-gray-800">{value}</div>
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

  const AllocationsList = () => (
    <div className="space-y-4">
      {allocations.map((item, index) => (
        <div
          key={item.ticker}
          className="overflow-hidden bg-white shadow-lg rounded-xl"
        >
          <div className="p-0">
            <button
              onClick={() =>
                setExpandedTicker(
                  expandedTicker === item.ticker ? null : item.ticker
                )
              }
              className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none relative"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div>
                    <div className="font-medium text-lg text-gray-800">
                      {item.ticker}
                    </div>
                    <div className="text-sm text-gray-500">{item.name}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="font-medium text-lg text-gray-800">
                      {item.allocation}%
                    </div>
                    <div className="text-sm text-gray-500">
                      $
                      {amount
                        ? (
                            (Number(amount) * (item.allocation / 100)).toLocaleString()
                          )
                        : '0'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-medium text-lg ${
                        item.ytdReturn >= 0
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {item.ytdReturn}%
                    </div>
                    <div className="text-sm text-gray-500">YTD</div>
                  </div>
                  {expandedTicker === item.ticker ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </div>
              </div>
              {expandedTicker === item.ticker && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">{item.description}</p>
                </div>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const PieChartVisualization = () => (
    <div className="h-96 my-8 bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
      <h3 className="text-xl font-bold mb-4">Asset Allocation</h3>
      <div className="w-full h-full">
        <MemoizedPieChart data={allocations} colors={COLORS} />
      </div>
    </div>
  );

  // Trading 212 Links based on risk level
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

  const OptimizedPortfolio = () => (
    <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
      {/* Left Column */}
      <div className="flex-1 space-y-6">
        <PortfolioStats />
        <AllocationsList />
      </div>

      {/* Right Column */}
      <div className="flex-1">
        <PieChartVisualization />
        <BacktestedPortfolio />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12 bg-gray-100 min-h-screen">
      <StepIndicator currentStep={step} totalSteps={3} />

      {step === 1 && <RiskInput />}

      {step === 2 && (
        <div>
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Optimized Portfolio
          </h2>
          <OptimizedPortfolio />
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-12">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="w-full md:w-1/2"
            >
              Back
            </Button>
            <Button onClick={() => setStep(3)} className="w-full md:w-1/2">
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
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
              Whether you prefer a ready-made portfolio or want to pick your own
              assets, we make it simple to get started. Choose your path and
              start growing your wealth.
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
                  Based on your chosen risk tolerance, we’ve curated a recommended
                  pre-built portfolio. Get started quickly and confidently.
                </p>

                {/* Risk Tolerance Display */}
                <div className="mb-6">
                  <span className="block text-gray-700 font-semibold mb-2">
                    Your Chosen Risk Level:
                  </span>
                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 flex items-center justify-between">
                    <span className="font-bold text-blue-800">Level {riskLevel}</span>
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
                  {/* Header */}
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

                  {/* Call-to-Action Button */}
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
                  If you prefer using another platform, these simple steps will guide you through the process:
                </p>

                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center font-bold text-yellow-800">
                        1
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Add Funds</span>
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
                      <span className="font-semibold text-gray-800">Find Your Assets</span>
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
                      <span className="font-semibold text-gray-800">Invest</span>
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

          {/* Single "Back to Portfolio" Button at the Bottom */}
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
      )}
    </div>
  );
};

export default PortfolioJourney;
