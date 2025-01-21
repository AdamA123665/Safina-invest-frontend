import React, { useState, useEffect, useRef } from 'react';
import { Moon, Cog, BarChart2, BadgeCheck, ArrowDown } from 'lucide-react';

const sectionsData = [
  {
    id: 0,
    title: 'Sharia-Screened ETFs',
    subtitle: 'Your Investment Foundation',
    icon: <Moon className="w-8 h-8" />,
    gradient: 'from-primary-green to-olive-green',
    description: 'We use Exchange-Traded Funds (ETFs) from world-leading providers like BlackRock and HSBC that pass strict Sharia screening',
    points: [
      'Diversified funds tracking major market indices',
      'Zero exposure to interest-based investments',
      'Regular compliance monitoring',
      'Lower costs than traditional mutual funds'
    ]
  },
  {
    id: 1,
    title: 'Smart Optimisation',
    subtitle: 'AI-Powered Portfolio Creation',
    icon: <Cog className="w-8 h-8" />,
    gradient: 'from-deep-teal to-dark-green',
    description: 'Our algorithm creates your perfect portfolio mix',
    points: [
      'Risk-adjusted returns optimisation',
      'Sophisticated diversification strategy',
      'Lower fees than active management',
      'Automatic rebalancing suggestions'
    ]
  },
  {
    id: 2,
    title: 'Ready to Invest',
    subtitle: 'One-Click Implementation',
    icon: <BarChart2 className="w-8 h-8" />,
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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stepIndex = Number(entry.target.dataset.step);
          setActiveStep(stepIndex);
        }
      });
    }, { threshold: 0.6 });

    stepsRef.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-deep-brown text-sage">
      {/* Hero Section */}
      <header className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Halal Investing
            <span className="block text-gold mt-2">Made Simple</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-12">
            Using ETFs from the world's largest investment firms to build your
            optimal Sharia-compliant portfolio
          </p>
          <div className="animate-bounce">
            <p className="text-gold mb-4">Discover Your Path</p>
            <ArrowDown className="w-6 h-6 mx-auto text-gold" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-24">
        {/* Step Cards */}
        <div className="space-y-12 relative">
          {/* Vertical Connection Line */}
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
                ref={el => stepsRef.current[index] = el}
                data-step={index}
                className={`
                  relative pl-16 md:pl-24 transition-all duration-500
                  ${isActive ? 'translate-x-0 opacity-100' : 'opacity-75'}
                `}
              >
                {/* Step Number Circle */}
                <div className={`
                  absolute left-0 top-0 w-12 h-12 rounded-full 
                  flex items-center justify-center text-xl font-bold
                  transition-all duration-500 z-10
                  ${isActive || isPast ? 'bg-gold text-deep-brown' : 'bg-sage/20 text-sage'}
                  ${isActive ? 'scale-125' : 'scale-100'}
                `}>
                  {index + 1}
                </div>

                {/* Card Content */}
                <div className={`
                  bg-deep-teal rounded-xl p-8
                  transition-all duration-500
                  ${isActive ? 'ring-2 ring-gold shadow-lg shadow-gold/20 scale-105' : 'scale-100'}
                `}>
                  {/* Icon */}
                  <div className={`
                    w-16 h-16 rounded-full
                    bg-gradient-to-br ${section.gradient}
                    flex items-center justify-center mb-6
                    transition-all duration-500
                    ${isActive ? 'scale-110' : 'scale-100'}
                  `}>
                    <div className={isActive ? 'animate-pulse' : ''}>
                      {section.icon}
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                  <p className="text-gold text-sm mb-6">{section.subtitle}</p>
                  <p className="mb-8">{section.description}</p>

                  <ul className="space-y-4">
                    {section.points.map((point, i) => (
                      <li
                        key={i}
                        className={`
                          flex items-center gap-3
                          transition-all duration-500
                          ${isActive ? 'opacity-100 translate-x-0' : 'opacity-75 translate-x-4'}
                        `}
                        style={{ transitionDelay: `${i * 100}ms` }}
                      >
                        <BadgeCheck className={`
                          w-5 h-5 text-gold flex-shrink-0
                          transition-all duration-300
                          ${isActive ? 'scale-125' : 'scale-100'}
                        `} />
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