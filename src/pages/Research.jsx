import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';
import { XIcon, SearchIcon } from '@heroicons/react/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

function ResearchNews({ portfolioData }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('news'); // 'news' or 'research'
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Memoize articles to prevent unnecessary re-renders
  const articles = useMemo(() => {
    return portfolioData?.dashboard_data.research_articles || [];
  }, [portfolioData]);

  useEffect(() => {
    // Filter articles based on active tab and search query
    const filtered = articles.filter((article) => {
      const matchesTab =
        activeTab === 'news' ? article.type === 'news' : article.type === 'research';
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
    setFilteredArticles(filtered);
  }, [activeTab, searchQuery, articles]);

  const openArticleModal = (article) => {
    setSelectedArticle(article);
    setArticleModalOpen(true);
  };

  const closeArticleModal = () => {
    setSelectedArticle(null);
    setArticleModalOpen(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.min(articles.length, 5));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.min(articles.length, 5)) % Math.min(articles.length, 5));
  };

  return (
    <section id="research" className="py-20 bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-800">Research & News</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore the latest insights in Islamic finance and investment strategies.
          </p>
        </div>

        {/* Hero Carousel */}
        <div className="relative mb-12 h-96 overflow-hidden rounded-lg shadow-lg">
          {articles.slice(0, 5).map((article, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${
                    article.image_url ||
                    'https://source.unsplash.com/1600x900/?finance,investment'
                  })`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
              <div className="relative z-10 p-8 md:p-16 lg:p-24 flex flex-col justify-end h-full">
                <h3 className="text-4xl font-bold text-white mb-4">{article.title}</h3>
                <p className="text-gray-200 mb-6">{article.content.substring(0, 120)}...</p>
                <button
                  onClick={() => openArticleModal(article)}
                  className="self-start px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-800" />
          </button>
          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {articles.slice(0, 5).map((_, index) => (
              <span
                key={index}
                className={`h-3 w-3 rounded-full cursor-pointer ${
                  index === currentSlide ? 'bg-green-600' : 'bg-gray-400'
                }`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
        </div>

        {/* Tabs for News and Research */}
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 mr-4 text-lg font-medium rounded-full shadow ${
              activeTab === 'news'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('news')}
          >
            Latest News
          </button>
          <button
            className={`px-6 py-2 text-lg font-medium rounded-full shadow ${
              activeTab === 'research'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('research')}
          >
            Research Articles
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 shadow"
            />
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
              >
                <img
                  src={article.image_url || 'https://source.unsplash.com/600x400/?islamic,finance'}
                  alt={article.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{article.date}</p>
                  <p className="text-gray-700 mb-6 line-clamp-3">{article.content}</p>
                  <button
                    onClick={() => openArticleModal(article)}
                    className="inline-block px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">No articles found.</p>
          )}
        </div>
      </div>

      {/* Article Modal */}
      <Transition show={articleModalOpen} as="div" className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"
          />
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as="div"
            className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full max-w-3xl"
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {selectedArticle && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-3xl font-bold text-gray-800">{selectedArticle.title}</h3>
                  <button
                    onClick={closeArticleModal}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-6">{selectedArticle.date}</p>
                <div className="prose max-w-none text-gray-700">
                  {selectedArticle.content.split('\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
            )}
          </Transition.Child>
        </div>
      </Transition>
    </section>
  );
}

// Define PropTypes
ResearchNews.propTypes = {
  portfolioData: PropTypes.shape({
    dashboard_data: PropTypes.shape({
      research_articles: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired,
          image_url: PropTypes.string,
          type: PropTypes.string.isRequired, // "news" or "research"
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ResearchNews;
