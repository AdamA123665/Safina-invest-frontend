import React, { useState, useRef } from 'react';
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
      description: 'Optimize your portfolio with AI-powered insights...',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: PieChart,
      title: 'Risk Assessment',
      description: "Comprehensive risk analysis tools that evaluate your portfolio's exposure...",
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Track your investment performance with sophisticated metrics...',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Clock,
      title: 'Rebalancing Timer',
      description: 'Smart portfolio rebalancing alerts to maintain your target allocation...',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: Target,
      title: 'Goal Planning',
      description: 'Set and monitor your investment milestones with intelligent tracking...',
      gradient: 'from-rose-500 to-rose-600'
    },
    {
      icon: BarChart3,
      title: 'Market Analysis',
      description: 'Access real-time market insights and predictive analytics...',
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ];

  // Only apply “drag to scroll” on desktop:
  const handleMouseDown = (e) => {
    // If you only want to enable dragging on desktop:
    if (window.innerWidth < 768) return;

    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    // If we’re not dragging OR on mobile, do nothing
    if (!isDragging || window.innerWidth < 768) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = (direction) => {
    // For desktop horizontal scrolling
    const container = carouselRef.current;
    const scrollAmount = container.offsetWidth * 0.8;
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  };

  // Constants for perfect proportions
  const HERO_HEIGHT = 600; // Base height
  const TOOL_HEIGHT = Math.floor(HERO_HEIGHT * 0.85); // 85% of hero height
  const VERTICAL_OFFSET = Math.floor((HERO_HEIGHT - TOOL_HEIGHT) / 2); // Center offset

  return (
    <section className="relative py-20 bg-gray-50">
      <div className="max-w-[90%] mx-auto">
        {/* Responsive wrapper: vertical on mobile, horizontal on md+ */}
        <div className="flex flex-col md:flex-row relative">
          {/* Hero Card */}
          <div
            className="
              md:sticky md:top-20 
              md:w-[320px] 
              bg-gradient-to-br from-gray-900 to-gray-800 
              text-white rounded-xl shadow-lg
              mb-8 md:mb-0
            "
          >
            <div className="h-[600px] flex flex-col justify-between p-10">
              <div>
                <h2 className="text-3xl font-bold mb-6">Investment Tools</h2>
                <p className="text-base text-gray-300 leading-relaxed">
                  Unlock the power of professional-grade investment tools designed...
                </p>
                <p className="text-base text-gray-300 leading-relaxed mt-4">
                  From asset allocation to risk management, each tool is crafted...
                </p>
              </div>

              <div className="flex items-center text-blue-400 group cursor-pointer">
                <span className="text-sm mr-2">Explore all tools</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              /* Mobile: vertical scroll, spacing Y, no margin-left offset */
              flex flex-col space-y-6 overflow-y-auto
              /* Desktop: horizontal scroll, spacing X, -ml-6 for overlap */
              md:flex-row md:space-y-0 md:space-x-6 md:overflow-x-auto md:-ml-6
            `}
            /* Use scroll-snap in different directions depending on screen size */
            style={{
              // For mobile vertical snapping
              scrollSnapType: window.innerWidth < 768 ? 'y mandatory' : 'x mandatory',
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
                  /* 
                    On desktop: min-w for horizontal child 
                    On mobile: remove that min-w or override 
                  */
                  className="md:min-w-[240px] snap-start"
                  style={{
                    marginTop: `${VERTICAL_OFFSET}px`
                  }}
                >
                  <div className="bg-white hover:shadow-lg transition-all duration-300 group overflow-hidden rounded-xl shadow">
                    <div
                      className="flex flex-col justify-between p-8"
                      style={{ height: `${TOOL_HEIGHT}px` }}
                    >
                      <div>
                        <div
                          className={`
                            w-12 h-12 rounded-lg bg-gradient-to-br 
                            ${tool.gradient} 
                            flex items-center justify-center mb-6
                            group-hover:scale-110 transition-transform
                          `}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900">
                          {tool.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>

                      <div className="flex items-center text-blue-600 mt-4">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
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
              w-12 h-12 bg-white rounded-full shadow-lg 
              items-center justify-center hover:bg-gray-50 
              transition-colors z-30
            "
            aria-label="Next tools"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Gradient fade for scroll indication on desktop */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none md:block hidden"></div>
    </section>
  );
};

export default ToolsShowcase;
