// ModernAssetsPage.jsx

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Building,
  BarChart,
  Calculator,
  DollarSign,
  Landmark,
  ChevronDown,
} from 'lucide-react';
import {
  FaRegLightbulb,
  FaChartLine,
  FaRegCalendarAlt,
  FaBalanceScale,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';

const ModernAssetsPage = () => {
  const navigate = useNavigate();

  // -----------------------------------------------
  // Mouse position for the glow effect (existing)
  // -----------------------------------------------
  const [, setActiveSection] = useState(null);
  const [expandedTool, setExpandedTool] = useState(null);
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // -----------------------------------------------
  // Old code states and logic (Risk Quiz, etc.)
  // -----------------------------------------------

  // ------------------ Risk Tolerance Quiz ------------------
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const questions = useMemo(
    () => [
      {
        question: 'What is your primary investing goal and time horizon?',
        options: [
          {
            label: 'I’m investing for retirement decades away, I want maximum growth over the long term.',
            value: 3,
          },
          {
            label: 'I have a medium-term goal (5-10 years), aiming for growth with some stability.',
            value: 1,
          },
          { label: 'I’m investing short-term (1-3 years), preserving capital is key.', value: -1 },
        ],
      },
      {
        question: 'How do you feel if your portfolio drops by 15% in a few months?',
        options: [
          { label: 'I’m calm, this is a long-term game. I might even buy more.', value: 3 },
          { label: 'I’m uneasy but I’ll hold and wait it out.', value: 1 },
          { label: 'I’d be very stressed and likely sell to prevent further losses.', value: -2 },
        ],
      },
      {
        question: 'The headlines scream ‘Markets Crash!’ – how do you respond?',
        options: [
          { label: 'It’s a buying opportunity; I trust my long-term plan.', value: 2 },
          { label: 'I get nervous, but I stay invested.', value: 0 },
          { label: 'I’d reduce exposure, seeking safer assets.', value: -2 },
        ],
      },
      {
        question: 'Your preferred portfolio style?',
        options: [
          { label: 'Aggressive growth: emerging markets, tech, etc.', value: 3 },
          { label: 'Balanced mix: stocks, bonds, maybe some alternatives.', value: 1 },
          { label: 'Conservative: stable bonds, dividend stocks, cash.', value: -1 },
        ],
      },
      {
        question: 'If investing was a sport, which would you choose?',
        options: [
          { label: 'Skydiving: excitement, risk, potential big payoff.', value: 2 },
          { label: 'Hiking: steady progress with moderate challenges.', value: 1 },
          { label: 'A calm stroll: minimal surprises, very steady.', value: -1 },
        ],
      },
      {
        question: 'How experienced are you with investing?',
        options: [
          { label: 'Very experienced; I understand fluctuations are normal.', value: 2 },
          { label: 'Somewhat experienced; I know basics but can get nervous.', value: 1 },
          { label: 'Not experienced; this is all new and uncertain.', value: 0 },
        ],
      },
      {
        question: 'Your reaction if your portfolio gained 20% last year?',
        options: [
          { label: 'Thrilled! Let’s aim even higher.', value: 2 },
          { label: 'Happy but cautious, I’ll enjoy this gain and hold steady.', value: 1 },
          { label: 'Anxious that it’s just luck; might lock in gains now.', value: 0 },
        ],
      },
      {
        question: 'If you received a large inheritance tomorrow, what’s your approach?',
        options: [
          { label: 'Invest aggressively into high-growth sectors quickly.', value: 2 },
          { label: 'Diversify across stocks, bonds, real estate.', value: 1 },
          { label: 'Keep most in cash or ultra-safe assets initially.', value: -1 },
        ],
      },
      {
        question: 'How stable is your income and emergency savings?',
        options: [
          { label: 'Very stable job and solid emergency fund for a year.', value: 2 },
          { label: 'Stable job, some emergency savings for a few months.', value: 1 },
          { label: 'Uncertain income, minimal emergency savings.', value: -1 },
        ],
      },
      {
        question: 'Do you enjoy researching new investments?',
        options: [
          { label: 'Yes! I love discovering new opportunities and trends.', value: 2 },
          { label: 'Somewhat, I do basic research before investing.', value: 1 },
          { label: 'Not really, I prefer safer or professionally managed options.', value: 0 },
        ],
      },
      {
        question: 'When you think about investing, what’s your top priority?',
        options: [
          { label: 'Maximizing returns, even if it means big swings.', value: 2 },
          { label: 'Growing steadily while limiting downside risk.', value: 1 },
          { label: 'Protecting capital above all else.', value: -1 },
        ],
      },
      {
        question: 'If a friend suggests a high-risk, high-reward stock idea, you:',
        options: [
          { label: 'Jump on it after quick due diligence. Opportunity knocks!', value: 2 },
          { label: 'Check carefully, maybe invest a small portion.', value: 1 },
          { label: 'Avoid it. I’m not comfortable with big unknowns.', value: -1 },
        ],
      },
    ],
    []
  );

  React.useEffect(() => {
    if (answers.length === 0) {
      setAnswers(Array(questions.length).fill(null));
    }
  }, [answers, questions]);

  const handleNameSubmit = () => {
    if (name.trim() !== '') {
      setStep(step + 1);
    } else {
      alert('Please enter your name before starting the quiz.');
    }
  };

  const handleAnswerSelect = (optionValue) => {
    const updatedAnswers = [...answers];
    updatedAnswers[step - 1] = optionValue;
    setAnswers(updatedAnswers);
  };

  const goNext = () => {
    if (step === 0) {
      handleNameSubmit();
    } else {
      if (answers[step - 1] !== null) {
        setStep(step + 1);
      } else {
        alert('Please select an answer before proceeding.');
      }
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const calculateResult = () => {
    const rawScore = answers.reduce((sum, val) => sum + (val || 0), 0);

    const minScore = -10;
    const maxScore = 24;
    const clamped = Math.max(minScore, Math.min(rawScore, maxScore));
    const riskLevel = Math.round(1 + ((clamped - minScore) / (maxScore - minScore)) * 9);

    const annualReturn = 6 + (riskLevel - 1);
    return { riskLevel, annualReturn };
  };

  const renderQuiz = () => {
    // Step 0: Name input
    if (step === 0) {
      return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Portfolio Horizons Risk Profiler!</h1>
          <p className="mb-4">
            I’m your personal elite wealth manager, ready to dive deep into your investing psyche. We’ll
            talk goals, comfort with risk, market volatility, and much more. At the end, I’ll suggest a risk
            level (1-10) along with a potential annual return scenario (6% to 16%).
          </p>
          <p className="mb-4">Let’s begin with your name:</p>
          <input
            type="text"
            placeholder="Enter your name"
            className="border p-2 w-full mb-4 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={goNext}>
            Start Quiz
          </button>
        </div>
      );
    }

    // Steps 1 through questions.length: show questions
    if (step > 0 && step <= questions.length) {
      const qIndex = step - 1;
      const { question, options } = questions[qIndex];
      const selectedOption = answers[qIndex];

      return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
          <h2 className="text-xl font-bold mb-4">{`Question ${step}/${questions.length}`}</h2>
          {step === 1 && (
            <p className="mb-4">
              Great to have you here, {name.trim() || 'friend'}. Let’s get to know you as an investor.
            </p>
          )}
          <p className="font-semibold mb-6">{question}</p>

          <div className="space-y-4">
            {options.map((opt, idx) => (
              <label
                key={idx}
                className={`block p-4 border rounded cursor-pointer ${
                  selectedOption === opt.value ? 'border-green-600 bg-green-50' : 'hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  className="mr-2"
                  checked={selectedOption === opt.value}
                  onChange={() => handleAnswerSelect(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={goBack}
              >
                Back
              </button>
            )}
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-auto"
              onClick={goNext}
            >
              Next
            </button>
          </div>
        </div>
      );
    }

    // Final step: Show results
    const { riskLevel, annualReturn } = calculateResult();

    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-4">Your Results Are In!</h2>
        <p className="mb-4">
          All right, {name.trim() || 'Investor'}. Based on our conversation and your answers, I’d approximate
          your risk tolerance level at:
        </p>
        <p className="text-xl font-bold text-green-600 mb-4">Risk Level: {riskLevel}/10</p>
        <p className="mb-4">
          This suggests a target annual return around: <strong>{annualReturn}%</strong> per year. Remember,
          higher returns come with higher risk. Make sure you’re comfortable with the journey as well as the
          destination.
        </p>
        <p className="mb-6">
          Thank you for taking the Portfolio Horizons Risk Profiler! Stay thoughtful, stay curious, and invest
          with confidence.
        </p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            // Reset quiz if user wants to retake
            setStep(0);
            setScore(0);
            setAnswers(Array(questions.length).fill(null));
          }}
        >
          Retake Quiz
        </button>
      </div>
    );
  };

  // ------------------ Asset Allocation & Diversification Tool ------------------
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

  const calculateRisk = (allocObj) => {
    const riskWeights = { Stocks: 1, Bonds: 0.5, RealEstate: 0.7, Cash: 0 };
    return Object.entries(allocObj).reduce((risk, [asset, value]) => risk + riskWeights[asset] * value, 0);
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

  const diversificationScore =
    Object.values(allocation).filter((v) => v > 0).length / Object.keys(allocation).length;

  // ------------------ Time Horizon Tool ------------------
  const [timeHorizon, setTimeHorizon] = useState(10); // Default time horizon in years
  const [investmentGoal, setInvestmentGoal] = useState('Retirement');

  const goalDescriptions = {
    Retirement:
      'Retirement is a long-term goal that allows for higher risk early on, gradually transitioning to safer investments as you approach retirement age.',
    House:
      'Saving for a house typically requires a medium-term strategy focused on preserving capital while allowing moderate growth.',
    Education:
      'Investing for a child’s education combines medium-term growth with safety, ensuring funds are ready when needed.',
    Travel: 'Saving for a dream vacation is a short-term goal, prioritizing low-risk investments to protect your capital.',
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

  // -----------------------------------------------
  // Cards & Tools Setup (the "new" code)
  // -----------------------------------------------
  const financialCards = [
    {
      id: 'savings',
      title: 'Savings',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-400',
      description: 'Strategic wealth building through smart saving',
      details: 'Explore various savings accounts and strategies',
    },
    {
      id: 'pensions',
      title: 'Pensions',
      icon: <Building className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-400',
      description: 'Secure your retirement future',
      details: 'Workplace and personal pension planning',
    },
    {
      id: 'isas',
      title: 'ISAs',
      icon: <Landmark className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-400',
      description: 'Tax-efficient investment accounts',
      details: 'Stocks & Shares, Cash, and Lifetime ISAs',
    },
    {
      id: 'brokerage',
      title: 'Investment Brokerage',
      icon: <BarChart className="w-8 h-8" />,
      color: 'from-orange-500 to-amber-400',
      description: 'Access global markets',
      details: 'Trade stocks, ETFs, and more',
    },
    {
      id: 'tax',
      title: 'Tax Planning',
      icon: <Calculator className="w-8 h-8" />,
      color: 'from-red-500 to-rose-400',
      description: 'Optimize your tax efficiency',
      details: 'Strategic tax planning and advice',
    },
  ];

  // -----------------------------------------------
  // Integrate the 3 old tools under Tools & Calcs
  // -----------------------------------------------
  const tools = [
    {
      id: 'quiz',
      title: 'Risk Tolerance Quiz',
      icon: <FaBalanceScale className="w-12 h-12" />,
      color: 'from-yellow-600 to-orange-400',
      description: 'Discover your investment risk level',
      expandedContent: (
        <div className="mt-6">
          {renderQuiz()}
        </div>
      ),
    },
    {
      id: 'allocation',
      title: 'Asset Allocation Tool',
      icon: <FaChartLine className="w-12 h-12" />,
      color: 'from-purple-600 to-pink-400',
      description: 'Experiment with portfolio diversification',
      expandedContent: (
        <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-inner">
          <div className="p-8 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800">Asset Allocation & Diversification</h1>
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

            {/* Pie Chart Visualization */}
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-800">Your Portfolio</h2>
              <div className="w-full h-64 mt-4">
                <ResponsiveContainer>
                  <RePieChart>
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
                  </RePieChart>
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
                    Simulated risk indicates how risky your portfolio is based on the proportion of
                    high-risk assets like stocks compared to low-risk assets like cash.
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
                    Diversification measures how evenly your assets are distributed across different asset
                    classes, reducing overall risk and improving stability.
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
        </div>
      ),
    },
    {
      id: 'timeHorizon',
      title: 'Time Horizon & Goals',
      icon: <FaRegCalendarAlt className="w-12 h-12" />,
      color: 'from-green-600 to-teal-400',
      description: 'Plan investments around your life goals',
      expandedContent: (
        <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-inner">
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
            <p className="mt-4 text-sm text-gray-700 bg-green-100 p-3 rounded-md">{feedback}</p>
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
            <h4 className="text-lg font-semibold text-gray-800">Strategy for {investmentGoal}</h4>
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
        </div>
      ),
    },
  ];

  // -----------------------------------------------
  // Asset Classes
  // -----------------------------------------------
  const assetClasses = [
    {
      id: 'equities',
      title: 'Equities',
      icon: <BarChart className="w-8 h-8" />,
      riskLevel: 'High',
      riskColor: 'from-blue-500 to-purple-500',
      expectedReturn: '8-12%',
      description:
        'Equities represent ownership in companies. Historically high returns, but also higher risk.',
    },
    {
      id: 'sukuk',
      title: 'Sukuk',
      icon: <BarChart className="w-8 h-8" />,
      riskLevel: 'Low',
      riskColor: 'from-green-500 to-teal-500',
      expectedReturn: '3-5%',
      description: 'Sukuk are Sharia-compliant bonds that provide steady, low-risk income.',
    },
    {
      id: 'private-markets',
      title: 'Private Markets',
      icon: <BarChart className="w-8 h-8" />,
      riskLevel: 'High',
      riskColor: 'from-pink-500 to-red-500',
      expectedReturn: '12-20%',
      description: 'Invest in non-public companies. Potential for high returns but less liquidity.',
    },
    {
      id: 'commodities',
      title: 'Commodities',
      icon: <BarChart className="w-8 h-8" />,
      riskLevel: 'Moderate',
      riskColor: 'from-yellow-500 to-amber-500',
      expectedReturn: '5-10%',
      description: 'Physical goods like metals, oil, and agricultural products. Provide diversification.',
    },
    {
      id: 'real-estate',
      title: 'Real Estate',
      icon: <BarChart className="w-8 h-8" />,
      riskLevel: 'Moderate',
      riskColor: 'from-indigo-500 to-purple-500',
      expectedReturn: '6-10%',
      description: 'Property investments can offer rental income and capital appreciation.',
    },
    {
      id: 'etfs',
      title: 'ETFs',
      icon: <BarChart className="w-8 h-8" />,
      riskLevel: 'Varied',
      riskColor: 'from-gray-500 to-blue-500',
      expectedReturn: '5-10%',
      description: 'Exchange-Traded Funds track indices or sectors. Risk and returns vary by ETF.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Title: Financial Solutions */}
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Financial Solutions
        </h2>

        {/* Financial Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {financialCards.map((card) => (
            <div key={card.id} className="group relative">
              {/* Animated glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
              <div
                className="relative h-full bg-gray-800/30 backdrop-blur-xl p-6 rounded-xl overflow-hidden border border-gray-700/50 transition-all duration-500 hover:translate-y-[-4px] hover:shadow-xl cursor-pointer"
                onClick={() => setActiveSection(card.id)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <div className="relative z-10">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color} inline-block mb-4`}>
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{card.description}</p>
                  <p className="text-xs text-gray-400">{card.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Title: Tools & Calculators */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Tools &amp; Calculators
        </h2>

        {/* Tools Container */}
        <div className="relative space-y-8">
          {/* Tools Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <div key={tool.id}>
                <div
                  className={`relative bg-gray-800/30 backdrop-blur-xl rounded-xl overflow-hidden transition-all duration-500
                  ${expandedTool && expandedTool !== tool.id ? 'opacity-50' : 'hover:scale-105'}`}
                >
                  <div
                    className="p-6 cursor-pointer border border-gray-700/50 rounded-xl"
                    onClick={() => setExpandedTool(expandedTool === tool.id ? null : tool.id)}
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                    <p className="text-gray-300">{tool.description}</p>
                    <ChevronDown
                      className={`mt-4 w-6 h-6 transition-transform duration-300 ${
                        expandedTool === tool.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Expanded Content (no absolute positioning — placed in normal flow) */}
          {expandedTool && (
            <div
              className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-xl overflow-hidden transition-all duration-500 px-8 py-8"
              style={{ minHeight: '400px' }}
            >
              <div className="relative">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
                </div>

                {/* Tool Expanded Content */}
                <div className="relative">
                  {tools.find((t) => t.id === expandedTool)?.expandedContent}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Title: Asset Classes */}
      <div className="pb-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Asset Classes
        </h2>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assetClasses.map((asset) => (
            <div key={asset.id} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
              <div className="relative bg-gray-800/30 backdrop-blur-xl p-6 rounded-xl border border-gray-700/50">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${asset.riskColor}`}>{asset.icon}</div>
                  <div className="text-right">
                    <span className="text-sm text-gray-400">Risk Level</span>
                    <div className="text-xl font-bold">{asset.riskLevel}</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{asset.title}</h3>
                <p className="text-gray-300 mb-6">{asset.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="text-sm text-gray-400">Expected Return</div>
                    <div className="font-semibold">{asset.expectedReturn}</div>
                  </div>
                  <div className="flex items-center bg-gray-900/50 rounded-lg p-3 justify-center">
                    <button className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------- RESOURCES & NEXT STEPS + CTA (from old code) ------------------- */}
      <section className="bg-gradient-to-b from-green-50 to-green-100 py-16 px-4 text-black">
        <div className="max-w-7xl mx-auto">
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
                  <h3 className="text-2xl font-semibold text-green-800 mb-3">{resource.title}</h3>
                  <p className="text-gray-700 mb-4">{resource.description}</p>
                  <a href={resource.link} className="text-green-600 hover:text-green-800 font-semibold">
                    Read More &rarr;
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <motion.h2 className="text-4xl font-bold text-green-700 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Ready to Start Your Investment Journey?
            </motion.h2>
            <motion.button
              className="bg-green-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/allocation')} // Adjust route as needed
            >
              Build Your Portfolio Now
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernAssetsPage;
