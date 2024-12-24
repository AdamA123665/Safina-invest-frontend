import React, { useEffect, useState, useRef } from 'react';
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

// Rotating words for the subtitle
const words = ['saving', 'investing', 'staying Shariah compliant'];

// Separate Card Component for better readability and reusability
const Card = ({ card, isFlipped, onFlip }) => (
  <div
    className="relative w-72 h-96 cursor-pointer perspective-1000"
    onMouseEnter={onFlip}
    onMouseLeave={onFlip}
  >
    <div
      className={`absolute inset-0 transition-transform duration-700 transform-style-3d ${
        isFlipped ? 'rotateY-180' : ''
      }`}
      style={{
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}
    >
      {/* Front Side */}
      <div className="absolute inset-0 bg-green-800/80 rounded-2xl overflow-hidden backface-hidden flex flex-col items-center justify-center p-6">
        <card.icon className="w-16 h-16 text-blue-400 mb-4" />
        <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
        <p className="text-gray-200 text-center">{card.description}</p>
      </div>

      {/* Back Side */}
      <div className="absolute inset-0 bg-green-800/90 rounded-2xl p-6 backface-hidden rotateY-180">
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
);

const RefinedHero = () => {
  const [phase, setPhase] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const finalHeroRef = useRef(null);
  const [flippedCard, setFlippedCard] = useState(null);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [isFinalPhase, setIsFinalPhase] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // State for dynamic performance data
  const [performanceData, setPerformanceData] = useState([]);
  const [ytdReturn, setYtdReturn] = useState(null);

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
              risk_tolerance: 10, // Assuming 10 represents aggressive
            }),
          }
        );

        if (!response.ok) throw new Error('Failed to fetch portfolio data');
        const data = await response.json();

        const currentDate = new Date();
        const lastYearDate = new Date();
        lastYearDate.setFullYear(currentDate.getFullYear() - 1);

        const portfolioSeries = data.dashboard_data.performance.series.find(
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
    minValue - 0.05 * minValue, // Slightly lower than the minimum value
    maxValue + 0.2 * (maxValue - minValue), // Scale for a ~20% rise
  ];

  // Handle scroll for phase transitions
  useEffect(() => {
    const handleScroll = () => {
      if (isFinalPhase || isTransitioning) return; // Do not update phases if final phase is reached or transitioning

      const scrolled = window.scrollY;
      const vh = window.innerHeight;

      if (scrolled < vh) {
        setPhase(0);
        setTransitionProgress(0);
      } else if (scrolled < 1.5 * vh) { // Reduced scroll threshold
        setPhase(1);
        setTransitionProgress(0);
      } else if (scrolled < 2 * vh) { // Reduced scroll threshold
        setPhase(2);
        // Calculate transition progress between phase 2 and 3
        setTransitionProgress((scrolled - 1.5 * vh) / (0.5 * vh));
      } else {
        // **Initiate Transition to Final Phase**
        if (!isFinalPhase && !isTransitioning) {
          setIsTransitioning(true); // Start transition
          // **Disable Scrolling**
          document.body.style.overflow = 'hidden';

          // **Set a Timeout for the Transition Duration (e.g., 0.5 seconds)**
          setTimeout(() => {
            setPhase(3);
            setTransitionProgress(1);
            setIsFinalPhase(true); // Lock into final phase

            // **Re-enable Scrolling**
            document.body.style.overflow = '';

            setIsTransitioning(false); // End transition
          }, 500); // Transition duration in milliseconds
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check in case the user is not at the top
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFinalPhase, isTransitioning]);

  // **Cleanup Scroll Lock on Unmount**
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle mouse move for parallax
  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x, y });
  };

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
    <div
      className="w-full bg-gradient-to-br from-green-800 via-green-700 to-blue-800 text-white relative overflow-hidden"
      onMouseMove={handleMouseMove}
      ref={heroRef}
    >
      {/* 
        =============================
          INITIAL HERO SECTION (Phases 0-2)
          Rendered only when not in final phase
        =============================
      */}
      {!isFinalPhase && (
        <div className="relative h-[200vh]"> {/* Reduced height from 300vh to 200vh */}
          {/* Sticky container for text */}
          <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
            <div
              className={`text-center transition-transform duration-700`}
              style={{
                transform: `translate3d(${(mousePos.x * 0.02).toFixed(2)}px, ${
                  (mousePos.y * 0.02).toFixed(2)
                }px, 0)`,
              }}
            >
              {/* Main Title */}
              <h1
                className="text-5xl md:text-7xl font-bold mb-4 transition-transform duration-700 ease-out"
                style={{
                  transform: `translateY(-${transitionProgress * 50}px)`,
                }}
              >
                Grow your wealth
              </h1>
              {/* Subtitle with rotating words, hidden in phase 3 */}
              {phase < 3 && (
                <h2
                  className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 mb-6 transition-opacity duration-700 ease-out"
                  style={{
                    opacity: 1 - transitionProgress,
                  }}
                >
                  by {words[phase < 3 ? phase : 2]}
                </h2>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 
        =============================
          FINAL HERO SECTION (Phase 3)
          Always rendered below the initial hero
        =============================
      */}
      <div
        ref={finalHeroRef}
        className={`bg-green-900/80 backdrop-blur-md z-20 transition-opacity duration-700 ${
          isFinalPhase ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          minHeight: '100vh',
          padding: '2rem',
          transitionDelay: isFinalPhase ? '0.3s' : '0s', // Slight delay for smoother appearance
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          {/* Static Title */}
          <h1
            className={`text-3xl md:text-5xl font-bold mb-4 transition-opacity duration-700 ease-out ${
              isFinalPhase ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Grow your wealth
          </h1>
          {/* "Start Investing" Button */}
          {isFinalPhase && (
            <button
              className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg text-white font-semibold shadow-md transform transition-transform duration-300 hover:scale-105"
              onClick={() => (window.location.href = '/invest')}
            >
              Start Investing
            </button>
          )}
          {/* Flip Cards */}
          {isFinalPhase && (
            <div
              className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8 transition-opacity duration-700 ease-out"
              style={{
                opacity: isFinalPhase ? 1 : 0,
              }}
            >
              {cards.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  isFlipped={flippedCard === index}
                  onFlip={() => setFlippedCard(flippedCard === index ? null : index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 
        =============================
          DATA/ANALYTICS SECTION
        =============================
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
                Make informed decisions with our advanced analytics and real-time market insights.
                Our data-driven approach ensures optimal performance while maintaining strict
                Shariah compliance.
              </p>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg text-white font-semibold shadow-md transform transition-transform duration-300 hover:scale-105"
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
                <div className="flex-1 bg-green-100 border border-gray-200 rounded-lg p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105">
                  <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    Volatility
                  </span>
                  <span className="text-2xl font-bold text-green-700">12.5%</span>
                </div>
                {/* YTD Return */}
                <div className="flex-1 bg-green-100 border border-gray-200 rounded-lg p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105">
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
                      interval={Math.max(1, Math.floor(performanceData.length / 4) - 1)} // Show approximately 4 months
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
