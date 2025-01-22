import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBar,
  Shield,
  MinusCircle,
  TrendingUp,
  TrendingDown,
  Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
const PortfolioExplainerPage = () => {
  const [riskLevel, setRiskLevel] = useState(5);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const navigate = useNavigate(); 
  // This is just an example function to illustrate dynamic text data for each risk level.
  // Not showing any Python or formula details here.
  const getRiskDescriptions = (risk) => {
    const estimatedReturnEmphasis = risk > 7 ? 'High' : risk < 4 ? 'Low' : 'Moderate';
    const volatilityFocus = risk > 7 ? 'Lower priority' : risk < 4 ? 'High priority' : 'Balanced';
    const downsideProtection = risk > 7 ? 'Reduced emphasis' : risk < 4 ? 'Core focus' : 'Moderate emphasis';
    const drawdownTolerance = risk > 7 ? 'Flexible' : risk < 4 ? 'Strict' : 'Moderate';
    const defensiveAllocation = risk > 7 ? 'Lower defensive allocation' : risk < 4 ? 'High defensive allocation' : 'Balanced allocation';

    return {
      estimatedReturnEmphasis,
      volatilityFocus,
      downsideProtection,
      drawdownTolerance,
      defensiveAllocation
    };
  };

  const riskProfiles = [
    {
      level: 'Conservative (1-3)',
      description:
        'Prioritises capital preservation with steady, modest returns and a strong focus on minimising volatility.',
      characteristics: [
        'High defensive asset allocation (65 to 80 percent)',
        'Strict drawdown limits (5 to 8 percent)',
        'Steady, low volatility assets'
      ],
      simplifiedDescription:
        'A conservative portfolio aims to protect principal while offering smaller, more stable returns.'
    },
    {
      level: 'Moderate (4-6)',
      description:
        'Strikes a balance between stability and growth, aiming for moderate returns while still applying risk controls.',
      characteristics: [
        'Moderate defensive allocation (40 to 65 percent)',
        'Balanced drawdown limits (8 to 12 percent)',
        'Mix of growth and defensive assets'
      ],
      simplifiedDescription:
        'A moderate portfolio aims for fair returns without taking on excessive risk.'
    },
    {
      level: 'Growth (7-8)',
      description:
        'Emphasises higher returns while managing volatility, suitable for those comfortable with more risk.',
      characteristics: [
        'Lower defensive allocation (25 to 40 percent)',
        'Higher drawdown tolerance (12 to 15 percent)',
        'Greater exposure to growth assets'
      ],
      simplifiedDescription:
        'A growth portfolio seeks stronger capital appreciation, accepting larger ups and downs.'
    },
    {
      level: 'Aggressive (9-10)',
      description:
        'Pursues maximum growth with a high tolerance for market swings, ideal for long term wealth building.',
      characteristics: [
        'Minimal defensive allocation (15 to 25 percent)',
        'Highest drawdown tolerance (15 to 20 percent)',
        'Maximum emphasis on growth assets'
      ],
      simplifiedDescription:
        'An aggressive portfolio targets substantial returns, prepared for significant market volatility.'
    }
  ];

  const optimisationMetrics = [
    {
      name: 'Return Emphasis',
      icon: <TrendingUp className="w-6 h-6" />,
      description:
        'Shows how much weight is placed on increasing returns based on your risk preference.',
      impact: 'Higher risk levels generally put more focus on capturing potential market gains.'
    },
    {
      name: 'Volatility Management',
      icon: <ChartBar className="w-6 h-6" />,
      description:
        'Reflects how the portfolio aims to handle swings in market value, helping smooth large fluctuations.',
      impact: 'As risk tolerance goes up, the strictness of volatility limits often loosens to allow for higher returns.'
    },
    {
      name: 'Downside Protection',
      icon: <TrendingDown className="w-6 h-6" />,
      description:
        'Concentrates on reducing big losses by limiting exposure to highly volatile or risky assets.',
      impact: 'Investors with lower risk tolerance usually have stronger measures to protect against large losses.'
    },
    {
      name: 'Drawdown Control',
      icon: <MinusCircle className="w-6 h-6" />,
      description:
        'Caps the maximum percentage a portfolio may fall from its peak value, helping preserve capital.',
      impact:
        'More conservative portfolios keep tighter drawdown thresholds, while higher risk portfolios allow more flexibility.'
    },
    {
      name: 'Defensive Allocation',
      icon: <Shield className="w-6 h-6" />,
      description:
        'Makes sure a certain portion of the portfolio remains in defensive or lower volatility assets.',
      impact:
        'This defensive portion typically shrinks as risk tolerance rises, leaving more room for growth assets.'
    }
  ];

  const currentRiskDescriptions = getRiskDescriptions(riskLevel);

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-background to-sage">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-green to-deep-teal text-white px-4 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
          >
            Unveiling the Science Behind Our Portfolio Optimisation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl text-light-gold max-w-3xl mx-auto"
          >
            Learn how key parameters guide our approach to balancing risk and return so your investments remain aligned with your personal goals.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Risk Score Section */}
        <section className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-8 text-center text-deep-brown"
          >
            Understanding Your Risk Score
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Interactive Panel */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-semibold mb-4 text-deep-brown"
                >
                  Pick Your Comfort Zone
                </motion.h3>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-deep-brown">
                    Select Your Risk Level (1 to 10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={riskLevel}
                    onChange={(e) => setRiskLevel(parseInt(e.target.value))}
                    className="w-full h-2 bg-gold rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-deep-brown/80">
                    <span>Conservative</span>
                    <span>Moderate</span>
                    <span>Aggressive</span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-light-background p-4 rounded-lg"
                  >
                    <div className="text-sm text-deep-brown/80">Return Emphasis</div>
                    <div className="text-lg font-semibold text-primary-green">
                      {currentRiskDescriptions.estimatedReturnEmphasis}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-light-background p-4 rounded-lg"
                  >
                    <div className="text-sm text-deep-brown/80">Volatility Focus</div>
                    <div className="text-lg font-semibold text-primary-green">
                      {currentRiskDescriptions.volatilityFocus}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-light-background p-4 rounded-lg"
                  >
                    <div className="text-sm text-deep-brown/80">Downside Protection</div>
                    <div className="text-lg font-semibold text-primary-green">
                      {currentRiskDescriptions.downsideProtection}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-light-background p-4 rounded-lg"
                  >
                    <div className="text-sm text-deep-brown/80">Drawdown Tolerance</div>
                    <div className="text-lg font-semibold text-primary-green">
                      {currentRiskDescriptions.drawdownTolerance}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-light-background p-4 rounded-lg sm:col-span-2"
                  >
                    <div className="text-sm text-deep-brown/80">Defensive Allocation</div>
                    <div className="text-lg font-semibold text-primary-green">
                      {currentRiskDescriptions.defensiveAllocation}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Explanation Panel */}
            <div className="space-y-6">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-semibold mb-4 text-deep-brown"
              >
                How Your Risk Score Shapes the Portfolio
              </motion.h3>
              <p className="text-deep-brown leading-relaxed">
                Your selected risk level influences five key elements in our portfolio construction. These include return emphasis, volatility management, downside protection, drawdown control, and defensive allocation. Each element is adjusted according to your preference so your portfolio remains aligned with market opportunities and your tolerance for fluctuations.
              </p>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="font-semibold mb-4 text-deep-brown">Key Factors at Play</h4>
                <div className="space-y-4">
                  {optimisationMetrics.map((metric) => (
                    <motion.div
                      key={metric.name}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedMetric === metric.name
                          ? 'bg-sage ring-2 ring-gold'
                          : 'bg-light-background hover:bg-sage'
                      }`}
                      onClick={() =>
                        setSelectedMetric(selectedMetric === metric.name ? null : metric.name)
                      }
                    >
                      <div className="flex items-center space-x-3 text-deep-brown">
                        {metric.icon}
                        <span className="font-medium">{metric.name}</span>
                      </div>
                      {selectedMetric === metric.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 space-y-2"
                        >
                          <p className="text-sm text-deep-brown/90">{metric.description}</p>
                          <p className="text-sm text-primary-green font-medium">{metric.impact}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Profiles Section */}
        <section className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-8 text-center text-deep-brown"
          >
            Different Approaches to Risk
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {riskProfiles.map((profile) => (
              <motion.div
                key={profile.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2 text-deep-brown">{profile.level}</h3>
                <p className="text-deep-brown/90 mb-2">{profile.description}</p>
                <div className="space-y-3 mb-2">
                  {profile.characteristics.map((char, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-dark-green rounded-full"></div>
                      </div>
                      <p className="text-sm text-deep-brown/80">{char}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-light-background rounded-lg p-3">
                  <p className="text-sm text-deep-brown italic">
                    {profile.simplifiedDescription}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Optimisation Process Section */}
        <section className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-8 text-center text-deep-brown"
          >
            Inside the Optimisation
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-deep-brown">Step by Step Breakdown</h3>
                <ol className="space-y-4 text-sm text-deep-brown/90">
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-light-gold rounded-full flex items-center justify-center text-deep-teal font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-brown">Risk Translation</h4>
                      <p>
                        Your risk score is turned into specific targets for returns, volatility, and defensive coverage.
                      </p>
                    </div>
                  </motion.li>

                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-light-gold rounded-full flex items-center justify-center text-deep-teal font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-brown">Constraint Setting</h4>
                      <p>
                        Rules like position limits, drawdown targets, and defensive ratios help keep the portfolio in check.
                      </p>
                    </div>
                  </motion.li>

                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-light-gold rounded-full flex items-center justify-center text-deep-teal font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-brown">Multi Factor Balancing</h4>
                      <p>
                        By weighing returns, volatility, and downside protection, we look for the most effective blend of assets.
                      </p>
                    </div>
                  </motion.li>

                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-light-gold rounded-full flex items-center justify-center text-deep-teal font-semibold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-brown">Portfolio Construction</h4>
                      <p>
                        We then create weights for each asset class to produce a holistic, risk aligned portfolio.
                      </p>
                    </div>
                  </motion.li>
                </ol>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-deep-brown">Core Techniques</h3>
                <div className="space-y-4 text-sm text-deep-brown/90">
                  <div className="bg-light-background p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-green">Advanced Optimisation</h4>
                    <p>
                      We use a constraint aware optimiser that seeks the best risk return mix based on your choices.
                    </p>
                  </div>
                  <div className="bg-light-background p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-green">Position Rounding</h4>
                    <p>
                      We convert continuous asset weights into straightforward percentages, ensuring practical allocations.
                    </p>
                  </div>
                  <div className="bg-light-background p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-green">Comprehensive Risk Checks</h4>
                    <p>
                      We regularly assess expected return, volatility, and downside exposure to confirm that everything remains aligned with your goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-deep-brown">Conceptual Framework</h3>
                <div className="space-y-4 text-sm text-deep-brown/90">
                  <div className="bg-light-background p-4 rounded-lg">
                    <h4 className="font-semibold text-deep-brown">Balancing Multiple Priorities</h4>
                    <p>
                      Our approach considers objectives such as positive returns, lower volatility, and limiting extreme losses, then weights them according to your risk profile.
                    </p>
                  </div>
                  <div className="bg-light-background p-4 rounded-lg">
                    <h4 className="font-semibold text-deep-brown">Maintaining Portfolio Constraints</h4>
                    <p>
                      Allocations are kept within rules that guard against holding too much of any single asset class, reducing concentration risk.
                    </p>
                  </div>
                  <div className="bg-light-background p-4 rounded-lg">
                    <h4 className="font-semibold text-deep-brown">Adaptive to Risk Levels</h4>
                    <p>
                      If your risk preference changes, the system automatically adjusts how it balances potential gains against safety measures.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-deep-brown">Validation and Safety Checks</h3>
                <div className="space-y-3 text-sm text-deep-brown/90">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-5 h-5 text-dark-green" />
                    <span>All asset weights sum to 100 percent</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lock className="w-5 h-5 text-dark-green" />
                    <span>Position limits stay within acceptable ranges</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lock className="w-5 h-5 text-dark-green" />
                    <span>Defensive allocation is never compromised</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lock className="w-5 h-5 text-dark-green" />
                    <span>Drawdown thresholds are upheld</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-gold to-olive-green text-white rounded-xl shadow-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Investments</h2>
            <p className="text-lg sm:text-xl mb-8 text-light-gold">
              Experience a tailored portfolio that suits your financial vision and risk comfort.
            </p>
            <button 
            onClick={() => navigate('/allocation')}
            className="bg-white text-primary-green px-8 py-3 rounded-lg font-semibold hover:bg-sage transition-colors">
              Create Your Portfolio
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioExplainerPage;
