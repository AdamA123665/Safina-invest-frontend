// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/assets', label: 'Learn', icon: '📚' },
    { path: '/allocation', label: 'Invest', icon: '📈' },
    { path: '/research', label: 'Research', icon: '🔍' },
    { path: '/about', label: 'About', icon: '💡' },
    { path: '/funds', label: 'Funds', icon: '💰' },
  ];

  const handleItemHover = (index) => {
    setActiveItem(index);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Home Section */}
          <div className="flex items-center">
            {!isHome ? (
              <Link
                to="/"
                className="flex items-center space-x-2 group"
              >
                <div className="relative overflow-hidden">
                  <HomeIcon className="w-6 h-6 text-gray-800 transform transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </div>
                <span className="font-semibold text-gray-800">Home</span>
              </Link>
            ) : (
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src={`${process.env.PUBLIC_URL}/safina_invest_logo.png`}
                  alt="Safina Invest Logo"
                  className="w-20 h-auto"
                />
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative group px-4 py-2"
                onMouseEnter={() => handleItemHover(index)}
                onMouseLeave={() => handleItemHover(null)}
              >
                <div className="relative z-10 flex items-center space-x-2">
                  <span className="text-lg transform transition-transform group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="font-medium text-gray-800">{item.label}</span>
                </div>
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform origin-left transition-transform duration-300 ${
                    activeItem === index ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-gray-100 rounded-lg transform scale-95 opacity-0 transition-all duration-300 ${
                    activeItem === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ zIndex: -1 }}
                />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-2xl transform transition-transform duration-300">
            <div className="p-5">
              <button
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
              
              <nav className="mt-8 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-xl transform transition-transform group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="font-medium text-gray-800">{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto transform transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
