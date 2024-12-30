// AboutSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, TrendingUp, Target, ArrowRight } from 'lucide-react'; // Imported ArrowRight

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
      gradient: 'from-primary-green to-deep-teal', // Updated gradient colors
    },
    {
      title: 'Manage',
      description:
        'Use our advanced tools and data-driven services to optimize your investments with insights spanning over a decade.',
      link: '/allocation',
      linkLabel: 'Allocation Tools',
      icon: TrendingUp,
      gradient: 'from-deep-teal to-dark-green', // Updated gradient colors
    },
    {
      title: 'Prosper',
      description:
        'Stay informed with the latest investment news and resources to help your wealth flourish.',
      link: '/research',
      linkLabel: 'Research Insights',
      icon: Target,
      gradient: 'from-olive-green to-primary-green', // Updated gradient colors
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
    <section className="relative w-full py-20 bg-light-background overflow-hidden">
      {/* Animated Background */}
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={backgroundVariants}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-sage opacity-20" /> {/* Updated gradient colors */}
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
          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary-green to-deep-teal bg-clip-text text-transparent">
            Covering the A to Z of ethical investing
          </h2> {/* Updated gradient colors */}
          <p className="text-lg max-w-2xl mx-auto text-deep-brown leading-relaxed">
            From gaining foundational knowledge to optimizing your portfolio and
            staying ahead with insightful research, we're here to guide you at
            every stage of your investing journey.
          </p> {/* Updated text color */}
        </motion.div>

        {/* Cards with Arrows */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <AnimatePresence>
            {cards.map((card, index) => (
              <React.Fragment key={card.title}>
                <motion.div
                  custom={index}
                  initial="hidden"
                  animate={isVisible ? 'visible' : 'hidden'}
                  whileHover="hover"
                  variants={cardVariants}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="relative group flex-1"
                >
                  <div className="relative bg-light-gold rounded-2xl p-8 shadow-lg transition-shadow duration-300 group-hover:shadow-2xl h-full"> {/* Updated background color */}
                    {/* Outer Gradient Border (Visible on hover) */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-0.5 p-0.5">
                      <div className="absolute inset-0 bg-light-gold rounded-2xl" /> {/* Updated inner background color */}
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
                      <h3 className="text-2xl font-bold mb-4 text-deep-brown">
                        {card.title}
                      </h3> {/* Updated text color */}
                      <p className="text-deep-brown leading-relaxed mb-8">
                        {card.description}
                      </p> {/* Updated text color */}

                      {/* CTA Button */}
                      <motion.a
                        href={card.link}
                        className="inline-flex items-center px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-primary-green to-deep-teal hover:from-dark-green hover:to-deep-teal transition-all duration-300 transform hover:scale-105 mt-auto"
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
                      </motion.a> {/* Updated button colors */}
                    </div>
                  </div>
                </motion.div>

                {/* Arrow between cards, except after the last card */}
                {index < cards.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                    className="hidden md:flex items-center justify-center"
                  >
                    <ArrowRight className="h-8 w-8 text-primary-green" /> {/* Updated arrow color */}
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
