import React, { useState, useEffect, useRef, memo } from 'react';
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

// Reusable Slider Component
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
  <div className={`ml-2 text-sm text-yellow-700 ${className}`}>{children}</div>
);

// Reusable Tooltip for Risk Metrics
const MetricTooltip = ({ text }) => (
  <div className="absolute z-20 p-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
    {text}
  </div>
);

// Memoized Chart Components
const MemoizedAreaChart = memo(({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <XAxis
          dataKey="month"          // We'll rename the property to "month"
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
  );
});

const MemoizedPieChart = memo(({ data, colors }) => {
  return (
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
        >
          {data.map((entry, index) => (
            <Cell key={entry.ticker} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
});

const PortfolioJourney = () => {
  // -----------------------------
  // 1) States for controlling steps and form
  // -----------------------------
  const [step, setStep] = useState(1);
  const [riskLevel, setRiskLevel] = useState(5); // 1–10
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [expandedTicker, setExpandedTicker] = useState(null);
  const [activeMetric, setActiveMetric] = useState(null);
  const tooltipRef = useRef(null);

  // -----------------------------
  // 2) States for real data from the backend
  // -----------------------------
  const [portfolioData, setPortfolioData] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // We will transform 'portfolioData' into these local pieces (like in your old code):
  const [backtestedData, setBacktestedData] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [portfolioStats, setPortfolioStats] = useState({
    expectedReturn: 0,
    volatility: 0,
    maxDrawdown: 0,
    sharpeRatio: 0,
  });

  // Example color palette
  const COLORS = ['#4ADE80', '#86EFAC', '#FDE68A', '#FBBF24'];

  // -----------------------------
  // 3) The old code's API logic:
  // -----------------------------
  const fetchPortfolioData = async (investmentAmount, risk) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://safinabackend.azurewebsites.net/api/portfolio/optimize',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            initial_investment: Number(investmentAmount),
            risk_tolerance: risk,
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

  // -----------------------------
  // 4) Once we get 'portfolioData',
  //    parse it into the structures
  //    that the new UI expects
  // -----------------------------
  useEffect(() => {
    if (!portfolioData) return;

    // portfolioData example structure:
    // {
    //   portfolio_metrics: {
    //     Weights: {
    //       "VTI": 0.4, "VXUS":0.3, ...
    //     }
    //   },
    //   dashboard_data: {
    //     risk_metrics: {
    //       labels: ["Expected Return", "Volatility", ...],
    //       values: [0.125, 0.152, ...]
    //     },
    //     performance: {
    //       dates: ["2014-01-01", "2014-02-01", ...],
    //       series: [
    //         { name: "Portfolio", values: [1.0, 1.02, ...] },
    //         { name: "S&P 500",  values: [1.0, 1.01, ...] }
    //       ]
    //     },
    //     asset_info: [
    //       { name: "VTI", ticker: "VTI", info: "desc" },
    //       ...
    //     ]
    //   }
    // }

    // 4A) Build the "portfolioStats" object by matching labels to their values
    const { labels, values } = portfolioData.dashboard_data.risk_metrics;

    // We'll find indexes:
    const idxExpReturn = labels.indexOf('Expected Return');
    const idxVolatility = labels.indexOf('Volatility');
    const idxMaxDrawdown = labels.indexOf('Max Drawdown');
    const idxSharpeRatio = labels.indexOf('Sharpe Ratio');

    // If found, set them (times 100 if needed)
    const newPortfolioStats = {
      expectedReturn:
        idxExpReturn >= 0 ? values[idxExpReturn] * 100 : 0, // e.g. 0.125 => 12.5
      volatility:
        idxVolatility >= 0 ? values[idxVolatility] * 100 : 0, // e.g. 0.152 => 15.2
      maxDrawdown:
        idxMaxDrawdown >= 0 ? values[idxMaxDrawdown] * 100 : 0, // e.g. -0.254 => -25.4
      sharpeRatio: idxSharpeRatio >= 0 ? values[idxSharpeRatio] : 0,
    };
    setPortfolioStats(newPortfolioStats);

    // 4B) Build the "allocations" array that the new UI uses:
    //     Something like: [
    //       { ticker: 'VTI', name: 'VTI', allocation: 40, ytdReturn: 12.3, description: ... },
    //       ...
    //     ]
    // We can get the weighting from portfolio_metrics.Weights,
    // and the description, name, ticker from asset_info.
    const rawWeights = portfolioData.portfolio_metrics.Weights; // object
    const assetInfos = portfolioData.dashboard_data.asset_info; // array

    const newAllocations = Object.entries(rawWeights).map(
      ([assetName, weightPercent]) => {
        const found = assetInfos.find((ai) => ai.name === assetName) || {};
        // We'll do ytdReturn = placeholder or compute from performance, up to you
        // For now, let's do a quick approximate YTD from the "Portfolio" series if needed
        return {
          ticker: found.ticker || assetName,
          name: found.name || assetName,
          allocation: (weightPercent * 100).toFixed(2), // e.g. 0.4 => 40
          ytdReturn: null, // set later if we want to parse from performance data
          description: found.info || 'No description available',
        };
      }
    );
    setAllocations(newAllocations);

    // 4C) Build "backtestedData" for the <AreaChart/>
    // The new code expects monthly data like:
    //   [
    //     { month: '2020-01', value: 10500, percentageGain: ...},
    //     ...
    //   ]
    // We can read from dashboard_data.performance.
    // Suppose the "Portfolio" series is an array of growth factors vs. the start (1.0 => 10000 => 10k).
    const { dates, series } = portfolioData.dashboard_data.performance || {};
    const portfolioSeries = series?.find((s) => s.name === 'Portfolio');

    // We can assume the 1.0 => 10k baseline, so factor=1.0 => $10k, factor=1.1 => $11k
    if (dates && portfolioSeries?.values) {
      const firstFactor = portfolioSeries.values[0] || 1;
      const startValue = 10000; // or anything you like
      const newData = dates.map((d, i) => {
        const factor = portfolioSeries.values[i] || 1;
        const currentVal = startValue * (factor / firstFactor);
        const percentageGain = ((factor / firstFactor) - 1) * 100;
        return {
          month: d.slice(0, 7), // e.g. '2020-01'
          value: currentVal,    // e.g. $10,500
          percentageGain,
        };
      });
      setBacktestedData(newData);
    }
  }, [portfolioData]);

  // -----------------------------
  // 5) Form logic for Step 1
  // -----------------------------
  const handleAmountChange = (e) => {
    const value = e.target.value;
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

  // -----------------------------
  // 6) UI Renders
  // -----------------------------

  // Step indicator
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

  // Step 1 component
  const RiskInput = () => {
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
              step={1}
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-6">
          <label className="text-2xl font-semibold">Investment Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <Input
              type="number"
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
              // Call the REAL API, store results, THEN go to step 2 if successful
              fetchPortfolioData(amount, riskLevel).then(() => {
                // If no error, go to step 2
                if (!error) {
                  setStep(2);
                }
              });
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
        {isLoading && (
          <p className="text-blue-600 text-center font-medium">
            Generating your portfolio...
          </p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    );
  };

  // Step 2: We only show these components if portfolioData is available
  // 2A) "BacktestedPortfolio"
  const BacktestedPortfolio = () => {
    // We'll use 'backtestedData' from state
    // If there's not enough data, just handle gracefully
    if (!backtestedData.length) {
      return (
        <div className="relative p-6 mb-6 bg-white shadow-lg rounded-xl">
          <p className="text-gray-600">No backtested data yet.</p>
        </div>
      );
    }

    // Example: 10-year data
    // If your dataset is less or more, adjust as needed
    const tenYearData = backtestedData.slice(-120); // last 120 points
    if (!tenYearData.length) {
      return null;
    }

    const initialValue = tenYearData[0].value;
    const finalValue = tenYearData[tenYearData.length - 1].value;
    const years = 10; // assumption
    const compoundedReturn = ((finalValue / initialValue) ** (1 / years) - 1) * 100;

    return (
      <div className="relative p-6 mb-6 bg-white shadow-lg rounded-xl">
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
            dividends but does not account for taxes, fees, or market conditions.
          </AlertDescription>
        </Alert>
      </div>
    );
  };

  // 2B) "PortfolioStats"
  const PortfolioStats = () => {
    // We'll read from 'portfolioStats' that we computed in useEffect
    const metrics = [
      {
        id: 'expectedReturn',
        icon: TrendingUp,
        label: 'Expected Return',
        value: `${portfolioStats.expectedReturn.toFixed(2)}%`,
        description:
          'The anticipated percentage gain of your portfolio over a specified period.',
      },
      {
        id: 'volatility',
        icon: Percent,
        label: 'Volatility',
        value: `${portfolioStats.volatility.toFixed(2)}%`,
        description:
          'Measures the fluctuation in your portfolio’s value, indicating risk level.',
      },
      {
        id: 'maxDrawdown',
        icon: AlertTriangle,
        label: 'Max Drawdown',
        value: `${portfolioStats.maxDrawdown.toFixed(2)}%`,
        description:
          'The maximum observed loss from a peak to a trough of your portfolio.',
      },
      {
        id: 'sharpeRatio',
        icon: TrendingUp,
        label: 'Sharpe Ratio',
        value: portfolioStats.sharpeRatio.toFixed(2),
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

  // 2C) "AllocationsList"
  const AllocationsList = () => {
    return (
      <div className="space-y-4">
        {allocations.map((item, index) => (
          <div
            key={item.ticker}
            className="overflow-hidden bg-white shadow-lg rounded-xl"
          >
            <div className="p-0">
              <button
                onClick={() =>
                  setExpandedTicker(expandedTicker === item.ticker ? null : item.ticker)
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
                        {amount
                          ? `$${(
                              Number(amount) * (Number(item.allocation) / 100)
                            ).toLocaleString()}`
                          : '$0'}
                      </div>
                    </div>
                    <div className="text-right">
                      {/* If you compute YTD return from real data, show it here, else 0% */}
                      <div
                        className={`font-medium text-lg ${
                          item.ytdReturn && item.ytdReturn >= 0
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {item.ytdReturn ? item.ytdReturn : 0}%
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
  };

  // 2D) "PieChartVisualization"
  const PieChartVisualization = () => {
    // We transform "allocations" array (already has .allocation as %)
    if (!allocations.length) return null;
    const dataForPie = allocations.map((a) => ({
      ticker: a.ticker,
      allocation: Number(a.allocation),
    }));

    return (
      <div className="h-96 my-8 bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4">Asset Allocation</h3>
        <div className="w-full h-full">
          <MemoizedPieChart data={dataForPie} colors={COLORS} />
        </div>
      </div>
    );
  };

  // 2E) The “OptimizedPortfolio” wrapper
  const OptimizedPortfolio = () => {
    return (
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
  };

  // 3) Trading 212 links by risk level
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

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12 bg-gray-100 min-h-screen">
      <StepIndicator currentStep={step} totalSteps={3} />

      {step === 1 && <RiskInput />}

      {step === 2 && portfolioData && (
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

      {step === 3 && portfolioData && (
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
