// src/components/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  ChevronUp
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 mt-16">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -top-12 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 group"
      >
        <ChevronUp className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" />
      </button>

      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <img
                src={`${process.env.PUBLIC_URL}/safina_invest_logo.png`}
                alt="Safina Invest Logo"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering investors with sophisticated tools and insights for optimal portfolio management.
            </p>
            <div className="flex space-x-4">
              <Link to="/facebook" className="text-gray-400 hover:text-green-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link to="/twitter" className="text-gray-400 hover:text-green-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link to="/instagram" className="text-gray-400 hover:text-green-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/assets"
                  className="text-gray-400 hover:text-green-500 transition-colors flex items-center group"
                >
                  <span>Learn</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  to="/allocation"
                  className="text-gray-400 hover:text-green-500 transition-colors flex items-center group"
                >
                  <span>Invest</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  to="/research"
                  className="text-gray-400 hover:text-green-500 transition-colors flex items-center group"
                >
                  <span>Research</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  to="/funds"
                  className="text-gray-400 hover:text-green-500 transition-colors flex items-center group"
                >
                  <span>Funds</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-green-500 transition-colors flex items-center group"
                >
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  to="/help-center"
                  className="text-gray-400 hover:text-green-500 transition-colors flex items-center group"
                >
                  <span>Help Center</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-green-500 transition-colors flex items-center group"
                >
                  <span>Privacy Policy</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-gray-400 hover:text-green-500 transition-colors flex items-center group"
                >
                  <span>Terms of Service</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-green-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-400 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              {isSubscribed && (
                <div className="text-green-500 text-sm flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Thank you for subscribing!
                </div>
              )}
            </form>
            <p className="text-gray-500 text-sm mt-4">
              Get the latest updates on portfolio optimization and investment strategies.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Safina Invest. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-green-500 text-sm transition-colors">
                Privacy
              </Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-green-500 text-sm transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-green-500 text-sm transition-colors">
                Cookies
              </Link>
              <Link to="/sitemap" className="text-gray-500 hover:text-green-500 text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;