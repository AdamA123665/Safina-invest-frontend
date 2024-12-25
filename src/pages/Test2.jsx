import React, { useEffect, useState } from 'react';
import { ArrowRight, TrendingUp, Wallet, Settings } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Words to rotate
const rotatingWords = ['saving', 'investing', 'staying shariah compliant'];

/**
 * RotatingWords Component
 * Uses two stacked <span> elements to 3D-flip between the current and next word.
 */
const RotatingWords = ({ words, intervalMs = 3000, flipDurationMs = 500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start the flip animation
      setIsFlipping(true);

      // After the flip duration, swap the words
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setNextIndex((prev) => (prev + 1) % words.length);
        setIsFlipping(false);
      }, flipDurationMs);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [words, intervalMs, flipDurationMs]);

  return (
    <span
      className="relative inline-block"
      style={{
        display: 'inline-block',
        perspective: '800px', // 3D perspective for the flipping text
        width: '220px', // fixed width so it doesn't "jump" if words differ in length
        textAlign: 'left',
      }}
    >
      {/* CURRENT WORD */}
      <span
        className="absolute w-full backface-hidden"
        style={{
          transition: `transform ${flipDurationMs}ms, opacity ${flipDurationMs}ms`,
          transformOrigin: 'bottom',
          transform: isFlipping ? 'rotateX(90deg)' : 'rotateX(0deg)',
          opacity: isFlipping ? 0 : 1,
        }}
      >
        {words[currentIndex]}
      </span>

      {/* NEXT WORD */}
      <span
        className="absolute w-full backface-hidden"
        style={{
          transition: `transform ${flipDurationMs}ms, opacity ${flipDurationMs}ms`,
          transformOrigin: 'top',
          transform: isFlipping ? 'rotateX(0deg)' : 'rotateX(-90deg)',
          opacity: isFlipping ? 1 : 0,
        }}
      >
        {words[nextIndex]}
      </span>
    </span>
  );
};

const RefinedHero = () => {
  // --- State & data fetch for the Chart ---
  const [performanceData, setPerformanceData] = useState([]);
  const [ytdReturn, setYtdReturn] = useState(null);

  // State for flipping cards
  const [flippedCard, setFlippedCard] = useState(null);

  // Fetch portfolio data from backend
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

  // Cards configuration
  const cards = [
    {
      title: 'Save',
      icon: Wallet,
      description: 'Smart Wealth Preservation',
      details:
        'Optimize your savings with AI-powered recommendations and automated strategies that align with Islamic principles.',
      link: '/savings',
    },
    {
      title: 'Invest',
      icon: TrendingUp,
      description: 'Data-Driven Growth',
      details:
        'Access carefully curated Shariah-compliant investment opportunities backed by advanced analytics.',
      link: '/invest',
    },
    {
      title: 'Tools',
      icon: Settings,
      description: 'Financial Planning',
      details:
        'Comprehensive suite of Islamic financial planning tools to help you make informed decisions.',
      link: '/tools',
    },
  ];

  return (
    <div className="w-full text-white">
      {/*
        =========================================
        MAIN HERO
        =========================================
      */}
      <div
        className="relative z-20"
        style={{
          minHeight: '100vh',
          padding: '2rem',
          background: 'linear-gradient(90deg, #e2eac3, #688d74)', // Updated background
          backdropFilter: 'blur(10px)',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Grow Your Wealth</h1>

          {/* Rotating Words */}
          <h2 className="text-3xl md:text-4xl font-semibold text-green-900">
            by <RotatingWords words={rotatingWords} />
          </h2>

          {/* "Start Investing" Button */}
          <button
            className="mt-10 px-8 py-4 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg text-white font-semibold shadow-md text-lg"
            onClick={() => (window.location.href = '/invest')}
          >
            Start Investing
          </button>

          {/* Flip Cards */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-10">
            {cards.map((card, index) => (
              <div
                key={index}
                className="relative w-72 h-96 cursor-pointer perspective-1000"
                // Slight tilt for a casual stacked look
                style={{
                  transform: `rotate(${(index - 1) * 1.5}deg)`,
                  perspective: '1000px',
                }}
                onMouseEnter={() => setFlippedCard(index)}
                onMouseLeave={() => setFlippedCard(null)}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 transform-style-3d"
                  style={{
                    transform:
                      flippedCard === index
                        ? 'rotateY(180deg)'
                        : 'rotateY(0deg)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front side */}
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden flex flex-col items-center justify-center p-6"
                    style={{
                      backgroundColor: 'rgba(0, 128, 0, 0.5)',
                      WebkitBackfaceVisibility: 'hidden',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <card.icon className="w-16 h-16 text-blue-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                    <p className="text-gray-200 text-center">
                      {card.description}
                    </p>
                  </div>

                  {/* Back side */}
                  <div
                    className="absolute inset-0 rounded-2xl p-6 backface-hidden flip-card-back"
                    style={{
                      backgroundColor: 'rgba(0, 128, 0, 0.8)',
                      transform: 'rotateY(180deg)',
                      WebkitBackfaceVisibility: 'hidden',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                        <p className="text-gray-200">{card.details}</p>
                      </div>
                      <a
                        href={card.link}
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mt-4"
                      >
                        Learn More <ArrowRight className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*
        =========================================
        DATA/ANALYTICS SECTION
        =========================================
      */}
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
                optimal performance while maintaining strict Shariah compliance.
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

              {/* Graph section */}
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
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280' }}
                      // Approximate monthly ticks
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
  );
};

export default RefinedHero;
