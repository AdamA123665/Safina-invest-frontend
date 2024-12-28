import React, { useState, useRef } from 'react';
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
  HelpCircle
} from 'lucide-react';

// ====== NEW IMPORTS FOR ENHANCED INVESTMENT SECTION ======
import { motion, useScroll, AnimatePresence } from 'framer-motion';
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
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const containerRef = useRef(null);

  const funds = [
    {
      id: 'tactical',
      title: 'Tactical Asset Allocation',
      icon: TrendingUp,
      description: 'Adapt your portfolio with precision using data-driven strategies',
      details: [
        'Real-time market adaptation',
        'Risk-optimized allocation',
        'Dynamic rebalancing'
      ],
      color: 'emerald',
      stats: {
        performance: 87,
        risk: 42,
        liquidity: 95
      }
    },
    {
      id: 'savings',
      title: 'Savings Fund',
      icon: Wallet,
      description: 'Secure your future with tailored savings solutions',
      details: [
        'Capital preservation focus',
        'Steady growth strategy',
        'Low volatility approach'
      ],
      color: 'blue',
      stats: {
        performance: 72,
        risk: 28,
        liquidity: 98
      }
    },
    {
      id: 'private',
      title: 'Private Markets',
      icon: Building,
      description: 'Access exclusive investment opportunities in private markets',
      details: [
        'Premium deal access',
        'Diversified portfolio',
        'Long-term growth'
      ],
      color: 'violet',
      stats: {
        performance: 92,
        risk: 65,
        liquidity: 45
      }
    }
  ];

  const StatBar = ({ value, color }) => (
    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className={`absolute inset-y-0 left-0 bg-${color}-500`}
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
            <h4 className="text-lg font-semibold mb-4">Key Features</h4>
            <ul className="space-y-3">
              {fund.details.map((detail, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center text-gray-300"
                >
                  <ChevronRight className={`w-4 h-4 text-${fund.color}-500 mr-2`} />
                  {detail}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Performance Metrics</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Performance</span>
                  <span className={`text-${fund.color}-500`}>{fund.stats.performance}%</span>
                </div>
                <StatBar value={fund.stats.performance} color={fund.color} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Risk Level</span>
                  <span className={`text-${fund.color}-500`}>{fund.stats.risk}%</span>
                </div>
                <StatBar value={fund.stats.risk} color={fund.color} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Liquidity</span>
                  <span className={`text-${fund.color}-500`}>{fund.stats.liquidity}%</span>
                </div>
                <StatBar value={fund.stats.liquidity} color={fund.color} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white/10"
          animate={{
            x: [0, Math.random() * 400 - 200],
            y: [0, Math.random() * 400 - 200],
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: Math.random() * 2
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white" ref={containerRef}>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <FloatingParticles />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            animate={{
              background: [
                'linear-gradient(to right, #34D399, #3B82F6, #8B5CF6)',
                'linear-gradient(to right, #3B82F6, #8B5CF6, #34D399)',
                'linear-gradient(to right, #8B5CF6, #34D399, #3B82F6)'
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="inline-block px-6 py-2 rounded-full text-sm font-medium mb-8"
          >
            The Future of Investing
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black mb-8">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400">
              Innovative
            </span>
            <span className="block text-white">Investment Solutions</span>
          </h1>
        </motion.div>
      </div>

      {/* Investment Options */}
      <div className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {funds.map((fund, index) => (
            <motion.div
              key={fund.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                className={`relative rounded-2xl transition-all duration-500 ${
                  expandedSection === fund.id ? 'bg-white/10' : 'bg-white/5'
                }`}
                whileHover={{ scale: expandedSection !== fund.id ? 1.02 : 1 }}
              >
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === fund.id ? null : fund.id)
                  }
                  className="w-full text-left p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <fund.icon className={`w-10 h-10 text-${fund.color}-500`} />
                    <motion.div
                      animate={{ rotate: expandedSection === fund.id ? 45 : 0 }}
                      className={`p-1 rounded-full bg-${fund.color}-500/20`}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{fund.title}</h3>
                  <p className="text-gray-400">{fund.description}</p>
                </button>

                <AnimatePresence>
                  {expandedSection === fund.id && <ExpandedCard fund={fund} />}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Methodology Section */}
      <motion.div
        className="relative z-10 px-4 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="bg-white/5 rounded-3xl overflow-hidden backdrop-blur-sm" whileHover={{ scale: 1.02 }}>
            <button
              onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
              className="w-full text-left p-8 flex justify-between items-center"
            >
              <h2 className="text-3xl font-bold">Our Methodology</h2>
              <motion.div
                animate={{ rotate: isMethodologyOpen ? 180 : 0 }}
                className="p-2 rounded-full bg-white/10"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isMethodologyOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-8 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-gray-300 text-lg mb-6">
                          Our asset allocator is powered by over 10 years of market data
                          and trained using advanced statistical models to find the optimal
                          investment allocation for your risk preferences.
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500 px-6 py-3 rounded-xl font-medium inline-flex items-center group"
                        >
                          Learn More
                          <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Years of Data', value: '10+' },
                          { label: 'Markets Analyzed', value: '100+' },
                          { label: 'Success Rate', value: '94%' },
                          { label: 'Client Satisfaction', value: '98%' }
                        ].map((stat, idx) => (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/5 rounded-xl p-4"
                          >
                            <div className="text-2xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
  <div className="absolute z-20 p-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
    {text}
  </div>
);

// ===========================
// 4) Main Portfolio Component
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

  // ===========================
  // Step 2: Portfolio Overview
  // ===========================

  // A) PortfolioStats
  const PortfolioStats = () => {
    if (!portfolioData) return null;
    const { risk_metrics } = portfolioData.dashboard_data;
    const { labels, values } = risk_metrics;

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
          'The anticipated percentage gain of your portfolio over a specified period.'
      },
      {
        id: 'volatility',
        icon: Percent,
        label: 'Volatility',
        value: `${vol.toFixed(2)}%`,
        description:
          'Measures the fluctuation in your portfolio’s value, indicating risk level.'
      },
      {
        id: 'maxDrawdown',
        icon: AlertTriangle,
        label: 'Max Drawdown',
        value: `${maxDraw.toFixed(2)}%`,
        description:
          'The maximum observed loss from a peak to a trough of your portfolio.'
      },
      {
        id: 'sharpeRatio',
        icon: TrendingUp,
        label: 'Sharpe Ratio',
        value: sharpe.toFixed(2),
        description:
          'Indicates the risk-adjusted return of your portfolio.'
      }
    ];

    return (
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Portfolio Risk Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {metrics.map(({ id, icon: Icon, label, value, description }) => (
            <div
              key={id}
              className="p-4 border rounded-lg flex flex-col justify-center relative"
            >
              <div className="text-sm text-gray-500 flex items-center mb-1">
                <Icon className="w-4 h-4 text-gray-400 mr-2" />
                {label}
                <Info
                  className="w-4 h-4 text-gray-400 cursor-pointer ml-1"
                  onClick={() =>
                    setActiveMetric(activeMetric === id ? null : id)
                  }
                />
              </div>
              <div className="text-lg font-semibold text-gray-800">
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
        <h3 className="text-xl font-bold text-gray-800 mb-4">
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
        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Assets</h3>
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

            // YTD Return
            let ytdReturn = null;
            const currentYear = new Date().getFullYear();
            const ytdData = perfData.filter(
              (p) => new Date(p.date).getFullYear() === currentYear
            );
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
                className={`bg-gray-50 rounded-xl shadow-md border-2 p-4 hover:shadow-lg`}
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
                    <span className="text-xs text-gray-600 mt-1">
                      Ticker: {asset.ticker}
                    </span>
                  </div>

                  {/* YTD Return */}
                  <div className="flex flex-col w-1/4 text-right">
                    <span className="text-xs text-gray-400 uppercase">
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
                    style={{ backgroundColor: '#f3f4f6' }}
                  >
                    <span className="text-xs text-gray-500 uppercase">
                      Allocation
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {allocationPct}%
                    </span>
                    <span className="text-xs text-gray-500">
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
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
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
                    <p className="text-sm mb-4 text-gray-700">{asset.info}</p>
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
      'S&P 500': series.find((s) => s.name === 'S&P 500')?.values[idx] || 0
    }));

    let totalReturn = null;
    const portfolioArr = series.find((s) => s.name === 'Portfolio')?.values;
    if (portfolioArr && portfolioArr.length > 1) {
      const lastFactor = portfolioArr[portfolioArr.length - 1];
      totalReturn = (lastFactor - 1) * 100;
    }

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800">
            See what your portfolio would have returned over the past 10 years
          </h2>
        </div>
        {totalReturn !== null && (
          <p className="text-gray-700 font-medium mb-2">
            Return Over the Past 10 Years: {totalReturn.toFixed(2)}%
          </p>
        )}

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
                dataKey="S&P 500"
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
  );

  // ===========================
  // Step 3: Enhanced CTA
  // ===========================
  const EnhancedCTA = ({ riskLevel, setStep, trading212Links }) => {
    const [showBrokerageInfo, setShowBrokerageInfo] = useState(false);

    // Brokerage comparison data
    const brokerageTypes = [
      {
        type: 'Investment Apps',
        description: 'Easy-to-use mobile apps like Trading 212',
        pros: ['Simple to use', 'Low minimum investment', 'Pre-built portfolios'],
        cons: ['Limited investment options', 'Basic research tools']
      },
      {
        type: 'Full-Service Brokers',
        description: 'Traditional brokers with comprehensive services',
        pros: [
          'Wide investment selection',
          'Advanced research tools',
          'Personal support'
        ],
        cons: ['Higher fees', 'Larger minimum investments']
      },
      {
        type: 'Online Brokers',
        description: 'Web-based trading platforms',
        pros: [
          'Moderate fees',
          'Good research tools',
          'Many investment options'
        ],
        cons: ['More complex interface', 'Less personal support']
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-16 relative">
          {/* Educational Brokerage Overview Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Choose Your Investment Path
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                We've made investing simple with two clear options to get started
              </p>
              <button
                onClick={() => setShowBrokerageInfo(!showBrokerageInfo)}
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <Info className="w-5 h-5" />
                <span>Learn about different brokerage options</span>
              </button>
            </div>

            {showBrokerageInfo && (
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Understanding Your Brokerage Options
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {brokerageTypes.map((broker, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <h4 className="text-xl font-semibold text-gray-800 mb-3">
                        {broker.type}
                      </h4>
                      <p className="text-gray-600 mb-4">{broker.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mt-1 mr-2" />
                          <div>
                            <span className="font-medium">Pros:</span>
                            <ul className="list-disc list-inside ml-4">
                              {broker.pros.map((pro, i) => (
                                <li key={i} className="text-gray-600">
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-orange-500 mt-1 mr-2" />
                          <div>
                            <span className="font-medium">Cons:</span>
                            <ul className="list-disc list-inside ml-4">
                              {broker.cons.map((con, i) => (
                                <li key={i} className="text-gray-600">
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <a
                    href="/articles/brokerage-platforms"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  >
                    Read our detailed brokerage comparison guide
                    <LucideExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Investment Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Trading 212 Card */}
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        Trading 212
                      </h3>
                      <span className="text-green-600 font-medium">
                        Quickest Option
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold">
                    Pre-built Portfolio
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Three Simple Steps:
                    </h4>
                    <div className="space-y-4">
                      {[
                        {
                          title: 'Click the portfolio link below',
                          description:
                            'Opens Trading 212 with your selected portfolio'
                        },
                        {
                          title: 'Add funds to your account',
                          description:
                            'Secure deposit via bank transfer or card'
                        },
                        {
                          title: "Click 'Invest' - Done!",
                          description: 'Your portfolio is automatically created'
                        }
                      ].map((step, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                            <span className="text-blue-600 font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{step.title}</p>
                            <p className="text-sm text-gray-600">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50">
                    <div className="text-sm text-gray-600 mb-2">
                      Your Selected Risk Level
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-gray-800">
                        Level {riskLevel}
                      </div>
                      <div className="text-sm">
                        {riskLevel <= 3
                          ? 'Conservative'
                          : riskLevel <= 7
                          ? 'Balanced'
                          : 'Aggressive'}
                      </div>
                    </div>
                  </div>

                  <a
                    href={trading212Links[riskLevel]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                  >
                    Open Your Portfolio
                    <LucideExternalLink className="inline-block ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Alternative Brokers Card */}
            <div className="rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <BarChart2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        Alternative Brokers
                      </h3>
                      <span className="text-purple-600 font-medium">
                        More Flexibility
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-purple-100 text-purple-600 font-semibold">
                    Manual Setup
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Follow These Steps:
                    </h4>
                    <div className="space-y-4">
                      {[
                        {
                          title: 'Choose Your Broker',
                          description:
                            'Compare fees, features, and minimum deposits',
                          link: {
                            text: 'View broker comparison',
                            url: '/articles/brokerage-platforms'
                          }
                        },
                        {
                          title: 'Open & Fund Account',
                          description: 'Complete verification and add funds',
                          tip: 'Most brokers require ID verification – have your documents ready'
                        },
                        {
                          title: 'Find & Buy Assets',
                          description:
                            'Search for each asset using the ticker symbols',
                          action: {
                            text: 'View your asset list',
                            onClick: () => setStep(2)
                          }
                        },
                        {
                          title: 'Set Up Regular Investing',
                          description:
                            'Optional: Configure automatic monthly investments',
                          tip: 'TIP: Investing smaller amounts regularly (e.g., via direct debit) can help smooth out market fluctuations and may yield better returns over time.'
                        }
                      ].map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-4 mt-1">
                            <span className="text-purple-600 font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{step.title}</p>
                            <p className="text-sm text-gray-600">
                              {step.description}
                            </p>
                            {step.link && (
                              <a
                                href={step.link.url}
                                className="text-sm text-purple-600 hover:text-purple-700 inline-flex items-center mt-1"
                              >
                                {step.link.text}
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </a>
                            )}
                            {step.tip && (
                              <div className="mt-2 p-3 bg-yellow-50 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                  <strong>Note:</strong> {step.tip}
                                </p>
                              </div>
                            )}
                            {step.action && (
                              <button
                                onClick={step.action.onClick}
                                className="text-sm text-purple-600 hover:text-purple-700 inline-flex items-center mt-1"
                              >
                                {step.action.text}
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex items-start">
                      <HelpCircle className="w-5 h-5 text-purple-600 mt-1 mr-3" />
                      <div className="text-sm text-purple-800">
                        Need help choosing a broker? Read our detailed{' '}
                        <a
                          href="/articles/brokerage-comparison"
                          className="underline hover:text-purple-900"
                        >
                          broker comparison guide
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center">
            <button
              onClick={() => setStep(2)}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-200"
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
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
            Invest in Public Markets
          </h1>
          <p className="text-center text-lg sm:text-xl max-w-2xl mx-auto text-gray-700 mb-8">
            Leverage our cutting-edge asset allocator and comprehensive strategies
            to take advantage of global public markets—tailored to your risk profile.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-3xl mx-auto mb-12">
            <a href="/risk-quiz" className="group flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto">
              <Shield className="w-6 h-6 text-blue-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Take the Risk Quiz</h3>
                <p className="text-sm text-gray-600">Discover your investor profile</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </a>
            
            <a href="/assets" className="group flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto">
              <LineChart className="w-6 h-6 text-blue-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Explore Assets</h3>
                <p className="text-sm text-gray-600">Learn about investment options</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </a>
          </div>

      

      <div className="max-w-7xl mx-auto p-8 space-y-12">
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
