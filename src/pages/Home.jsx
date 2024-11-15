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
    }, [portfolioData]);
    
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
                  Empowering your investments
                </motion.h1>
                <motion.p
                  className="text-xl mb-8 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Learn. Manage. Relax.
                </motion.p>
                <motion.button
                  className="px-8 py-4 bg-white text-green-700 font-semibold rounded-full shadow-lg hover:bg-green-50 transition"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Sharia Compliant
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
    
          <section id="about" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 sm:px-8 lg:px-10">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-10">
                  <motion.h2
                    className="text-5xl font-bold mb-6 text-gray-800 leading-tight"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    Empowering Your Financial Growth
                  </motion.h2>
                  <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, staggerChildren: 0.3 }}
                  >
                    <motion.div>
                      <h3 className="text-3xl font-semibold text-green-600 mb-4">1. Decade of Data</h3>
                      <p className="text-lg text-gray-600">
                        Our algorithms are built on 10 years of financial data, giving you insights that have been tested and refined over time to ensure reliability.
                      </p>
                    </motion.div>
                    <motion.div>
                      <h3 className="text-3xl font-semibold text-green-600 mb-4">2. Cutting-edge Analysis</h3>
                      <p className="text-lg text-gray-600">
                        Utilizing advanced statistical models and the latest in AI technology, our system ensures you're getting the most accurate financial recommendations available.
                      </p>
                    </motion.div>
                    <motion.div>
                      <h3 className="text-3xl font-semibold text-green-600 mb-4">3. Backed by Industry Leaders</h3>
                      <p className="text-lg text-gray-600">
                        Our partners include top industry experts and leading institutions, bringing trusted expertise to guide your financial decisions.
                      </p>
                    </motion.div>
                    <motion.div className="mt-8">
                      <a 
                        href="#assets" 
                        className="text-lg font-semibold text-blue-600 hover:underline"
                      >
                        Learn more about investing
                      </a>
                    </motion.div>
                  </motion.div>
                </div>

                <div className="lg:w-1/2 lg:pl-10 mt-12 lg:mt-0">
                  <motion.img
                    src={`${process.env.PUBLIC_URL}/jardollar.png`}
                    alt="About Us"
                    className="rounded-xl shadow-lg w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-16">
                <a href="#construction">
                  <motion.svg
                    className="w-12 h-12 animate-bounce text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </a>
              </div>
            </div>
          </section>



    /* Portfolio Showcase Section */
<section id="portfolio-showcase" className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-5xl font-extrabold mb-4 text-green-600">Our Proven Performance</h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Witness our strategy in action. Below, we present our historical performance against the S&P 500 along with our optimized asset allocation. We believe in data-driven insights that outperform traditional benchmarks, and here’s the proof.
      </p>
    </div>

    {/* Performance Section */}
    <div className="flex flex-col lg:flex-row lg:space-x-12 mb-16">
      {/* Left Side: Historical Performance Graph */}
      <div className="lg:w-1/2 mb-12 lg:mb-0">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h3 className="text-3xl font-bold mb-6 text-green-600">Historical Performance vs. S&P 500</h3>
          {portfolioData && (
            <ResponsiveContainer width="100%" height={350}>
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
                <XAxis dataKey="date" tick={{ fill: '#374151' }} tickLine={false} />
                <YAxis tick={{ fill: '#374151' }} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                <RechartsTooltip formatter={(value) => `${(value * 100).toFixed(2)}%`} />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Line type="monotone" dataKey="Portfolio" stroke="#2E8B57" strokeWidth={3} dot={{ r: 1 }} />
                <Line type="monotone" dataKey="S&P 500" stroke="#DC2626" strokeWidth={3} dot={{ r: 1 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Right Side: Asset Allocation and Summary */}
      <div className="lg:w-1/2">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h3 className="text-3xl font-bold mb-6 text-green-600">Optimized Asset Allocation</h3>
          {portfolioData && (
            <ResponsiveContainer width="100%" height={360}>
              <PieChart>
                <Pie
                  data={Object.entries(portfolioData.portfolio_metrics.Weights).map(([name, value], idx) => ({
                    name,
                    value: value * 100,
                    color: COLORS[idx % COLORS.length],
                  }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  labelLine={false}
                  label={({ name }) => `${name}`}
                >
                  {Object.entries(portfolioData.portfolio_metrics.Weights).map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
          {/* Allocation Table */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            {portfolioData &&
              Object.entries(portfolioData.portfolio_metrics.Weights).map(([assetName, weight], index) => (
                <div key={index} className="bg-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-700">{assetName}</h4>
                  <p className="text-green-800">{(weight * 100).toFixed(2)}%</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>

    {/* Learn More Section */}
    <div className="text-center">
      <h3 className="text-3xl font-bold text-green-600 mb-6">Interested in Learning More?</h3>
      <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
        Our algorithms work tirelessly to achieve the optimal asset mix for your investment profile. To see how we can help you achieve your goals, explore the full allocation section.
      </p>
      <a href="#allocation" className="inline-block bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700">
        Explore Our Asset Allocation Strategy
      </a>
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
  