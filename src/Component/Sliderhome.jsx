import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const Sliderhome = () => {
  const images = [
    'Image/IMG-20240128-WA0001.jpg',
    'Image/IMG-20240128-WA0002.jpg',
    'Image/IMG-20240128-WA0003.jpg',
    'Image/IMG-20240128-WA0004.jpg',
  ]

  const ImageSlider = ({ images }) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    useEffect(() => {
      const intervalId = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);

      return () => clearInterval(intervalId);
    }, [images.length]);

    return (
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
        {images.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img className="d-block w-100" src={image} alt={`Slide ${idx}`} />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };

  return (

    
    <div className='image-container'>
      
      <ImageSlider className="custom-img-class" images={images}   />
    </div>
  );
};

export default Sliderhome;
