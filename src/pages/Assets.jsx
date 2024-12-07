// src/pages/Assets.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaRegLightbulb, FaPiggyBank, FaChartLine, FaRegCalendarAlt, FaBalanceScale, FaUniversity } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
function Assets() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedSubSection, setExpandedSubSection] = useState(null);
  const navigate = useNavigate();

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleSubSection = (subSection) => {
    setExpandedSubSection(expandedSubSection === subSection ? null : subSection);
  };

  // Risk Tolerance Quiz
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [quizResult, setQuizResult] = useState(null);

  const onSubmitQuiz = (data) => {
    let score = 0;
    for (const key in data) {
      score += parseInt(data[key], 10);
    }
    if (score <= 5) setQuizResult('Conservative Investor');
    else if (score <= 10) setQuizResult('Moderate Investor');
    else setQuizResult('Aggressive Investor');
  };
    const [investment, setInvestment] = useState(10000);
    const [allocation, setAllocation] = useState({
      Stocks: 40,
      Bonds: 30,
      RealEstate: 20,
      Cash: 10,
    });
    const [feedback, setFeedback] = useState('');
    const [showModal, setShowModal] = useState({ risk: false, diversification: false });
  
    const assetRiskLevels = {
      Stocks: 'High',
      Bonds: 'Medium',
      RealEstate: 'Medium',
      Cash: 'Low',
    };
  
    const assetColors = ['#4A90E2', '#50E3C2', '#F5A623', '#B8E986'];
  
    const calculateRisk = (allocation) => {
      const riskWeights = { Stocks: 1, Bonds: 0.5, RealEstate: 0.7, Cash: 0 };
      return Object.entries(allocation).reduce(
        (risk, [asset, value]) => risk + riskWeights[asset] * value,
        0
      );
    };
  
    const handleAllocationChange = (asset, value) => {
      value = parseFloat(value);
      const otherAssets = Object.keys(allocation).filter((key) => key !== asset);
      const totalOther = otherAssets.reduce((sum, key) => sum + allocation[key], 0);
  
      if (totalOther + value > 100) {
        setFeedback('Total allocation cannot exceed 100%!');
        return;
      }
  
      const newAllocation = {
        ...allocation,
        [asset]: value,
      };
  
      const remaining = 100 - value;
      const adjustedOtherAssets = otherAssets.map((key) => ({
        key,
        value: (allocation[key] / totalOther) * remaining,
      }));
  
      adjustedOtherAssets.forEach(({ key, value }) => {
        newAllocation[key] = Math.max(value, 0);
      });
  
      setAllocation(newAllocation);
      setFeedback('');
    };
  
    const diversificationScore = Object.values(allocation).filter((v) => v > 0).length / 4;

  const [timeHorizon, setTimeHorizon] = useState(10); // Default time horizon in years

  const [investmentGoal, setInvestmentGoal] = useState('Retirement');

  const goalDescriptions = {
    Retirement:
      'Retirement is a long-term goal that allows for higher risk early on, gradually transitioning to safer investments as you approach retirement age.',
    House:
      'Saving for a house typically requires a medium-term strategy focused on preserving capital while allowing moderate growth.',
    Education:
      'Investing for a child’s education combines medium-term growth with safety, ensuring funds are ready when needed.',
    Travel:
      'Saving for a dream vacation is a short-term goal, prioritizing low-risk investments to protect your capital.',
  };

  const goalStrategies = {
    Retirement: { Stocks: 60, Bonds: 30, Cash: 10 },
    House: { Stocks: 40, Bonds: 40, Cash: 20 },
    Education: { Stocks: 50, Bonds: 35, Cash: 15 },
    Travel: { Stocks: 10, Bonds: 20, Cash: 70 },
  };

  const handleTimeHorizonChange = (value) => {
    setTimeHorizon(value);
    if (value < 5) {
      setFeedback(
        'Short time horizons require safer, less volatile investments to ensure funds are available when needed.'
      );
    } else if (value >= 5 && value <= 15) {
      setFeedback(
        'Medium time horizons allow for a balanced approach, mixing growth and safety to maximize returns while managing risk.'
      );
    } else {
      setFeedback(
        'Long time horizons favor higher-risk investments like stocks, as they provide more time to recover from market fluctuations.'
      );
    }
  };

  const selectedStrategy = goalStrategies[investmentGoal];

  return (
    <section id="assets" className="bg-gradient-to-b from-green-50 to-green-100 py-16 px-4">
      {/* Section 1: Investing Assets */}
      <div className="mb-16 container mx-auto px-4">
        {/* Introduction */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-5xl font-extrabold text-green-800 mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Your Guide to Investing
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Unlock the secrets of smart investing and make your money work for you.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Asset Cards */}
          {[
            {
              title: 'Savings Accounts',
              image: 'savings.jpg',
              description:
                'A safe place to store your money and earn modest interest.',
              link: '/articles/savings-accounts',
            },
            {
              title: 'Equities (Stocks)',
              image: 'equities.jfif',
              description:
                'Invest in companies and share in their growth and profits.',
              link: '/articles/equities',
            },
            {
              title: 'Sukuks',
              image: 'islamic-bonds.webp',
              description:
                'Islamic financial certificates similar to bonds, compliant with Sharia law.',
              link: '/articles/sukuks',
            },
            {
              title: 'ETFs',
              image: 'ETF.png',
              description:
                'Exchange-Traded Funds offering diversified investment options.',
              link: '/articles/etfs',
            },
            {
              title: 'Commodities',
              image: 'Commodities.jfif',
              description:
                'Invest in physical goods like gold, silver, and oil.',
              link: '/articles/commodities',
            },
            {
              title: 'Real Estate',
              image: 'real estate.jfif',
              description:
                'Invest in properties for income or value appreciation.',
              link: '/articles/real-estate',
            },
          ].map((asset, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={asset.image}
                alt={asset.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">
                  {asset.title}
                </h3>
                <p className="text-gray-700">{asset.description}</p>
                <a
                  href={asset.link}
                  className="text-green-600 hover:text-green-800 mt-4 inline-block"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="container mx-auto">
        

        {/* Section: Good to Know */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-green-700 mb-8 flex items-center">
            <FaRegLightbulb className="mr-3" /> Good to Know
          </h2>

          {/* Risk vs Reward */}
          <div className="mb-6">
            <button
              className="w-full text-left flex justify-between items-center bg-white py-4 px-6 rounded-lg shadow-md hover:bg-green-50 transition duration-300"
              onClick={() => toggleSection('riskReward')}
            >
              <span className="text-lg font-semibold text-green-700 flex items-center">
                <FaBalanceScale className="mr-2" /> Risk vs Reward
              </span>
              {expandedSection === 'riskReward' ? (
                <FiChevronUp className="h-6 w-6 text-green-700" />
              ) : (
                <FiChevronDown className="h-6 w-6 text-green-700" />
              )}
            </button>
            {expandedSection === 'riskReward' && (
              <motion.div
                className="mt-4 p-6 bg-white rounded-lg shadow-md"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <p className="text-gray-700 mb-4">
                  Investing involves balancing potential returns with acceptable levels of risk.
                </p>
                {/* Risk Tolerance Quiz */}
                <button
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
                  onClick={() => toggleSubSection('riskQuiz')}
                >
                  Take the Risk Quiz
                </button>
                {expandedSubSection === 'riskQuiz' && (
                  <motion.div
                    className="mt-6"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                  >
                    <form onSubmit={handleSubmit(onSubmitQuiz)} className="bg-gray-50 p-6 rounded-lg shadow-inner">
                      {/* Question 1 */}
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                          1. How would you react if your investment drops by 10%?
                        </label>
                        <select
                          {...register("q1", { required: true })}
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="1">Panic and sell immediately</option>
                          <option value="2">Feel uncomfortable but hold</option>
                          <option value="3">See it as a buying opportunity</option>
                        </select>
                        {errors.q1 && <p className="text-red-500 mt-2">This field is required</p>}
                      </div>
                      {/* Question 2 */}
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                          2. What is your investment horizon?
                        </label>
                        <select
                          {...register("q2", { required: true })}
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="1">Less than 3 years</option>
                          <option value="2">3 to 7 years</option>
                          <option value="3">More than 7 years</option>
                        </select>
                        {errors.q2 && <p className="text-red-500 mt-2">This field is required</p>}
                      </div>
                      {/* Question 3 */}
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                          3. What is your main investment goal?
                        </label>
                        <select
                          {...register("q3", { required: true })}
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="1">Preserve capital</option>
                          <option value="2">Grow capital moderately</option>
                          <option value="3">Maximize growth</option>
                        </select>
                        {errors.q3 && <p className="text-red-500 mt-2">This field is required</p>}
                      </div>
                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 w-full"
                      >
                        See My Result
                      </button>
                    </form>
                    {/* Quiz Result */}
                    {quizResult && (
                      <div className="mt-6 bg-green-50 p-6 rounded-lg shadow-inner">
                        <h3 className="text-2xl font-bold text-green-800 mb-2">
                          Your Risk Profile: {quizResult}
                        </h3>
                        <p className="text-gray-700">
                          {quizResult === 'Conservative Investor' && 'You prefer minimal risk and prioritize capital preservation.'}
                          {quizResult === 'Moderate Investor' && 'You are comfortable with some risk to achieve moderate growth.'}
                          {quizResult === 'Aggressive Investor' && 'You are willing to take higher risks for potentially higher returns.'}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>

          {/* Asset Allocation and Diversification */}
          <div className="mb-6">
            <button
              className="w-full text-left flex justify-between items-center bg-white py-4 px-6 rounded-lg shadow-md hover:bg-green-50 transition duration-300"
              onClick={() => toggleSection('allocation')}
            >
              <span className="text-lg font-semibold text-green-700 flex items-center">
                <FaChartLine className="mr-2" /> Asset Allocation and Diversification
              </span>
              {expandedSection === 'allocation' ? (
                <FiChevronUp className="h-6 w-6 text-green-700" />
              ) : (
                <FiChevronDown className="h-6 w-6 text-green-700" />
              )}
            </button>
            {expandedSection === 'allocation' && (
              <motion.div
                className="mt-4 p-6 bg-white rounded-lg shadow-md"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <p className="text-gray-700 mb-4">
                  Diversifying your investments helps manage risk and can lead to more consistent returns.
                </p>
                {/* Interactive Tool Placeholder */}
                <button
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
                  onClick={() => toggleSubSection('allocationTool')}
                >
                  Explore Allocation Tool
                </button>
                {expandedSubSection === 'allocationTool' && (
                  <motion.div
                    className="mt-6 bg-gray-50 p-6 rounded-lg shadow-inner"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                  >
              <div className="p-8 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Asset Allocation & Diversification Game
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Learn how diversification reduces risk and improves portfolio stability.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-gray-700 font-medium">Investment Amount ($)</label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your investment amount"
          />
        </div>

        {/* Asset Allocation Sliders */}
        {Object.keys(allocation).map((asset) => (
          <div key={asset} className="flex items-center justify-between space-x-4">
            <label className="w-1/4 text-gray-700 flex items-center">
              {asset}
              <span
                className={`ml-2 text-sm px-2 py-1 rounded ${
                  assetRiskLevels[asset] === 'High'
                    ? 'bg-red-100 text-red-600'
                    : assetRiskLevels[asset] === 'Medium'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-green-100 text-green-600'
                }`}
              >
                {assetRiskLevels[asset]} Risk
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={allocation[asset]}
              onChange={(e) => handleAllocationChange(asset, e.target.value)}
              className="w-3/4"
            />
            <span className="w-1/12 text-gray-700">{allocation[asset].toFixed(0)}%</span>
          </div>
        ))}

        {feedback && <p className="text-red-500 text-sm">{feedback}</p>}
      </div>

      {/* Visualization */}
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-800">Your Portfolio</h2>
        <div className="w-full h-64 mt-4">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={Object.entries(allocation).map(([name, value]) => ({ name, value }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
                label={({ name, value }) => `${name}: ${value.toFixed(0)}%`}
              >
                {Object.keys(allocation).map((_, index) => (
                  <Cell key={`cell-${index}`} fill={assetColors[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" align="center" verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk and Diversification */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-inner">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          Simulated Risk:{' '}
          <span className="font-bold text-red-600 ml-2">{calculateRisk(allocation).toFixed(0)}%</span>
          <button
            className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full hover:bg-green-600"
            onClick={() => setShowModal({ ...showModal, risk: true })}
          >
            i
          </button>
        </h3>
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          Diversification Score:{' '}
          <span className="font-bold text-green-600 ml-2">
            {(diversificationScore * 100).toFixed(0)}%
          </span>
          <button
            className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full hover:bg-green-600"
            onClick={() => setShowModal({ ...showModal, diversification: true })}
          >
            i
          </button>
        </h3>
      </div>

      {/* Modal for Risk */}
      {showModal.risk && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <h2 className="text-lg font-bold mb-4">Simulated Risk</h2>
            <p className="text-gray-600">
              Simulated risk indicates how risky your portfolio is based on the proportion of high-risk
              assets like stocks compared to low-risk assets like cash.
            </p>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              onClick={() => setShowModal({ ...showModal, risk: false })}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      {/* Modal for Diversification */}
      {showModal.diversification && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <h2 className="text-lg font-bold mb-4">Diversification Score</h2>
            <p className="text-gray-600">
              Diversification measures how evenly your assets are distributed across different classes,
              reducing overall risk and improving stability.
            </p>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              onClick={() => setShowModal({ ...showModal, diversification: false })}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      {/* Educational Tip */}
      <motion.div
        className="mt-6 p-4 bg-green-100 rounded-lg shadow-inner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-green-700">Why Diversify?</h3>
        <p className="text-gray-700">
          Diversification helps you reduce risk by spreading investments across different asset
          classes. If one asset class underperforms, others may compensate for the loss, ensuring
          stability and long-term growth.
        </p>
      </motion.div>
    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>

          {/* Time Horizon and Investment Goals */}
          <div className="mb-6">
            <button
              className="w-full text-left flex justify-between items-center bg-white py-4 px-6 rounded-lg shadow-md hover:bg-green-50 transition duration-300"
              onClick={() => toggleSection('timeHorizon')}
            >
              <span className="text-lg font-semibold text-green-700 flex items-center">
                <FaRegCalendarAlt className="mr-2" /> Time Horizon and Investment Goals
              </span>
              {expandedSection === 'timeHorizon' ? (
                <FiChevronUp className="h-6 w-6 text-green-700" />
              ) : (
                <FiChevronDown className="h-6 w-6 text-green-700" />
              )}
            </button>
            {expandedSection === 'timeHorizon' && (
              <motion.div
                className="mt-4 p-6 bg-white rounded-lg shadow-md"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <p className="text-gray-700 mb-4">
                  Align your investment choices with your financial goals and the time you have to reach them.
                </p>
                {/* Time Horizon Tool Placeholder */}
                <button
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
                  onClick={() => toggleSubSection('timeTool')}
                >
                  Discover Time Horizon Tool
                </button>
                {expandedSubSection === 'timeTool' && (
                  <motion.div
                  className="mt-6 bg-gray-50 p-6 rounded-lg shadow-inner"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 text-center">
                    Plan Your Investments Around Your Life Goals
                  </h3>
            
                  {/* Time Horizon Slider */}
                  <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Select Your Time Horizon (Years)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={timeHorizon}
                      onChange={(e) => handleTimeHorizonChange(e.target.value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-gray-600 text-sm mt-2">
                      <span>1 Year</span>
                      <span>{timeHorizon} Years</span>
                      <span>30+ Years</span>
                    </div>
                  </div>
            
                  {feedback && (
                    <p className="mt-4 text-sm text-gray-700 bg-green-100 p-3 rounded-md">
                      {feedback}
                    </p>
                  )}
            
                  {/* Investment Goals Selector */}
                  <div className="mt-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Select Your Investment Goal
                    </label>
                    <select
                      value={investmentGoal}
                      onChange={(e) => setInvestmentGoal(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="Retirement">Retirement</option>
                      <option value="House">Save for a House</option>
                      <option value="Education">Child’s Education</option>
                      <option value="Travel">Dream Vacation</option>
                    </select>
                  </div>
            
                  {/* Investment Strategy */}
                  <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold text-gray-800">
                      Strategy for {investmentGoal}
                    </h4>
                    <p className="mt-2 text-gray-600">{goalDescriptions[investmentGoal]}</p>
                    <ul className="mt-4 space-y-2">
                      {Object.entries(selectedStrategy).map(([key, value]) => (
                        <li key={key} className="flex justify-between text-gray-700">
                          <span>{key}:</span>
                          <span>{value}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
            
                  {/* Educational Tip */}
                  <motion.div
                    className="mt-6 p-4 bg-green-100 rounded-lg shadow-inner"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-lg font-semibold text-green-700">Why Time Horizon and Goals Matter?</h3>
                    <p className="text-gray-700">
                      Your time horizon determines how much risk you can take, while your goals shape your
                      investment strategy. Aligning your investments with life goals ensures you’re on track to
                      achieve them without unnecessary risk.
                    </p>
                  </motion.div>
                </motion.div>
                )}
              </motion.div>
            )}
          </div>

          {/* Tax Implications */}
          <div className="mb-6">
            <button
              className="w-full text-left flex justify-between items-center bg-white py-4 px-6 rounded-lg shadow-md hover:bg-green-50 transition duration-300"
              onClick={() => toggleSection('tax')}
            >
              <span className="text-lg font-semibold text-green-700 flex items-center">
                <FaUniversity className="mr-2" /> Tax Implications
              </span>
              {expandedSection === 'tax' ? (
                <FiChevronUp className="h-6 w-6 text-green-700" />
              ) : (
                <FiChevronDown className="h-6 w-6 text-green-700" />
              )}
            </button>
            {expandedSection === 'tax' && (
              <motion.div
                className="mt-4 p-6 bg-white rounded-lg shadow-md"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <p className="text-gray-700 mb-4">
                  Taxes can significantly impact your investment returns. Understanding them is crucial.
                </p>
                {/* Tax Subsections */}
                {['Capital Gains Tax', 'Dividend Tax', 'Tax-Efficient Accounts'].map(
                  (subSection, idx) => (
                    <div key={idx} className="mb-4">
                      <button
                        className="w-full text-left flex justify-between items-center bg-gray-100 py-3 px-5 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300"
                        onClick={() => toggleSubSection(subSection)}
                      >
                        <span className="text-gray-700 font-semibold">
                          {subSection}
                        </span>
                        {expandedSubSection === subSection ? (
                          <FiChevronUp className="h-5 w-5 text-gray-700" />
                        ) : (
                          <FiChevronDown className="h-5 w-5 text-gray-700" />
                        )}
                      </button>
                      {expandedSubSection === subSection && (
                        <motion.div
                          className="mt-2 p-4 bg-gray-50 rounded-lg shadow-inner"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                        >
                          <p className="text-gray-600">
                            {`Detailed information about ${subSection.toLowerCase()} and how it affects your investments.`}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  )
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Ways to Invest */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-green-700 mb-8 flex items-center">
            <FaPiggyBank className="mr-3" /> Ways to Invest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Pensions',
                description: 'Secure your retirement with long-term growth and tax benefits.',
                image: 'pension.jfif',
                link: '/articles/pensions',
              },
              {
                title: 'ISAs',
                description: 'Enjoy tax-free savings and flexible investment options.',
                image: 'ISA.jfif',
                link: '/articles/isas',
              },
              {
                title: 'Investment Platforms',
                description: 'Choose the right platform to manage and grow your investments.',
                image: 'investment platforms.jpg',
                link: '/articles/platforms',
              },
            ].map((way, idx) => (
              <motion.div
                key={idx}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={way.image}
                  alt={way.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    {way.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {way.description}
                  </p>
                  <a
                    href={way.link}
                    className="text-green-600 hover:text-green-800 font-semibold"
                  >
                    Learn More &rarr;
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resources and Next Steps */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-green-700 mb-8 flex items-center">
            <FaRegLightbulb className="mr-3" /> Resources and Next Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Investing Basics',
                description: 'Learn the fundamentals of investing to build a strong foundation.',
                link: '/articles/investing-basics',
              },
              {
                title: 'Building Your Portfolio',
                description: 'Step-by-step guide to creating a diversified investment portfolio.',
                link: '/articles/building-portfolio',
              },
              {
                title: 'Understanding Market Cycles',
                description: 'Gain insights into how markets behave over time.',
                link: '/articles/market-cycles',
              },
              {
                title: 'Maximizing Returns',
                description: 'Advanced strategies to enhance your investment performance.',
                link: '/articles/maximizing-returns',
              },
            ].map((resource, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-semibold text-green-800 mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {resource.description}
                </p>
                <a
                  href={resource.link}
                  className="text-green-600 hover:text-green-800 font-semibold"
                >
                  Read More &rarr;
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <motion.h2
            className="text-4xl font-bold text-green-700 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Ready to Start Your Investment Journey?
          </motion.h2>
          <motion.button
      className="bg-green-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
      onClick={() => navigate('/allocation')} // Navigate to Allocation page
    >
      Build Your Portfolio Now
    </motion.button>
        </div>
      </div>
    </section>
  );
}

export default Assets;
