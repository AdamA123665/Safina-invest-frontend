import React, { useState, useEffect,useCallback } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
function ResearchNews() {
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState('news'); // 'news' or 'research'
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Fetch all articles from the endpoint
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://safinabackend.azurewebsites.net/api/articles');
        if (!response.ok) throw new Error('Failed to fetch articles');
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticles();
  }, []);

  // Filter articles based on active tab and search query
  useEffect(() => {
    const filtered = articles.filter((article) => {
      const matchesTab =
        activeTab === 'news' ? article.type === 'news' : article.type === 'research';
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(article.content)
          ? article.content.some((section) =>
              typeof section === 'string' &&
              section.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : false);
      return matchesTab && matchesSearch;
    });
    setFilteredArticles(filtered);
  }, [activeTab, searchQuery, articles ]);

  const totalSlides = articles.slice(0, 5).length;
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  useEffect(() => {
    const autoplay = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoplay);
  }, [currentSlide, totalSlides, nextSlide]);

  return (
    <section id="research" className="py-20 bg-gradient-to-b from-gray-50 to-gray-200 pt-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-800">Research & News</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore the latest insights in Islamic finance and investment strategies.
          </p>
        </div>

        <div className="relative mb-12 h-96 overflow-hidden rounded-lg shadow-lg">
      {articles.slice(0, 5).map((article, index) => (
        <div
          key={article.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
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
          <div className="relative z-20 p-8 md:p-16 lg:p-24 flex flex-col justify-end h-full">
            <h3 className="text-4xl font-bold text-white mb-4">{article.title}</h3>
            <p
            className="text-gray-200 mb-6 line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: `${article.content_html.substring(0, 120)}...`,
            }}
          ></p>
            <button
              onClick={() => navigate(`/articles/${article.id.toLowerCase()}`)}
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
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition z-30"
        aria-label="Previous Slide"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition z-30"
        aria-label="Next Slide"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-800" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {articles.slice(0, 5).map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              index === currentSlide ? 'bg-green-600' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
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
    filteredArticles.map((article) => (
      <div
        key={article.id}
        className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
      >
        {/* Article Image */}
        <img
          src={article.image_url || 'https://source.unsplash.com/600x400/?islamic,finance'}
          alt={article.title}
          className="w-full h-56 object-cover"
        />

        {/* Article Content */}
        <div className="p-6">
          {/* Article Title */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{article.title}</h3>

          {/* Article Date */}
          <p className="text-sm text-gray-500 mb-4">{article.date}</p>

          {/* Article Summary */}
          <p className="text-gray-700 mb-6 line-clamp-3">{article.summary}</p>

          {/* Read More Button */}
          <button
            onClick={() => navigate(`/articles/${article.id}`)}
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
    </section>
  );
}

export default ResearchNews;
