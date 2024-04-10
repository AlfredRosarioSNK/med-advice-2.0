import React, { useState, useEffect } from "react";
import Header from '../src/components/Header.jsx';
import bannerImage from '../src/images/NewsImages/BannerImage.png';
import '../src/News.css';
import ReactSlickSlider from '../src/components/React-slickSlider.jsx';
import NewsList from '../src/components/NewsList.jsx'; 
import Footer from '../src/components/Footer.jsx';

const News = () => {
  // Declaraciones de estado movidas dentro del componente
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://newsapi.org/v2/everything?q=medicine&from=2024-04-08&sortBy=popularity&apiKey=363c92dcf0194ce2b582b793d56f610e');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="BannerImageContainer">
        <img src={bannerImage} alt="Banner image" />
      </div>
      <ReactSlickSlider />
      {error && <p>There was an error loading the news.</p>}
      {isLoading ? <p>Loading...</p> : <NewsList newsItems={articles} />}
      <Footer />
    </div>
  );
};

export default News;
