import React, { useState, useEffect } from 'react';
import { ResponsiveContainer } from 'recharts';
import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
      <section className="relative w-full h-[75vh] bg-midnight-blue overflow-hidden">
        {/* Hero Overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: 'url("your-geometric-pattern.png")',
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto pt-28 px-4 text-center text-white">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            style={{ fontFamily: 'Lora, serif', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
          >
            Data-driven Investment Solutions
          </motion.h1>
          <motion.p
            className="text-3xl md:text-3xl mb-6 text-black"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            Your journey towards sustainable growth starts here
          </motion.p>
          <Link
            to="/assets"
            className="inline-block px-8 py-4 bg-gold text-white font-semibold rounded-md shadow-lg mb-8"
          >
            Sharia Compliant
          </Link>

          {/* Interactive Arrow */}
          <div className="mt-8">
            <a href="#about" className="block animate-bounce text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Embedded Styles */}
        <style jsx>{`
          /* Colors */
          .bg-midnight-blue {
            background-color: #191970;
          }
          .bg-gold {
            background-color: #d4af37;
          }

          /* Arrow Animation */
          @keyframes bounce {
            0%,
            20%,
            50%,
            80%,
            100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
          .animate-bounce {
            animation: bounce 2s infinite;
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            h1 {
              font-size: 36px !important;
            }
            p {
              font-size: 18px !important;
            }
          }
        `}</style>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-midnight-blue text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Title and Tagline */}
          <h2 className="text-5xl font-bold mb-4" style={{ color: '#d4af37' , fontFamily: 'Lora, serif' }}>
            Growing Your Piggy Bank
          </h2>
          <p className="text-lg mb-12 text-gray-300" style = {{fontFamily: 'Lora, serif'}}>
            Guiding you to make robust financial decisions.
          </p>

          {/* Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Learn */}
            <div className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gold mx-auto mb-4">
                {/* Icon for Learn */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2a7 7 0 00-7 7v3l-2 2v1h18v-1l-2-2V9a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Learn</h3>
              <p className="text-gray-600 mb-6">
                Explore investment strategies, understand your options, and find
                solutions that align with your goals.
              </p>
              <Link
                to="/assets"
                className="inline-block px-4 py-2 bg-gold text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 transition"
              >
                Explore Assets
              </Link>
            </div>

            {/* Card 2: Manage */}
            <div className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gold mx-auto mb-4">
                {/* Icon for Manage */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 20h10a2 2 0 002-2V7a2 2 0 00-2-2h-5l-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Manage</h3>
              <p className="text-gray-600 mb-6">
                Use our advanced tools and data-driven services to optimise your
                investments with data from the last 10+ years.
              </p>
              <Link
                to="/allocation"
                className="inline-block px-4 py-2 bg-gold text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 transition"
              >
                Allocation Tools
              </Link>
            </div>

            {/* Card 3: Prosper */}
            <div className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gold mx-auto mb-4">
                {/* Icon for Prosper */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Prosper</h3>
              <p className="text-gray-600 mb-6">
                Stay informed with the latest investment news and explore
                tax-efficient growth strategies.
              </p>
              <Link
                to="/research"
                className="inline-block px-4 py-2 bg-gold text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 transition"
              >
                Research Insights
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Styles */}
      <style jsx>{`
        /* Colors */
        .bg-midnight-blue {
          background-color: #191970;
        }
        .bg-gold {
          background-color: #d4af37;
        }

        /* Arrow Animation */
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }

        /* Hover Effects */
        .hover\\:shadow-2xl:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          h1 {
            font-size: 36px !important;
          }
          h2 {
            font-size: 28px !important;
          }
          p {
            font-size: 16px !important;
          }
        }
      `}</style>

<section id="construction" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Text Content */}
<motion.div
  className="space-y-6"
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
>
  <h2
    className="text-5xl font-extrabold mb-4"
    style={{ color: '#191970', fontFamily: 'Lora, serif' }}
  >
    Build Real Wealth
  </h2>
  <p
    className="text-lg font-semibold"
    style={{ fontFamily: 'Open Sans, sans-serif', color: '#191970' }}
  >
    Tailored portfolios with a variety of assets:
  </p>
  <ul className="list-disc list-inside text-gray-600 text-lg" style={{ fontFamily: 'Open Sans, sans-serif' }}>
    <li>Equity</li>
    <li>Sukuk</li>
    <li>Real Estate</li>
    <li>Commodities</li>
  </ul>
  <p
    className="text-gray-600 text-lg mb-2"
    style={{
      fontFamily: 'Open Sans, sans-serif',
      fontSize: '0.75rem', // Smaller text size
    }}
  >
    Past performance isn't indicative of future growth.
  </p>
</motion.div>

          {/* Graph */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
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
                  <defs>
                    <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d4af37" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#d4af37" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSP500" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#191970" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#191970" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                    stroke="#d4af37"
                    fill="url(#colorPortfolio)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="S&P 500"
                    stroke="#191970"
                    fill="url(#colorSP500)"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </motion.div>
        </div>
      </div>

      {/* Embedded Styles */}
      <style jsx>{`
        .bg-white {
          background-color: #fff;
        }
      `}</style>
    </section>
        {/* How to Invest Section */}
<section id="how-to-invest" className="bg-gray-100 py-20">
  <div className="container mx-auto px-4">
    {/* Section Title */}
    <motion.h2
      className="text-4xl font-extrabold text-center mb-12"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{ fontFamily: 'Lora, serif', color: '#191970' }}
    >
      Take Action
    </motion.h2>

    {/* Steps Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Step 1 */}
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gold hover:shadow-2xl transition transform hover:scale-105"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-2xl font-bold mb-4" style={{ color: '#191970' }}>
          Step 1: Explore Investment Options
        </h3>
        <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          Start by exploring various Sharia-compliant investment options. Understand the risks,
          rewards, and strategies to see what resonates with your financial goals.
        </p>
        <a
          href="/articles"
          className="text-gold font-semibold hover:underline"
        >
          Read our in-depth articles
        </a>
      </motion.div>

      {/* Step 2 */}
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gold hover:shadow-2xl transition transform hover:scale-105"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-4" style={{ color: '#191970' }}>
          Step 2: Make Your Initial Investment
        </h3>
        <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          Use our recommended Trading 212 Pies or your preferred brokerage account to invest in
          tailored portfolios. Set up recurring investments for consistent growth.
        </p>
        <a
          href="/brokerage-options"
          className="text-gold font-semibold hover:underline"
        >
          Learn about brokerage options
        </a>
      </motion.div>

      {/* Step 3 */}
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gold hover:shadow-2xl transition transform hover:scale-105"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold mb-4" style={{ color: '#191970' }}>
          Step 3: Monitor & Stay Updated
        </h3>
        <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          Monitor your portfolio performance regularly. Subscribe to our email updates to receive
          quarterly allocation changes, market insights, and tailored recommendations.
        </p>
        <a
          href="/subscribe"
          className="text-gold font-semibold hover:underline"
        >
          Subscribe to our email list
        </a>
      </motion.div>
    </div>
  </div>

  {/* Embedded Styles */}
  <style jsx>{`
    .border-gold {
      border-color: #d4af37;
    }
    .text-gold {
      color: #d4af37;
    }
    .hover:shadow-2xl:hover {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
  `}</style>
</section>

<section id="research">
  {/* Section Background */}
  <div
    className="relative py-20"
    style={{
      background: 'linear-gradient(to right, #d4af37, #e0eafc)', // Matches the palette
    }}
  >
    {/* Decorative Overlay */}
    <div
      className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
      style={{
        backgroundImage: 'url(/images/decorative-shape.svg)', // Replace with an actual decorative SVG
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'top right',
      }}
    ></div>

<div className="container mx-auto px-4 relative z-10">
  <div className="space-y-8">
    {/* Title Section */}
    <div className="text-center">
      <h2
        className="text-5xl font-bold mb-4"
        style={{
          fontFamily: 'Lora, serif',
          color: '#191970',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        Explore Our Latest Research
      </h2>
    </div>

    {/* Articles Grid */}
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioData &&
          portfolioData.dashboard_data.research_articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={
                    article.image_url ||
                    'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A6f22b49f-c9e1-4ddf-9cc6-eead253330d0?source=next-article&fit=scale-down&quality=highest&width=1440&dpr=1'
                  }
                  alt={article.title}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-white text-sm px-2 py-1 rounded-lg shadow-md">
                  {article.date}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: '#191970' }}>
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {article.content.length > 120
                    ? `${article.content.substring(0, 120)}...`
                    : article.content}
                </p>
                <button
                  onClick={() => openArticleModal(article)}
                  className="text-yellow-500 font-semibold hover:underline"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
</div>

    {/* Article Modal */}
    {selectedArticle && (
      <Transition show={articleModalOpen} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          {/* Overlay */}
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

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          {/* Modal Content */}
          <Transition.Child
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full max-w-4xl"
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="bg-white p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold" style={{ color: '#191970' }}>
                  {selectedArticle.title}
                </h3>
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
          </Transition.Child>
        </div>
      </Transition>
    )}
    </div>
</section>

<section id="reviews" className="py-20" style={{ backgroundColor: '#191970' }}>
  <div className="container mx-auto px-4">
    <h2
      className="text-5xl font-bold text-center mb-12"
      style={{ fontFamily: 'Lora, serif', color: 'white' }}
    >
      Hear From Our Clients
    </h2>


    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={30}
      slidesPerView={1}
      breakpoints={{
        // when window width is >= 640px
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
      loop={true}
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
      navigation={true}
      className="relative"
    >
      {/* Review 1 */}
      <SwiperSlide>
        <div className="bg-white rounded-lg shadow-lg p-8 mx-4">
          <div className="mb-4">
            <p className="text-xl font-bold mb-2">Sarah K.</p>
            <div className="flex">
              {/* Star Ratings */}
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="h-5 w-5 text-gold"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.757 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            "This platform has transformed the way I invest. The tools are intuitive and the support is excellent."
          </p>
        </div>
      </SwiperSlide>

      {/* Review 2 */}
      <SwiperSlide>
        <div className="bg-white rounded-lg shadow-lg p-8 mx-4">
          <div className="mb-4">
            <p className="text-xl font-bold mb-2">Ahmed M.</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="h-5 w-5 text-gold"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.757 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            "A must-have for anyone looking to invest ethically. Highly recommended!"
          </p>
        </div>
      </SwiperSlide>

      {/* Review 3 */}
      <SwiperSlide>
        <div className="bg-white rounded-lg shadow-lg p-8 mx-4">
          <div className="mb-4">
            <p className="text-xl font-bold mb-2">Emily R.</p>
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  className="h-5 w-5 text-gold"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.757 4.635 1.123 6.545z" />
                </svg>
              ))}
              {/* Half Star */}
              <svg
                className="h-5 w-5 text-gold"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <defs>
                  <linearGradient id="halfStar">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#halfStar)"
                  d="M10 15l-5.878 3.09 1.123-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.757 4.635 1.123 6.545z"
                />
              </svg>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            "Their data-driven approach has given me confidence in my investments. The platform is user-friendly and insightful."
          </p>
        </div>
      </SwiperSlide>

      {/* Review 4 */}
      <SwiperSlide>
        <div className="bg-white rounded-lg shadow-lg p-8 mx-4">
          <div className="mb-4">
            <p className="text-xl font-bold mb-2">John D.</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="h-5 w-5 text-gold"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.757 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            "Excellent customer service and a great selection of investment options that align with my values."
          </p>
        </div>
      </SwiperSlide>

      {/* Add more SwiperSlides as needed */}
    </Swiper>

    {/* Swiper Navigation Buttons (optional customization) */}
    <style jsx>{`
      .swiper-button-next,
      .swiper-button-prev {
        color: #d4af37;
      }
      .swiper-pagination-bullet-active {
        background: #d4af37;
      }
    `}</style>
  </div>
</section>

  
<section
  id="contact"
  className="relative py-20 bg-cover bg-center"
  style={{ backgroundImage: 'url("your-geometric-pattern.png")' }}
>
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <div className="relative container mx-auto px-4 text-center">
    <h2
      className="text-4xl font-bold mb-4 text-white"
      style={{ fontFamily: 'Lora, serif' }}
    >
      Contact Us
    </h2>
    <p
      className="text-lg mb-8 text-gray-200"
      style={{ fontFamily: 'Open Sans, sans-serif' }}
    >
      Have questions or need support? Get in touch with us.
    </p>
    <a
      href="mailto:support@safinabank.com"
      className="bg-gold text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-600 transition"
    >
      Email Us
    </a>
  </div>
</section>
      </div>
    );
  }
  
  export default PortfolioOptimizer;
  