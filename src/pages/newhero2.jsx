import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useTransform,
  useMotionValue,
  animate,
  AnimatePresence,
} from 'framer-motion';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts';
import {
  TrendingUp,
  Shield,
  BookOpen,
  Database,
  ArrowRight,
} from 'lucide-react';
import clsx from 'clsx';

// MAIN COMPONENT
const InnovativeHero = () => {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);

  // -------------------------------------
  // PART 1: The original hero (SAVINGS / INVEST / TOOLS)
  // -------------------------------------
  // Generate smooth quartic growth curve for "Investments"
  const generateInvestmentData = () => {
    return Array.from({ length: 50 }, (_, i) => {
      const x = i / 49; // Normalize to 0-1
      // Quartic function with slight randomness for a natural feel
      const y = Math.pow(x, 4) * 0.7 + x * 0.3 + Math.sin(x * 10) * 0.02;
      return {
        x: i,
        value: y,
      };
    });
  };

  const investmentData = generateInvestmentData();

  // Dynamic number counter
  const Counter = ({ from, to, duration = 2 }) => {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (value) => Math.round(value));

    useEffect(() => {
      const controls = animate(count, to, {
        duration: duration,
        ease: 'easeOut',
      });
      return controls.stop;
    }, [count, to, duration]);

    return <motion.span>{rounded}</motion.span>;
  };

  // Update sections to include a bgColor property
  const sections = [
    {
      id: 'save',
      title: 'Smart Savings',
      bgColor: 'bg-primary-green/50', // Primary Green with 50% opacity
      icon: (
        <Shield className="w-12 sm:w-16 h-12 sm:h-16 mb-4 sm:mb-6 text-primary-green" />
      ),
      content: (
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          <motion.div
            className="relative w-24 sm:w-32 h-24 sm:h-32 bg-primary-green/30 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-xl sm:text-3xl font-medium text-primary-green">
              <Counter from={0} to={100} />%
            </div>
          </motion.div>
          <div className="text-center space-y-2 sm:space-y-4">
            <p className="text-lg sm:text-xl text-deep-brown font-medium">
              Shariah-Compliant Savings
            </p>
            <p className="text-sm sm:text-base text-deep-brown/80 max-w-md sm:max-w-lg mx-auto">
              Start your wealth journey with our ethical savings solutions. Earn
              competitive returns while staying true to Islamic principles.
            </p>
            <motion.a
              href="#explore-savings"
              className="inline-flex items-center space-x-1 sm:space-x-2 text-primary-green hover:text-primary-green/80 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span className="text-sm sm:text-base">
                Explore Savings Plans
              </span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
          </div>
        </div>
      ),
    },
    {
      id: 'invest',
      title: 'Strategic Investments',
      bgColor: 'bg-deep-teal/50', // Deep Teal with 50% opacity
      icon: (
        <TrendingUp className="w-12 sm:w-16 h-12 sm:h-16 mb-4 sm:mb-6 text-deep-teal" />
      ),
      content: (
        <div className="space-y-4 sm:space-y-6">
          <div className="w-full h-48 sm:h-64 relative">
            <div className="absolute -top-4 sm:-top-6 left-0 bg-deep-teal/10 text-deep-teal text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
              Algorithmic Multi-Asset Allocation
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={investmentData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="url(#lineGradient)"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#066b06" /> {/* Primary Green */}
                    <stop offset="100%" stopColor="#c49b3c" /> {/* Gold */}
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center space-y-2 sm:space-y-4">
            <p className="text-sm sm:text-base text-deep-brown/80 max-w-md sm:max-w-lg mx-auto font-medium">
              Our data-driven approach combines ethical investing with modern
              portfolio theory, delivering consistent returns while maintaining
              Shariah compliance.
            </p>
            <motion.a
              href="#investment-options"
              className="inline-flex items-center space-x-1 sm:space-x-2 text-deep-teal hover:text-deep-teal/80 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span className="text-sm sm:text-base">View Investment Options</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
          </div>
        </div>
      ),
    },
    {
      id: 'tools',
      title: 'Powerful Tools',
      bgColor: 'bg-gold/50', // Gold with 50% opacity
      icon: (
        <Database className="w-12 sm:w-16 h-12 sm:h-16 mb-4 sm:mb-6 text-gold" />
      ),
      content: (
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                name: 'Portfolio Analysis',
                description: 'Advanced analytics and performance tracking',
              },
              {
                name: 'Risk Assessment',
                description: 'Smart risk profiling and management',
              },
              {
                name: 'Market Insights',
                description: 'Real-time Shariah-compliant market data',
              },
              {
                name: 'Wealth Tracking',
                description: 'Comprehensive wealth monitoring tools',
              },
            ].map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-sage p-3 sm:p-4 rounded-lg backdrop-blur-sm hover:bg-sage/80 transition-colors"
              >
                <div className="text-gold font-medium mb-1 sm:mb-2">
                  {tool.name}
                </div>
                <div className="text-deep-brown text-xs sm:text-sm">
                  {tool.description}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <motion.a
              href="#explore-tools"
              className="inline-flex items-center space-x-1 sm:space-x-2 text-gold hover:text-gold/80 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span className="text-sm sm:text-base">Explore All Tools</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
          </div>
        </div>
      ),
    },
  ];

  // -------------------------------------
  // PART 2: Data & logic for the data analytics section
  // -------------------------------------
  const [performanceData, setPerformanceData] = useState([]);
  const [ytdReturn, setYtdReturn] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch(
          'https://safinabackend.azurewebsites.net/api/portfolio/optimize',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              initial_investment: 1000,
              risk_tolerance: 10, // Example risk tolerance
            }),
          }
        );
        if (!response.ok) throw new Error('Failed to fetch portfolio data');
        const data = await response.json();

        const currentDate = new Date();
        const lastYearDate = new Date();
        lastYearDate.setFullYear(currentDate.getFullYear() - 1);

        const portfolioSeries =
          data.dashboard_data.performance.series.find(
            (s) => s.name === 'Portfolio'
          )?.values || [];
        const dates = data.dashboard_data.performance.dates || [];

        // Filter data for the last 12 months
        const filteredData = dates
          .map((date, idx) => ({
            date: new Date(date),
            value: portfolioSeries[idx],
          }))
          .filter((item) => item.date >= lastYearDate);

        // Calculate YTD return
        const calculatedYtdReturn =
          filteredData.length > 1
            ? (
                ((filteredData[filteredData.length - 1].value -
                  filteredData[0].value) /
                  filteredData[0].value) *
                100
              ).toFixed(1)
            : '0.0';

        // Transform data for the chart
        const transformedData = filteredData.map((item) => ({
          name: item.date.toLocaleDateString('en-US', { month: 'short' }),
          value: item.value,
        }));

        setPerformanceData(transformedData);
        setYtdReturn(calculatedYtdReturn);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPortfolioData();
  }, []);

  // Determine dynamic scaling for Y-axis
  const minValue =
    performanceData.length > 0
      ? Math.min(...performanceData.map((d) => d.value))
      : 0;
  const maxValue =
    performanceData.length > 0
      ? Math.max(...performanceData.map((d) => d.value))
      : 0;
  const yAxisDomain = [
    minValue - 0.05 * minValue,
    maxValue + 0.2 * (maxValue - minValue),
  ];

  return (
    <div
      ref={containerRef}
      className="w-full bg-cover bg-center bg-no-repeat font-sans"
      style={{
        background: '#e2eac3', // Light Background
      }}
    >
      {/* 
        ==========================================
        HERO AREA
        ==========================================
      */}
      <section className="min-h-screen flex flex-col items-center justify-center z-10 px-4">
        {/* 
          "Grow Your Wealth" heading OUTSIDE the box 
          so it's not part of the translucent panel.
        */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-deep-brown mb-6 text-center pt-16 sm:pt-32 drop-shadow-lg"
        >
          Grow Your
          <span
            className="block mt-1 sm:mt-2"
            style={{ color: '#066b06' }} // Primary Green
          >
            Wealth
          </span>
        </motion.h1>

        {/* The colored box with sections */}
        <div
          className={clsx(
            'relative max-w-4xl w-full backdrop-blur-xl rounded-2xl p-4 sm:p-8 border border-deep-brown/20 mb-[-100px] sm:mb-[-150px] z-20',
            sections[activeSection].bgColor
          )}
        >
          {/* Shariah Compliance Indicator (pinned bottom-right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="
              absolute
              bottom-2 sm:bottom-4
              right-2 sm:right-4
              flex
              items-center
              space-x-1 sm:space-x-2
              px-2 sm:px-4
              py-1 sm:py-2
              bg-gradient-to-r
              from-primary-green/20
              to-deep-teal/20
              rounded-full
              backdrop-blur-md
              border
              border-primary-green/30
            "
          >
            <BookOpen className="w-3 sm:w-4 h-3 sm:h-4 text-primary-green" />
            <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-primary-green to-deep-teal bg-clip-text text-transparent">
              Shariah Compliant
            </span>
          </motion.div>

          {/* Navigation for sections (Savings / Investments / Tools) */}
          <motion.div
            className="flex justify-center mb-6 sm:mb-12 flex-wrap gap-4 sm:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(index)}
                className={clsx(
                  'relative px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base',
                  activeSection === index
                    ? 'text-primary-green font-medium'
                    : 'text-deep-brown'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.title}
                {activeSection === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-green"
                    layoutId="activeSection"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Active Section Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[200px] sm:min-h-[300px] h-auto"
            >
              <div className="flex flex-col items-center">
                {sections[activeSection].icon}
                <div className="w-full">{sections[activeSection].content}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Islamic Finance Principles (optional) */}
          <motion.div
            className="mt-6 sm:mt-12 flex justify-center space-x-4 sm:space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Add any additional elements here if needed */}
          </motion.div>
        </div>
      </section>

      {/* 
        ==========================================
        DATA ANALYTICS SECTION
        ==========================================
      */}
      <section className="py-12 sm:py-20 bg-light-background relative z-10 pt-36 sm:pt-44">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Text / CTA */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 sm:mb-6 text-primary-green">
                Driven by Data
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-deep-brown mb-4 sm:mb-8 font-medium">
                Make informed decisions with our advanced analytics and
                real-time market insights. Our data-driven approach ensures
                optimal performance while maintaining strict Shariah
                compliance.
              </p>
              <button
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-deep-teal hover:bg-deep-teal/80 transition-colors rounded-lg text-white font-medium shadow-md"
                onClick={() => (window.location.href = '/analytics')}
              >
                Explore Analytics <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Chart + Stat Boxes */}
            <div className="bg-sage rounded-2xl p-4 sm:p-8 shadow-lg">
              {/* Volatility & YTD Return */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                {/* Volatility */}
                <div className="flex-1 bg-olive-green/10 border border-deep-brown rounded-lg p-3 sm:p-4 flex flex-col items-center">
                  <span className="text-xs sm:text-sm text-deep-brown uppercase tracking-wider mb-1 sm:mb-2">
                    Volatility
                  </span>
                  <span className="text-xl sm:text-2xl font-medium text-olive-green">
                    12.5%
                  </span>
                </div>
                {/* YTD Return */}
                <div className="flex-1 bg-olive-green/10 border border-deep-brown rounded-lg p-3 sm:p-4 flex flex-col items-center">
                  <span className="text-xs sm:text-sm text-deep-brown uppercase tracking-wider mb-1 sm:mb-2">
                    YTD Return
                  </span>
                  <span className="text-xl sm:text-2xl font-medium text-olive-green">
                    {ytdReturn !== null ? `+${ytdReturn}%` : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="w-full h-60 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <defs>
                      <linearGradient
                        id="performanceGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#066b06" // Primary Green
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#066b06" // Primary Green
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#2c1810', fontSize: '0.75rem' }} // Deep Brown
                      interval={Math.max(
                        1,
                        Math.floor(performanceData.length / 4) - 1
                      )}
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis hide={true} domain={yAxisDomain} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#f4e9d1', // Light Gold
                        border: 'none',
                        borderRadius: '0.5rem',
                        color: '#2c1810', // Deep Brown
                        fontSize: '0.875rem',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#066b06" // Primary Green
                      strokeWidth={3}
                      dot={false}
                      fill="url(#performanceGradient)"
                      fillOpacity={1}
                    />
                    <Legend
                      wrapperStyle={{
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        textAlign: 'center',
                        fontSize: '0.7rem',
                        color: '#2c1810', // Deep Brown
                      }}
                      payload={[
                        {
                          value: 'YTD Returns of Aggressive Portfolio',
                          type: 'line',
                          id: '1',
                          color: '#066b06', // Primary Green
                        },
                      ]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InnovativeHero;
