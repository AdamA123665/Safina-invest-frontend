import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ArticleDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/articles/${id}`);
        if (!response.ok) throw new Error('Failed to fetch article');
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        console.error(err);
      }
    };


    fetchArticle();
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="bg-green-100 min-h-screen py-16">
      {/* Hero Section */}
      <div className="container mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Back Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
          >
            Back
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column - Article Metadata */}
          <div className="p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{article.title}</h1>
            <p className="text-gray-600 mb-2">{article.summary}</p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">Author:</span> {article.author}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">Date:</span> {article.date}
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <img
              src={article.image_url || 'https://via.placeholder.com/600x400'}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <section className="container mx-auto px-6 py-12 lg:py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
          {/* Article Content */}
          <div className="prose max-w-none lg:prose-lg prose-green">
            {article.content.map((section, index) =>
              typeof section === 'string' ? (
                <p key={index}>{section}</p>
              ) : section.type === 'image' ? (
                <img
                  key={index}
                  src={section.url}
                  alt={section.alt || 'Article Image'}
                  className="rounded-lg shadow-md my-8"
                />
              ) : (
                <p key={index}>{section.text}</p>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticleDetailsPage;
