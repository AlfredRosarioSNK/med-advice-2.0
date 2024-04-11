import React from 'react';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from '../ComponentsModulesStyles/React-slickSlider.module.css'; 
import NewsImage1 from '../images/NewsImages/News1.jpg'
import NewsImage2 from '../images/NewsImages/News2.jpg'
import NewsImage3 from '../images/NewsImages/News3.jpg'

function NewsCard({image, title, date, description}) {
    return (
      <div className={styles['news-card']}>
        <img src={image} alt="News" className={styles['news-image']}/>
        <div className={styles['news-content']}>
          <h4 className={styles['news-title']}>{title}</h4>
          <p className={styles['news-date']}>{date}</p>
          <p className={styles['news-description']}>{description}</p>
        </div>
      </div>
    );
}


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", position: "absolute", top: "50%", right: "25px", zIndex: 1,  color: "blue" }}
        onClick={onClick}
      />
    );
}
  
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", position: "absolute", top: "50%", left: "25px", zIndex: 1 }}
        onClick={onClick}
      />
    );
}
  
  const ReactSlickSlider = () => {
      const settings = {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "60px",
          slidesToShow: 3,
          speed: 500,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                centerPadding: '20px',
              }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                centerPadding: '40px',
              }
            }
          ]
      };
      const newsData = [
        {
          image: NewsImage1,
          title: "New Breakthrough in Alzheimer's Treatment Shows Promise",
          date: "01/01/2024",
          description: "Early trials of a new drug targeting the root causes of Alzheimer's disease show significant improvement in patient cognitive functions."
        },
        {
          image: NewsImage2,
          title: "Wearable Technology Now Able to Predict Asthma Attacks",
          date: "02/02/2024",
          description: "Researchers have developed a new wearable device that monitors vital signs and environmental factors to predict and prevent asthma attacks."
        },
        {
          image: NewsImage3,
          title: "Revolutionary 'Lab-on-a-Chip' Device Makes Blood Testing Quick and Painless",
          date: "03/03/2024",
          description: "A groundbreaking portable device can now perform a complete blood count from just a single drop of blood, delivering results in minutes."
        },        
      ];
    
      return (
        <div className={styles.sliderContainer}> 
            <Slider {...settings}>
                {newsData.map((news, index) => (
                    <NewsCard key={index} {...news} />
                ))}
            </Slider>
        </div>
      );
    };

export default ReactSlickSlider;
