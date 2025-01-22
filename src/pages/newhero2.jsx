import React, { useState, useEffect, useRef } from 'react';

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
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InnovativeHero = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // -------------------------------------
  // PART 1: The hero cards (SAVINGS / INVEST / TOOLS)
  // -------------------------------------

 

  

  

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
        background: '#e2eac3', // Light background
      }}
    >
      

      {/*
        ==========================================
        DATA ANALYTICS SECTION
        ==========================================
      */}
      <section className=" w-full py-10 md:py-20 bg-light-background relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Text / CTA */}
            <div>
            <h2 className="text-5xl sm:text-5xl md:text-5xl font-medium mb-4 sm:mb-6 text-primary-green">
  Harnessing Algorithms
  <span className="block text-base sm:text-lg md:text-xl text-olive-green font-normal mt-2">
    Eliminating Bias, Enhancing Returns
  </span>
</h2>
<p className="text-sm sm:text-base md:text-lg text-deep-brown mb-4 sm:mb-8 font-medium">
  Leverage our advanced asset allocation algorithm, built on over 10 years of historical data and statistical modelling. We analyse market trends and performance metrics to provide personalised, Shariah-compliant multi-asset investment portfolios that maximise returns and balance risk.
</p>
              <button
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 bg-deep-teal hover:bg-deep-teal/80 transition-colors rounded-lg text-white font-medium shadow-md"
                onClick={() => navigate('/methodology')}
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
