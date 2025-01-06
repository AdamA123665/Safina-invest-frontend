import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import {
  TrendingUp,
  Percent,
  AlertTriangle,
  Info,
  Shield,
  ChevronRight,
  BarChart2,
  DollarSign,
  ArrowLeft,
  ExternalLink as LucideExternalLink,
  Check,
  AlertCircle,
  HelpCircle,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// ====== NEW IMPORTS FOR ENHANCED INVESTMENT SECTION ======
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Building, ArrowRight, Plus } from 'lucide-react';

// ===========================
// 1) Hard-coded Risk Profiles
// ===========================
const riskProfiles = {
  1: {
    label: 'Ultra Conservative',
    color: '#4ADE80',
    description: 'Capital preservation is your top priority'
  },
  2: {
    label: 'Very Conservative',
    color: '#86EFAC',
    description: 'Focus on stability with minimal growth'
  },
  3: {
    label: 'Conservative',
    color: '#BAF5D0',
    description: 'Steady, reliable growth with low risk'
  },
  4: {
    label: 'Moderately Conservative',
    color: '#FDE68A',
    description: 'Balanced approach leaning towards safety'
  },
  5: {
    label: 'Balanced',
    color: '#FCD34D',
    description: 'Equal focus on growth and protection'
  },
  6: {
    label: 'Moderately Aggressive',
    color: '#FBBF24',
    description: 'Growth-oriented with calculated risks'
  },
  7: {
    label: 'Aggressive',
    color: '#F59E0B',
    description: 'High growth potential with higher volatility'
  },
  8: {
    label: 'Very Aggressive',
    color: '#EA580C',
    description: 'Maximum growth with substantial risk'
  },
  9: {
    label: 'Ultra Aggressive',
    color: '#DC2626',
    description: 'Pursuing exceptional returns'
  },
  10: {
    label: 'Maximum Growth',
    color: '#B91C1C',
    description: 'Seeking the highest possible returns'
  }
};

