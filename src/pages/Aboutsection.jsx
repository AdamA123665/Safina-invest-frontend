// AboutSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, TrendingUp, Target } from 'lucide-react';

const AboutSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Kick off any fade-in animations right away
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const cards = [
    {
      title: 'Learn',
      description:
        'Explore asset classes, understand your risk appetite, and find solutions that align with your goals.',
      link: '/assets',
      linkLabel: 'Explore Assets',
      icon: BookOpen,
      gradient: 'from-emerald-400 to-teal-500',
    },
    {
      title: 'Manage',
      description:
        'Use our advanced tools and data-driven services to optimize your investments with insights spanning over a decade.',
      link: '/allocation',
      linkLabel: 'Allocation Tools',
      icon: TrendingUp,
      gradient: 'from-teal-400 to-cyan-500',
    },
    {
      title: 'Prosper',
      description:
        'Stay informed with the latest investment news and resources to help your wealth flourish.',
      link: '/research',
      linkLabel: 'Research Insights',
      icon: Target,
      gradient: 'from-cyan-400 to-emerald-500',
    },
  ];

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.02,
      y: -10,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="relative w-full py-20 bg-gray-50 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={backgroundVariants}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-cyan-100 opacity-20" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(0,108,91,0.05) 1px, transparent 1px),
              radial-gradient(circle at 80% 80%, rgba(0,108,91,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Title */}
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Covering the A to Z of ethical investing
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 leading-relaxed">
            From gaining foundational knowledge to optimizing your portfolio and
            staying ahead with insightful research, we're here to guide you at
            every stage of your investing journey.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                custom={index}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                whileHover="hover"
                variants={cardVariants}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group"
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg transition-shadow duration-300 group-hover:shadow-2xl h-full">
                  {/* Outer Gradient Border (Visible on hover) */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-0.5 p-0.5">
                    <div className="absolute inset-0 bg-white rounded-2xl" />
                  </div>

                  {/* Card Content */}
                  <div className="relative flex flex-col items-center text-center h-full">
                    {/* Icon */}
                    <motion.div
                      className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r ${card.gradient}`}
                      variants={iconVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      <card.icon className="h-8 w-8 text-white" />
                    </motion.div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold mb-4 text-emerald-800">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-8">
                      {card.description}
                    </p>

                    {/* CTA Button */}
                    <motion.a
                      href={card.link}
                      className="inline-flex items-center px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 mt-auto"
                    >
                      {card.linkLabel}
                      <motion.span
                        initial={{ x: 0 }}
                        animate={{ x: hoveredCard === index ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-2"
                      >
                        →
                      </motion.span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
