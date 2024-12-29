import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
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
  CheckCircle
} from 'lucide-react';
import Alert from '@mui/material/Alert';

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

const CompleteInvestmentJourney = () => {
  const [showProgressBar, setShowProgressBar] = useState(false); 
  const [activeSection, setActiveSection] = useState(0);
  const [riskLevel, setRiskLevel] = useState(5);
  const [email, setEmail] = useState('');

  // Reference for the section to observe
  const sectionRef = useRef(null);

  // Generate stock-like data for the graph
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

  const stockData = useMemo(() => generateStockData(), []);

  // Custom tooltip content
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-deep-teal p-4 rounded-lg shadow-lg border border-olive-green">
          <p className="text-sage mb-2">Year {label}</p>
          {payload.map((entry, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between space-x-4 ${
                entry.name === `risk${riskLevel}` ? 'text-primary-green font-medium' : 'text-sage'
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

  const portfolioData = [
    { asset: 'Stocks', percentage: 60 },
    { asset: 'Bonds', percentage: 10 },
    { asset: 'Alternatives', percentage: 30 }
  ];

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
      setEmail('');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  const sections = [
    { id: 'risk', title: 'Risk Profile', icon: Shield, step: 1 },
    { id: 'allocation', title: 'Asset Strategy', icon: ChartPie, step: 2 },
    { id: 'invest', title: 'Invest & Relax', icon: Wallet, step: 3 }
  ];

  // Intersection observer for showing the progress bar
  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShowProgressBar(true);
        } else {
          setShowProgressBar(false);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  // Determine active section
  useEffect(() => {
    if (!sectionRef.current) return;

    const handleActiveSection = () => {
      const howContainer = sectionRef.current;
      const innerSections = howContainer.querySelectorAll('section');
      innerSections.forEach((sec, index) => {
        const rect = sec.getBoundingClientRect();
        // If the middle of the viewport is within this section
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleActiveSection);
    handleActiveSection();
    
    return () => window.removeEventListener('scroll', handleActiveSection);
  }, []);

  return (
    <div className="relative bg-light-gold text-deep-teal font-sans">
      {/* Progress Bars (Mobile and Desktop) */}
      {showProgressBar && (
        <>
          {/* Mobile Progress Bar */}
          <div
            className="sticky top-0 z-50 bg-deep-brown/10 backdrop-blur lg:hidden"
            style={{
              transform: showProgressBar ? "translateY(0)" : "translateY(-100%)",
              transition: "transform 0.3s ease-in-out",
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
                        ${isActive ? "bg-primary-green" : "bg-deep-teal"}
                      `}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </motion.div>
                    <span className="text-xs whitespace-nowrap">{section.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Progress Bar */}
          <div
            className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-50"
            style={{
              opacity: showProgressBar ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
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
                          ${isActive ? "bg-primary-green" : "bg-deep-teal"}
                        `}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>

                      <motion.div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-primary-green">
                          Step {section.step}
                        </span>
                        <span className="text-sm font-medium">{section.title}</span>
                      </motion.div>
                    </div>

                    {!isLastSection && (
                      <div className="absolute left-5 top-12 w-px h-12 -translate-x-1/2">
                        <motion.div
                          className="w-full bg-gradient-to-b from-primary-green to-transparent"
                          style={{
                            height: isActive ? "100%" : "0%",
                            transition: "height 0.5s ease-out",
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div
        className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12"
        ref={sectionRef}
      >
        {/* Section Title */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-center mb-8 sm:mb-12 text-primary-green"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Invest with Confidence
        </motion.h2>
  
        {/* Risk Assessment Section */}
        <section className="min-h-screen py-8 md:py-12 bg-light-gold">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto space-y-16"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-medium">Discover Your Risk Profile</h2>
              <p className="text-dark-green md:text-xl text-deep-teal max-w-2xl">
                Understanding your risk tolerance is crucial for successful investing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Risk Slider Card */}
                <motion.div
                  className="bg-deep-brown/5 rounded-xl p-6 md:p-8 backdrop-blur"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg md:text-xl font-medium mb-6">Quick Risk Assessment</h3>
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
                          : 'Aggressive - Higher risk, potential for higher returns'
                        }
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Risk Quiz Link */}
                <motion.a
                  href="/risk-quiz"
                  className="block bg-deep-brown/5 rounded-xl p-6 md:p-8 backdrop-blur hover:bg-deep-brown/10 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <Shield className="w-6 h-6 text-primary-green flex-shrink-0" />
                    <div>
                      <h3 className="text-lg md:text-xl font-medium mb-2">
                        Take Our Full Risk Assessment
                      </h3>
                      <p className="text-sage mb-4 text-sm md:text-dark-green">
                        Get a comprehensive analysis of your risk tolerance through our expert-designed questionnaire.
                      </p>
                      <span className="text-primary-green hover:text-dark-green flex items-center text-sm md:text-dark-green">
                        Start Assessment <ArrowRight className="ml-2 w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.a>

                {/* Educational Resource */}
                <motion.a
                  href="/learn/risk"
                  className="block bg-deep-brown/5 rounded-xl p-6 md:p-8 backdrop-blur hover:bg-deep-brown/10 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <Info className="w-6 h-6 text-gold flex-shrink-0" />
                    <div>
                      <h3 className="text-lg md:text-xl font-medium mb-2">
                        Understanding Investment Risk
                      </h3>
                      <p className="text-sage mb-4 text-sm md:text-dark-green">
                        Learn about the factors that influence investment risk and return.
                      </p>
                      <span className="text-gold hover:text-dark-green flex items-center text-sm md:text-dark-green">
                        Read Article <ExternalLink className="ml-2 w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.a>
              </div>

              {/* Right Column - Risk-Return Visualization */}
              <div className="bg-deep-brown/5 rounded-xl p-6 md:p-8 backdrop-blur">
                <h3 className="text-lg md:text-xl font-medium mb-6">
                  Risk-Return Profiles
                </h3>
                <div className="bg-light-gold/70 rounded-lg p-4 mb-8">
                  <div className="h-64 sm:h-80 md:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={stockData}
                        margin={{ top: 20, right: 20, bottom: 35, left: 20 }}
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(risk => (
                          <Line
                            key={risk}
                            type="monotone"
                            dataKey={`risk${risk}`}
                            stroke={risk === riskLevel ? '#066b06' : '#0a4c4c'} // primary-green or deep-teal
                            strokeWidth={risk === riskLevel ? 3 : 1}
                            dot={false}
                            opacity={risk === riskLevel ? 1 : 0.3}
                          />
                        ))}
                        <XAxis
                          dataKey="year"
                          stroke="#044d04" // sage
                          tick={false}
                          label={{
                            value: 'Time',
                            position: 'bottom',
                            offset: 20,
                            fill: '#044d04' // sage
                          }}
                        />
                        <YAxis
                          stroke="#044d04" // sage
                          tick={false}
                          label={{
                            value: 'Growth',
                            angle: -90,
                            position: 'left',
                            offset: 0,
                            fill: '#044d04' // sage
                          }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="text-xs text-deep-teal italic">
                  For illustrative purposes only. Past performance is not indicative of future results. 
                  The graph above is a simplified visualization of potential risk-return relationships. 
                  Actual investment outcomes may vary significantly dark-greend on market conditions, 
                  economic factors, and other variables.
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Asset Strategy Section */}
        <section className="min-h-screen py-16 md:py-24 bg-light-gold">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="mb-16 space-y-2">
              <h2 className="text-3xl md:text-4xl font-medium">
                Strategic Asset Allocation
              </h2>
              <p className="text-dark-green md:text-xl text-deep-teal max-w-2xl">
                Experience dynamic portfolio management that adapts to market conditions while maintaining your risk preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column - Methodology */}
              <motion.div
                className="bg-deep-brown/5 rounded-xl p-6 md:p-8 backdrop-blur"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <RefreshCcw className="w-6 h-6 text-primary-green" />
                  <h3 className="text-lg md:text-xl font-medium">Our Methodology</h3>
                </div>
                <p className="text-dark-green mb-8 text-sm md:text-dark-green">
                  Our research-backed approach combines sophisticated multi-asset portfolios with
                  dynamic allocation strategies to optimize your investment outcomes.
                </p>

                {/* Methodology Cards */}
                <div className="space-y-6">
                  <div className="p-4 bg-primary-green/10 rounded-lg">
                    <h4 className="text-sm md:text-dark-green font-medium mb-2 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-primary-green" />
                      Risk Management
                    </h4>
                    <p className="text-xs md:text-sm text-dark-teal">
                      Advanced diversification strategies across asset classes, regions, and sectors
                      to reduce volatility while maintaining growth potential.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-primary-green/10 rounded-lg">
                    <h4 className="text-sm md:text-dark-green font-medium mb-2 flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-primary-green" />
                      Global Diversification
                    </h4>
                    <p className="text-xs md:text-sm text-dark-teal">
                      Strategic exposure to worldwide markets, optimizing geographical allocation
                      dark-greend on market conditions and opportunities.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-primary-green/10 rounded-lg">
                    <h4 className="text-sm md:text-dark-green font-medium mb-2 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-primary-green" />
                      Active Rebalancing
                    </h4>
                    <p className="text-xs md:text-sm text-dark-teal">
                      Regular portfolio adjustments to maintain optimal risk levels and capitalize
                      on market opportunities.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Allocation Tool */}
              <motion.div
                className="bg-deep-brown/5 rounded-xl p-6 md:p-8 backdrop-blur flex flex-col"
                whileHover={{ scale: 1.01 }}
              >
                <div className="text-center mb-2 text-xs text-sage">
                  For illustrative purposes only
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <ChartPie className="w-6 h-6 text-gold" />
                  <h3 className="text-lg md:text-xl font-medium">Portfolio Allocation</h3>
                </div>
                
                {/* Dynamic Portfolio Balance */}
                <div className="flex-grow space-y-6">
                  {portfolioData.map(({ asset, percentage }) => (
                    <div key={asset} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{asset}</span>
                        <span>{percentage}%</span>
                      </div>
                      <div className="w-full bg-deep-teal rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary-green to-gold"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="mt-12 p-6 bg-primary-green/10 rounded-lg">
                    <h4 className="font-medium mb-2">About Our Portfolio Allocation Tool</h4>
                    <p className="text-sm text-deep-teal mb-4">
                      Access our algorithmic portfolio allocation tool to receive a personalized 
                      investment strategy dark-greend on your risk profile and financial goals.
                    </p>
                  </div>
                </div>

                {/* Call to Action */}
                <motion.a
                  href="/allocation-tool"
                  className="mt-8 w-full bg-olive-green hover:bg-dark-green text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="font-medium text-sm md:text-dark-teal">
                    Access Portfolio Allocation Tool
                  </span>
                  <ChartPie className="w-5 h-5" />
                </motion.a>

                <div className="mt-4 text-xs text-primary-green text-center">
                  Get your personalized asset allocation strategy in minutes
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Invest & Relax Section */}
        <section className="min-h-screen py-16 md:py-24 bg-light-gold">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="mb-16 space-y-2">
              <h2 className="text-3xl md:text-4xl font-medium mb-2">Invest & Relax</h2>
              <p className="text-dark-green md:text-xl text-deep-teal max-w-2xl">
                Start your investment journey with just a few clicks and stay informed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Key Features */}
              <motion.div
                className="bg-deep-brown/5 p-6 md:p-8 rounded-xl backdrop-blur"
                whileHover={{ scale: 1.02 }}
              >
                <Lock className="w-8 h-8 text-primary-green mb-4" />
                <h3 className="text-lg md:text-xl font-medium mb-4">1-Click Investing</h3>
                <p className="text-sage text-sm md:text-dark-green">
                  Seamless integration with Trading 212 for instant portfolio implementation.
                </p>
                <button className="mt-6 px-6 py-3 bg-olive-green rounded-lg hover:bg-primary-green transition-colors text-sm md:text-light-background">
                  Connect Now
                </button>
              </motion.div>

              <motion.div 
                className="bg-deep-brown/5 p-6 md:p-8 rounded-xl backdrop-blur" 
                whileHover={{ scale: 1.02 }} 
              > 
                <DollarSign className="w-8 h-8 text-gold mb-4" /> 
                <h3 className="text-lg md:text-xl font-medium mb-4">Low Minimum</h3> 
                <p className="text-sage text-sm md:text-dark-green"> 
                  Start with just $20 and build your portfolio gradually. 
                  <span className="block mt-2 text-sm italic text-dark-teal">
                    TIP: Investing smaller amounts regularly (e.g., via direct debit) can help smooth out market fluctuations and may yield better returns over time.
                  </span>
                </p> 
                <a  
                  href="/learn-more" 
                  className="mt-6 text-primary-green hover:text-dark-green inline-flex items-center text-sm md:text-dark-green" 
                > 
                  Learn More <ExternalLink className="ml-2 w-4 h-4" /> 
                </a> 
              </motion.div>
        
              <motion.div
                className="bg-deep-brown/5 p-6 md:p-8 rounded-xl backdrop-blur"
                whileHover={{ scale: 1.02 }}
              >
                <Activity className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-lg md:text-xl font-medium mb-4">
                  Real-Time Monitoring
                </h3>
                <p className="text-sage text-sm md:text-dark-green">
                  Track your portfolio performance with live updates.
                </p>
              </motion.div>
            </div>

            {/* Additional Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="bg-deep-brown/5 p-6 md:p-8 rounded-xl backdrop-blur"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg md:text-xl font-medium mb-4">Alternative Brokers</h3>
                <p className="text-sage mb-6 text-sm md:text-dark-green">
                  Prefer a different broker? We support multiple platforms for your convenience.
                </p>
                <a
                  href="/supported-brokers"
                  className="text-primary-green hover:text-dark-green inline-flex items-center text-sm md:text-dark-green"
                >
                  View Supported Brokers <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </motion.div>

              <div className="space-y-4">
                <motion.div
                  className="bg-deep-brown/5 p-6 md:p-8 rounded-xl backdrop-blur"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg md:text-xl font-medium mb-4">Stay Updated</h3>
                  <p className="text-sage mb-6 text-sm md:text-dark-green">
                    Get personalized insights and market updates delivered to your inbox.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
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
                      className="px-6 py-2 bg-primary-green rounded-lg hover:bg-primary-green transition-colors text-sm md:text-light-background disabled:opacity-50 disabled:cursor-not-allowed"
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
                    description={errorMessage || 'Failed to subscribe. Please try again.'}
                  />
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
