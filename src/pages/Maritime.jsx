import React, { useState, useEffect } from 'react';
import { Mail, Anchor, MessageCircle, ShieldCheck, Ship } from 'lucide-react';
import { motion } from 'framer-motion';

const MaritimeContact = () => {
  const [wavePath, setWavePath] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // Generate animated wave path
  useEffect(() => {
    const generateWavePath = () => {
      const width = 1000;
      const height = 50;
      const points = [];
      for (let i = 0; i <= width; i += 10) {
        const y = Math.sin(i / 50) * (height / 2);
        points.push(`${i},${y + height}`);
      }
      return `M0,${height} ${points.join(' ')} L${width},300 L0,300 Z`;
    };
    setWavePath(generateWavePath());
  }, []);

  const contactMethods = [
    {
      id: 'email-support',
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'Navigate your financial journey with our expert guidance.',
      action: 'support@safinabank.com',
      color: 'from-emerald-500 to-teal-600',
      link: 'mailto:support@safinabank.com',
    },
    {
      id: 'digital-support',
      icon: <MessageCircle className="w-6 h-6" />,
      title: '24/7 Digital Support',
      description: 'Always online, always ready to assist.',
      action: 'Chat with us',
      color: 'from-cyan-500 to-blue-600',
      link: '/chat', // Replace with actual chat link
    },
    {
      id: 'secure-banking',
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Secure Banking',
      description: 'Your financial security is our anchor.',
      action: 'Learn more',
      color: 'from-green-500 to-emerald-600',
      link: '/secure-banking', // Replace with actual link
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Animated Ship */}
      <div
        className={`absolute right-4 top-20 transform transition-transform duration-1000 ${isHovered ? 'translate-x-8' : 'translate-x-0'} md:top-16 lg:top-20`}
      >
        <Ship className="w-16 h-16 text-emerald-600 animate-shipMove" aria-hidden="true" />
      </div>

      {/* Decorative Anchor */}
      <div className="absolute left-8 top-12 opacity-10 hidden md:block">
        <Anchor className="w-32 h-32 text-emerald-900" aria-hidden="true" />
      </div>

      {/* Animated Wave Background */}
      <div className="absolute bottom-0 left-0 w-full h-48 opacity-20">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <path
            d={wavePath}
            fill="url(#wave-gradient)"
            className="animate-wave"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Navigate Your Way to Us
            </motion.h2>
          </div>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Set sail on your financial journey with Safina Bank's digital support. 
            We're always here to guide you through the waters of modern banking.
          </motion.p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactMethods.map((method) => (
            <div
              key={method.id}
              className="group relative rounded-xl overflow-hidden"
            >
              <a href={method.link} className="block">
                <div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  style={{ backgroundColor: 'rgba(6, 95, 70, 0.05)' }}
                  aria-hidden="true"
                />
                <div className="relative p-6 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center bg-gradient-to-r ${method.color}`}>
                    <div className="text-white">
                      {method.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {method.description}
                  </p>
                  <div className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                    {method.action}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-sm">
            Your digital harbor for modern banking solutions
          </p>
          <div className="mt-4 text-emerald-600">
            <Anchor className="w-6 h-6 inline-block" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaritimeContact;
