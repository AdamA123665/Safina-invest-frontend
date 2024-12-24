import React, { useState, useEffect, useMemo } from 'react';
import { motion, } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
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
  Globe, BarChart3
} from 'lucide-react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import Alert from '@mui/material/Alert';
function AlertDescription({ severity, message, description }) {
    return (
      <Alert severity={severity}>
        <div>
          <strong>{message}</strong>
          <br />
          <span style={{ fontSize: 'smaller', color: 'gray' }}>{description}</span>
        </div>
      </Alert>
    );
  }
const CompleteInvestmentJourney = ({ parentRef }) => {
const [showProgressBar, setShowProgressBar] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [riskLevel, setRiskLevel] = useState(5);
  const [email, setEmail] = useState('');
   // Generate stock-like data for the graph
   const generateStockData = () => {
    const data = [];
    const numPoints = 20; // Number of data points
    let maxOverallValue = 0; // To normalize y-values later

    // First, generate base data for all risk levels
    let prevValues = Array(10).fill(100); // Start all lines at 100

    for (let i = 0; i <= numPoints; i++) {
      const point = { year: i };
      
      for (let risk = 1; risk <= 10; risk++) {
        const meanReturn = 0.02 + risk * 0.005; // Higher risk = higher potential return
        const volatility = 0.01 + risk * 0.01; // Higher risk = higher volatility
        const randomShock = (Math.random() - 0.5) * 2 * volatility;
        
        // Update the value with some constraints to prevent unrealistic movements
        prevValues[risk - 1] = Math.max(
          prevValues[risk - 1] * (1 + meanReturn + randomShock),
          prevValues[risk - 1] * 0.9 // Prevent too much downside
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

  // Memoize the stock data so it doesn't regenerate on every render
  const stockData = useMemo(() => generateStockData(), []);

  // Custom tooltip content
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
          <p className="text-gray-400 mb-2">Year {label}</p>
          {payload.map((entry, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between space-x-4 ${
                entry.name === `risk${riskLevel}` ? 'text-blue-400 font-semibold' : 'text-gray-400'
              }`}
            >
              <span>Risk {entry.name.replace('risk', '')}</span>
              <span>{entry.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Generate risk-adjusted return 
  const portfolioData = [
    { asset: 'Stocks', percentage: 60 },
    { asset: 'Bonds', percentage: 10 },
    { asset: 'Alternatives', percentage: 30 }
  ];
  // Portfolio evolution data

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('https://safinabackend.azurewebsites.net/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Subscription failed');
      }

      setStatus('success');
      setEmail(''); // Clear input on success
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message);
    }
};

  const sections = [
    { 
      id: 'risk', 
      title: 'Risk Profile', 
      icon: Shield,
      step: 1,
    },
    { 
      id: 'allocation', 
      title: 'Asset Strategy', 
      icon: ChartPie,
      step: 2,
    },
    { 
      id: 'invest', 
      title: 'Invest & Relax', 
      icon: Wallet,
      step: 3,
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!parentRef?.current) return;

      const howContainer = parentRef.current;
      const howRect = howContainer.getBoundingClientRect();
      
      // More precise containment check - only show when the How section is actively being viewed
      const isWithinHow = 
        howRect.top < window.innerHeight && 
        howRect.bottom > 0;
 // Hide when we've scrolled past the section
      
      setShowProgressBar(isWithinHow);

      // Only update active section if we're within the How section
      if (isWithinHow) {
        const sections = howContainer.querySelectorAll('section');
        sections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 && 
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveSection(index);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parentRef]);

  return (
    <div className="relative bg-slate-950 text-white">
      {/* Progress Bar - Mobile */}
      {showProgressBar && (
        <div 
          className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur lg:hidden"
          style={{
            transform: showProgressBar ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.3s ease-in-out'
          }}
        >
          <div className="flex justify-between p-4 overflow-x-auto">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = activeSection >= index;
              return (
                <div key={section.id} className="flex-shrink-0 px-2">
                  <motion.div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center mb-2
                      transition-all duration-300
                      ${isActive ? 'bg-blue-500' : 'bg-gray-800'}
                    `}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.div>
                  <span className="text-xs whitespace-nowrap">{section.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Desktop Progress Bar - Now conditional */}
      {showProgressBar && (
        <div 
          className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-50"
          style={{
            opacity: showProgressBar ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <div className="relative space-y-16">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = activeSection >= index;
              const isLastSection = index === sections.length - 1;

              return (
                <div key={section.id} className="relative">
                  <div className="relative flex items-center space-x-4">
                    <motion.div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${isActive ? 'bg-blue-500' : 'bg-gray-800'}
                      `}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    
                    <motion.div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-blue-400">
                        Step {section.step}
                      </span>
                      <span className="text-sm font-medium">{section.title}</span>
                    </motion.div>
                  </div>

                  {!isLastSection && (
                    <div className="absolute left-5 top-12 w-px h-12 -translate-x-1/2">
                      <motion.div
                        className="w-full bg-gradient-to-b from-blue-500 to-transparent"
                        style={{
                          height: isActive ? '100%' : '0%',
                          transition: 'height 0.5s ease-out'
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        )}

      {/* Main Content */}
      <div className="pl-48">
        {/* Risk Assessment Section */}
        <section className="min-h-screen py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto space-y-16"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">Discover Your Risk Profile</h2>
              <p className="text-xl text-gray-300 max-w-2xl">
                Understanding your risk tolerance is crucial for successful investing.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-8">
                {/* Risk Slider */}
          <motion.div
            className="bg-white/5 rounded-xl p-8 backdrop-blur"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-6">Quick Risk Assessment</h3>
            <div className="space-y-4">
              <input
                type="range"
                min="1"
                max="10"
                value={riskLevel}
                onChange={(e) => setRiskLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>Conservative</span>
                <span>Moderate</span>
                <span>Aggressive</span>
              </div>
              <div className="mt-4 p-4 bg-blue-500/10 rounded-lg">
                <p className="text-sm text-blue-300">
                  Risk Level {riskLevel}: {
                    riskLevel <= 3 ? 'Conservative - Lower risk, stable returns' :
                    riskLevel <= 7 ? 'Moderate - Balanced risk and return' :
                    'Aggressive - Higher risk, potential for higher returns'
                  }
                </p>
              </div>
            </div>
          </motion.div>

                {/* Risk Quiz Link */}
                <motion.a
                  href="/risk-quiz"
                  className="block bg-white/5 rounded-xl p-8 backdrop-blur hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <Shield className="w-6 h-6 text-blue-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Take Our Full Risk Assessment</h3>
                      <p className="text-gray-300 mb-4">
                        Get a comprehensive analysis of your risk tolerance through our expert-designed questionnaire.
                      </p>
                      <span className="text-blue-400 hover:text-blue-300 flex items-center">
                        Start Assessment <ArrowRight className="ml-2 w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.a>

                {/* Educational Resource */}
                <motion.a
                  href="/learn/risk"
                  className="block bg-white/5 rounded-xl p-8 backdrop-blur hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <Info className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Understanding Investment Risk</h3>
                      <p className="text-gray-300 mb-4">
                        Learn about the factors that influence investment risk and return.
                      </p>
                      <span className="text-purple-400 hover:text-purple-300 flex items-center">
                        Read Article <ExternalLink className="ml-2 w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.a>
              </div>

             {/* Risk-Return Visualization */}
{/* Risk-Return Visualization */}
<div className="bg-white/5 rounded-xl p-8 backdrop-blur">
  <h3 className="text-xl font-semibold mb-6">Risk-Return Profiles</h3>
  {/* Separate container for chart with its own background */}
  <div className="bg-white/5 rounded-lg p-4 mb-8">
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={stockData} margin={{ top: 20, right: 20, bottom: 35, left: 20 }}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((risk) => (
            <Line
              key={risk}
              type="monotone"
              dataKey={`risk${risk}`}
              stroke={risk === riskLevel ? '#3B82F6' : '#4B5563'}
              strokeWidth={risk === riskLevel ? 3 : 1}
              dot={false}
              opacity={risk === riskLevel ? 1 : 0.3}
            />
          ))}
          <XAxis 
            dataKey="year" 
            stroke="#94A3B8"
            tick={false}
            label={{ 
              value: 'Time', 
              position: 'bottom',
              offset: 20,
              fill: '#94A3B8'
            }}
          />
          <YAxis 
            stroke="#94A3B8"
            tick={false}
            label={{
              value: 'Growth',
              angle: -90,
              position: 'left',
              offset: 0,
              fill: '#94A3B8'
            }}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Disclaimer without background */}
  <div className="text-xs text-gray-500 italic">
    For illustrative purposes only. Past performance is not indicative of future results. 
    The graph above is a simplified visualization of potential risk-return relationships. 
    Actual investment outcomes may vary significantly based on market conditions, 
    economic factors, and other variables.
  </div>
</div>
        </div>
          </motion.div>
        </section>

        <section className="min-h-screen py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6">Strategic Asset Allocation</h2>
          <p className="text-xl text-gray-300 max-w-2xl">
            Experience dynamic portfolio management that adapts to market conditions while maintaining your risk preferences.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12">
          {/* Left Column - Methodology */}
          <motion.div
            className="bg-white/5 rounded-xl p-8 backdrop-blur h-[600px]"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <RefreshCcw className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold">Our Methodology</h3>
            </div>
            <p className="text-gray-300 mb-8">
              Our research-backed approach combines sophisticated multi-asset portfolios with 
              dynamic allocation strategies to optimize your investment outcomes.
            </p>
            
            {/* Methodology Cards */}
            <div className="space-y-6">
              <div className="p-4 bg-blue-500/10 rounded-lg">
                <h4 className="text-base font-semibold mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-blue-400" />
                  Risk Management
                </h4>
                <p className="text-sm text-gray-400">
                  Advanced diversification strategies across asset classes, regions, and sectors
                  to reduce volatility while maintaining growth potential.
                </p>
              </div>
              
              <div className="p-4 bg-blue-500/10 rounded-lg">
                <h4 className="text-base font-semibold mb-2 flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-blue-400" />
                  Global Diversification
                </h4>
                <p className="text-sm text-gray-400">
                  Strategic exposure to worldwide markets, optimizing geographical allocation
                  based on market conditions and opportunities.
                </p>
              </div>
              
              <div className="p-4 bg-blue-500/10 rounded-lg">
                <h4 className="text-base font-semibold mb-2 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-blue-400" />
                  Active Rebalancing
                </h4>
                <p className="text-sm text-gray-400">
                  Regular portfolio adjustments to maintain optimal risk levels and capitalize
                  on market opportunities.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Allocation Tool */}
          <motion.div
            className="bg-white/5 rounded-xl p-8 backdrop-blur h-[600px] flex flex-col"
            whileHover={{ scale: 1.01 }}
          >
            <div className="text-center mb-2 text-xs text-gray-400">
              For illustrative purposes only
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <ChartPie className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold">Portfolio Allocation</h3>
            </div>
            
            {/* Dynamic Portfolio Balance */}
            <div className="space-y-6 flex-grow">
              {portfolioData.map(({ asset, percentage }) => (
                <div key={asset} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{asset}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              ))}

              <div className="mt-12 p-6 bg-blue-500/10 rounded-lg">
                <h4 className="font-semibold mb-2">About Our Portfolio Allocation Tool</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Access our algorithmic portfolio allocation tool to receive a personalized 
                  investment strategy based on your risk profile and financial goals.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <motion.a
              href="/allocation-tool"
              className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <span className="font-semibold">Access Portfolio Allocation Tool</span>
              <ChartPie className="w-5 h-5" />
            </motion.a>

            <div className="mt-4 text-xs text-gray-400 text-center">
              Get your personalized asset allocation strategy in minutes
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>

        {/* Invest & Relax Section */}
        <section className="min-h-screen py-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-6">Invest & Relax</h2>
              <p className="text-xl text-gray-300 max-w-2xl">
                Start your investment journey with just a few clicks and stay informed.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 mb-16">
              {/* Key Features */}
              <motion.div
                className="bg-white/5 p-8 rounded-xl backdrop-blur"
                whileHover={{ scale: 1.02 }}
              >
                <Lock className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-4">1-Click Investing</h3>
                <p className="text-gray-400">
                  Seamless integration with Trading 212 for instant portfolio implementation.
                </p>
                <button className="mt-6 px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
                  Connect Now
                </button>
              </motion.div>

              <motion.div
                className="bg-white/5 p-8 rounded-xl backdrop-blur"
                whileHover={{ scale: 1.02 }}
              >
                <DollarSign className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-4">Low Minimum</h3>
                <p className="text-gray-400">
                  Start with just $20 and build your portfolio gradually.
                </p>
                <a href="/learn-more" className="mt-6 text-blue-400 hover:text-blue-300 inline-flex items-center">
                  Learn More <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </motion.div>

              <motion.div
                className="bg-white/5 p-8 rounded-xl backdrop-blur"
                whileHover={{ scale: 1.02 }}
              >
                <Activity className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="text-xl font-semibold mb-4">Real-Time Monitoring</h3>
                <p className="text-gray-400">
                  Track your portfolio performance with live updates.
                </p>
              </motion.div>
            </div>

            {/* Additional Options */}
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                className="bg-white/5 p-8 rounded-xl backdrop-blur"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold mb-6">Alternative Brokers</h3>
                <p className="text-gray-400 mb-6">
                  Prefer a different broker? We support multiple platforms for your convenience.
                </p>
                <a href="/supported-brokers" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                  View Supported Brokers <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </motion.div>

              <div className="space-y-4">
      <motion.div
        className="bg-white/5 p-8 rounded-xl backdrop-blur"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-xl font-semibold mb-6">Stay Updated</h3>
        <p className="text-gray-400 mb-6">
          Get personalized insights and market updates delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={status === 'loading'}
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </motion.div>

      {status === 'success' && (
        <Alert variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Thanks for subscribing! Check your email for confirmation.
          </AlertDescription>
        </Alert>
      )}

      {status === 'error' && (
        <Alert variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {errorMessage || 'Failed to subscribe. Please try again.'}
          </AlertDescription>
        </Alert>
      )}
    </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default CompleteInvestmentJourney;