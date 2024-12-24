import React, { useState, useEffect } from 'react';
import { PiggyBank, Info, ChevronRight, TrendingUp, Shield } from 'lucide-react';

const SavingsSection = () => {
  const [ setActiveSection] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const topPicks = [
    {
      bank: "Gatehouse Bank",
      type: "Sharia-compliant",
      rate: "5.35% EPR",
      term: "12 months",
      minDeposit: "£1,000",
      access: "Fixed Term",
      highlight: "Top Sharia Rate",
      icon: <Shield className="h-5 w-5" />
    },
    {
      bank: "Ulster Bank",
      type: "Traditional",
      rate: "5.20% AER",
      term: "Easy Access",
      minDeposit: "£1",
      access: "Instant",
      highlight: "Best Easy Access",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      bank: "Barclays",
      type: "Traditional",
      rate: "5.45% AER",
      term: "24 months",
      minDeposit: "£2,000",
      access: "Fixed Term",
      highlight: "Top Fixed Rate",
      icon: <PiggyBank className="h-5 w-5" />
    }
  ];

  const calculateParallax = (baseValue) => {
    return baseValue + (scrollY * 0.1);
  };

  const calculateMouseParallax = (intensity = 1) => {
    const x = (mousePosition.x - window.innerWidth / 2) * 0.01 * intensity;
    const y = (mousePosition.y - window.innerHeight / 2) * 0.01 * intensity;
    return `translate(${x}px, ${y}px)`;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8 overflow-hidden">
      {/* Animated background elements */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl transition-transform duration-700"
        style={{ transform: calculateMouseParallax(0.5) }}
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl transition-transform duration-700"
        style={{ transform: calculateMouseParallax(-0.5) }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
        {/* Left Column - Information */}
        <div 
          className="space-y-8"
          style={{ transform: `translateY(${calculateParallax(-20)}px)` }}
        >
          <div className="relative group cursor-pointer"
               onMouseEnter={() => setActiveSection('intro')}
               onMouseLeave={() => setActiveSection(null)}>
            <h1 className="text-4xl font-bold mb-6 flex items-center gap-3 relative">
              <span className="absolute -left-6 w-1 h-8 bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"/>
              <PiggyBank className="h-8 w-8 text-blue-600 transform group-hover:rotate-12 transition-transform duration-300" />
              Smart Savings Start Here
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-xl transform transition-all duration-300 group-hover:translate-x-2">
              Building a strong savings foundation is crucial for financial security. Whether you're saving for an emergency fund, a major purchase, or long-term goals, choosing the right savings account can significantly impact your returns.
            </p>
          </div>

          <div className="space-y-6">
            <div 
              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white transform hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
              onMouseEnter={() => setActiveSection('sharia')}
              onMouseLeave={() => setActiveSection(null)}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Info className="h-5 w-5" />
                Sharia-Compliant Savings
              </h3>
              <p className="text-blue-50 leading-relaxed">
                Sharia-compliant savings accounts follow Islamic banking principles. Instead of interest, they offer an Expected Profit Rate (EPR). These accounts invest in ethical, Sharia-compliant activities and avoid industries not permitted under Islamic law.
              </p>
            </div>

            <div 
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg transform hover:translate-y-[-4px] transition-all duration-300"
              onMouseEnter={() => setActiveSection('access')}
              onMouseLeave={() => setActiveSection(null)}
            >
              <h3 className="text-xl font-semibold mb-3">How to Open an Account</h3>
              <p className="text-gray-700 leading-relaxed">
                You can open savings accounts either directly with banks or through platforms like Raisin UK. Raisin offers a marketplace of savings products for easy comparison and management.
              </p>
            </div>
          </div>

          <a 
            href="https://www.calculator.net/savings-calculator.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium group relative overflow-hidden px-4 py-2 rounded-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              Calculate potential returns
              <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-blue-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
        </div>

        {/* Right Column - Top Picks */}
        <div 
          className="space-y-6"
          style={{ transform: `translateY(${calculateParallax(20)}px)` }}
        >
          <h2 className="text-2xl font-bold mb-8">Top Picks - December 2024</h2>
          
          <div className="space-y-4">
            {topPicks.map((pick, index) => (
              <div 
                key={index} 
                className={`relative overflow-hidden rounded-lg bg-white p-6 transition-all duration-500 ${
                  hoveredCard === index ? 'shadow-xl scale-[1.02]' : 'shadow-md'
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-50 opacity-0 transition-opacity duration-300 pointer-events-none"
                     style={{ opacity: hoveredCard === index ? 0.5 : 0 }} />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        hoveredCard === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-400'
                      } transition-colors duration-300`}>
                        {pick.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{pick.bank}</h3>
                        <span className="text-sm text-gray-500">{pick.type}</span>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {pick.highlight}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Rate</p>
                      <p className="font-semibold text-lg text-blue-600">{pick.rate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Term</p>
                      <p className="font-medium">{pick.term}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Minimum Deposit</p>
                      <p className="font-medium">{pick.minDeposit}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Access</p>
                      <p className="font-medium">{pick.access}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsSection;