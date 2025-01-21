import React, { useState, useEffect, useRef } from 'react';
import { Moon, Cog, BarChart2, BadgeCheck, ArrowDown } from 'lucide-react';

const sectionsData = [
  {
    id: 0,
    title: 'Sharia-Screened ETFs',
    subtitle: 'Your Investment Foundation',
    icon: <Moon className="w-6 h-6" />,
    gradient: 'from-primary-green to-olive-green',
    description:
      'We use Exchange-Traded Funds (ETFs) from world-leading providers like BlackRock and HSBC that pass Sharia screening',
    points: ['Diversified funds tracking major market indices', 'Lower costs']
  },
  {
    id: 1,
    title: 'Smart Optimisation',
    subtitle: 'AI-Powered Portfolio Creation',
    icon: <Cog className="w-6 h-6" />,
    gradient: 'from-deep-teal to-dark-green',
    description: 'Our algorithm creates your perfect portfolio mix',
    points: [
      'Risk-adjusted returns optimisation',
      'Sophisticated diversification strategy'
    ]
  },
  {
    id: 2,
    title: 'Ready to Invest',
    subtitle: 'One-Click Implementation',
    icon: <BarChart2 className="w-6 h-6" />,
    gradient: 'from-gold to-deep-brown',
    description: 'Seamlessly invest through Trading 212',
    points: [
      'Easy broker integration',
      'Start with £20',
      'Track your performance',
      'Regular portfolio updates'
    ]
  }
];

const ConnectedSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = Number(entry.target.dataset.step);
            setActiveStep(stepIndex);
          }
        });
      },
      { threshold: 0.6 }
    );

    stepsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-light-gold text-sage">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center px-2 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl sm:text-5xl font-bold mb-4 leading-tight text-primary-green">
            Halal Investing
            <span className="block text-gold mt-2">Made Simple</span>
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-primary-green">
            Using ETFs from the world's largest investment firms to build your
            optimal Sharia-compliant portfolio
          </p>
          <div className="animate-bounce">
            <p className="text-gold mb-2">Discover Your Path</p>
            <ArrowDown className="w-5 h-5 mx-auto text-gold" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-2 py-12">
        <div className="space-y-8 relative">
          {/* Vertical Connection Line: visible only on md+ */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-sage/20 hidden md:block">
            <div
              className="absolute top-0 w-full bg-gold transition-all duration-700"
              style={{
                height: `${(activeStep / (sectionsData.length - 1)) * 100}%`
              }}
            />
          </div>

          {sectionsData.map((section, index) => {
            const isActive = index === activeStep;
            const isPast = index < activeStep;

            return (
              <div
                key={section.id}
                ref={(el) => (stepsRef.current[index] = el)}
                data-step={index}
                className={`
                  relative
                  transition-all duration-500
                  // Keep left padding on desktop for the timeline
                  md:pl-24
                  pl-0
                  ${isActive ? 'translate-x-0 opacity-100' : 'opacity-75'}
                `}
              >
                {/* Step Number Circle */}
                <div
                  className={`
                    // Absolutely position on desktop, normal flow on mobile
                    md:absolute md:left-0 md:top-0
                    w-12 h-12 rounded-full 
                    flex items-center justify-center text-lg font-bold
                    transition-all duration-500 z-10
                    // Center on mobile and add some bottom margin
                    mx-auto md:mx-0
                    mb-4 md:mb-0

                    ${
                      isActive || isPast
                        ? 'bg-gold text-deep-brown'
                        : 'bg-sage/20 text-sage'
                    }
                    ${isActive ? 'scale-125' : 'scale-100'}
                  `}
                >
                  {index + 1}
                </div>

                {/* Card Container */}
                <div
                  className={`
                    mx-4 md:mx-0
                    bg-deep-teal rounded-xl p-6
                    transition-all duration-500
                    ${
                      isActive
                        ? 'ring-2 ring-gold shadow-lg shadow-gold/20 scale-105'
                        : 'scale-100'
                    }
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`
                      w-14 h-14 rounded-full
                      bg-gradient-to-br ${section.gradient}
                      flex items-center justify-center mb-4
                      transition-all duration-500
                      ${isActive ? 'scale-110' : 'scale-100'}
                    `}
                  >
                    <div className={isActive ? 'animate-pulse' : ''}>
                      {section.icon}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold mb-1">{section.title}</h2>
                  <p className="text-gold text-xs mb-4">{section.subtitle}</p>
                  <p className="mb-6">{section.description}</p>

                  <ul className="space-y-3">
                    {section.points.map((point, i) => (
                      <li
                        key={i}
                        className={`
                          flex items-center gap-2
                          transition-all duration-500
                          ${
                            isActive
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-75 translate-x-4'
                          }
                        `}
                        style={{ transitionDelay: `${i * 100}ms` }}
                      >
                        <BadgeCheck
                          className={`
                            w-4 h-4 text-gold flex-shrink-0
                            transition-all duration-300
                            ${isActive ? 'scale-125' : 'scale-100'}
                          `}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ConnectedSteps;
