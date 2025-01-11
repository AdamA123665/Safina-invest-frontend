import React, { useState, useEffect, useRef } from 'react';
import {
  motion
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
  Eye,
  ArrowRight,
  GraduationCap,
  BarChart2,
  TrendingDown,
  Clock,
  Blocks,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InnovativeHero = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // ----------------------------
  // PART 1: Hero / Transparency Section
  // ----------------------------

  // Sample portfolio allocation data
  const portfolioData = [
    { name: 'Global ETFs', value: 40 },
    { name: 'Sukuk Funds', value: 30 },
    { name: 'Real Estate', value: 20 },
    { name: 'Tech Funds', value: 10 },
  ];
  const COLORS = ['#066b06', '#c49b3c', '#2A9D8F', '#264653'];




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
    <div ref={containerRef} className="w-full overflow-x-hidden font-sans">
      {/* HERO SECTION WITH GRADIENT BACKGROUND */}
      <div className="bg-[#e2eac3]">
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-20">
          {/* Hero Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-deep-brown mb-6 leading-tight">
              Innovative{' '}
              <span className="relative">Ethical</span>{' '}
              <span className="text-[#066b06]">Free</span>
            </h1>
          </motion.div>

          {/* TRANSPARENCY & PORTFOLIO INSIGHTS SECTION */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative mb-16 sm:mb-24"
          >
              {/* Parent Container with CSS Grid */}
              <div className="grid lg:grid-cols-12 gap-4 sm:gap-6">
                {/* Complete Transparency Section */}
                <div className="lg:col-span-4 flex flex-col space-y-6">
                  {/* Header */}
                  <div className="flex items-center space-x-3">
                    <Eye className="w-6 h-6 sm:w-8 sm:h-8" />
                    <h2 className="text-2xl sm:text-3xl font-semibold text-deep-brown">
                      Complete{' '}
                      <span className="text-primary-green">Transparency</span>
                    </h2>
                  </div>

                  {/* Why Transparency Matters */}
                  <div className="bg-white/60 rounded-xl p-4 sm:p-6 border border-primary-green/20">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green mb-2 sm:mb-3" />
                    <h3 className="text-base sm:text-lg lg:text-xl font-medium text-deep-brown mb-1 sm:mb-2">
                      Why Transparency Matters
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-deep-brown/80">
                      Understanding where your money goes is crucial for making
                      informed investment decisions. We provide complete visibility
                      into every aspect of your portfolio.
                    </p>
                  </div>

                  {/* Our Investment Building Blocks Are No Secret */}
                  <div className="bg-white/60 rounded-xl p-4 sm:p-6 border border-primary-green/20">
                    <Blocks className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green mb-2 sm:mb-3" />
                    <h3 className="text-base sm:text-lg lg:text-xl font-medium text-deep-brown mb-1 sm:mb-2">
                      Our Investment Building Blocks Are No Secret
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-deep-brown/80">
                      We provide a detailed breakdown of all 12 ETFs we use in our
                      portfolios and our optimisation process including descriptions,
                      tickers, and returns so you can invest with peace of mind.
                    </p>
                  </div>
                </div>

                {/* Divider - Visible only on large screens */}
                <div className="hidden lg:flex lg:col-span-1 justify-center">
                  <div className="w-px bg-gray-300 h-full"></div>
                </div>

                {/* Portfolio Insights Section */}
                <div className="lg:col-span-7 flex flex-col space-y-6">
                  {/* Header */}
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary-green" />
                    <h2 className="text-2xl sm:text-3xl font-semibold text-deep-brown">
                      Portfolio{' '}
                      <span className="text-primary-green">Insights</span>
                    </h2>
                  </div>

                  {/* Nested Grid for Portfolio Allocation and Live Analytics */}
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
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
                            <span className="text-xs sm:text-sm text-deep-brown/80">
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Live Analytics */}
                    <div className="bg-white/60 rounded-xl p-4 sm:p-6 border border-primary-green/20">
                      <h3 className="text-base sm:text-lg lg:text-xl font-medium text-deep-brown mb-4">
                        Live Analytics
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
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
                            className="flex items-center justify-between p-2 sm:p-3 bg-white/40 rounded-lg"
                          >
                            <div className="flex items-center space-x-2 text-deep-brown/80">
                              {metric.icon}
                              <span className="text-xs sm:text-sm">
                                {metric.label}
                              </span>
                            </div>
                            <span className="font-medium text-primary-green text-sm sm:text-base">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Investment Strategy */}
                  <div className="bg-white/60 rounded-xl p-4 sm:p-6 border border-primary-green/20">
                    <h3 className="text-base sm:text-lg lg:text-xl font-medium text-deep-brown mb-4">
                      Investment Strategy
                    </h3>
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-2 sm:mb-4">
                      {[
                        'Shariah Compliance',
                        'Risk Management',
                        'Diversification',
                      ].map((strategy) => (
                        <div
                          key={strategy}
                          className="bg-primary-green/10 rounded-lg p-3 text-center"
                        >
                          <span className="text-xs sm:text-sm font-medium text-deep-brown">
                            {strategy}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
          </motion.div>
        </div>
      </div>

      {/* DATA ANALYTICS SECTION WITH DISTINCT BACKGROUND */}
      <section className="w-full py-10 sm:py-14 md:py-20 bg-light-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Text / CTA */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-3 sm:mb-5 text-primary-green leading-tight">
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
                  <span className="text-base sm:text-xl font-medium text-primary-green">
                    12.5%
                  </span>
                </div>
                {/* YTD Return */}
                <div className="flex-1 bg-olive-green/50 border border-deep-brown rounded-lg p-2 sm:p-3 flex flex-col items-center">
                  <span className="text-xs sm:text-sm text-deep-teal uppercase tracking-wider mb-1">
                    YTD Return
                  </span>
                  <span className="text-base sm:text-xl font-medium text-primary-green">
                    {ytdReturn !== null ? `+${ytdReturn}%` : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="w-full h-40 sm:h-64">
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
