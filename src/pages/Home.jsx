import React, { useState, useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom'; // Ensure react-router-dom is installed
import InnovativeHero from './newhero2';
import Tools from './tools';
import Savings from './savings';
import Maritime from './Maritime';
import Aboutsection from './Aboutsection';
import CompleteInvestmentJourney from './Test2';

const PortfolioOptimizer = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);   
    const navigate = useNavigate();
    const heroContainerRef = useRef(null);
    

    useEffect(() => {
      const fetchArticles = async () => {
        try {
          const response = await fetch('https://safinabackend.azurewebsites.net/api/articles');
          if (!response.ok) throw new Error('Failed to fetch articles');
          const data = await response.json();
          setArticles(data.slice(0, 3)); // Only take the first 3 articles
          setLoading(false);
        } catch (err) {
          console.error(err);
          setError(true);
          setLoading(false);
        }
      };
  
      fetchArticles();
    }, []);
  
    const openArticle = (id) => {
      navigate(`/articles/${id.toLowerCase()}`); // Ensure your routes are set up accordingly
    };
  
    if (loading) {
      return (
        <section id="research">
          <div className="container mx-auto px-4 py-20 text-center">
            <p className="text-xl">Loading...</p>
          </div>
        </section>
      );
    }
  
    if (error) {
      return (
        <section id="research">
          <div className="container mx-auto px-4 py-20 text-center">
            <p className="text-xl text-red-500">Failed to load articles. Please try again later.</p>
          </div>
        </section>
      );
    }
  
    return (
      <div
      ref={heroContainerRef}
      className="hero-container"
      style={{
        // Removed height and overflow for better integration
        // height: '100vh',
        // overflow: 'auto',
        position: 'relative', // Retain if needed
      }}
    >
      <InnovativeHero parentRef={heroContainerRef} />
      
    
    <div className="about-container">
      <Aboutsection />
      </div>
      
    
    <div className="how-container">
      <CompleteInvestmentJourney />
      </div>
      
    <div className="tools-container">
      <Tools />
      </div>
     
   <div className="savings-container">
    <Savings />
    </div>

<section id="research">
      {/* Research Section Background */}
      <div
    className="relative py-20 overflow-hidden"
    style={{ backgroundColor: '#f7f7f7' }} // Light grey background
  >

        <div className="container mx-auto px-7 relative z-10">
          <div className="space-y-8">
            {/* Title Section */}
            <div className="text-center">
              <h2
                className="text-5xl font-bold mb-4"
                style={{
                  color: '#006C5B',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                Explore Our Latest Research
              </h2>
            </div>

            {/* Articles Grid */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105"
                  >
                    {/* Image Section */}
                    <div className="relative">
                      {/* Handle image_url as an object */}
                      <img
                        src={
                          article.image_url
                            ? article.image_url
                            : 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A6f22b49f-c9e1-4ddf-9cc6-eead253330d0?source=next-article&fit=scale-down&quality=highest&width=1440&dpr=1'
                        }
                        alt={article.title || 'No Title'}
                        className="w-full h-40 sm:h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 bg-green-800 text-white text-sm px-2 py-1 rounded-lg shadow-md">
                        {article.date
                          ? new Date(article.date).toLocaleDateString()
                          : 'No Date'}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3" style={{ color: '#065F46' }}>
                        {article.title || 'No Title'}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {Array.isArray(article.content) && typeof article.content[0] === 'string'
                          ? article.content[0].length > 120
                            ? `${article.content[0].substring(0, 120)}...`
                            : article.content[0]
                          : typeof article.content === 'string'
                          ? article.content.length > 120
                            ? `${article.content.substring(0, 120)}...`
                            : article.content
                          : 'No preview available'}
                      </p>
                      <button
                        onClick={() => openArticle(article.id)}
                        className="text-green-800 font-semibold hover:underline"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="Maritime-container">
    <Maritime />
    </div>
    <section
  id="contact"
  className="relative py-20"
  style={{ background: '#f7f7f7' }} // Soft pastel blue background for a clean and professional look
>
  <div className="container mx-auto px-4 text-center">
    <h2
      className="text-5xl font-extrabold mb-6"
      style={{
        fontFamily: 'Lora, serif',
        color: '#333', // Dark grey for better readability
      }}
    >
      Get in Touch
    </h2>
    <p
      className="text-lg mb-8"
      style={{
        fontFamily: 'Open Sans, sans-serif',
        color: '#555', // Neutral grey for a soft tone
      }}
    >
      Have questions or need support? We're here to help. Reach out to us for assistance or to learn more about our services.
    </p>
    <a
      href="mailto:support@safinabank.com"
      className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-emerald-600 transition"
      style={{
        fontFamily: 'Open Sans, sans-serif',
      }}
    >
      Email Us
    </a>
    <div
      className="mt-12 text-sm text-gray-500"
      style={{
        fontFamily: 'Open Sans, sans-serif',
      }}
    >
      <p>© 2024 Safina Bank. All rights reserved.</p>
    </div>
  </div>

  {/* Subtle Decorative Divider */}
  <div
    className="absolute bottom-0 w-full h-2"
    style={{
      background: 'linear-gradient(to right, #065F46, #E8F5E9)',
    }}
  ></div>
</section>
      </div>
      
    );
  }
  
  export default PortfolioOptimizer;
  