import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  ChartPie,
  Wallet,
  ArrowRight,
  ExternalLink,
  RefreshCcw,
  DollarSign,
  Activity,
  Lock,
  Info,
  Globe,
  BarChart3,
  AlertCircle,
  CheckCircle,
  BarChart2,
  TrendingDown,
  ListChecks,
  
} from 'lucide-react';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { logAnalyticsEvent } from './analytics';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

function AlertDescription({ severity, message, description }) {
  return (
    <Alert severity={severity}>
      <div className="flex items-center space-x-2">
        {severity === 'success' ? (
          <CheckCircle className="h-4 w-4 text-primary-green" />
        ) : (
          <AlertCircle className="h-4 w-4 text-deep-teal" />
        )}
        <div>
          <strong>{message}</strong>
          <br />
          <span className="text-sm text-sage">{description}</span>
        </div>
      </div>
    </Alert>
  );
}

const EnhancedTransparencyDashboard = () => {
  const navigate = useNavigate();

  // ----- Shared States across steps -----
  const [riskLevel, setRiskLevel] = useState(5);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  // ----- Multi-Step Layout States -----
  const [activeStep, setActiveStep] = useState(0); // Moved above useEffect

  // ----- Reference to Main Content -----
  const mainContentRef = useRef(null);
  // Sample portfolio allocation data
  const portfolioData = [
    { name: 'Global ETFs', value: 40 },
    { name: 'Sukuk Funds', value: 30 },
    { name: 'Real Estate', value: 20 },
    { name: 'Tech Funds', value: 10 },
  ];
  const COLORS = ['#066b06', '#c49b3c', '#2A9D8F', '#264653'];
  // ----- Scroll to top of main content on mobile when activeStep changes -----
  useEffect(() => {
    if (window.innerWidth < 768 && mainContentRef.current) {
      mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeStep]); // activeStep is now defined before this useEffect

  // ----- Subscription Form Submission -----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Log the button click event
      await logAnalyticsEvent('button_click', 'subscribe_button');

      // Send subscription request
      const response = await fetch(
        'https://safinabackend.azurewebsites.net/api/subscribe',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Subscription failed');
      }

      // Log the successful subscription event
      await logAnalyticsEvent(
        'successful_subscription',
        'subscribe_button',
        `Email: ${email}`
      );

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  // ----- Generate stock-like data for the graph (used in Step 1) -----
  const generateStockData = () => {
    const data = [];
    const numPoints = 20;
    let maxOverallValue = 0;
    let prevValues = Array(10).fill(100);

    for (let i = 0; i <= numPoints; i++) {
      const point = { year: i };
      for (let risk = 1; risk <= 10; risk++) {
        const meanReturn = 0.02 + risk * 0.005;
        const volatility = 0.01 + risk * 0.01;
        const randomShock = (Math.random() - 0.5) * 2 * volatility;

        // Ensure the value doesn't drop below 90% of its previous value
        prevValues[risk - 1] = Math.max(
          prevValues[risk - 1] * (1 + meanReturn + randomShock),
          prevValues[risk - 1] * 0.9
        );

        point[`risk${risk}`] = prevValues[risk - 1];
        if (prevValues[risk - 1] > maxOverallValue) {
          maxOverallValue = prevValues[risk - 1];
        }
      }
      data.push(point);
    }

    return data;
  };

  // ----- Memoized Stock Data -----
  const stockData = useMemo(() => generateStockData(), []);

  // ----- Sample portfolio data (used in Step 2) -----
  

  // ----- Steps Configuration -----
  const steps = [
    {
      id: 'risk-profile',
      title: 'Risk Profile',
      icon: <Shield className="w-5 h-5" />,
      shortDescription:
        'Figure out how much risk you want to take on—higher risk may yield higher returns, but also bigger potential losses.',
      content: (
        <>
          {/* ================= STEP 1: RISK ASSESSMENT SECTION ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-16"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-medium">
                Discover Your Risk Profile
              </h2>
              <p className="text-dark-green md:text-xl text-deep-teal max-w-2xl">
                Understanding your risk tolerance is crucial for successful
                investing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                <motion.div
                  className="bg-deep-brown/5 rounded-xl p-6 md:p-8 backdrop-blur hidden md:block"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg md:text-xl font-medium mb-6">
                    Visualise Different Risk Levels
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={riskLevel}
                      onChange={(e) => setRiskLevel(parseInt(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-primary-green to-gold rounded-full"
                    />
                    <div className="flex justify-between text-xs md:text-sm text-primary-green">
                      <span>Conservative</span>
                      <span>Moderate</span>
                      <span>Aggressive</span>
                    </div>
                    <div className="mt-4 p-4 bg-primary-green/20 rounded-lg">
                      <p className="text-sm text-primary-green">
                        Risk Level {riskLevel}:{' '}
                        {riskLevel <= 3
                          ? 'Conservative - Lower risk, stable returns'
                          : riskLevel <= 7
                          ? 'Moderate - Balanced risk and return'
                          : 'Aggressive - Higher risk, potential for higher returns'}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  onClick={() => navigate('/assets')}
                  className="w-full text-left bg-deep-brown/5 rounded-xl p-6 md:p-8 backdrop-blur hover:bg-deep-brown/10 transition-colors focus:outline-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start space-x-4">
                    <Shield className="w-6 h-6 text-primary-green flex-shrink-0" />
                    <div>
                      <h3 className="text-lg md:text-xl font-medium mb-2">
                        Take Our Full Risk Assessment
                      </h3>
                      <p className="text-primary-green mb-4 text-sm">
                        Get a comprehensive analysis of your risk tolerance
                        through our expert-designed questionnaire.
                      </p>
                      <span className="text-dark-green flex items-center text-sm">
                        Start Assessment <ArrowRight className="ml-2 w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.button>

                <motion.div
                  onClick={() =>
                    navigate('/articles/understanding-investing-risk')
                  }
                  className="block bg-deep-brown/5 rounded-xl p-6 md:p-8 backdrop-blur hover:bg-deep-brown/10 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <Info className="w-6 h-6 text-gold flex-shrink-0" />
                    <div>
                      <h3 className="text-lg md:text-xl font-medium mb-2">
                        Understanding Investment Risk
                      </h3>
                      <p className="text-primary-green mb-4 text-sm">
                        Learn about the factors that influence investment risk
                        and return.
                      </p>
                      <span className="text-gold hover:text-dark-green flex items-center text-sm md:text-dark-green">
                        Read Article <ExternalLink className="ml-2 w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Risk-Return Visualization (desktop-only) */}
              <div className="bg-deep-brown/5 rounded-xl p-6 md:p-8 backdrop-blur hidden md:block">
                <h3 className="text-lg md:text-xl font-medium mb-6">
                  Risk-Return Profiles
                </h3>
                <div className="bg-light-gold/70 rounded-lg p-4 mb-8">
                  <StockLineChart stockData={stockData} riskLevel={riskLevel} />
                </div>

                <div className="text-xs text-deep-teal italic">
                  For illustrative purposes only. Past performance is not
                  indicative of future results. The graph above is a simplified
                  visualization of potential risk-return relationships. Actual
                  investment outcomes may vary significantly based on market
                  conditions, economic factors, and other variables.
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ),
    },
    {
      id: 'asset-strategy',
      title: 'Asset Allocation',
      icon: <ChartPie className="w-5 h-5" />,
      shortDescription:
        'Input that risk level into our allocation tool to generate your personalized multi-asset portfolio.',
      content: (
        <>
          {/* ================= STEP 2: ASSET STRATEGY SECTION ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-16"
          >
            <div className="mb-8 space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-3xl md:text-4xl font-medium">
                  Access Our Multi Asset Portfolios
                </h2>
                <div className="relative">
                  <Info
                    className="w-5 h-5 text-deep-teal cursor-pointer"
                    onClick={() => setShowInfo(!showInfo)}
                  />
                  {showInfo && (
                    <div
                      className="absolute z-10 bg-white shadow-lg rounded-md p-3 w-64 -left-32 mt-2"
                      onClick={() => setShowInfo(false)}
                    >
                      <p className="text-sm text-gray-700">
                        Multi-asset portfolios combine different asset classes
                        to optimize returns while reducing risk. The world’s
                        largest funds use this strategy to achieve consistent
                        performance.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <p className="text-dark-green md:text-xl text-deep-teal max-w-2xl">
                  Build customised Shariah-compliant portfolios using our asset
                  allocation tool, powered by over 10 years of ETF market data.
                </p>
                <button
                  onClick={() =>
                    navigate('/articles/multi-asset-portfolios-explained')
                  }
                  className="bg-deep-teal text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors whitespace-nowrap"
                >
                  Learn More
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Methodology Section */}
      <motion.div
        className="bg-deep-brown/5 rounded-xl p-6 md:p-8 backdrop-blur hidden md:block"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <RefreshCcw className="w-6 h-6 text-primary-green" />
          <h3 className="text-lg md:text-xl font-medium">Our Methodology</h3>
        </div>
        <p className="text-dark-green mb-8 text-sm md:text-base">
          Our research-backed approach combines sophisticated multi-asset portfolios with dynamic allocation strategies to optimize your investment outcomes.
        </p>

        <div className="space-y-6">
          {/* Existing Methodology Boxes */}
          {/* Risk Management */}
          <div className="p-4 bg-primary-green/10 rounded-lg">
            <h4 className="flex items-center text-sm md:text-base font-medium mb-2 text-dark-green">
              <Shield className="w-4 h-4 mr-2 text-primary-green" />
              Risk Management
            </h4>
            <p className="text-xs md:text-sm text-dark-teal">
              Advanced diversification strategies across asset classes, regions, and sectors to reduce volatility while maintaining growth potential.
            </p>
          </div>

          {/* Global Diversification */}
          <div className="p-4 bg-primary-green/10 rounded-lg">
            <h4 className="flex items-center text-sm md:text-base font-medium mb-2 text-dark-green">
              <Globe className="w-4 h-4 mr-2 text-primary-green" />
              Global Diversification
            </h4>
            <p className="text-xs md:text-sm text-dark-teal">
              Strategic exposure to worldwide markets, optimizing geographical allocation based on market conditions and opportunities.
            </p>
          </div>

          {/* Active Rebalancing */}
          <div className="p-4 bg-primary-green/10 rounded-lg">
            <h4 className="flex items-center text-sm md:text-base font-medium mb-2 text-dark-green">
              <BarChart3 className="w-4 h-4 mr-2 text-primary-green" />
              Active Rebalancing
            </h4>
            <p className="text-xs md:text-sm text-dark-teal">
              Regular portfolio adjustments to maintain optimal risk levels and capitalize on market opportunities.
            </p>
          </div>
        </div>

        {/* New Methodology Points */}
        <div className="mt-8 space-y-6">
          <h4 className="text-lg md:text-xl font-semibold text-dark-green">Additional Features</h4>
          <div className="space-y-4">
            {/* Over 10 Risk Levels */}
            <div className="flex items-start space-x-4">
              <ListChecks className="w-5 h-5 text-primary-green mt-1" />
              <div>
                <h5 className="text-sm md:text-base font-medium text-dark-green">Over 10 Risk Levels to Choose From</h5>
                <p className="text-xs md:text-sm text-dark-teal">
                  Tailor your investment strategy with a variety of risk levels to match your comfort and financial goals.
                </p>
              </div>
            </div>



            {/* ETF Breakdown */}
            <div className="flex items-start space-x-4">
              <ChartPie className="w-5 h-5 text-primary-green mt-1" />
              <div>
                <h5 className="text-sm md:text-base font-medium text-dark-green">
                  ETF Breakdown
                </h5>
                <p className="text-xs md:text-sm text-dark-teal">
                  View detailed information on our ETF investments, including returns and descriptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Portfolio Allocation & Investment Strategy Section */}
      <motion.div
        className="bg-deep-brown/5 rounded-xl p-6 md:p-8 backdrop-blur flex flex-col"
        whileHover={{ scale: 1.01 }}
      >
        <div className="text-center mb-2 text-xs text-deep-brown">
          For illustrative purposes only
        </div>

        <div className="flex flex-col space-y-6">
          {/* Portfolio Allocation */}
          <div className="bg-white/60 rounded-xl p-4 sm:p-6 border border-primary-green/20">
            <h3 className="text-base sm:text-lg lg:text-xl font-medium text-deep-brown mb-4">
              Portfolio Allocation
            </h3>
            <div className="h-48 sm:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {portfolioData.map((item, index) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-xs sm:text-sm text-deep-brown/80">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Strategy */}
          <div className="bg-white/60 rounded-xl p-4 sm:p-6 border border-primary-green/20">
            <h3 className="text-base sm:text-lg lg:text-xl font-medium text-deep-brown mb-4">
              Investment Strategy
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
              {[
                {
                  label: 'Portfolio Performance',
                  value: '+8.2%',
                  icon: <BarChart2 className="w-4 h-4" />,
                },
                {
                  label: 'Max Drawdown',
                  value: '-15.4%',
                  trend: 'down',
                  icon: <TrendingDown className="w-4 h-4" />,
                  description: 'Maximum observed loss from peak to trough',
                },
                {
                  label: 'Volatility',
                  value: '9.2%',
                  trend: 'neutral',
                  icon: <BarChart2 className="w-4 h-4" />,
                  description: 'Moderate price fluctuations indicating balanced risk',
                },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between p-3 bg-white/40 rounded-lg"
                >
                  <div className="flex items-center space-x-2 text-deep-brown/80">
                    {metric.icon}
                    <span className="text-xs sm:text-sm">{metric.label}</span>
                  </div>
                  <span className="font-medium text-primary-green text-sm sm:text-base">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Access Portfolio Allocation Tool */}
        <motion.div
          onClick={() => navigate('/allocation')}
          className="mt-8 w-full bg-olive-green hover:bg-dark-green text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <span className="font-medium text-sm md:text-base">
            Access Portfolio Allocation Tool
          </span>
          <ChartPie className="w-5 h-5" />
        </motion.div>

        <div className="mt-4 text-xs text-primary-green text-center">
          Get your personalized asset allocation strategy in minutes
        </div>
      </motion.div>
    </div>
    </motion.div>
        </>
      ),
    },
    {
      id: 'invest-relax',
      title: 'Invest & Relax',
      icon: <Wallet className="w-5 h-5" />,
      shortDescription:
        'Invest with a single click through Trading 212 or use any broker you prefer, and remember to invest through tax-efficient accounts like ISAs.',
      content: (
        <>
          {/* ================= STEP 3: INVEST & RELAX SECTION ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-16"
          >
            <div className="mb-8 space-y-2">
              <h2 className="text-3xl md:text-4xl font-medium">Invest & Relax</h2>
              <p className="text-dark-green md:text-xl text-dark-green max-w-2xl">
                Start your investment journey with just a few clicks and stay
                informed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <motion.div
                className="bg-deep-brown/5 p-6 md:p-8 rounded-xl backdrop-blur"
                whileHover={{ scale: 1.02 }}
              >
                <Lock className="w-8 h-8 text-primary-green mb-4" />
                <h3 className="text-lg md:text-xl font-medium mb-4">
                  1-Click Investing
                </h3>
                <p className="text-primary-green text-sm">
                  Seamless integration with Trading 212 for instant portfolio
                  implementation.
                </p>
                <span className="block mt-2 text-sm italic text-gold">
                  TIP: Open a stocks and shares ISA for tax free investments
                </span>
                <button
                  onClick={() => navigate('/articles/understanding-isas')}
                  className="mt-6 px-6 py-3 bg-olive-green rounded-lg hover:bg-primary-green transition-colors text-sm md:text-light-background"
                >
                  Learn more about ISA&apos;s
                </button>
              </motion.div>

              <motion.div
                className="bg-deep-brown/5 p-6 md:p-8 rounded-xl backdrop-blur hidden md:block"
                whileHover={{ scale: 1.02 }}
              >
                <DollarSign className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-lg md:text-xl font-medium mb-4">
                  Low Minimum
                </h3>
                <p className="text-primary-green text-sm">
                  Start with just $20 and build your portfolio gradually.
                  <span className="block mt-2 text-sm italic text-gold">
                    TIP: Investing smaller amounts regularly (e.g., via direct
                    debit) can help smooth out market fluctuations and may yield
                    better returns over time.
                  </span>
                </p>
              </motion.div>

              <motion.div
                className="bg-deep-brown/5 p-6 md:p-8 rounded-xl backdrop-blur hidden md:block"
                whileHover={{ scale: 1.02 }}
              >
                <Activity className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-lg md:text-xl font-medium mb-4">
                  Real-Time Monitoring
                </h3>
                <p className="text-primary-green text-sm">
                  Track your portfolio performance with live updates.
                </p>
                <h3 className="text-lg md:text-xl font-medium mb-4 pt-2">
                  Alternative Brokers
                </h3>
                <p className="text-primary-green mb-6 text-sm">
                  Prefer a different broker? We support multiple platforms for
                  your convenience.
                </p>
                <div
                  onClick={() => navigate('/articles/uk-brokerage-platforms')}
                  className="text-olive-green hover:text-primary-green inline-flex items-center text-sm md:text-dark-green cursor-pointer"
                >
                  View Supported Brokers <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="bg-deep-brown/5 p-6 md:p-8 rounded-xl backdrop-blur"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg md:text-xl font-medium mb-4">
                  Disclaimer
                </h3>
                <p className="text-primary-green mb-6 text-sm">
                  Investing involves risks, including the potential loss of all
                  your invested capital. Safina Invest provides tools and
                  information to support your decision-making, but we do not
                  offer financial advice. All investment decisions are solely
                  your responsibility, and Safina Invest is not liable for any
                  losses incurred as a result of your choices. Always consult a
                  financial advisor if you are unsure about the suitability of
                  an investment.
                </p>
              </motion.div>

              <div className="space-y-4">
                <motion.div
                  className="bg-deep-brown/5 p-6 md:p-8 rounded-xl backdrop-blur"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg md:text-xl font-medium mb-4">
                    Stay Updated
                  </h3>
                  <p className="text-primary-green mb-6 text-sm">
                    Get personalized insights and market updates delivered to
                    your inbox.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 bg-light-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green text-sm md:text-dark-green text-deep-teal"
                      disabled={status === 'loading'}
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 bg-olive-green rounded-lg hover:bg-primary-green transition-colors text-sm md:text-light-background disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </form>
                </motion.div>

                {status === 'success' && (
                  <AlertDescription
                    severity="success"
                    message="Success!"
                    description="Thanks for subscribing! Check your email for confirmation."
                  />
                )}

                {status === 'error' && (
                  <AlertDescription
                    severity="error"
                    message="Error!"
                    description={
                      errorMessage || 'Failed to subscribe. Please try again.'
                    }
                  />
                )}
              </div>
            </div>
          </motion.div>
        </>
      ),
    },
  ];

  // ----- Handle Next Step -----
  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
      // Scrolling is handled in useEffect
    }
  };

  return (
    <div className="bg-light-gold text-deep-teal min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-10">
        {/* =============== SIDEBAR =============== */}
        <div className="lg:w-1/4 space-y-6">
          <div className="flex items-center space-x-3 text-primary-green">
            <ChartPie className="w-8 h-8" />
            <h2 className="text-3xl font-semibold text-deep-brown">
              Your Investment Journey
            </h2>
          </div>

          <div className="relative mt-8">
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-sage/50 z-0" />
            <motion.div
              className="absolute top-0 left-0 w-1 bg-primary-green z-0"
              style={{
                height: `${((activeStep + 1) / steps.length) * 100}%`,
              }}
              layout
              transition={{ duration: 0.4 }}
            />
            <nav className="space-y-2 pl-4 relative z-10">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <div key={step.id}>
                    <button
                      onClick={() => {
                        setActiveStep(index);
                        // Scrolling is handled in useEffect
                      }}
                      className={`flex items-center space-x-3 p-4 rounded-xl transition-colors w-full text-left ${
                        isActive
                          ? 'bg-primary-green/20 text-primary-green'
                          : 'hover:bg-primary-green/10 text-deep-brown/70'
                      }`}
                    >
                      {step.icon}
                      <span className="font-medium">
                        Step {index + 1}: {step.title}
                      </span>
                    </button>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden px-4 pb-2 text-sm text-deep-brown"
                      >
                        {step.shortDescription}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="bg-white/60 rounded-xl p-6 border border-primary-green/20">
            <GraduationCapIcon />
            <h3 className="text-lg font-medium text-deep-brown mb-2">
              Why Transparency Matters
            </h3>
            <p className="text-sm text-deep-brown/80">
              Understanding where your money goes is crucial for making informed
              investment decisions. We provide complete visibility into every
              aspect of your portfolio.
            </p>
          </div>
        </div>

        {/* =============== MAIN CONTENT =============== */}
        <div className="lg:w-3/4" ref={mainContentRef}>
          {steps[activeStep].content}
          {activeStep < steps.length - 1 && (
            <div className="mt-10">
              <button
                onClick={handleNextStep}
                className="inline-flex items-center bg-primary-green text-white px-6 py-3 rounded-md hover:bg-primary-green/90 transition-colors"
              >
                Next Step <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============= Chart Sub-Component for Step 1 =============
const StockLineChart = ({ stockData, riskLevel }) => {
  return (
    <div className="h-64 sm:h-80 md:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={stockData}
          margin={{ top: 20, right: 20, bottom: 35, left: 20 }}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((risk) => (
            <Line
              key={risk}
              type="monotone"
              dataKey={`risk${risk}`}
              stroke={risk === riskLevel ? '#066b06' : '#0a4c4c'}
              strokeWidth={risk === riskLevel ? 3 : 1}
              dot={false}
              opacity={risk === riskLevel ? 1 : 0.3}
            />
          ))}
          <XAxis
            dataKey="year"
            stroke="#044d04"
            tick={false}
            label={{
              value: 'Time',
              position: 'bottom',
              offset: 20,
              fill: '#044d04',
            }}
          />
          <YAxis
            stroke="#044d04"
            tick={false}
            label={{
              value: 'Growth',
              angle: -90,
              position: 'left',
              offset: 0,
              fill: '#044d04',
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// ============= Mock GraduationCap Icon =============
function GraduationCapIcon() {
  return (
    <svg
      className="w-6 h-6 text-primary-green mb-3"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M21.48 8.65l-8.98-3.99a2 2 0 00-1.57 0L1.96 8.65A1 1 0 001 9.57v.06c0 .37.2.71.52.89l2.94 1.67v3.51a2 2 0 001.04 1.76l4.94 2.63a2 2 0 001.85 0l4.94-2.63a2 2 0 001.04-1.76v-3.51l2.94-1.67a1 1 0 00.52-.89v-.06a1 1 0 00-.52-.92zM12 19l-4-2.13v-2.59l3.48 1.55a2 2 0 001.04.23 2 2 0 001.05-.23L17 14.28v2.59L12 19zm0-5.18L3.2 9.5l8.8-3.9 8.8 3.9-8.8 4.32z" />
    </svg>
  );
}

export default EnhancedTransparencyDashboard;
