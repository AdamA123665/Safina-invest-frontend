import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ArticleDetailsPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://safinabackend.azurewebsites.net/api/articles/${id}`);
        if (!response.ok) throw new Error('Failed to fetch article');
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load the article. Please try again later.');
      }
    };

    fetchArticle();
  }, [id]);

  if (error) {
    return <div className="text-center mt-16 text-red-600">{error}</div>;
  }

  if (!article) {
    return <div className="text-center mt-16 text-gray-700">Loading...</div>;
  }

  return (
    <div className="bg-green-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 pt-10 md:pt-4 lg:pt-4">
      {/* Hero Section */}
      <div className="container mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Article Metadata */}
          <div className="p-6 md:p-8 flex flex-col justify-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">{article.title}</h1>
            <p className="text-gray-600 text-base sm:text-lg">{article.summary}</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                <span className="font-medium text-gray-700">Author:</span> {article.author}
              </p>
              <p>
                <span className="font-medium text-gray-700">Date:</span> {new Date(article.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="w-full md:w-1/2 h-64 md:h-auto">
            <img
              src={article.image_url || 'https://via.placeholder.com/600x400'}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <section className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-12">
          <article
            className="prose max-w-none lg:prose-lg prose-green"
            dangerouslySetInnerHTML={{ __html: article.content_html }}
          />
        </div>
      </section>
    </div>
  );
}

export default ArticleDetailsPage;
