import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, } from 'recharts';
import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import { Link,} from 'react-router-dom';
import { XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Globe, CreditCardIcon, GiftIcon } from 'lucide-react';
const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#FF6666',
    '#AAEEBB',
    '#BBBBBB',
    '#7744DD',
  ];
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
                  Empowering your investments
                </motion.h1>
                <motion.p
                  className="text-xl mb-8 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Learn. Manage. Prosper.
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
    
          {/* About Section */}
    <section id="about" className="py-32 bg-white">
      <div className="container mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-5xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Growing the Piggy Bank
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Guiding you to make the best financial decisions. Helping you and the ones you love
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-gray-100 p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <CreditCardIcon className="w-8 h-8 text-green-500 mr-4" />
              <h3 className="text-2xl font-bold text-gray-800">Data-Driven Decisions</h3>
            </div>
            <p className="text-gray-600">
              Our algorithms are powered by 10 years of financial data, ensuring you make informed choices that grow your wealth.
            </p>

          </motion.div>

          <motion.div
            className="bg-gray-100 p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <GiftIcon className="w-8 h-8 text-green-500 mr-4" />
              <h3 className="text-2xl font-bold text-gray-800">Trustworthy Advice</h3>
            </div>
            <p className="text-gray-600">
              Our team of industry experts ensures you receive guidance you can trust, backed by cutting-edge analytics.
            </p>

          </motion.div>

          <motion.div
            className="bg-gray-100 p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center mb-4">
              <Globe className="w-8 h-8 text-green-500 mr-4" />
              <h3 className="text-2xl font-bold text-gray-800">Global Insights</h3>
            </div>
            <p className="text-gray-600">
              Our platform leverages worldwide financial data to deliver personalized recommendations tailored to your unique goals.
            </p>

            </motion.div>
            </div>
            </div>

            <p className="mt-8 text-center text-gray-600">
            If you want to learn more about investing,{' '}
            <Link 
                to="/assets" 
                className="text-green-600 underline hover:text-green-800 transition"
            >
                click here
            </Link>.
            </p>
            </section>


    {/* Asset Allocation Section */}
<section id="construction" className="py-16 bg-gray-50">
  <div className="container mx-auto px-6 sm:px-8 lg:px-10">
    {/* Section Heading */}
    <div className="text-center mb-12">
      <motion.h2
        className="text-4xl font-bold text-green-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Tools Help You Become a Leading Wall Street Investor
      </motion.h2>
      <motion.p
        className="text-lg text-gray-600 max-w-3xl mx-auto mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Master the art of investing with our cutting-edge analytics and asset allocation tools.
      </motion.p>
    </div>

    {/* Asset Allocation and Graph */}
    <div className="flex flex-col lg:flex-row lg:space-x-8">
      {/* Asset Allocation Table */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-6 lg:w-1/2"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-4">Your Asset Allocation</h2>
        <div className="space-y-4">
          {Object.entries(portfolioData.portfolio_metrics.Weights).map(([assetName, weight], index) => (
            <div
              key={index}
              className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm"
              style={{ borderLeft: `8px solid ${COLORS[index % COLORS.length]}` }}
            >
              <span className="font-semibold text-gray-700 flex-grow">{assetName}</span>
              <span className="font-bold text-gray-800">{(weight * 100).toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Historical Performance Graph */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 lg:w-1/2"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-4">Historical Performance vs. S&P 500</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={portfolioData.dashboard_data.performance.dates.map((date, idx) => ({
              date,
              Portfolio:
                portfolioData.dashboard_data.performance.series.find(
                  (s) => s.name === 'Portfolio'
                )?.values[idx] || 0,
              'S&P 500':
                portfolioData.dashboard_data.performance.series.find(
                  (s) => s.name === 'S&P 500'
                )?.values[idx] || 0,
            }))}
          >
            <XAxis dataKey="date" tick={{ fill: '#6B7280' }} />
            <YAxis
              tick={{ fill: '#6B7280' }}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <Tooltip formatter={(value) => `${(value * 100).toFixed(2)}%`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="Portfolio"
              stroke="#10B981"
              dot={false}
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="S&P 500"
              stroke="#EF4444"
              dot={false}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    {/* Learn More Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="text-center mt-12"
    >
      <p className="text-lg text-gray-600">
        Want to explore more about asset allocation strategies?
      </p>
      <Link
        to="/allocation"
        className="inline-block mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Learn More
      </Link>
    </motion.div>
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
  