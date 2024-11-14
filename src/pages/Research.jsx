import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';

function ResearchNews({ portfolioData }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleModalOpen, setArticleModalOpen] = useState(false);

  const openArticleModal = (article) => {
    setSelectedArticle(article);
    setArticleModalOpen(true);
  };

  const closeArticleModal = () => {
    setSelectedArticle(null);
    setArticleModalOpen(false);
  };

  return (
    <section id="research" className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Research & News</h2>
          <p className="text-gray-600 mt-4">
            Stay updated with the latest news and research articles in Islamic finance and investment strategies.
          </p>
        </div>

        {/* News Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {portfolioData && portfolioData.dashboard_data.research_articles.slice(0, 3).map((article, index) => (
            <div key={index} className="relative group bg-cover bg-center rounded-lg shadow-lg h-64"
              style={{
                backgroundImage: `url(${article.image_url || 'https://source.unsplash.com/600x400/?finance,investing'})`
              }}>
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg transition duration-300 group-hover:bg-opacity-70"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                <h3 className="text-2xl font-bold">{article.title}</h3>
                <p className="text-sm">{article.date}</p>
                <button
                  onClick={() => openArticleModal(article)}
                  className="text-sm underline hover:text-green-400"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* All Articles Section */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Explore All Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData && portfolioData.dashboard_data.research_articles.map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <img
                  src={article.image_url || 'https://source.unsplash.com/600x400/?islamic,finance'}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{article.date}</p>
                  <p className="text-gray-700 text-sm line-clamp-3">{article.content}</p>
                  <button
                    onClick={() => openArticleModal(article)}
                    className="text-blue-500 underline mt-4"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Article Modal */}
      <Transition show={articleModalOpen} as="div" className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity"
          />
          <Transition.Child
            as="div"
            className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-3xl"
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            {selectedArticle && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">{selectedArticle.title}</h3>
                  <button
                    onClick={closeArticleModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">{selectedArticle.date}</p>
                <div className="prose max-w-none">
                  <p>{selectedArticle.content}</p>
                </div>
              </div>
            )}
          </Transition.Child>
        </div>
      </Transition>
    </section>
  );
}

export default ResearchNews;
