import React, { useState, useEffect } from 'react';
import healthKid from '../images/health-kid.jpg';
import mediBg from '../images/medibg.jpg';
import mediBg2 from '../images/medibg2.jpg';

const slides = [healthKid, mediBg, mediBg2];

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); 
    };

   
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide(); 
        }, 3000); 

        return () => clearInterval(interval); 
    }, []); 

    return (
        <>
        <div className="slider-container">
            <button onClick={prevSlide}>Prev</button>
            <img src={slides[currentSlide]} alt={`Slide ${currentSlide}`} />
            <button onClick={nextSlide}>Next</button>
        </div>


</>
);
};

export default Slider;
