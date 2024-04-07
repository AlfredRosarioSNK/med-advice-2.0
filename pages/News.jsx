import React from "react";
import Header from '../src/components/Header.jsx';
import bannerImage from '../src/images/NewsImages/BannerImage.jpg';
import '../src/News.css'

const News = () => {
  return (
    <div>
      <Header/>
      <div className="BannerImageContainer">
      <img src={bannerImage} alt="Banner image"/>
      </div>
    </div>
    
  );
};

export default News;
