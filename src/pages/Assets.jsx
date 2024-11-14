// src/pages/Assets.jsx

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';

function Assets() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [expandedAsset, setExpandedAsset] = useState(null);

  useEffect(() => {
    // Fetch portfolio data (including asset information)
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch(
          'https://safinabackend.azurewebsites.net/api/portfolio/optimize',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              initial_investment: 1000, // Adjust as needed
              risk_tolerance: 5,        // Adjust as needed
            }),
          }
        );

        if (!response.ok) throw new Error('Failed to fetch portfolio data');
        const data = await response.json();
        setPortfolioData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPortfolioData();
  }, []);

  // Toggle the expansion for only the clicked asset
  const toggleExpand = (assetTicker) => {
    setExpandedAsset(expandedAsset === assetTicker ? null : assetTicker);
  };

  return (
    <section id="assets" className="bg-gradient-to-b from-green-50 to-green-100 py-20">
      <div className="container mx-auto px-4">
        {/* Introduction */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold text-green-800 mb-6">
            Understanding Asset Classes & Sharia-Compliant ETFs
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            Investing can be overwhelming for beginners. Here's a simple guide to asset classes,
            the key types relevant to retail investors, and how Sharia-compliant ETFs offer a
            diversified, ethical investment avenue.
          </p>
        </div>

        {/* Asset Classes Explanation */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-green-700 mb-8 text-center">
            What Are Asset Classes?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Asset Class 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <img
                src="https://source.unsplash.com/400x300/?stocks,market"
                alt="Equities"
                className="w-full h-48 object-cover rounded-t-lg mb-6"
              />
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Equities (Stocks)</h3>
              <p className="text-gray-700">
                Equities represent ownership in a company. They offer potential growth through
                capital appreciation and dividends. Sharia-compliant equities avoid businesses
                involved in prohibited activities.
              </p>
            </div>
            {/* Asset Class 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <img
                src="https://source.unsplash.com/400x300/?bonds,finance"
                alt="Fixed Income"
                className="w-full h-48 object-cover rounded-t-lg mb-6"
              />
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Fixed Income (Sukuk)</h3>
              <p className="text-gray-700">
                Sukuk are Islamic bonds providing regular income without violating Sharia law.
                They offer a more stable investment compared to equities.
              </p>
            </div>
            {/* Asset Class 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <img
                src="https://source.unsplash.com/400x300/?real-estate,investment"
                alt="Real Assets"
                className="w-full h-48 object-cover rounded-t-lg mb-6"
              />
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Real Assets</h3>
              <p className="text-gray-700">
                Real assets include investments in physical assets like real estate and commodities.
                They provide diversification and protection against inflation.
              </p>
            </div>
          </div>
        </div>

        {/* ETFs Explanation */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-green-700 mb-8 text-center">
            What Are ETFs?
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-gray-700 mb-6">
              An ETF (Exchange-Traded Fund) is a basket of stocks or other assets that tracks an
              index. For Sharia-compliant investing, there are several ETFs that track specific
              indices adhering to Islamic principles.
            </p>
            <p className="text-xl text-gray-700">
              Below, you'll find the ETFs we use in our optimizer. These ETFs cover a variety of
              sectors and regions, offering diversified exposure to Sharia-compliant investments.
            </p>
          </div>
        </div>

        {/* ETFs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData &&
            portfolioData.dashboard_data.asset_info.map((asset, index) => {
              // Prepare performance data for the graph
              const performanceData =
                portfolioData.dashboard_data.performance.dates.map((date, idx) => ({
                  date,
                  value:
                    portfolioData.dashboard_data.performance.series.find(
                      (s) => s.name === asset.name
                    )?.values[idx] || 0,
                }));

              // Check if this specific asset is expanded
              const isExpanded = expandedAsset === asset.ticker;

              return (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`bg-white rounded-xl shadow-xl border-2 transition-all duration-300 ${
                    isExpanded ? 'p-6' : 'p-4 h-40'
                  }`}
                  style={{
                    borderColor: asset.color,
                    minHeight: isExpanded ? 'auto' : '10px',
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: asset.color }}
                    >
                      {asset.name}
                    </h3>
                    <button
                      onClick={() => toggleExpand(asset.ticker)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {isExpanded ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <ChevronDownIcon className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Ticker: <span className="font-medium">{asset.ticker}</span>
                  </p>
                  {isExpanded && (
                    <div className="mt-4">
                      <p className="text-sm mb-4 text-gray-700">{asset.info}</p>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={performanceData}>
                          <XAxis dataKey="date" tick={{ fill: '#6B7280' }} />
                          <YAxis
                            tick={{ fill: '#6B7280' }}
                            tickFormatter={(value) =>
                              `${(value * 100).toFixed(0)}%`
                            }
                          />
                          <RechartsTooltip
                            formatter={(value) =>
                              `${(value * 100).toFixed(2)}%`
                            }
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={asset.color}
                            dot={false}
                            strokeWidth={3}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default Assets;
