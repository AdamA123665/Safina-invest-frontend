import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useTransform,
  useMotionValue,
  animate,
} from 'framer-motion';
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  Shield,
  BookOpen,
  Target,
  Database,
  ArrowRight,
} from 'lucide-react';

// -------------------------------------
// EXACT DATA ANALYTICS IMPORTS
// (from your RefinedHero snippet)
// -------------------------------------
import { 
  XAxis, 
  YAxis, 
  Legend, 
  Tooltip
} from 'recharts';

// ========================================
// RotatingWords (fade-and-slide animation)
// (Kept from your RefinedHero snippet in case you need it)
// ========================================

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

  // Our sections
  const sections = [
    {
      id: 'save',
      title: 'Smart Savings',
      icon: <Shield className="w-16 h-16 mb-6 text-emerald-400" />,
      content: (
        <div className="flex flex-col items-center space-y-6">
          <motion.div
            className="relative w-32 h-32 bg-emerald-900/30 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-3xl font-bold text-emerald-400">
              <Counter from={0} to={98} />%
            </div>
          </motion.div>
          <div className="text-center space-y-4">
            <p className="text-xl text-white/80">Shariah-Compliant Savings</p>
            <p className="text-base text-white/60 max-w-lg">
              Start your wealth journey with our ethical savings solutions. Earn
              competitive returns while staying true to Islamic principles.
            </p>
            <motion.a
              href="#explore-savings"
              className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span>Explore Savings Plans</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      ),
    },
    {
      id: 'invest',
      title: 'Strategic Investments',
      icon: <TrendingUp className="w-16 h-16 mb-6 text-emerald-400" />,
      content: (
        <div className="space-y-6">
          <div className="w-full h-64 relative">
            <div className="absolute -top-6 left-0 bg-emerald-500/10 text-emerald-400 text-sm px-3 py-1 rounded-full">
              Algorithmic Multi-Asset Allocation
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={investmentData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="url(#lineGradient)"
                  strokeWidth={4}
                  dot={false}
                  isAnimationActive={true}
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#0EA5E9" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center space-y-4">
            <p className="text-base text-white/60 max-w-lg mx-auto">
              Our data-driven approach combines ethical investing with modern
              portfolio theory, delivering consistent returns while maintaining
              Shariah compliance.
            </p>
            <motion.a
              href="#investment-options"
              className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span>View Investment Options</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      ),
    },
    {
      id: 'tools',
      title: 'Powerful Tools',
      icon: <Database className="w-16 h-16 mb-6 text-emerald-400" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
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
                className="bg-white/5 p-4 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="text-emerald-400 font-semibold mb-2">
                  {tool.name}
                </div>
                <div className="text-white/60 text-sm">{tool.description}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <motion.a
              href="#explore-tools"
              className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span>Explore All Tools</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      ),
    },
  ];

  // -------------------------------------
  // PART 2: Data & logic from your "RefinedHero" for the data analytics section
  //         (Kept EXACTLY as you provided, minus the second hero).
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
            ? ((filteredData[filteredData.length - 1].value -
                filteredData[0].value) /
                filteredData[0].value) *
              100
            : 0;

        // Transform data for the chart
        const transformedData = filteredData.map((item) => ({
          name: item.date.toLocaleDateString('en-US', { month: 'short' }),
          value: item.value,
        }));

        setPerformanceData(transformedData);
        setYtdReturn(calculatedYtdReturn.toFixed(1));
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
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/my-bg.jpg')" }}
    >
      {/* 
        ==========================================
        HERO AREA
        ==========================================
      */}
      <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center z-10 px-4">
        {/* 
          "Grow Your Wealth" heading OUTSIDE the box 
          so it's not part of the translucent panel.
        */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold text-white mb-8 text-center"
        >
          Grow Your
          <span className="block mt-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Wealth
          </span>
        </motion.h1>

        {/* The translucent box with sections */}
        <div
          className="
            relative
            max-w-4xl
            w-full
            bg-black/20
            backdrop-blur-xl
            rounded-2xl
            p-8
            border
            border-white/10
          "
        >
          {/* Shariah Compliance Indicator (pinned top-right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="
              absolute
              top-4
              right-4
              flex
              items-center
              space-x-2
              px-4
              py-2
              bg-gradient-to-r
              from-emerald-500/10
              to-teal-500/10
              rounded-full
              backdrop-blur-md
              border
              border-emerald-500/20
            "
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Shariah Compliant
            </span>
          </motion.div>

          {/* Navigation for sections (Savings / Investments / Tools) */}
          <motion.div
            className="flex justify-center mb-12 space-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(index)}
                className={`
                  relative px-6 py-3 rounded-lg transition-colors 
                  ${
                    activeSection === index
                      ? 'text-emerald-400'
                      : 'text-white/60'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.title}
                {activeSection === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                    layoutId="activeSection"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Active Section Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[300px]"
          >
            <div className="flex flex-col items-center">
              {sections[activeSection].icon}
              <div className="w-full">{sections[activeSection].content}</div>
            </div>
          </motion.div>

          {/* Islamic Finance Principles (optional) */}
          <motion.div
            className="mt-12 flex justify-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-2 text-white/60">
              <BookOpen className="w-5 h-5" />
              <span>Shariah-Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60">
              <Target className="w-5 h-5" />
              <span>Data-Driven</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 
        ==========================================
        DATA ANALYTICS SECTION (exactly as provided),
        but with a negative margin to create overlap
        ==========================================
      */}
      <div className="relative z-20 mt-[-40px]">
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text / CTA */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-green-800">
                  Driven by Data
                </h2>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  Make informed decisions with our advanced analytics and
                  real-time market insights. Our data-driven approach ensures
                  optimal performance while maintaining strict Shariah
                  compliance.
                </p>
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg text-white font-semibold shadow-md"
                  onClick={() => (window.location.href = '/analytics')}
                >
                  Explore Analytics <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Chart + Stat Boxes */}
              <div className="bg-gray-100 rounded-2xl p-8 shadow-lg">
                {/* Volatility & YTD Return */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                  {/* Volatility */}
                  <div className="flex-1 bg-green-100 border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Volatility
                    </span>
                    <span className="text-2xl font-bold text-green-700">
                      12.5%
                    </span>
                  </div>
                  {/* YTD Return */}
                  <div className="flex-1 bg-green-100 border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      YTD Return
                    </span>
                    <span className="text-2xl font-bold text-green-700">
                      {ytdReturn !== null ? `+${ytdReturn}%` : 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="w-full h-80">
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
                            stopColor="#10B981"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10B981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280' }}
                        interval={Math.max(
                          1,
                          Math.floor(performanceData.length / 4) - 1
                        )}
                      />
                      <YAxis hide={true} domain={yAxisDomain} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#F3F4F6',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: '#374151',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#10B981"
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
                          fontSize: '0.8rem',
                          color: '#6B7280',
                        }}
                        payload={[
                          {
                            value: 'YTD Returns of Aggressive Portfolio',
                            type: 'line',
                            id: '1',
                            color: '#10B981',
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
    </div>
  );
};

export default InnovativeHero;
