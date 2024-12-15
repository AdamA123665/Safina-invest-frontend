import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ArticleDetailsPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://safinabackend.azurewebsites.net/api/articles/${id}`);
        if (!response.ok) throw new Error('Failed to fetch article');
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <div className="text-center mt-16 text-gray-700">Loading...</div>;

  return (
    <div className="bg-green-50 min-h-screen py-16">
      {/* Hero Section */}
      <div className="container mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column - Article Metadata */}
          <div className="p-8 flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">{article.title}</h1>
            <p className="text-gray-600 text-lg">{article.summary}</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                <span className="font-medium text-gray-700">Author:</span> {article.author}
              </p>
              <p>
                <span className="font-medium text-gray-700">Date:</span> {article.date}
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-64 md:h-auto">
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
    <div
      className="prose max-w-none lg:prose-lg prose-green"
      dangerouslySetInnerHTML={{ __html: article.content_html }}
    />
  </div>
</section>
    </div>
  );
}

export default ArticleDetailsPage;