// ===========================
// 2) Enhanced Investment Section (NEW)
// ===========================
const EnhancedInvestment = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const funds = [
    {
      id: 'savings',
      title: 'Savings',
      isComingSoon: false, // Available now
      icon: Wallet,
      description: 'Secure your future with tailored savings solutions',
      details: [
        'Capital preservation focus',
        'Steady growth strategy',
        'Low volatility approach'
      ],
      color: 'deepTeal',
      stats: {
        performance: 72,
        risk: 28,
        liquidity: 98
      },
      link: '/articles/understanding-savings'
    },
    {
      id: 'tactical',
      title: 'Tactical Asset Allocation',
      isComingSoon: true, // Indicates that this fund is coming soon
      icon: TrendingUp,
      description: 'Adapt your portfolio with precision using data-driven strategies',
      details: [
        'Real-time market adaptation',
        'Risk-optimized allocation',
        'Dynamic rebalancing'
      ],
      color: 'primaryGreen', // Tailwind color key
      stats: {
        performance: 87,
        risk: 42,
        liquidity: 95
      },
      link: '/articles/tactical-asset-allocation' // Update with appropriate link
    },
    {
      id: 'private',
      title: 'Private Markets',
      isComingSoon: true, // Indicates that this fund is coming soon
      icon: Building,
      description: 'Access exclusive investment opportunities in private markets',
      details: [
        'Premium deal access',
        'Diversified portfolio',
        'Long-term growth'
      ],
      color: 'gold',
      stats: {
        performance: 92,
        risk: 65,
        liquidity: 45
      },
      link: '/articles/private-markets' // Update with appropriate link
    }
  ];
  const StatBar = ({ value, color }) => (
    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className={`absolute inset-y-0 left-0 bg-deep-teal`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  );
  

  const ExpandedCard = ({ fund }) => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="p-6 bg-white/5 rounded-b-2xl backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-dark-green">Key Features</h4>
            <ul className="space-y-3">
              {fund.details.map((detail, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center text-deep-teal"
                >
                  <ChevronRight className={`w-4 h-4 text-${fund.color}-500 mr-2`} />
                  {detail}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-dark-green">Performance Metrics</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-olive-green">Performance</span>
                  <span className={`text-${fund.color}`}>{fund.stats.performance}%</span>
                </div>
                <StatBar value={fund.stats.performance} color={fund.color} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-olive-green">Risk Level</span>
                  <span className={`text-${fund.color}`}>{fund.stats.risk}%</span>
                </div>
                <StatBar value={fund.stats.risk} color={fund.color} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-olive-green">Liquidity</span>
                  <span className={`text-${fund.color}`}>{fund.stats.liquidity}%</span>
                </div>
                <StatBar value={fund.stats.liquidity} color={fund.color} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const colorStyles = {
    primaryGreen: {
      background: 'rgba(6, 107, 6, 0.1)',    // primary-green with opacity
      text: '#066b06',                        // primary-green
      plusBg: 'rgba(6, 107, 6, 0.2)',        // primary-green with higher opacity
      plusText: '#066b06',                    // primary-green
    },
    deepTeal: {
      background: 'rgba(10, 76, 76, 0.1)',    // deep-teal with opacity
      text: '#0a4c4c',                        // deep-teal
      plusBg: 'rgba(10, 76, 76, 0.2)',       // deep-teal with higher opacity
      plusText: '#0a4c4c',                    // deep-teal
    },
    gold: {
      background: 'rgba(196, 155, 60, 0.1)',  // gold with opacity
      text: '#c49b3c',                        // gold
      plusBg: 'rgba(196, 155, 60, 0.2)',     // gold with higher opacity
      plusText: '#c49b3c',                    // gold
    },
    oliveGreen: {
      background: 'rgba(136, 163, 89, 0.1)',  // olive-green with opacity
      text: '#88a359',                        // olive-green
      plusBg: 'rgba(136, 163, 89, 0.2)',     // olive-green with higher opacity
      plusText: '#88a359',                    // olive-green
    },
    // Add more colors as needed
  };

  return (
    <div className="min-h-screen bg-light-background text-primary-green pt-5" ref={containerRef}>
      {/* Title Section */}
      <div className="relative py-5 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-primary-green">
            Other investment options
          </h1>
        </motion.div>
      </div>

      {/* Investment Options */}
      <div className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {funds.map((fund, index) => {
            const styles = colorStyles[fund.color] || {};

            return (
              <motion.div
                key={fund.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <motion.div
                  className="relative rounded-2xl transition-all duration-500 shadow-lg"
                  style={{
                    backgroundColor: styles.background,
                  }}
                  whileHover={{ scale: expandedSection !== fund.id ? 1.02 : 1 }}
                >
                  <button
                    onClick={() =>
                      setExpandedSection(expandedSection === fund.id ? null : fund.id)
                    }
                    className="w-full text-left p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <fund.icon style={{ color: styles.text }} className="w-10 h-10" />
                      <motion.div
                        animate={{ rotate: expandedSection === fund.id ? 45 : 0 }}
                        style={{ backgroundColor: styles.plusBg }}
                        className="p-1 rounded-full"
                      >
                        <Plus style={{ color: styles.plusText }} className="w-4 h-4" />
                      </motion.div>
                    </div>

                    <h3
        className="text-2xl font-bold mb-2"
        style={{ color: styles.text }}
      >
        {fund.title}
      </h3>
      <p
        className="mb-4"
        style={{ color: styles.plusText }}
      >
        {fund.description}
      </p>
                  </button>

                  <AnimatePresence>
                    {expandedSection === fund.id && <ExpandedCard fund={fund} />}
                  </AnimatePresence>
                 {/* Conditional "Learn More" or "Coming Soon" */}
                 <div className="flex justify-start items-center mt-4 px-4 py-4 relative">
  {!fund.isComingSoon && fund.link ? (
    <Link to={fund.link} className="w-auto">
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ backgroundColor: styles.text }}
        className={`px-6 py-3 rounded-xl font-medium inline-flex items-center group text-light-background cursor-pointer`}
      >
        Learn More
        <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </motion.a>
    </Link>
  ) : fund.isComingSoon ? (
    <span style={{ color: styles.plusText }} className=" font-medium">Coming Soon</span>
  ) : null}
</div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Methodology Section (Always Expanded) */}
      <motion.div
        className="relative z-10 px-4 py-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="bg-sage rounded-3xl overflow-hidden backdrop-blur-sm shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-8">
              <h2 className="text-3xl font-bold text-deep-green mb-6">Our Methodology</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-olive-green text-lg mb-6">
                    Our asset allocator is powered by over 10 years of market data
                    and trained using advanced statistical models to find the optimal
                    investment allocation for your risk preferences.
                  </p>
                  <motion.div
                  onClick={() => navigate('/articles/asset-allocation-methodology')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-green px-6 py-3 rounded-xl font-medium inline-flex items-center group text-light-background cursor-pointer"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </motion.div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Years of Data', value: '10+' },
                    { label: 'ETFs Analyzed', value: '12' },
                    { label: 'Countries Accessible', value: '20+' },
                    { label: 'Client Satisfaction', value: '98%' }
                  ].map((stat, idx) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-light-background rounded-xl p-4"
                    >
                      <div className="text-2xl font-bold text-olive-green mb-1">{stat.value}</div>
                      <div className="text-sm text-deep-teal">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};


// ===========================
// 3) Reusable UI Components
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
      accentColor: riskProfiles[value]?.color ?? '#4ADE80'
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
  const baseStyles =
    'px-6 py-3 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all';
  let variantStyles = '';

  switch (variant) {
    case 'outline':
      variantStyles =
        'border border-olive-green text-olive-green bg-transparent hover:bg-olive-green-50';
      break;
    default:
      variantStyles = 'bg-olive-green text-white hover:bg-olive-green-700';
      break;
  }

  if (disabled) {
    variantStyles += ' opacity-50 cursor-not-allowed';
  }

  return (
    <button
      type="button"
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
  <div className="absolute z-20 p-2 bg-sage text-primary-green text-xs rounded-lg shadow-lg">
    {text}
  </div>
);

// ===========================
// 4) Main Portfolio Component
// ===========================
const PortfolioJourney = () => {
  // Steps
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form: risk + amount
  const [riskLevel, setRiskLevel] = useState(5);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');

  // API data
  const [portfolioData, setPortfolioData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Expansions
  const [expandedTicker, setExpandedTicker] = useState(null);
  const assetRefs = useRef({});
  const [activeMetric, setActiveMetric] = useState(null);
  const tooltipRef = useRef(null);

  // Colors for charts
  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#FF6666',
    '#AAEEBB',
    '#BBBBBB',
    '#7744DD'
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
    10: 'https://www.trading212.com/maximum-growth'
  };

  // StepIndicator
  const StepIndicator = ({ currentStep, totalSteps }) => (
    <div className="w-full mb-12">
      <div className="relative">
        <div className="h-4 bg-olive-green/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-dark-green/50 to-dark-green rounded-full transition-all duration-500 ease-out"
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
                      ? 'bg-gradient-to-r from-dark-green/50 to-dark-green text-light-background transform scale-110'
                      : 'bg-white text-gray'
                  }`}
              >
                {num}
              </div>
              <div
                className={`mt-2 text-sm font-medium ${
                  num <= currentStep ? 'text-primary-green' : 'text-gray-400'
                }`}
              >
                {['Input', 'Portfolio', 'Review'][num - 1]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ===========================
  // Fetch the portfolio data
  // ===========================
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
            risk_tolerance: riskLevel
          })
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

  // ===========================
  // Step 1: Risk Input
  // ===========================
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
          <label className="text-2xl font-semibold text-deep-teal">
            What's your risk tolerance? (1-10)
          </label>
          <div className="flex items-center space-x-6">
            <span className="text-2xl font-bold text-deep-teal">{riskLevel}</span>
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
                backgroundColor: '#f9fafb'
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
          <label className="text-2xl font-semibold text-deep-teal">
            Investment Amount (£)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-light-background">
              £
            </span>
            <Input
              type="number"
              className="pl-8"
              placeholder="Enter amount between £100 and £1,000,000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
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
          <p className="text-primary-green text-center font-medium">
            Generating your portfolio...
          </p>
        )}
        {fetchError && (
          <p className="text-red-500 text-center">{fetchError}</p>
        )}
      </div>
    );
  };

  // ===========================
  // Step 2: Portfolio Overview
  // ===========================

  // A) PortfolioStats
  const PortfolioStats = () => {
    if (!portfolioData) return null;
   // 1) Extract risk metrics
  const { risk_metrics } = portfolioData.dashboard_data;
  const { labels, values } = risk_metrics;

  // 2) Identify indexes of relevant metrics
  const idxExp = labels.indexOf('Expected Return');
  const idxVol = labels.indexOf('Volatility');
  const idxMD = labels.indexOf('Max Drawdown');
  // Sharpe Ratio index if you need it
  // const idxSR = labels.indexOf('Sharpe Ratio');

  // 3) Standard Risk Metrics from the backend
  const expReturn = idxExp >= 0 ? values[idxExp] * 100 : 0;
  const vol = idxVol >= 0 ? values[idxVol] * 100 : 0;
  const maxDraw = idxMD >= 0 ? values[idxMD] * 100 : 0;

  // 4) Calculate rolling 1-year return
  const currentDate = new Date();
  const lastYearDate = new Date();
  lastYearDate.setFullYear(currentDate.getFullYear() - 1);

  // Safely locate the "Portfolio" series, falling back to an empty array if missing
  const portfolioSeries =
    portfolioData.dashboard_data.performance.series.find(
      (s) => s.name === 'Portfolio'
    )?.values || [];

  // Retrieve date array, or empty if missing
  const dates = portfolioData.dashboard_data.performance.dates || [];

  // Filter for the last 12 months
  const filteredData = dates
    .map((date, idx) => ({
      date: new Date(date),
      value: portfolioSeries[idx],
    }))
    .filter((item) => item.date >= lastYearDate);

  // Calculate the 1-year return (rolling)
  const calculatedOneYearReturn =
    filteredData.length > 1
      ? (
          ((filteredData[filteredData.length - 1].value -
            filteredData[0].value) /
            filteredData[0].value) *
          100
        ).toFixed(2)
      : '0.00'; // or however you'd like to handle the fallback

  // 6) Your metrics array, including the new 1-year return metric
  const metrics = [
    {
      // Replace your second "Expected Return" with the new 1-Year Return
      id: 'oneYearReturn',
      icon: TrendingUp,
      label: '1-Year Return',
      value: `${calculatedOneYearReturn}%`,
      description:
        'The portfolio’s performance over the past 12 months, expressed as a percentage.',
    },
    {
      id: 'expectedReturn',
      icon: TrendingUp,
      label: 'Expected Return (10y avg)',
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
  ];

  return (
    <div className="bg-sage shadow-lg rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4 text-gold">
        Portfolio Risk Metrics
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-sage/60">
        {metrics.map(({ id, icon: Icon, label, value, description }) => (
          <div
            key={id}
            className="p-4 rounded-lg flex flex-col justify-center relative bg-sage/60"
          >
            <div className="text-sm text-primary-green flex items-center mb-1 bg-sage/60">
              <Icon className="w-4 h-4 text-black mr-2" />
              {label}
              <Info
                className="w-4 h-4 text-primary-green cursor-pointer ml-1"
                onClick={() =>
                  setActiveMetric(activeMetric === id ? null : id)
                }
              />
            </div>
            <div className="text-lg font-semibold text-primary-green bg-sage/60">
              {value}
            </div>
            {activeMetric === id && (
              <div ref={tooltipRef}>
                <MetricTooltip text={description} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

  // B) Doughnut Pie
  const AllocationPie = () => {
    if (!portfolioData) return null;
    const w = portfolioData.portfolio_metrics.Weights;
    const pieData = Object.entries(w).map(([assetName, fraction]) => ({
      assetName,
      value: fraction * 100
    }));

    return (
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-bold text-primary-green mb-4">
          Asset Allocation
        </h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="assetName"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                labelLine={false}
                isAnimationActive={false} // disable Recharts animation
              >
                {pieData.map((entry, i) => (
                  <Cell
                    key={entry.assetName}
                    fill={COLORS[i % COLORS.length]}
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

  // C) AssetAllocationsList
  const AssetAllocationsList = () => {
    if (!portfolioData) return null;
    const { asset_info, performance } = portfolioData.dashboard_data;
    const weights = portfolioData.portfolio_metrics.Weights;

    return (
      <div className="bg-white shadow-lg rounded-xl p-6 mt-8">
        <h3 className="text-xl font-bold text-primary-green mb-4">Your Assets</h3>
        <div className="space-y-6">
          {asset_info.map((asset, index) => {
            const color = COLORS[index % COLORS.length];
            const frac = weights[asset.name] ?? 0;
            const allocationPct = (frac * 100).toFixed(2);

            // Build performance data
            const assetSeries = performance.series.find(
              (s) => s.name === asset.name
            );
            const dates = performance.dates || [];
            const perfData = dates.map((d, idx) => ({
              date: d,
              value: assetSeries ? assetSeries.values[idx] : 0
            }));

            let ytdReturn = null;
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

            const ytdData = perfData.filter((p) => new Date(p.date) >= oneYearAgo);

            if (ytdData.length > 1) {
              const firstVal = ytdData[0].value;
              const lastVal = ytdData[ytdData.length - 1].value;
              if (firstVal !== 0) {
                ytdReturn = ((lastVal / firstVal) - 1) * 100;
              }
            }

            const isExpanded = expandedTicker === asset.ticker;

            return (
              <div
                key={asset.ticker}
                ref={(el) => (assetRefs.current[asset.ticker] = el)}
                className={`bg-light-background rounded-xl shadow-md border-2 p-4 hover:shadow-lg`}
                style={{ borderColor: color }}
              >
                <div className="flex items-center justify-between space-x-4">
                  {/* Name + Ticker */}
                  <div className="flex flex-col w-1/3">
                    <h4
                      className="text-sm md:text-base font-bold"
                      style={{ color }}
                    >
                      {asset.name}
                    </h4>
                    <span className="text-xs text-deep-teal mt-1">
                      Ticker: {asset.ticker}
                    </span>
                  </div>

                  {/* YTD Return */}
                  <div className="flex flex-col w-1/4 text-right">
                    <span className="text-xs text-olive-green uppercase">
                      YTD
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        ytdReturn && ytdReturn >= 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {ytdReturn !== null
                        ? `${ytdReturn.toFixed(2)}%`
                        : '0%'}
                    </span>
                  </div>

                  {/* Allocation Box */}
                  <div
                    className="flex flex-col px-3 py-2 rounded-md w-1/4"
                    style={{ backgroundColor: '#e2eac2' }}
                  >
                    <span className="text-xs text-deep-teal uppercase">
                      Allocation
                    </span>
                    <span className="text-sm font-semibold text-primary-green">
                      {allocationPct}%
                    </span>
                    <span className="text-xs text-primary-green">
                      £
                      {amount
                        ? (
                            Number(amount) *
                            (Number(allocationPct) / 100)
                          ).toLocaleString()
                        : '0'}
                    </span>
                  </div>

                  {/* Expand Arrow */}
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedTicker(isExpanded ? null : asset.ticker)
                    }
                    className="text-olive-green/80 hover:text-olive-green transition-colors duration-200"
                  >
                    {isExpanded ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {isExpanded && (
                  <div className="overflow-hidden mt-4">
                    <p className="text-sm mb-4 text-deep-teal">{asset.info}</p>
                    <div className="w-full h-48 sm:h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={perfData}>
                          <defs>
                            <linearGradient
                              id={`lineGrad-${asset.ticker}`}
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor={color}
                                stopOpacity={0.6}
                              />
                              <stop
                                offset="100%"
                                stopColor={color}
                                stopOpacity={0.05}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="date"
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            tickFormatter={(val) => {
                              const d = parseISO(val);
                              return format(d, 'MMM yy');
                            }}
                          />
                          <YAxis
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                          />
                          <RechartsTooltip
                            formatter={(v) => `${(v * 100).toFixed(2)}%`}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={3}
                            dot={false}
                            fill={`url(#lineGrad-${asset.ticker})`}
                            fillOpacity={0.1}
                            activeDot={{
                              r: 5,
                              fill: color,
                              strokeWidth: 2,
                              stroke: '#ffffff'
                            }}
                            isAnimationActive={false} // disable animation on expand
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // D) Portfolio vs. S&P 500
  const PortfolioVsSP = () => {
    if (!portfolioData) return null;
    const { performance } = portfolioData.dashboard_data;
    const { dates, series } = performance;
    if (!dates || !series?.length) return null;
  
    const chartData = dates.map((date, idx) => ({
      date,
      Portfolio: series.find((s) => s.name === 'Portfolio')?.values[idx] || 0,
      //'S&P 500': series.find((s) => s.name === 'S&P 500')?.values[idx] || 0
    }));
  
  
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-primary-green/90">
            See what your portfolio would have returned over the past 10 years
          </h2>
        </div>
          <p className="text-dark-green font-extrabold text:sm mb-2">
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
                tickFormatter={(str) => {
                  const parsed = parseISO(str);
                  return format(parsed, 'MMM yyyy');
                }}
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
                  padding: '10px'
                }}
                labelStyle={{
                  fontWeight: '600',
                  marginBottom: '5px'
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
                  color: '#4B5563'
                }}
              />
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
                  stroke: '#ffffff'
                }}
                fill="url(#colorPortfolio)"
                fillOpacity={0.1}
                isAnimationActive={false} // disable re-animation
              />
              <Line
                type="monotone"
                dataKey=""
                stroke="#EF4444"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: '#EF4444',
                  strokeWidth: 2,
                  stroke: '#ffffff'
                }}
                fill="url(#colorSP500)"
                fillOpacity={0.1}
                isAnimationActive={false} // disable re-animation
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  // Step 2 container
  const OptimizedPortfolio = () => (
    <div>
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        {/* Left side */}
        <div className="lg:w-1/2 space-y-6">
          <PortfolioStats />
          <AssetAllocationsList />
        </div>
        {/* Right side */}
        <div className="lg:w-1/2 space-y-6">
          <AllocationPie />
          <PortfolioVsSP />
        </div>
      </div>

      {/* Step nav */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-12">
      <Button
        variant="outline"
        onClick={() => {
          setStep(1);
          window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
        }}
        className="w-full md:w-1/2"
      >
        Back
      </Button>
      <Button
        onClick={() => {
          setStep(3);
          window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
        }}
        className="w-full md:w-1/2"
      >
        Continue
      </Button>
      </div>
    </div>
  );

  // ===========================
  // Step 3: Enhanced CTA
  // ===========================
  const EnhancedCTA = ({ riskLevel, setStep, trading212Links }) => {
    const [showBrokerageInfo, setShowBrokerageInfo] = useState(false);
  
    // Carousel card colors
    
  
    // Brokerage comparison data
    const brokerageTypes = [
      {
        type: 'eToro',
        description:
          'A social trading platform that allows users to copy the trades of experienced investors.',
        pros: [
          'Social trading features',
          'User-friendly interface',
          'Wide range of assets including cryptocurrencies',
          'CopyTrader feature for automated trading',
        ],
        cons: [
          'Higher spreads compared to some competitors',
          'Limited research tools',
          'Fees on withdrawals and inactivity',
        ],
      },
      {
        type: 'Trading 212',
        description:
          'A commission-free trading app offering stocks, ETFs, and CFDs with a user-friendly interface.',
        pros: [
          'Commission-free trading',
          'Intuitive mobile and web platforms',
          'Fractional shares available',
          'Wide range of educational resources',
        ],
        cons: [
          'Limited advanced trading tools',
          'CFD trading carries higher risk',
          'Customer support can be slow',
        ],
      },
      {
        type: 'Bestinvest',
        description:
          'A UK-based platform offering a variety of investment options with a focus on long-term investing.',
        pros: [
          'Comprehensive range of investment products',
          'Robust research and analysis tools',
          'Personalized investment advice',
          'Strong customer service',
        ],
        cons: [
          'Higher fees compared to discount brokers',
          'Minimum investment requirements',
          'Less suitable for active traders',
        ],
      },
      {
        type: 'InvestEngine',
        description:
          'An online platform providing automated investing with customizable portfolios.',
        pros: [
          'Automated portfolio management',
          'Low fees',
          'Easy to set up and use',
          'Diverse investment options',
        ],
        cons: [
          'Limited personalization beyond portfolio choices',
          'No social trading features',
          'Basic research tools',
        ],
      },
      {
        type: 'Hargreaves Lansdown',
        description:
          'One of the UK’s leading investment platforms offering a wide range of investment options and services.',
        pros: [
          'Extensive range of investment products',
          'High-quality research and tools',
          'Excellent customer service',
          'User-friendly platform',
        ],
        cons: [
          'Higher fees compared to some competitors',
          'Complex fee structure',
          'Not ideal for very small investors',
        ],
      },
      {
        type: 'Interactive Investor',
        description:
          'A UK-based platform offering flat-fee investing with access to a wide range of global markets.',
        pros: [
          'Flat-fee structure beneficial for larger portfolios',
          'Access to global markets',
          'Comprehensive research tools',
          'Strong customer support',
        ],
        cons: [
          'Not cost-effective for smaller portfolios',
          'Platform can be overwhelming for beginners',
          'Limited educational resources',
        ],
      },
      {
        type: 'Interactive Brokers',
        description:
          'A global brokerage offering advanced trading tools and access to numerous markets worldwide.',
        pros: [
          'Advanced trading platforms and tools',
          'Low trading fees',
          'Access to a vast array of global markets',
          'High degree of customization',
        ],
        cons: [
          'Steep learning curve for beginners',
          'Complex fee structure',
          'Customer service can be challenging to navigate',
        ],
      },
      {
        type: 'AJ Bell',
        description:
          'A UK-based broker providing a wide range of investment options with competitive pricing.',
        pros: [
          'Competitive pricing and fees',
          'Wide range of investment products',
          'User-friendly platform',
          'Strong research and educational resources',
        ],
        cons: [
          'Customer service response times can vary',
          'Limited advanced trading features',
          'Minimum investment amounts for some accounts',
        ],
      },
      {
        type: 'Saxo',
        description:
          'A global brokerage offering a comprehensive trading platform with access to numerous asset classes.',
        pros: [
          'Extensive range of tradable assets',
          'Advanced trading platforms',
          'Robust research and analysis tools',
          'Excellent execution speeds',
        ],
        cons: [
          'Higher fees and minimum deposits',
          'Complex platform may be daunting for beginners',
          'Limited educational resources compared to peers',
        ],
      },
      {
        type: 'Fidelity',
        description:
          'A well-established brokerage offering a broad range of investment services and retirement accounts.',
        pros: [
          'Wide array of investment options',
          'Strong research and educational tools',
          'Excellent customer service',
          'Low-cost index funds and ETFs',
        ],
        cons: [
          'Platform can be less intuitive compared to newer apps',
          'Higher fees for some services',
          'Limited international market access',
        ],
      },
      {
        type: 'FreeTrade',
        description:
          'A commission-free trading app focused on simplicity and accessibility for UK investors.',
        pros: [
          'Commission-free trading',
          'Simple and clean user interface',
          'Fractional shares available',
          'Tax-efficient accounts like ISA and SIPP',
        ],
        cons: [
          'Limited range of investment products',
          'Basic research and analysis tools',
          'No advanced trading features',
        ],
      },
      {
        type: 'XTB',
        description:
          'A global broker offering a wide range of CFDs and forex trading with competitive spreads.',
        pros: [
          'Competitive spreads on CFDs and forex',
          'Advanced trading platforms',
          'Extensive educational resources',
          'Access to a wide range of global markets',
        ],
        cons: [
          'CFD trading involves higher risk',
          'Limited access to some asset classes',
          'Customer service can be inconsistent',
        ],
      },
    ];
  
    // Update cards per view on screen resize
      // Dynamically update cards-per-view based on screen width
   // ===== F A D E   C A R O U S E L   L O G I C  (3 cards per slide) =====
  // 1) Chunk the brokerage array into groups of 3
  const slides = [];
  for (let i = 0; i < brokerageTypes.length; i += 3) {
    slides.push(brokerageTypes.slice(i, i + 3));
  }

  // 2) Track the active slide
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  // 3) Prev/Next slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  // 4) Auto-rotate slides every 5 seconds
  useEffect(() => {
    const autoplay = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(autoplay);
  }, [nextSlide]);

  return (
    <div className="min-h-screen bg-light-background">
  <div className="max-w-7xl mx-auto px-4 py-8">
    {/* Section Heading */}
    <div className="text-center mb-6">
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-green to-deep-teal bg-clip-text text-transparent mb-2">
        Choose Your Investment Path
      </h2>
      <p className="text-base md:text-xl text-deep-brown mb-4">
        We’ve made investing simple with two clear options to get started
      </p>
      <button
        onClick={() => setShowBrokerageInfo(!showBrokerageInfo)}
        className="inline-flex items-center space-x-2 text-primary-green hover:text-dark-green focus:outline-none"
      >
        <Info className="w-5 h-5" />
        <span>Learn about different brokerage options</span>
      </button>
    </div>

    {/* Brokerage Info Carousel */}
    {showBrokerageInfo && (
      <div
        className="bg-deep-teal/50 rounded-xl p-4 md:p-6 mb-6 shadow-md relative"
        /* Removed overflow-hidden */
      >
        <h3 className="text-xl md:text-2xl font-bold text-deep-brown mb-4">
          Understanding Your Brokerage Options
        </h3>

        {/* Slides Container */}
        {slides.map((slideBrokers, idx) => (
          <div
            key={idx}
            /*
             * Use block/hidden (or opacity) toggles rather than absolute positioning.
             * This way the slide can grow vertically without being clipped.
             */
            className={`transition-opacity duration-700 ${
              idx === currentSlide ? 'block opacity-100' : 'hidden opacity-0'
            }`}
          >
            <div className="flex flex-col lg:flex-row flex-wrap gap-4">
              {slideBrokers.map((broker, i) => (
                <div
                  key={broker.type + i}
                  className="flex-1 p-4 bg-white rounded-lg shadow hover:shadow-md transition-colors
                             min-h-[300px]" // Helps ensure enough vertical space
                >
                  <h4 className="text-lg md:text-xl font-bold text-deep-brown mb-2">
                    {broker.type}
                  </h4>
                  <p className="text-sm md:text-base text-olive-green mb-4">
                    {broker.description}
                  </p>

                  {/* Pros */}
                  <div className="mb-3">
                    <div className="flex items-start mb-1">
                      <Check className="w-5 h-5 text-olive-green mt-1 mr-2" />
                      <span className="font-semibold text-deep-brown">
                        Pros:
                      </span>
                    </div>
                    <ul className="ml-7 list-disc text-sm md:text-base text-olive-green space-y-1">
                      {broker.pros.map((pro, j) => (
                        <li key={j}>{pro}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div>
                    <div className="flex items-start mb-1">
                      <AlertCircle className="w-5 h-5 text-gold mt-1 mr-2" />
                      <span className="font-semibold text-deep-brown">
                        Cons:
                      </span>
                    </div>
                    <ul className="ml-7 list-disc text-sm md:text-base text-olive-green space-y-1">
                      {broker.cons.map((con, j) => (
                        <li key={j}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Prev / Next Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 -translate-y-1/2
                     bg-deep-brown text-white p-2 rounded-full shadow
                     hover:bg-dark-brown transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 -translate-y-1/2
                     bg-deep-brown text-white p-2 rounded-full shadow
                     hover:bg-dark-brown transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>

        {/* Carousel Indicators (dots) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`h-3 w-3 rounded-full cursor-pointer ${
                index === currentSlide ? 'bg-primary-green' : 'bg-sage'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Optional link to a detailed guide */}
        <div className="mt-16 text-center">
          <div
            onClick={() => navigate('/articles/brokerage-platforms')}
            className="inline-flex items-center text-primary-green hover:text-dark-green cursor-pointer"
          >
            Read our detailed brokerage comparison guide
            <LucideExternalLink className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    )}
  
          {/* Investment Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
            {/* Trading 212 Card */}
            <div className="rounded-xl bg-deep-teal/30 shadow-md hover:shadow-lg transition-shadow p-4 md:p-6 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary-green" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-deep-brown">
                      Trading 212
                    </h3>
                    <span className="text-sm md:text-base text-olive-green font-medium">
                      Quickest Option
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-sage text-sm text-primary-green font-semibold">
                  Pre-built Portfolio
                </div>
              </div>
  
              {/* Steps */}
              <div className="bg-sage rounded-lg p-3 mb-4">
                <h4 className="text-base md:text-lg font-semibold text-deep-brown mb-2">
                  Three Simple Steps:
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      title: 'Click the portfolio link below',
                      description:
                        'Opens Trading 212 with your selected portfolio',
                      tip: 'If certain ETFs are unavailable, we automatically rebalance the allocations to maintain optimal portfolio construction',
                    },
                    {
                      title: 'Add funds to your account',
                      description: 'Secure deposit via bank transfer or card',
                    },
                    {
                      title: "Click 'Invest' - Done!",
                      description: 'Your portfolio is automatically created',
                    },
                  ].map((step, index) => (
                    <div key={index} className="flex items-start">
                      {/* Step Number */}
                      <div className="w-6 h-6 rounded-full bg-light-gold flex items-center justify-center mr-3">
                        <span className="text-primary-green font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      {/* Step Content */}
                      <div className="text-sm md:text-base text-deep-brown">
                        <p className="font-medium">{step.title}</p>
                        <p>{step.description}</p>
                        {step.tip && (
                          <div className="mt-2 p-2 bg-light-gold rounded">
                            <p className="text-xs md:text-sm text-gold">
                              <strong>Note:</strong> {step.tip}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Risk Level */}
              <div className="p-3 rounded-lg bg-sage mb-4 text-sm md:text-base">
                <div className="text-deep-brown mb-1">Your Selected Risk Level</div>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-deep-brown">Level {riskLevel}</div>
                  <div className="text-deep-brown">
                    {riskLevel <= 3
                      ? 'Conservative'
                      : riskLevel <= 7
                      ? 'Balanced'
                      : 'Aggressive'}
                  </div>
                </div>
              </div>
  
              {/* Action Button */}
              <a
                href={trading212Links[riskLevel]}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto block w-full py-3 rounded-lg bg-primary-green text-white text-center font-semibold hover:bg-dark-green transition-all duration-200 text-sm md:text-base"
              >
                Open Your Portfolio
                <LucideExternalLink className="inline-block ml-1 w-4 h-4" />
              </a>
            </div>
  
            {/* Alternative Brokers Card */}
            <div className="rounded-xl bg-gold/30 shadow-md hover:shadow-lg transition-shadow p-4 md:p-6 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center">
                    <BarChart2 className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-deep-brown">
                      Alternative Brokers
                    </h3>
                    <span className="text-sm md:text-base text-deep-teal font-medium">
                      More Flexibility
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-sage text-sm text-primary-green font-semibold">
                  Manual Setup
                </div>
              </div>
  
              {/* Steps */}
              <div className="bg-sage rounded-lg p-3 mb-4">
                <h4 className="text-base md:text-lg font-semibold text-deep-brown mb-2">
                  Follow These Steps:
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      title: 'Choose Your Broker',
                      description: 'Compare fees, features, and minimum deposits',
                      link: {
                        text: 'View broker comparison',
                        url: '/articles/uk-brokerage-platforms',
                      },
                    },
                    {
                      title: 'Open & Fund Account',
                      description: 'Complete verification and add funds',
                      tip: 'Most brokers require ID verification – have your documents ready',
                    },
                    {
                      title: 'Find & Buy Assets',
                      description: 'Search for each asset using the ticker symbols',
                      action: {
                        text: 'View your asset list',
                        onClick: () => setStep(2),
                      },
                    },
                  ].map((step, index) => (
                    <div key={index} className="flex items-start">
                      {/* Step Number */}
                      <div className="w-6 h-6 rounded-full bg-light-gold flex items-center justify-center mr-3">
                        <span className="text-primary-green font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      {/* Step Content */}
                      <div className="text-sm md:text-base text-deep-brown">
                        <p className="font-medium">{step.title}</p>
                        <p>{step.description}</p>
                        {step.link && (
                          <a
                            href={step.link.url}
                            className="text-primary-green hover:text-dark-green inline-flex items-center mt-1"
                          >
                            {step.link.text}
                            <ChevronRightIcon className="w-4 h-4 ml-1" />
                          </a>
                        )}
                        {step.tip && (
                          <div className="mt-2 p-2 bg-light-gold rounded">
                            <p className="text-xs md:text-sm text-gold">
                              <strong>Note:</strong> {step.tip}
                            </p>
                          </div>
                        )}
                        {step.action && (
                          <button
                            onClick={step.action.onClick}
                            className="text-primary-green hover:text-dark-green inline-flex items-center mt-1 focus:outline-none"
                          >
                            {step.action.text}
                            <ChevronRightIcon className="w-4 h-4 ml-1" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Help Section */}
              <div className="bg-sage rounded-lg p-3 text-sm md:text-base">
                <div className="flex items-start">
                  <HelpCircle className="w-5 h-5 text-primary-green mt-1 mr-2" />
                  <div className="text-primary-green">
                  Need help choosing a broker? Read our detailed{' '}
                  <span
                    onClick={() => navigate('/articles/uk-brokerage-platforms')}
                    className="underline hover:text-dark-green cursor-pointer"
                  >
                    broker comparison guide
                  </span>
                </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Back to Portfolio Button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                setStep(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-light-background border border-gray-300 shadow hover:shadow-md transition-all duration-200 focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Step 3 wrapper
  const FinalCTA = () => (
    <EnhancedCTA
      riskLevel={riskLevel}
      setStep={setStep}
      trading212Links={trading212Links}
    />
  );

  return (
      <div className="bg-light-background min-h-screen pt-20">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-3xl sm:text-3xl md:text-7xl font-bold text-center mb-4 text-deep-brown">
            Invest in Public Markets
          </h1>
          <p className="text-center text-lg sm:text-xl max-w-2xl mx-auto text-deep-teal mb-8">
            Leverage our cutting-edge asset allocator and comprehensive strategies
            to take advantage of global public markets—tailored to your risk profile.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-3xl mx-auto mb-12">
      <div
        onClick={() => navigate('/assets')}
        className="group flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto cursor-pointer"
      >
        <Shield className="w-6 h-6 text-blue-600" />
        <div className="flex-1">
          <h3 className="font-semibold text-primary-green">Take the Risk Quiz</h3>
          <p className="text-sm text-olive-green">Discover your investor profile</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>

      <div
        onClick={() => navigate('/assets')}
        className="group flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto cursor-pointer"
      >
        <LineChart className="w-6 h-6 text-blue-600" />
        <div className="flex-1">
          <h3 className="font-semibold text-primary-green">Explore Assets</h3>
          <p className="text-sm text-olive-green">Learn about investment options</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>
    </div>

      

          <div
  className="
    w-full p-2 space-y-12
  "
>
  <StepIndicator currentStep={step} totalSteps={3} />

  {step === 1 && <RiskInput />}
  {step === 2 && portfolioData && <OptimizedPortfolio />}
  {step === 3 && portfolioData && <FinalCTA />}
</div>
{/* Enhanced Investment Section (always visible) */}
<EnhancedInvestment />
    </div>
    </div>
  );
};

export default PortfolioJourney;
