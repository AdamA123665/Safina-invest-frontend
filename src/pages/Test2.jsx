import React, { useState, useEffect, useRef } from 'react';
import { 
  Building,
  BarChart,
  Calculator,
  DollarSign,
  PieChart,
  LineChart,
  Landmark,
  ChevronDown,
} from 'lucide-react';

const ModernAssetsPage = () => {
  const [, setActiveSection] = useState(null);
  const [expandedTool, setExpandedTool] = useState(null);
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Mouse movement effect for glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const financialCards = [
    {
      id: 'savings',
      title: 'Savings',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-400',
      description: 'Strategic wealth building through smart saving',
      details: 'Explore various savings accounts and strategies'
    },
    {
      id: 'pensions',
      title: 'Pensions',
      icon: <Building className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-400',
      description: 'Secure your retirement future',
      details: 'Workplace and personal pension planning'
    },
    {
      id: 'isas',
      title: 'ISAs',
      icon: <Landmark className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-400',
      description: 'Tax-efficient investment accounts',
      details: 'Stocks & Shares, Cash, and Lifetime ISAs'
    },
    {
      id: 'brokerage',
      title: 'Investment Brokerage',
      icon: <BarChart className="w-8 h-8" />,
      color: 'from-orange-500 to-amber-400',
      description: 'Access global markets',
      details: 'Trade stocks, ETFs, and more'
    },
    {
      id: 'tax',
      title: 'Tax Planning',
      icon: <Calculator className="w-8 h-8" />,
      color: 'from-red-500 to-rose-400',
      description: 'Optimize your tax efficiency',
      details: 'Strategic tax planning and advice'
    }
  ];

  const tools = [
    {
      id: 'portfolio',
      title: 'Portfolio Analyzer',
      icon: <PieChart className="w-12 h-12" />,
      color: 'from-indigo-600 to-blue-400',
      description: 'Dive deep into your investments',
      expandedContent: (
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Portfolio Metrics</h3>
            <div className="h-48 bg-gray-800/50 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Risk Analysis</h3>
            <div className="h-48 bg-gray-800/50 rounded-lg animate-pulse" />
          </div>
        </div>
      )
    },
    {
      id: 'calculator',
      title: 'Investment Calculator',
      icon: <Calculator className="w-12 h-12" />,
      color: 'from-purple-600 to-pink-400',
      description: 'Plan your financial future',
      expandedContent: (
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Growth Projection</h3>
            <div className="h-48 bg-gray-800/50 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Investment Timeline</h3>
            <div className="h-48 bg-gray-800/50 rounded-lg animate-pulse" />
          </div>
        </div>
      )
    },
    {
      id: 'tracker',
      title: 'Goal Tracker',
      icon: <LineChart className="w-12 h-12" />,
      color: 'from-green-600 to-teal-400',
      description: 'Track your financial goals',
      expandedContent: (
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Goal Progress</h3>
            <div className="h-48 bg-gray-800/50 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Milestone Tracking</h3>
            <div className="h-48 bg-gray-800/50 rounded-lg animate-pulse" />
          </div>
        </div>
      )
    }
  ];

  // Asset classes data — reuse a similar card structure for each
  // You can adjust these returns, risks, and volatility to fit your needs
  const assetClasses = [
    {
      id: 'equities',
      title: 'Equities',
      icon: <BarChart className="w-8 h-8" />,
      riskLevel: 'High',
      riskColor: 'from-blue-500 to-purple-500',
      annualReturns: [60, 75, 45, 80, 65, 90],
      expectedReturn: '8-12%',
      volatility: 'High',
    },
    {
      id: 'sukuk',
      title: 'Sukuk',
      icon: <BarChart className="w-8 h-8" />,
      riskLevel: 'Low',
      riskColor: 'from-green-500 to-teal-500',
      annualReturns: [20, 25, 18, 22, 27, 24],
      expectedReturn: '3-5%',
      volatility: 'Low',
    },
    {
      id: 'private-markets',
      title: 'Private Markets',
      icon: <BarChart className="w-8 h-8" />,
      riskLevel: 'High',
      riskColor: 'from-pink-500 to-red-500',
      annualReturns: [50, 70, 40, 65, 80, 90],
      expectedReturn: '12-20%',
      volatility: 'High',
    },
    {
      id: 'commodities',
      title: 'Commodities',
      icon: <BarChart className="w-8 h-8" />,
      riskLevel: 'Moderate',
      riskColor: 'from-yellow-500 to-amber-500',
      annualReturns: [35, 45, 25, 55, 40, 60],
      expectedReturn: '5-10%',
      volatility: 'Moderate',
    },
    {
      id: 'real-estate',
      title: 'Real Estate',
      icon: <BarChart className="w-8 h-8" />,
      riskLevel: 'Moderate',
      riskColor: 'from-indigo-500 to-purple-500',
      annualReturns: [40, 55, 30, 50, 45, 60],
      expectedReturn: '6-10%',
      volatility: 'Moderate',
    },
    {
      id: 'etfs',
      title: 'ETFs',
      icon: <BarChart className="w-8 h-8" />,
      riskLevel: 'Varied',
      riskColor: 'from-gray-500 to-blue-500',
      annualReturns: [30, 45, 25, 35, 50, 55],
      expectedReturn: '5-10%',
      volatility: 'Low-High',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Title: Financial Solutions */}
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 py-20"
      >
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Financial Solutions
        </h2>

        {/* Financial Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {financialCards.map((card, index) => (
            <div
              key={card.id}
              className="group relative"
            >
              {/* Animated glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
              <div 
                className="relative h-full bg-gray-800/30 backdrop-blur-xl p-6 rounded-xl overflow-hidden border border-gray-700/50 transition-all duration-500 hover:translate-y-[-4px] hover:shadow-xl cursor-pointer"
                onClick={() => setActiveSection(card.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
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
        <div className="relative">
          {/* Horizontal Tools Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {tools.map((tool) => (
              <div key={tool.id}>
                <div
                  className={`relative bg-gray-800/30 backdrop-blur-xl rounded-xl overflow-hidden transition-all duration-500
                    ${expandedTool === tool.id ? 'border-b-0 rounded-b-none' : ''} 
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
                      className={`mt-4 w-6 h-6 transition-transform duration-300 ${expandedTool === tool.id ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Expanded Content */}
          {expandedTool && (
            <div className="absolute left-0 right-0 mt-[-1rem] pt-8">
              <div 
                className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-b-xl overflow-hidden transition-all duration-500 animate-expandDown"
                style={{ minHeight: '400px' }}
              >
                <div className="p-8">
                  <div className="relative">
                    {/* Background Effects */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
                    </div>

                    {/* Tool Expanded Content */}
                    <div className="relative">
                      {tools.find(t => t.id === expandedTool)?.expandedContent}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Title: Asset Classes */}
      <div className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Asset Classes
        </h2>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assetClasses.map((asset) => (
            <div key={asset.id} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
              <div className="relative bg-gray-800/30 backdrop-blur-xl p-6 rounded-xl border border-gray-700/50">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${asset.riskColor}`}>
                    {asset.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-400">Risk Level</span>
                    <div className="text-xl font-bold">{asset.riskLevel}</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{asset.title}</h3>
                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">Annual Returns</div>
                    <div className="flex items-end h-24 space-x-2">
                      {asset.annualReturns.map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t transition-all duration-500 group-hover:from-blue-400 group-hover:to-purple-400"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400">Expected Return</div>
                      <div className="font-semibold">{asset.expectedReturn}</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400">Volatility</div>
                      <div className="font-semibold">{asset.volatility}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ModernAssetsPage;
