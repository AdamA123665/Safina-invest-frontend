import React, { useState, useEffect } from 'react';
import { PiggyBank, Info, ChevronRight, Shield, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const SavingsSection = () => {
  const [, setActiveSection] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate(); // Set up the navigate function
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
      bank: "Al Rayan Bank",
      type: "Sharia-compliant",
      rate: "4.75% EPR",
      term: "12 months",
      minDeposit: "£1,000",
      access: "Fixed Term",
      highlight: "Top Fixed Rate",
      icon: <Shield className="h-4 w-4" />
    },
    {
      bank: "QIB UK",
      type: "Traditional",
      rate: "4.5%% AER",
      term: "Easy Access",
      minDeposit: "£1000",
      access: "Instant",
      highlight: "Best Easy Access",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      bank: "Barclays",
      type: "Traditional",
      rate: "4.7% AER",
      term: "31 day notice",
      minDeposit: "£2,000",
      access: "Fixed Term",
      highlight: "Top Notice Account",
      icon: <PiggyBank className="h-4 w-4" />
    }
  ];

  const calculateParallax = (baseValue) => {
    const translation = baseValue + (scrollY * 0.05); 
    return translation > 100 ? 100 : translation < -100 ? -100 : translation;
  };

  const calculateMouseParallax = (intensity = 1) => {
    const x = (mousePosition.x - window.innerWidth / 2) * 0.01 * intensity;
    const y = (mousePosition.y - window.innerHeight / 2) * 0.01 * intensity;
    return `translate(${x}px, ${y}px)`;
  };

  return (
    <div className="relative bg-light-background py-10 px-4 md:px-8 lg:px-16 pb-24">
      {/* Animated background elements */}
      <div 
        className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-primary-green/20 rounded-full opacity-20 blur-3xl transition-transform duration-700 z-0"
        style={{ transform: calculateMouseParallax(0.5) }}
      />
      <div 
        className="absolute bottom-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-gold/20 rounded-full opacity-20 blur-3xl transition-transform duration-700 z-0"
        style={{ transform: calculateMouseParallax(-0.5) }}
      />

      {/* Container to limit width on larger screens */}
      <div className="relative max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column - Information */}
          <div 
            className="space-y-8"
            style={{ transform: `translateY(${calculateParallax(-20)}px)` }}
          >
            {/* Introduction Section */}
            <div 
              className="relative group cursor-pointer"
              onMouseEnter={() => setActiveSection('intro')}
              onMouseLeave={() => setActiveSection(null)}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 flex items-center gap-3 relative leading-tight">
                {/* Updated Background Bar and Icon Color */}
                <span className="absolute -left-6 w-1 h-10 bg-primary-green transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <PiggyBank className="h-8 w-8 text-primary-green transform group-hover:rotate-12 transition-transform duration-300" />
                Smart Savings Start Here
              </h1>

              {/* Updated Text Color for Paragraph */}
              <p className="text-sm md:text-base lg:text-lg text-deep-brown leading-relaxed max-w-xl transform transition-all duration-300 group-hover:translate-x-1">
                Building a strong savings foundation is crucial for financial security. Whether you're saving for an emergency fund, a major purchase, or long-term goals, choosing the right savings account can significantly impact your returns.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-8">
              {/* Sharia-Compliant Savings Card */}
              <div 
                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-green to-gold p-6 text-light-background transition-all duration-300 cursor-pointer group"
                onMouseEnter={() => setActiveSection('sharia')}
                onMouseLeave={() => setActiveSection(null)}
              >
                {/* Updated Overlay Color */}
                <div className="absolute inset-0 bg-light-background opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
                
                {/* Updated Icon Color */}
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3 flex items-center gap-2">
                  <Info className="h-5 w-5 text-light-background" />
                  Sharia-Compliant Savings
                </h3>
                {/* Updated Text Color */}
                <p className="text-sage leading-relaxed text-sm md:text-base lg:text-lg">
                  Sharia-compliant savings accounts follow Islamic banking principles. Instead of interest, they offer an Expected Profit Rate (EPR). These accounts invest in ethical, Sharia-compliant activities and avoid industries not permitted under Islamic law.
                </p>
              </div>

              {/* How to Open an Account Card */}
              <div
      className="bg-light-background/80 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-300 
                 cursor-pointer"
      onMouseEnter={() => setActiveSection("access")}
      onMouseLeave={() => setActiveSection(null)}
      // This will direct the user to raisin.co.uk on click
      onClick={() => navigate("https://www.raisin.co.uk")}
    >
      <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3 text-deep-brown">
        How to Open an Account
      </h3>
      <p className="text-deep-brown leading-relaxed text-sm md:text-base lg:text-lg">
        You can open savings accounts either directly with banks or 
        through platforms like{" "}
        <span className="text-blue-500 font-semibold underline">
          Raisin UK
        </span>
        . Raisin offers a marketplace of savings products for easy
        comparison and management.
      </p>
    </div>
            </div>

            {/* Call to Action */}
            <button
              onClick={() => navigate('/articles/understanding-savings')} // Navigate to the specified route
              className="inline-flex items-center gap-2 text-primary-green hover:text-dark-green font-medium group relative overflow-hidden px-4 py-2 rounded-lg"
            >
              <span className="relative z-10 flex items-center gap-2 text-sm md:text-base lg:text-lg">
                Learn more about savings
                <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              {/* Updated Background Color */}
              <div className="absolute inset-0 bg-sage transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          </div>

          {/* Right Column - Top Picks */}
          <div 
            className="space-y-6"
            style={{ transform: `translateY(${calculateParallax(20)}px)` }}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-6 text-deep-brown">
              Top Picks - December 2024
            </h2>

            <div className="space-y-4">
              {topPicks.map((pick, index) => (
                <div 
                  key={index} 
                  className={`relative overflow-hidden rounded-lg bg-sage p-4 transition-all duration-500 ${
                    hoveredCard === index ? 'shadow-xl scale-[1.01]' : 'shadow-md'
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Updated Overlay Gradient Color */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-teal opacity-0 transition-opacity duration-300 pointer-events-none"
                    style={{ opacity: hoveredCard === index ? 0.3 : 0 }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-2">
                        {/* Updated Icon Container Colors */}
                        <div 
                          className={`p-1.5 rounded-lg ${
                            hoveredCard === index
                              ? 'bg-primary-green text-light-background'
                              : 'bg-light-gold text-deep-teal'
                          } transition-colors duration-300`}
                        >
                          {pick.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm md:text-deep-teal lg:text-lg text-deep-brown">{pick.bank}</h3>
                          <span className="text-xs md:text-sm text-deep-teal">{pick.type}</span>
                        </div>
                      </div>
                      {/* Updated Highlight Badge Colors */}
                      <span className="bg-primary-green text-light-background text-xs md:text-sm font-medium px-2 py-0.5 rounded-full">
                        {pick.highlight}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-0.5">
                        <p className="text-xs md:text-sm text-deep-brown">Rate</p>
                        <p className="font-semibold text-sm md:text-olive-green lg:text-lg text-primary-green">{pick.rate}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs md:text-sm text-deep-brown">Term</p>
                        <p className="font-medium text-xs md:text-sm lg:text-olive-green text-deep-brown">{pick.term}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs md:text-sm text-deep-brown">Minimum Deposit</p>
                        <p className="font-medium text-xs md:text-sm lg:text-olive-green text-deep-brown">{pick.minDeposit}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs md:text-sm text-deep-brown">Access</p>
                        <p className="font-medium text-xs md:text-sm lg:text-olive-green text-deep-brown">{pick.access}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsSection;
