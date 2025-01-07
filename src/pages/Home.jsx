import React, { useState, useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom'; // Ensure react-router-dom is installed
import InnovativeHero from './newhero2';
import Tools from './tools';
import Savings from './savings';
// import Aboutsection from './Aboutsection';
import CompleteInvestmentJourney from './Test2';
import HeroSection from './newhero3'

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
      <HeroSection parentRef={heroContainerRef} />
      
    
      <div id="newhero" className="hero2-container">
      <InnovativeHero />
      </div>
      
    
    <div id="investment-options" className="how-container">
      <CompleteInvestmentJourney />
      </div>
      
    <div id="tools" className="tools-container">
      <Tools />
      </div>
     
   <div id="explore-savings" className="savings-container">
    <Savings />
    </div>

    <section id="research">
  {/* Research Section Background */}
  <div className="relative py-20 overflow-hidden bg-light-background"> {/* Updated background color */}
    <div className="container mx-auto px-7 relative">
      <div className="space-y-8">
        {/* Title Section */}
        <div className="text-center">
          <h2
            className="text-5xl font-medium mb-4 text-primary-green " // Replaced inline styles with Tailwind classes
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
                className="bg-light-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105"
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
                  <div className="absolute top-4 right-4 bg-primary-green text-white text-sm px-2 py-1 rounded-lg shadow-md">
                    {article.date
                      ? new Date(article.date).toLocaleDateString()
                      : 'No Date'}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-deep-teal"> {/* Updated text color */}
                    {article.title || 'No Title'}
                  </h3>
                  <p className="text-deep-brown mb-4"> {/* Updated text color */}
                    {Array.isArray(article.summary) && typeof article.summary[0] === 'string'
                      ? article.summary[0].length > 120
                        ? `${article.summary[0].substring(0, 120)}...`
                        : article.summary[0]
                      : typeof article.summary === 'string'
                      ? article.summary.length > 120
                        ? `${article.summary.substring(0, 120)}...`
                        : article.summary
                      : 'No preview available'}
                  </p>
                  <button
                    onClick={() => openArticle(article.id)}
                    className="text-primary-green font-semibold hover:underline"
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

    <section
  id="contact"
  className="relative py-20 bg-[#f7f9f3]" // Updated to use your light background color
>
  <div className="container mx-auto px-4 text-center">
    <h2
      className="text-5xl font-medium mb-6 text-[#2c1810] font-work-sans"
    >
      Get in Touch
    </h2>
    <p
      className="text-lg mb-8 text-[#2c1810]/80 font-work-sans"
    >
      Have questions or need support? We're here to help. Reach out to us for assistance or to learn more about our services.
    </p>
    <a
      href="mailto:info@safinainvest.co.uk"
      className="inline-block bg-gradient-to-r from-[#066b06] to-[#044d04] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-[#0a4c4c] hover:to-[#044d04] transition-all duration-300 font-work-sans"
    >
      Email Us
    </a>
    <div
      className="mt-12 text-sm text-[#2c1810]/60 font-work-sans"
    >
    </div>
  </div>
</section>
      </div>
      
    );
  }
  
  export default PortfolioOptimizer;
  