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
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts';
import {
  TrendingUp,
  Shield,
  Eye,
  ArrowRight,
  Sparkles,
  PieChart as PieChartIcon,
  GraduationCap,
  BarChart2,
  TrendingDown,
  Clock,
  Blocks,
} from 'lucide-react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

// ----------------------------
// Combined InnovativeHero
// ----------------------------
const InnovativeHero = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // ----------------------------
  // PART 1: New Hero / Transparency Section
  // ----------------------------

  // Sample portfolio allocation data
  const portfolioData = [
    { name: 'Global ETFs', value: 40 },
    { name: 'Sukuk Funds', value: 30 },
    { name: 'Real Estate', value: 20 },
    { name: 'Tech Funds', value: 10 },
  ];
  const COLORS = ['#066b06', '#c49b3c', '#2A9D8F', '#264653'];

  const [activeTab, setActiveTab] = useState('portfolio');

  // Generate investment data for "Strategic Investments" line chart
  const generateInvestmentData = () => {
    return Array.from({ length: 50 }, (_, i) => {
      const x = i / 49;
      // Slight quartic curve with some sinusoidal variation
      const y = Math.pow(x, 4) * 0.7 + x * 0.3 + Math.sin(x * 10) * 0.02;
      return { x: i, value: y };
    });
  };
  const investmentData = generateInvestmentData();

  // Counter for the "Smart Savings" 100%
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

  // ----------------------------
  // PART 2: Data & logic for the data-driven section
  // ----------------------------

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
              risk_tolerance: 10, // example risk tolerance
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

  // ----------------------------
  // RENDER
  // ----------------------------
  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-[#e2eac3] to-[#f5f8eb] overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-20">
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium text-deep-brown mb-6">
            Innovative{' '}
            <span className="relative">
              Ethical
              <motion.span
                className="absolute -top-1 -right-4"
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-[#066b06]" />
              </motion.span>
            </span>{' '}
            <span className="text-[#066b06]">Free</span>
          </h1>
        </motion.div>

        {/* ENHANCED TRANSPARENCY DASHBOARD */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative mb-24"
        >
          <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-primary-green/20 shadow-lg">
            {/* Header */}
            <div className="flex items-center space-x-3 text-primary-green mb-8">
              <Eye className="w-8 h-8" />
              <h2 className="text-3xl font-semibold text-deep-brown">
                Complete <span className="text-primary-green">Transparency</span>
              </h2>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Column - Navigation & Info */}
              <div className="lg:col-span-4 space-y-6">
                {/* Navigation Tabs (Only 'Portfolio' for now) */}
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className={clsx(
                      'flex items-center space-x-3 p-4 rounded-xl transition-colors',
                      activeTab === 'portfolio'
                        ? 'bg-primary-green/20 text-primary-green'
                        : 'hover:bg-primary-green/10 text-deep-brown/70'
                    )}
                  >
                    <PieChartIcon className="w-5 h-5" />
                    <span className="font-medium">Portfolio Visibility</span>
                  </button>
                </div>

                {/* Featured Insight #1 */}
                <div className="bg-white/60 rounded-xl p-6 border border-primary-green/20">
                  <GraduationCap className="w-6 h-6 text-primary-green mb-3" />
                  <h3 className="text-lg font-medium text-deep-brown mb-2">
                    Why Transparency Matters
                  </h3>
                  <p className="text-sm text-deep-brown/80">
                    Understanding where your money goes is crucial for making
                    informed investment decisions. We provide complete visibility
                    into every aspect of your portfolio.
                  </p>
                </div>

                {/* Featured Insight #2 */}
                <div className="bg-white/60 rounded-xl p-6 border border-primary-green/20">
                  <Blocks className="w-6 h-6 text-primary-green mb-3" />
                  <h3 className="text-lg font-medium text-deep-brown mb-2">
                    Our investment building blocks are no secret
                  </h3>
                  <p className="text-sm text-deep-brown/80">
                    We provide a detailed breakdown of all 12 ETFs we use in our
                    portfolios and our optimisation process—including descriptions,
                    tickers, and returns—so you can invest with peace of mind.
                  </p>
                </div>
              </div>

              {/* Right Column - Portfolio Content */}
              <div className="lg:col-span-8">
                {activeTab === 'portfolio' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Portfolio Breakdown */}
                      <div className="bg-white/60 rounded-xl p-6 border border-primary-green/20">
                        <h3 className="text-lg font-medium text-deep-brown mb-4">
                          Portfolio Allocation
                        </h3>
                        <div className="h-48">
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
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          {portfolioData.map((item, index) => (
                            <div
                              key={item.name}
                              className="flex items-center space-x-2"
                            >
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: COLORS[index] }}
                              />
                              <span className="text-sm text-deep-brown/80">
                                {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Real-time Metrics (static placeholders) */}
                      <div className="bg-white/60 rounded-xl p-6 border border-primary-green/20">
                        <h3 className="text-lg font-medium text-deep-brown mb-4">
                          Live Analytics
                        </h3>
                        <div className="space-y-4">
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
                              description:
                                'Maximum observed loss from peak to trough',
                            },
                            {
                              label: 'Volatility',
                              value: '9.2%',
                              trend: 'neutral',
                              icon: <BarChart2 className="w-4 h-4" />,
                              description:
                                'Moderate price fluctuations indicating balanced risk',
                            },
                            {
                              label: '10Y Return',
                              value: '156.3%',
                              trend: 'up',
                              icon: <Clock className="w-4 h-4" />,
                              description:
                                'Cumulative return over the past decade',
                            },
                          ].map((metric) => (
                            <div
                              key={metric.label}
                              className="flex items-center justify-between p-3 bg-white/40 rounded-lg"
                            >
                              <div className="flex items-center space-x-2 text-deep-brown/80">
                                {metric.icon}
                                <span className="text-sm">{metric.label}</span>
                              </div>
                              <span className="font-medium text-primary-green">
                                {metric.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Investment Strategy */}
                    <div className="bg-white/60 rounded-xl p-6 border border-primary-green/20">
                      <h3 className="text-lg font-medium text-deep-brown mb-4">
                        Investment Strategy
                      </h3>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        {[
                          'Shariah Compliance',
                          'Risk Management',
                          'Diversification',
                        ].map((strategy) => (
                          <div
                            key={strategy}
                            className="bg-primary-green/10 rounded-lg p-3 text-center"
                          >
                            <span className="text-sm font-medium text-deep-brown">
                              {strategy}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* PRODUCTS SECTION */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Savings Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="relative overflow-hidden rounded-2xl bg-gold/20 p-8 border border-gold/20 hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <Shield className="w-12 h-12 text-gold mb-6" />
              <h3 className="text-2xl font-semibold text-deep-brown mb-4">
                Smart Savings
              </h3>
              <p className="text-deep-brown/80 mb-6">
                Start your wealth journey with our ethical saving solutions. Earn
                competitive returns while staying true to Islamic principles.
              </p>
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
              <motion.button
                whileHover={{ x: 5 }}
                className="inline-flex items-center space-x-2 text-gold"
              >
                <span>Explore Savings</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Investments Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="relative overflow-hidden rounded-2xl bg-deep-teal/20 p-8 border border-deep-teal/20 hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <TrendingUp className="w-12 h-12 text-deep-teal mb-6" />
              <h3 className="text-2xl font-semibold text-deep-brown mb-4">
                Strategic Investments
              </h3>
              <p className="text-deep-brown/80 mb-6">
                Our data-driven approach combines ethical investing with modern
                portfolio theory, delivering consistent returns.
              </p>
              <div className="h-32 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={investmentData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#066b06"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <motion.button
                whileHover={{ x: 5 }}
                className="inline-flex items-center space-x-2 text-deep-teal"
              >
                <span>View Investments</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* DATA ANALYTICS SECTION (from your second snippet) */}
      <section className="w-full py-10 md:py-20 bg-light-background relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Text / CTA */}
            <div>
              <h2 className="text-5xl sm:text-5xl md:text-5xl font-medium mb-4 sm:mb-6 text-primary-green">
                Driven by Data
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-deep-brown mb-4 sm:mb-8 font-medium">
                Leverage our advanced asset allocation algorithm, built on over
                10 years of historical data and statistical modelling. We
                analyse market trends and performance metrics to provide
                personalised, Shariah-compliant multi-asset investment
                portfolios that maximise returns and balance risk.
              </p>
              <button
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 bg-deep-teal hover:bg-deep-teal/80 transition-colors rounded-lg text-white font-medium shadow-md"
                onClick={() =>
                  navigate('/articles/asset-allocation-methodology')
                }
              >
                Explore our methodology
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
                        <stop
                          offset="5%"
                          stopColor="#066b06"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#066b06"
                          stopOpacity={0}
                        />
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
