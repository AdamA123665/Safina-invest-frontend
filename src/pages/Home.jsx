import React, { useState, useEffect } from 'react';
import { Tooltip as RechartsTooltip, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from 'lucide-react';
import { CreditCardIcon, GiftIcon, GlobeAltIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
            We empower you to make the best financial decisions, with algorithms based on 10 years of data, cutting-edge statistics, and industry-leading expertise.
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
            <Button className="mt-4" variant="outline" icon={<GlobeAltIcon className="w-5 h-5" />}>
              Learn More
            </Button>
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
            <Button className="mt-4" variant="outline" icon={<GlobeAltIcon className="w-5 h-5" />}>
              Learn More
            </Button>
          </motion.div>

          <motion.div
            className="bg-gray-100 p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center mb-4">
              <GlobeAltIcon className="w-8 h-8 text-green-500 mr-4" />
              <h3 className="text-2xl font-bold text-gray-800">Global Insights</h3>
            </div>
            <p className="text-gray-600">
              Our platform leverages worldwide financial data to deliver personalized recommendations tailored to your unique goals.
            </p>
            <Button className="mt-4" variant="outline" icon={<GlobeAltIcon className="w-5 h-5" />}>
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>

    <section id="construction" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-8 text-green-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Portfolio Construction
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-green-500">
              Historical Performance
            </h3>
            {portfolioData && (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
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
                  <Tooltip
                    formatter={(value) => `${(value * 100).toFixed(2)}%`}
                    contentStyle={{
                      backgroundColor: '#334155',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 12px',
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: '16px',
                      color: '#6B7280',
                      fontWeight: 'bold',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Portfolio"
                    stroke="#228B22"
                    fill="#228B22"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="S&P 500"
                    stroke="#FF0000"
                    fill="#FF0000"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-green-500">Asset Allocation</h3>
            <p className="text-gray-600 mb-6">
              See how your portfolio is constructed to understand its risk and return profile.
            </p>
            <Button
              href="/allocation"
              variant="outline"
              className="flex items-center"
              icon={<ChevronRightIcon className="w-5 h-5" />}
            >
              View Allocation
            </Button>
          </div>
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
  