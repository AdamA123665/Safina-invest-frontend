import React, { useState, useRef, useEffect } from 'react';
import {
  Calculator,
  PieChart,
  TrendingUp,
  Clock,
  Target,
  BarChart3,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

const ToolsShowcase = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);

  const tools = [
    {
      icon: Calculator,
      title: 'Asset Allocation',
      description: 'Optimize your portfolio with AI-powered insights and personalized strategies.',
      gradient: 'from-primary-green to-gold'
    },
    {
      icon: PieChart,
      title: 'Risk Assessment',
      description: "Comprehensive risk analysis tools that evaluate your portfolio's exposure and potential.",
      gradient: 'from-deep-teal to-sage'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Track your investment performance with sophisticated metrics and real-time data.',
      gradient: 'from-olive-green to-primary-green'
    },
    {
      icon: Clock,
      title: 'Rebalancing Timer',
      description: 'Smart portfolio rebalancing alerts to maintain your target allocation seamlessly.',
      gradient: 'from-gold to-olive-green'
    },
    {
      icon: Target,
      title: 'Goal Planning',
      description: 'Set and monitor your investment milestones with intelligent tracking and feedback.',
      gradient: 'from-dark-green to-primary-green'
    },
    {
      icon: BarChart3,
      title: 'Market Analysis',
      description: 'Access real-time market insights and predictive analytics to inform your decisions.',
      gradient: 'from-sage to-gold'
    }
  ];

  // Only apply “drag to scroll” on desktop:
  const handleMouseDown = (e) => {
    if (window.innerWidth < 768) return;

    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || window.innerWidth < 768) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = container.offsetWidth * 0.8;
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  };

  // Optional: Handle window resize to adjust scrollSnapType
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative py-10 px-4 md:py-20 bg-light-background">
      <div className="max-w-6xl mx-auto">
        {/* Responsive wrapper: vertical on mobile, horizontal on md+ */}
        <div className="flex flex-col md:flex-row relative">
          {/* Hero Card */}
          <div
            className="
              md:sticky md:top-20 
              md:w-80 
              bg-sage
              text-primary-green rounded-xl shadow-lg
              mb-8 md:mb-0
            "
          >
            <div className="flex flex-col justify-between p-6 md:p-10 space-y-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-deep-brown">
                  Investment Tools
                </h2>
                <p className="text-sm md:text-base text-base leading-relaxed">
                  Unlock the power of professional-grade investment tools designed to help you make informed decisions and optimize your portfolio.
                </p>
                <p className="text-sm md:text-base text-base leading-relaxed mt-3 md:mt-4">
                  From asset allocation to risk management, each tool is crafted to provide you with the insights you need for successful investing.
                </p>
              </div>

              {/* Call to Action */}
              <div className="flex items-center text-olive-green group cursor-pointer mt-4 md:mt-6">
                <span className="text-xs md:text-sm mr-2">Explore all tools</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Scrollable Tools */}
          <div
            ref={carouselRef}
            className={`
              flex-1 
              hide-scrollbar 
              relative
              flex flex-col space-y-4 md:space-y-0 
              md:flex-row md:space-x-4 
              overflow-y-auto md:overflow-x-auto 
            `}
            style={{
              scrollSnapType: isMobile ? 'y mandatory' : 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
          >
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div
                  key={index}
                  className="
                    snap-start 
                    md:min-w-[240px] 
                    bg-sage/60 rounded-xl shadow 
                    hover:shadow-xl transition-shadow duration-300 
                    flex flex-col
                  "
                >
                  <div className="flex flex-col justify-between p-6 md:p-8 space-y-4 md:space-y-6">
                    <div>
                      <div
                        className={`
                          w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br 
                          ${tool.gradient} 
                          flex items-center justify-center mb-4 md:mb-6
                          group-hover:scale-105 transition-transform
                        `}
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-light-background" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-deep-brown">
                        {tool.title}
                      </h3>
                      <p className="text-sage text-sm md:text-primary-green leading-relaxed mt-2 md:mt-3">
                        {tool.description}
                      </p>
                    </div>

                    <div className="flex items-center text-primary-green mt-2 md:mt-4">
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show arrow button only on md+ (horizontal scenario) */}
          <button
            onClick={() => handleScroll(1)}
            className="
              hidden md:flex 
              absolute right-4 top-1/2 -translate-y-1/2 
              w-10 h-10 md:w-12 md:h-12 bg-sage rounded-full shadow-lg 
              items-center justify-center hover:bg-sage hover:bg-opacity-80 
              transition-colors z-30
            "
            aria-label="Next tools"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-deep-teal" />
          </button>
        </div>
      </div>

      {/* Gradient fade for scroll indication on desktop */}
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-sage to-transparent pointer-events-none md:block hidden"></div>
    </section>
  );
};

export default ToolsShowcase;
