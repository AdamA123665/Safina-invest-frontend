import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8A2BE2', '#FF69B4', '#A52A2A', '#5F9EA0', '#D2691E', '#FF7F50'];

const PortfolioOptimizer = () => {
    const [portfolioData, setPortfolioData] = useState(null);
    const [, setSelectedAsset] = useState(null);
    const [articleModalOpen, setArticleModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
   // Fetch aggressive portfolio data
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
        setPortfolioData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPortfolioData();
  }, []);
  
    useEffect(() => {
      if (
        portfolioData &&
        portfolioData.dashboard_data &&
        portfolioData.dashboard_data.asset_info
      ) {
        setSelectedAsset(portfolioData.dashboard_data.asset_info[0]);
      }
    }, [portfolioData, setSelectedAsset]);
    
  
    const openArticleModal = (article) => {
      setSelectedArticle(article);
      setArticleModalOpen(true);
    };

  
  
    return (
        <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
          {/* Hero Section */}
          <section
            id="hero"
            className="relative bg-gradient-to-br from-green-600 to-blue-800 text-white"
          >
            <div className="container mx-auto px-6 sm:px-8 lg:px-10 py-32">
              <div className="text-center">
                <motion.h1
                  className="text-6xl font-extrabold mb-6"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Growing Your Piggy Bank
                </motion.h1>
                <motion.p
                  className="text-xl mb-8 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  We empower you to make the best financial decisions with algorithms based on 10 years
                  of data, cutting-edge statistics, and backed by industry leaders.
                </motion.p>
                <motion.button
                  className="px-8 py-4 bg-white text-green-700 font-semibold rounded-full shadow-lg hover:bg-green-50 transition"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Get Started
                </motion.button>
              </div>
            </div>
            {/* Decorative Wave */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
              <svg
                className="relative block w-full h-16"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                viewBox="0 0 1920 80"
              >
                <path d="M0,80L1920,0L1920,80L0,80Z" fill="white"></path>
              </svg>
            </div>
          </section>
    
          {/* About Section */}
      <section id="about" className="py-24 bg-white">
        {/* ... Your about section content ... */}
        <div className="container mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center">
            <motion.h2
              className="text-5xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Growing the Piggy Bank
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We empower you to make the best financial decisions, which is why our algorithms are based on 10 years worth of data, cutting-edge statistics, and are backed by industry leaders.
            </motion.p>
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Don't just take our word... trust the data.
            </motion.p>
          </div>
          {/* Downward Arrow to Draw Attention */}
          <div className="flex justify-center mt-8">
            <a href="#construction">
              <svg
                className="w-8 h-8 animate-bounce text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Construction Section */}
      <section id="construction" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-green-500">Portfolio Construction</h2>
          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* Left Side: Pie Chart and Asset Allocation */}
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4 text-green-500">Asset Allocation</h3>
                {portfolioData && (
                  <ResponsiveContainer width="100%" height={360}>
                    <PieChart>
                      <Pie
                        data={Object.entries(
                          portfolioData.portfolio_metrics.Weights
                        ).map(([name, value], idx) => ({
                          name,
                          value: value * 100,
                          color: COLORS[idx % COLORS.length],
                        }))}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        labelLine={false}
                        label={({ name, percent, x, y, cx, cy }) => {
                          if (percent < 0.01) return null; // Skip rendering if the percentage is negligible

                          const RADIAL_OFFSET = 1.4; // Adjust this multiplier to control the distance

                          // Calculate angle and new positions for radial offset
                          const newX = cx + (x - cx) * RADIAL_OFFSET;
                          const newY = cy + (y - cy) * RADIAL_OFFSET;

                          return (
                            <text
                              x={newX}
                              y={newY}
                              fill={
                                COLORS[
                                  Object.keys(portfolioData.portfolio_metrics.Weights).indexOf(
                                    name
                                  ) % COLORS.length
                                ]
                              }
                              textAnchor="middle"
                              dominantBaseline="central"
                              fontWeight="bold"
                            >
                              {`${name}`}
                            </text>
                          );
                        }}
                      >
                        {Object.entries(portfolioData.portfolio_metrics.Weights).map(
                          (entry, idx) => (
                            <Cell
                              key={`cell-${idx}`}
                              fill={COLORS[idx % COLORS.length]}
                            />
                          )
                        )}
                      </Pie>
                      <RechartsTooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              {/* Asset Allocation Details */}
              <div className="grid grid-cols-2 gap-4">
                {portfolioData &&
                  Object.entries(portfolioData.portfolio_metrics.Weights).map(
                    ([assetName, weight], index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow p-4"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      >
                        <h4 className="font-bold text-white">{assetName}</h4>
                        <p className="text-white">{(weight * 100).toFixed(2)}%</p>
                      </div>
                    )
                  )}
              </div>
            </div>

            {/* Right Side: Historical Performance Graph */}
            <div className="md:w-1/2 mt-6 md:mt-0">
              {portfolioData && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-bold mb-4 text-green-500">
                    Historical Performance vs. S&P 500
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={portfolioData.dashboard_data.performance.dates.map(
                        (date, idx) => ({
                          date,
                          Portfolio:
                            portfolioData.dashboard_data.performance.series.find(
                              (s) => s.name === 'Portfolio'
                            )?.values[idx] || 0,
                          'S&P 500':
                            portfolioData.dashboard_data.performance.series.find(
                              (s) => s.name === 'S&P 500'
                            )?.values[idx] || 0,
                        })
                      )}
                    >
                      <XAxis dataKey="date" tick={{ fill: '#6B7280' }} />
                      <YAxis
                        tick={{ fill: '#6B7280' }}
                        tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                      />
                      <RechartsTooltip
                        formatter={(value) => `${(value * 100).toFixed(2)}%`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Portfolio"
                        stroke="#228B22"
                        dot={false}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="S&P 500"
                        stroke="#FF0000"
                        dot={false}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>



    


  
        {/* How to Invest Section */}
        <section id="how-to-invest" className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">How to Invest</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-2">Step 1</h3>
                <p>Open an account with your prefered investment platforn. There are pros and cons fo each of them however Trading212 seems to have the lowest fees.</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-2">Step 2</h3>
                <p>Leverage our asset allocation tool to invest the right amounts into the Sharia ETF&apos.</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-2">Step 3</h3>
                <p>Invest and monitor your portfolio performance. If your not happy with the amount of volatility then you can always change and rebalance. I suggest setting a direct debit and investing a fixed amount each month</p>
              </div>
            </div>
          </div>
        </section>
  
        <section id="research" className="py-20">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold mb-8">Research</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {portfolioData && portfolioData.dashboard_data.research_articles.map((article, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={article.image_url || 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A6f22b49f-c9e1-4ddf-9cc6-eead253330d0?source=next-article&fit=scale-down&quality=highest&width=1440&dpr=1'}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2">{article.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{article.date}</p>
            <div className="text-gray-700 mb-4 h-24 overflow-hidden">
              {article.content}
            </div>
            <button
              onClick={() => openArticleModal(article)}
              className="text-blue-500 underline"
            >
              Read More
            </button>

          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Article Modal */}
<Transition show={articleModalOpen} className="fixed z-10 inset-0 overflow-y-auto">
  <div className="flex items-center justify-center min-h-screen px-4 text-center">
    <Transition.Child
      className="fixed inset-0 transition-opacity"
      aria-hidden="true"
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    </Transition.Child>

    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

    <Transition.Child
      className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full max-w-3xl"
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enterTo="opacity-100 translate-y-0 sm:scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      {selectedArticle && (
        <div className="bg-white p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">{selectedArticle.title}</h3>
            <button
              onClick={() => setArticleModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">{selectedArticle.date}</p>
          <div className="prose max-w-none">
            <p>{selectedArticle.content}</p>
          </div>
        </div>
      )}
    </Transition.Child>
  </div>
</Transition>

</section>


  
        {/* Reviews Section */}
        <section id="reviews" className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="mb-4">"This platform has transformed the way I invest. The tools are intuitive and the support is excellent."</p>
                <p className="font-bold">- Sarah K.</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="mb-4">"A must-have for anyone looking to invest ethically. Highly recommended!"</p>
                <p className="font-bold">- Ahmed M.</p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Contact Us Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg mb-8">Have questions or need support? Get in touch with us.</p>
            <a href="mailto:support@safinabank.com" className="bg-green-500 text-white px-6 py-3 rounded-lg">Email Us</a>
          </div>
        </section>
      </div>
    );
  }
  
  export default PortfolioOptimizer;
  