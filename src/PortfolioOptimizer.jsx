import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, LineChart, Line, XAxis, YAxis, ResponsiveContainer
} from 'recharts';
import {ChevronUpIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import { MenuIcon, ChevronDownIcon, XIcon } from '@heroicons/react/outline';
import "./index.css";
import { motion } from 'framer-motion';
import { CheckCircleIcon } from 'lucide-react';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8A2BE2', '#FF69B4', '#A52A2A', '#5F9EA0', '#D2691E', '#FF7F50'];

const PortfolioOptimizer = () => {
    const [initialInvestment, setInitialInvestment] = useState(10000);
    const [riskTolerance, setRiskTolerance] = useState(5);
    const [portfolioData, setPortfolioData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [, setSelectedAsset] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [articleModalOpen, setArticleModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
  
    // State to track the expanded asset's unique identifier
    const [expandedAsset, setExpandedAsset] = useState(null);
  
    useEffect(() => {
      const fetchPortfolioData = async () => {
        setIsLoading(true);
        setError(null);
  
        try {
          const response = await fetch(
            'https://safinabackend.azurewebsites.net/api/portfolio/optimize',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                initial_investment: initialInvestment,
                risk_tolerance: riskTolerance,
              }),
            }
          );
  
          if (!response.ok) throw new Error('Optimization failed');
          const data = await response.json();
          setPortfolioData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchPortfolioData();
    }, [initialInvestment, riskTolerance]);
  
    useEffect(() => {
      if (
        portfolioData &&
        portfolioData.dashboard_data &&
        portfolioData.dashboard_data.asset_info
      ) {
        setSelectedAsset(portfolioData.dashboard_data.asset_info[0]);
      }
    }, [portfolioData, setSelectedAsset]);
    

    // Toggle the expansion for only the clicked asset, ensuring others remain collapsed
    const toggleExpand = (assetTicker) => {
      setExpandedAsset(expandedAsset === assetTicker ? null : assetTicker);
      // If you want to set the selected asset when expanded
      setSelectedAsset(expandedAsset === assetTicker ? null : assetTicker);
    };
    
  
    const openArticleModal = (article) => {
      setSelectedArticle(article);
      setArticleModalOpen(true);
    };
  
    const scrollToSection = (sectionId) => {
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    };
  
  
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      {/* Hero Section with Navigation Bar */}
      <div
        className="text-white"
        style={{
          backgroundImage:
            'url(https://executiveboatandyacht.com/wp-content/uploads/2015/08/sail-boats-on-horizon.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Navigation Bar */}
        <header className="container mx-auto px-6 sm:px-8 lg:px-10">
          <nav className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
  <div className="flex-shrink-0 flex items-center">
    <img
      src={`${process.env.PUBLIC_URL}/safina_invest_logo-removebg-preview.png`}
      alt="Safina Invest Logo"
      style={{ width: '100px', height: 'auto', paddingTop: '5px' }}
    />
  </div>
  <span className="font-bold text-xl" style={{ color: '#228B22' }}> {/* Adjust to match your green shade */}
    Safina Invest
  </span>
</div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
              {/* Navigation Buttons with Grey Semi-Transparent Bubbles */}
              <button
                onClick={() => scrollToSection('about')}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white bg-gray-500 bg-opacity-50 hover:bg-opacity-75"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('assets')}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white bg-gray-500 bg-opacity-50 hover:bg-opacity-75"
              >
                Assets
              </button>
              <button
                onClick={() => scrollToSection('construction')}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white bg-gray-500 bg-opacity-50 hover:bg-opacity-75"
              >
                Construction
              </button>
              <button
                onClick={() => scrollToSection('research')}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white bg-gray-500 bg-opacity-50 hover:bg-opacity-75"
              >
                Research
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white bg-gray-500 bg-opacity-50 hover:bg-opacity-75"
              >
                Contact Us
              </button>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-full text-white bg-gray-500 bg-opacity-50 hover:bg-opacity-75"
              >
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </nav>
          {/* Mobile menu */}
          <Transition show={mobileMenuOpen} className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('about')}
                className="block pl-3 pr-4 py-2 rounded-full text-base font-medium text-white bg-gray-500 bg-opacity-50 hover:bg-opacity-75"
              >
                About
              </button>
              {/* ... other menu items ... */}
            </div>
          </Transition>
        </header>
  
        {/* Hero Section */}
        <section
          id="hero"
          className="container mx-auto px-6 sm:px-8 lg:px-10 flex flex-col md:flex-row items-center justify-between py-20"
        >
          <div className="md:w-1/2">
            <h1 className="text-6xl font-bold mb-4">Ethical Investing</h1>
            <p className="text-2xl mb-6">
              Empower your financial future with sustainable investments
            </p>
            {/* "Sharia Compliant" Badge */}
            <div className="inline-flex items-center bg-white text-[#228B22] px-6 py-3 rounded-full shadow-lg">
              <span className="text-lg font-medium">Sharia Compliant</span>
            </div>
            {/* "Manage. Grow. Develop." Text Separate from Badge */}
            <p className="text-lg font-medium mt-6">Manage. Grow. Develop.</p>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            {/* Your chart or other content here */}
          </div>
        </section>
      </div>
  

      {/* About Section */}
<section id="about" className="py-24 bg-gradient-to-br from-green-600 to-green-900">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-white font-display"
    >
      <h2 className="text-5xl font-bold mb-8">Investing Simplified</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-xl font-medium mb-6">At Safina, we provide:</p>
          <ul className="space-y-6">
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-start"
            >
              <CheckCircleIcon className="text-green-400 mr-4 mt-1" size={24} />
              <span className="text-lg">Institutional-grade tools to empower your decision-making</span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-start"
            >
              <CheckCircleIcon className="text-green-400 mr-4 mt-1" size={24} />
              <span className="text-lg">Tailored investment solutions for your unique circumstances</span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex items-start"
            >
              <CheckCircleIcon className="text-green-400 mr-4 mt-1" size={24} />
              <span className="text-lg">Expert guidance to help you achieve your financial goals</span>
            </motion.li>
          </ul>
        </div>
        <div>
          <div className="bg-gradient-to-br from-green-600 to-green-900 p-6 rounded-lg shadow-lg">
            <p className="text-xl">
              We know each circumstance is different. This is why we give you the ability to tailor your investments to what you want while still guiding you with expert help.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>


<section id="assets" className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-green-500">ETFs</h2>
        <p className="text-lg mb-6 text-gray-700">
          An ETF is a basket of stocks (companies). These usually track an index
          (like the S&P 500). In the Sharia space, we have 8 main indexes. Each Index has at least 1 asset manager providing ETFs which track it. More information can be found at the specifc companies website (just type the ticker.)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData &&
            portfolioData.dashboard_data.asset_info.map((asset, index) => {
              // Prepare performance data for the graph
              const performanceData =
                portfolioData.dashboard_data.performance.dates.map(
                  (date, idx) => ({
                    date,
                    value:
                      portfolioData.dashboard_data.performance.series.find(
                        (s) => s.name === asset.name
                      )?.values[idx] || 0,
                  })
                );

              // Check if this specific asset is expanded
              const isExpanded = expandedAsset === asset.ticker;

              return (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-lg border-2 transition-all duration-300 ${
                    isExpanded ? 'p-6' : 'p-4 h-20'
                  }`}
                  style={{
                    borderColor: asset.color,
                    minHeight: isExpanded ? '10px' : 'auto', // Adjust the height for expanded cards
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
                    Ticker: {asset.ticker}
                  </p>
                  {isExpanded && (
                    <div className="mt-4">
                      <p className="text-sm mb-2 text-gray-700">
                        {asset.info}
                      </p>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={performanceData}>
                          <XAxis dataKey="date" tick={{ fill: '#6B7280' }} />
                          <YAxis
                            tick={{ fill: '#6B7280' }}
                            tickFormatter={(value) =>
                              `${(value * 100).toFixed(0)}%`
                            } // Convert Y-axis to percentage
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
                            strokeWidth={2} // Standard line thickness
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </section>


      {/* Construction Section */}
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
                  data={Object.entries(portfolioData.portfolio_metrics.Weights).map(([name, value], idx) => ({
                    name,
                    value: value * 100,
                    color: COLORS[idx % COLORS.length]
                  }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  labelLine={false}
                  label={({ name, percent, x, y, cx, cy }) => {
                    if (percent < 0.01) return null; // Skip rendering if the percentage is zero
                  
                    const RADIAL_OFFSET = 1.4; // Adjust this multiplier to control the distance
                  
                    // Calculate angle and new positions for radial offset
                    const newX = cx + (x - cx) * RADIAL_OFFSET;
                    const newY = cy + (y - cy) * RADIAL_OFFSET;
                  
                    return (
                      <text
                        x={newX}
                        y={newY}
                        fill={COLORS[Object.keys(portfolioData.portfolio_metrics.Weights).indexOf(name) % COLORS.length]}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontWeight="bold"
                      >
                        {`${name}`}
                      </text>
                    );
                  }}
                  
                >
                  {Object.entries(portfolioData.portfolio_metrics.Weights).map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => `${value.toFixed(2)}%`} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        {/* Asset Allocation Details */}
        <div className="grid grid-cols-2 gap-4">
          {portfolioData && Object.entries(portfolioData.portfolio_metrics.Weights).map(([assetName, weight], index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4" style={{ backgroundColor: COLORS[index % COLORS.length] }}>
              <h4 className="font-bold text-white">{assetName}</h4>
              <p className="text-white">{(weight * 100).toFixed(2)}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Input Form, Risk Metrics, and Projected Returns */}
      <div className="md:w-1/2 mt-6 md:mt-0">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-green-500">Optimize Your Portfolio</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Initial Investment ($)</label>
              <input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Risk Tolerance: {riskTolerance}/10</label>
              <input
                type="range"
                min="1"
                max="10"
                value={riskTolerance}
                onChange={(e) => setRiskTolerance(Number(e.target.value))}
                className="w-full"
              />
            </div>
            {isLoading && <p className="text-green-500">Optimizing portfolio...</p>}
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>

        {portfolioData && (
          <>
            {/* Risk Metrics */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h3 className="text-2xl font-bold mb-4 text-green-500">Risk Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                {portfolioData.dashboard_data.risk_metrics.labels.map((label, idx) => (
                  <div key={idx} className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-700">{label}</span>
                    <span className="text-gray-700">{(portfolioData.dashboard_data.risk_metrics.values[idx] * 100).toFixed(2)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projected Portfolio Growth */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h3 className="text-2xl font-bold mb-4 text-green-500">Projected Portfolio Growth Over 10 Years</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={portfolioData.dashboard_data.projected_returns.years.map((year, idx) => ({
                  year,
                  '5th Percentile': portfolioData.dashboard_data.projected_returns['5th_percentile'][idx] * initialInvestment,
                  'Mean': portfolioData.dashboard_data.projected_returns['mean'][idx] * initialInvestment,
                  '95th Percentile': portfolioData.dashboard_data.projected_returns['95th_percentile'][idx] * initialInvestment
                }))}>
                  <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                  <YAxis tickFormatter={(value) => `$${value.toFixed(0)}`} />
                  <RechartsTooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Line type="monotone" dataKey="Mean" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="5th Percentile" stroke="#FF6B8A" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="95th Percentile" stroke="#82ca9d" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
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
                <p className="mb-4">&quotThis platform has transformed the way I invest. The tools are intuitive and the support is excellent.&quot</p>
                <p className="font-bold">- Sarah K.</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="mb-4">&quotA must-have for anyone looking to invest ethically. Highly recommended!&quot</p>
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
  