// src/Carousel.tsx
import React, { useState, useEffect } from 'react';
import '../styles/carousel.css'; // Estilos para el carrusel
import images from './carruselImages';

interface CarouselProps {
  interval: number; // Intervalo de tiempo en milisegundos
}

const Carousel: React.FC<CarouselProps> = ({ interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval]);

  const carouselStyle = {
    transform: `translateX(-${currentIndex * 100}%)`, // Mueve el carrusel horizontalmente
  };

  return (
    <div className="carousel-container">
      <div className="carousel" style={carouselStyle}>
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index + 1}`}
            className="carousel-img"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;






