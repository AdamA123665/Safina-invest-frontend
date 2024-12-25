import React, { useState, useRef } from 'react';
import {
  Calculator,
  PieChart,
  TrendingUp,
  Clock,
  Target,
  BarChart3,
  ArrowRight,
  ChevronRight,
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
      description:
        'Optimize your portfolio with AI-powered insights that adapt to market conditions.',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: PieChart,
      title: 'Risk Assessment',
      description:
        "Comprehensive risk analysis tools that evaluate your portfolio's exposure.",
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description:
        'Track your investment performance with sophisticated metrics and benchmarks.',
      gradient: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: Clock,
      title: 'Rebalancing Timer',
      description:
        'Smart portfolio rebalancing alerts to maintain your target allocation.',
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      icon: Target,
      title: 'Goal Planning',
      description:
        'Set and monitor your investment milestones with intelligent tracking.',
      gradient: 'from-rose-500 to-rose-600',
    },
    {
      icon: BarChart3,
      title: 'Market Analysis',
      description: 'Access real-time market insights and predictive analytics.',
      gradient: 'from-indigo-500 to-indigo-600',
    },
  ];

  const handleMouseDown = (e) => {
    // Only allow dragging in desktop mode (md: breakpoint)
    if (window.innerWidth < 768) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    // Only drag if in desktop mode (md:)
    if (!isDragging || window.innerWidth < 768) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = (direction) => {
    // Only apply scrolling on md: breakpoint
    if (window.innerWidth < 768) return;
    const container = carouselRef.current;
    const scrollAmount = container.offsetWidth * 0.8;
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative py-20 bg-gray-50">
      <div className="max-w-[90%] mx-auto">
        {/* Container that changes layout based on screen size */}
        <div className="flex flex-col md:flex-row items-start relative gap-6 md:gap-0">
          {/* Hero Card: stacked full-width on mobile, pinned left on desktop */}
          <div className="w-full md:w-[320px] bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-lg mb-6 md:mb-0 md:mr-6">
            <div className="h-auto md:h-[600px] flex flex-col justify-between p-6 md:p-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                  Investment Tools
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Unlock the power of professional-grade investment tools
                  designed to optimize your strategy and maximize returns. Our
                  comprehensive suite provides everything you need to make
                  informed decisions.
                </p>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mt-3 md:mt-4">
                  From asset allocation to risk management, each tool is crafted
                  to deliver institutional-grade capabilities with an intuitive
                  interface.
                </p>
              </div>

              <div className="flex items-center text-blue-400 group cursor-pointer mt-6">
                <span className="text-sm md:text-base mr-2">Explore all tools</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Tools Section */}
          {/* On mobile, we show them stacked vertically (grid-cols-1). 
              On desktop, we revert to a horizontal scroll. */}
          <div
            ref={carouselRef}
            className="
              w-full 
              grid grid-cols-1 gap-4 
              md:flex md:space-x-6 md:overflow-x-auto md:hide-scrollbar 
              relative md:-ml-6
            "
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
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
                  "
                >
                  <div className="bg-white hover:shadow-lg transition-all duration-300 group overflow-hidden rounded-xl shadow">
                    <div className="flex flex-col justify-between p-6 md:p-8" style={{ minHeight: '280px' }}>
                      <div>
                        <div
                          className={`
                            w-12 h-12 rounded-lg bg-gradient-to-br 
                            ${tool.gradient} 
                            flex items-center justify-center mb-4 md:mb-6
                            group-hover:scale-110 
                            transition-transform
                          `}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-gray-900">
                          {tool.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>

                      <div className="flex items-center text-blue-600 mt-3 md:mt-4">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrow - only shown on md: and up */}
          <button
            onClick={() => handleScroll(1)}
            className="
              hidden md:flex
              absolute right-4 top-1/2 -translate-y-1/2 
              w-12 h-12 bg-white rounded-full shadow-lg 
              items-center justify-center
              hover:bg-gray-50 transition-colors z-30
            "
            aria-label="Next tools"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Gradient fade for scroll indication (desktop only) */}
      <div
        className="
          hidden md:block
          absolute right-0 top-0 bottom-0
          w-32
          bg-gradient-to-l from-gray-50 to-transparent
          pointer-events-none
        "
      />
    </section>
  );
};

export default ToolsShowcase;
