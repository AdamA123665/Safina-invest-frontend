import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse move for background effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navItems = [
    { path: '/assets', label: 'Learn' },
    { path: '/allocation', label: 'Invest' },
    { path: '/research', label: 'Research' },
    { path: '/about', label: 'About' },
    { path: '/funds', label: 'Funds' },
    { path: '/Trial', label: 'Trial' },
    // { path: '/Test2', label: 'Test2' },
  ];

  const handleItemHover = (index) => {
    setActiveItem(index);
  };

  return (
    <div
      className={`
        w-full fixed top-0 left-0 z-50
        transition-all duration-300 ease-in-out
        ${isScrolled ? 'py-2' : 'py-3'} // Further reduced vertical padding when not scrolled
        bg-transparent
      `}
    >
      <div className={`
        w-full
        ${isScrolled ? 'pr-4' : 'max-w-5xl mx-auto px-3'} // Adjusted max-width and padding
      `}>
        <div className={`
          relative rounded-full shadow-lg backdrop-blur-sm overflow-hidden
          transition-all duration-300 ease-in-out
          ${isScrolled 
            ? 'px-3 py-1 ml-auto w-fit mr-0' 
            : 'px-2 py-1 mx-auto w-full' // Further reduced padding
          }
          bg-[#066b06] // Set the inner pill's background to #066b06
        `}>
          {/* Animated background effect */}
          <div 
            className="absolute inset-0 opacity-30" // Reduced opacity for subtle effect
            style={{
              backgroundColor: '#066b06', // Use the same green color
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />

          <div className={`
            flex items-center h-14 relative z-10 // Adjusted height to accommodate slimmer pill
            ${isScrolled ? 'justify-end space-x-1' : 'justify-between px-2'}
          `}>
            {/* Logo/Home Section with enhanced animation */}
            <div className={`flex items-center ${isScrolled ? 'mr-0' : 'mr-6'}`}> {/* Adjusted margin */}
              {!isHome ? (
                <Link
                  to="/"
                  className="flex items-center space-x-2 group"
                >
                  <div className="relative overflow-hidden p-1.5 rounded-lg"> {/* Reduced padding */}
                    <HomeIcon className="w-5 h-5 text-white transform transition-all duration-300 group-hover:scale-110" /> {/* Adjusted icon size */}
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-left" />
                  </div>
                  <span className="font-semibold text-white text-sm"> {/* Optional: Adjust text size if needed */}
                    Home
                  </span>
                </Link>
              ) : (
                <Link to="/" className="flex items-center space-x-2 relative group">
                  <img
                    src={`${process.env.PUBLIC_URL}/Safina_Invest_logo_navbar.png`}
                    alt="Safina Invest Logo"
                    className={`
                      h-auto transform transition-transform duration-300 group-hover:scale-105
                      ${isScrolled ? 'w-8' : 'w-12'} // Adjusted logo size
                    `}
                  />
                  <div className="absolute -inset-2 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
                  {!isScrolled && (
                        <span className="text-light-background font-bold">
                        Safina Invest
                        </span>
                    )}
                </Link>
              )}
            </div>

            {/* Desktop Navigation with enhanced effects */}
            <nav className={`
              hidden lg:flex items-center 
              transition-all duration-300 ease-in-out
              ${isScrolled ? 'space-x-1' : 'space-x-3'} // Adjusted spacing
            `}>
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group px-1 py-0.5 overflow-hidden" // Further reduced padding
                  onMouseEnter={() => handleItemHover(index)}
                  onMouseLeave={() => handleItemHover(null)}
                >
                  <div className="relative z-10 flex items-center space-x-1"> {/* Adjusted spacing */}
                    <span className="font-medium text-white text-sm transition-all duration-300 group-hover:text-green-100"> {/* Optional: Adjust text size */}
                      {item.label}
                    </span>
                  </div>
                  {/* Animated highlight effect */}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-all duration-300 ${
                      activeItem === index ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                  {/* Hover background effect */}
                  <div
                    className={`absolute inset-0 bg-white/10 rounded-lg transform 
                      ${activeItem === index 
                        ? 'scale-100 opacity-100' 
                        : 'scale-95 opacity-0'
                      } transition-all duration-300`}
                    style={{ zIndex: -1 }}
                  />
                  {/* Shimmer effect */}
                  <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    style={{ zIndex: -1 }}
                  />
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button with animation */}
            <button
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors relative z-10 group" // Reduced padding
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5 text-white transform transition-transform duration-300 group-hover:rotate-180" /> {/* Adjusted icon size */}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-64 shadow-2xl transform transition-transform duration-500 ease-out"
            style={{
              backgroundColor: '#066b06',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 relative">
              <button
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6 text-white transform transition-transform duration-300 group-hover:rotate-90" />
              </button>
              
              <nav className="mt-8 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group relative overflow-hidden" // Reduced padding
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium text-white group-hover:text-green-100 text-sm"> {/* Optional: Adjust text size */}
                      {item.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-white/60 ml-auto transform transition-transform duration-300 group-hover:translate-x-1 group-hover:text-green-100" /> {/* Adjusted icon size */}
                    {/* Shimmer effect for mobile menu items */}
                    <div
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
