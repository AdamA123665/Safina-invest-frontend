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
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts';
import {
  TrendingUp,
  Shield,
  Database,
  ArrowRight,
} from 'lucide-react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const InnovativeHero = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // -------------------------------------
  // PART 1: The hero cards (SAVINGS / INVEST / TOOLS)
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

  // Our three “cards” data
  const sections = [
    {
      id: 'save',
      title: 'Smart Savings',
      bgColor: 'bg-gold/30',
      icon: (
        <Shield className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-gold" />
      ),
      content: (
        <div className="flex flex-col items-center text-center space-y-2">
          <h3 className="text-lg sm:text-xl font-medium text-deep-brown">
            Smart Savings
          </h3>
          <div className="w-full h-32 sm:h-40 relative flex items-center justify-center">
            <motion.div
              className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gold/30 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-base sm:text-xl font-medium text-gold">
                <Counter from={0} to={100} />%
              </div>
            </motion.div>
          </div>
          <p className="text-xs sm:text-sm text-deep-brown/80 max-w-sm mx-auto">
            Start your wealth journey with our ethical saving solutions. Earn
            competitive returns while staying true to Islamic principles.
          </p>
          <motion.a
            href="#explore-savings"
            className="inline-flex items-center space-x-1 text-gold hover:text-gold/80 transition-colors"
            whileHover={{ x: 5 }}
          >
            <span className="text-xs sm:text-sm">Explore Savings Plans</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.a>
        </div>
      ),
    },
    {
      id: 'invest',
      title: 'Strategic Investments',
      bgColor: 'bg-deep-teal/30',
      icon: (
        <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-deep-teal" />
      ),
      content: (
        <div className="flex flex-col items-center text-center space-y-2">
          <h3 className="text-lg sm:text-xl font-medium text-deep-brown">
            Strategic Investments
          </h3>
          <div className="w-full h-32 sm:h-40 relative">
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
                    <stop offset="0%" stopColor="#066b06" />
                    <stop offset="100%" stopColor="#c49b3c" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs sm:text-sm text-deep-brown/80 max-w-sm mx-auto">
            Our data-driven approach combines ethical investing with modern
            portfolio theory, delivering consistent returns.
          </p>
          <motion.a
            href="#investment-options"
            className="inline-flex items-center space-x-1 text-deep-teal hover:text-deep-teal/80 transition-colors"
            whileHover={{ x: 5 }}
          >
            <span className="text-xs sm:text-sm">View Investment Options</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.a>
        </div>
      ),
    },
    {
      id: 'tools',
      title: 'Powerful Tools',
      bgColor: 'bg-primary-green/30',
      icon: (
        <Database className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-primary-green" />
      ),
      content: (
        <div className="flex flex-col items-center text-center space-y-2">
          <h3 className="text-lg sm:text-xl font-medium text-deep-brown">
            Powerful Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              {
                name: 'Portfolio Analysis',
                description: 'Advanced analytics & performance tracking',
              },
              {
                name: 'Risk Assessment',
                description: 'Smart risk profiling & management',
              },
              {
                name: 'Market Insights',
                description: 'Real-time Shariah-compliant data',
              },
              {
                name: 'Wealth Tracking',
                description: 'Comprehensive monitoring tools',
              },
            ].map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-primary-green/20 p-2 sm:p-3 rounded-lg hover:bg-green-200 transition-colors"
              >
                <div className="text-primary-green font-medium text-sm sm:text-base mb-1">
                  {tool.name}
                </div>
                <div className="text-deep-brown text-xs sm:text-sm">
                  {tool.description}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.a
            href="#tools"
            className="inline-flex items-center space-x-1 text-primary-green hover:text-primary-green/80 transition-colors"
            whileHover={{ x: 5 }}
          >
            <span className="text-xs sm:text-sm">Explore All Tools</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.a>
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
      className="w-full bg-cover bg-center bg-no-repeat font-sans  "
      style={{
        background: '#e2eac3', // Light background
      }}
    >
      {/*
        ==========================================
        HERO AREA (modified to min-h-screen)
        ==========================================
      */}
      <section
        className="
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          px-4
          relative
        "
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            text-5xl
            sm:text-6xl
            md:text-7xl
            font-medium
            text-deep-brown
            mb-8
            text-center
            drop-shadow-lg
            pt-4
          "
        >
          Grow Your{' '}
          <span
            style={{ color: '#066b06' }} // Primary Green
          >
            Wealth
          </span>
        </motion.h1>

        {/*
          3 cards in a responsive grid
        */}
        <div
          className="
            max-w-6xl
            w-full
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
            md:gap-6
            px-4
            sm:px-4
            pt-2
            pb-4
            sm:pb-2
          "
        >
          {sections.map((section) => (
            <div
              key={section.id}
              className="relative min-h-[347px] flex flex-col justify-center"
            >
              <div
                className={clsx(
                  'rounded-xl p-3 sm:p-4 border border-deep-brown/20 h-full',
                  section.bgColor
                )}
              >
                <div className="flex flex-col items-center h-full">
                  {section.icon}
                  <div className="flex-1 w-full flex flex-col justify-center">
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*
          Single "Shariah Compliant" bubble
        */}
        
      </section>

      {/*
        ==========================================
        DATA ANALYTICS SECTION
        ==========================================
      */}
      <section className=" w-full py-10 sm:py-20 bg-light-background relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Text / CTA */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-4xl font-medium mb-4 sm:mb-6 text-primary-green">
                Driven by Data
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-deep-brown mb-4 sm:mb-8 font-medium">
                Make informed decisions with our advanced analytics and
                real-time market insights. Our data-driven approach ensures
                optimal performance while maintaining strict Shariah
                compliance.
              </p>
              <button
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 bg-deep-teal hover:bg-deep-teal/80 transition-colors rounded-lg text-white font-medium shadow-md"
                onClick={() => navigate('/articles/asset-allocation-methodology')}
              >
                Explore our methodology{' '}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Chart + Stat Boxes */}
            <div className="bg-sage rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="text-center mb-2 sm:mb-4 text-base sm:text-xl text-deep-brown font-semibold">
                Our Aggressive Portfolio
              </div>
              {/* Volatility & YTD Return */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                {/* Volatility */}
                <div className="flex-1 bg-olive-green/50 border border-deep-brown rounded-lg p-2 sm:p-3 flex flex-col items-center">
                  <span className="text-xs sm:text-sm text-deep-teal uppercase tracking-wider mb-1">
                    Volatility
                  </span>
                  <span className="text-lg sm:text-xl font-medium text-primary-green">
                    12.5%
                  </span>
                </div>
                {/* YTD Return */}
                <div className="flex-1 bg-olive-green/50 border border-deep-brown rounded-lg p-2 sm:p-3 flex flex-col items-center">
                  <span className="text-xs sm:text-sm text-deep-teal uppercase tracking-wider mb-1">
                    YTD Return
                  </span>
                  <span className="text-lg sm:text-xl font-medium text-primary-green">
                    {ytdReturn !== null ? `+${ytdReturn}%` : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="w-full h-48 sm:h-64">
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
                        <stop offset="5%" stopColor="#066b06" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#066b06" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#2c1810', fontSize: '0.7rem' }}
                      interval={Math.max(
                        1,
                        Math.floor(performanceData.length / 4) - 1
                      )}
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis hide={true} domain={yAxisDomain} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#f4e9d1',
                        border: 'none',
                        borderRadius: '0.5rem',
                        color: '#2c1810',
                        fontSize: '0.75rem',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#066b06"
                      strokeWidth={2}
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
                        color: '#2c1810',
                      }}
                      payload={[
                        {
                          value: 'YTD Returns of Aggressive Portfolio',
                          type: 'line',
                          id: '1',
                          color: '#066b06',
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
