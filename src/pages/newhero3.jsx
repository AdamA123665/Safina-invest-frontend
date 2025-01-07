import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  TrendingUp,
  ArrowUpRight,
  Wallet,
  Clock,
  Shield,
  ChevronRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const HeroSection = () => {
  const [timeframe, setTimeframe] = useState('6M');
  const navigate = useNavigate(); // Initialize navigate

  // Clean, smooth market data focusing on key movements
  const data = [
    { date: 'Sep', value: 11200 },
    { date: 'Oct', value: 12000 },
    { date: 'Nov', value: 11600 },
    { date: 'Dec', value: 11900 },
    { date: 'Jan', value: 13248 },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-deep-teal to-gold ">
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-24 md:pt-32 md:pb-24">
        {/* Updated flex direction: flex-col on mobile, flex-row on medium screens */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-white">
            <h1 className="text-5xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6">
              Your Wealth,
              <span className="block text-olive-green">Simplified</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-sage">
              Smart tools to save, invest, and grow your wealth - all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              {/* Get Started Button as an Anchor Tag */}
              <a
                href="#newhero"
                className="bg-primary-green text-light-background px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-dark-green transition-colors text-center"
              >
                Get Started
              </a>

              {/* Invest Now Button with navigate */}
              <button
                onClick={() => navigate('/allocation')}
                className="border-2 border-light-background text-light-background px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-light-background/20 transition-colors flex items-center justify-center gap-2"
              >
                Invest Now <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-sage" />
                <span className="text-sage">Shariah Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-sage" />
                <span className="text-sage">Algorithmic Asset Allocation</span>
              </div>
            </div>
          </div>

          {/* Right Content - App Interface Mock */}
          <div className="flex-1 w-full max-w-md">
            <div className="bg-light-background backdrop-blur-lg rounded-3xl p-6 border border-sage">
              {/* Portfolio Value */}
              <div className="mb-6">
                <div className="text-deep-teal mb-2">Portfolio Value</div>
                <div className="flex items-center gap-4">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-teal">
                    £13,748
                  </div>
                  <div className="flex items-center bg-olive-green/20 text-dark-green px-3 py-1 rounded-full">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    15.2%
                  </div>
                </div>
              </div>

              {/* Timeframe Selector */}
              <div className="flex flex-wrap gap-2 mb-4">
                {['1M', '3M', '6M', '1Y'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeframe(period)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      timeframe === period
                        ? 'bg-olive-green text-light-background'
                        : 'text-deep-teal hover:bg-olive-green/10'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>

              {/* Chart */}
              <div className="h-40 sm:h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
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
                      dataKey="date"
                      axisLine={false}
                      tick={{ fill: '#0a4c4c' }}
                      interval={0}
                      fontSize={12}
                    />
                    <YAxis hide={true} domain={['dataMin - 200', 'dataMax + 200']} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px',
                      }}
                      labelStyle={{ color: '#0a4c4c' }}
                      itemStyle={{ color: '#066b06' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#066b06"
                      strokeWidth={2}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-sage/20 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-deep-teal mb-2">
                    <Clock className="w-4 h-4" />
                    Monthly Return
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-deep-teal">
                    +£548
                  </div>
                </div>
                <div className="bg-sage/20 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-deep-teal mb-2">
                    <Wallet className="w-4 h-4" />
                    Total Invested
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-deep-teal">
                    £11,940
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 text-deep-teal text-xs text-center">
                * This is for illustrative purposes only. Past performance is not indicative of future results.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
