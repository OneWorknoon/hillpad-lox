import React, { useState, useRef, useEffect, useCallback } from 'react';
import newyork from "../../assets/images/uk.webp";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import usa from "../../assets/images/united_state.webp";
import singerpore from "../../assets/images/singerpore.jpeg";
import Australia from "../../assets/images/aus.webp";
import canada from "../../assets/images/canada.webp";
import japan from "../../assets/images/Japan.webp";
import germany from "../../assets/images/germany.webp";
import netherland from "../../assets/images/netherland.jpg";
import france from "../../assets/images/france.jpg";
import italy from "../../assets/images/italy.jpg";
import southAfrica from "../../assets/images/spain.webp";
import Switzerland from "../../assets/images/swizerland.webp";
import hongKong from "../../assets/images/hong_kong.webp";
import finlad from "../../assets/images/finland.webp";
import southKorea from "../../assets/images/south-korea.jpg";

const countries = [
  { name: 'United Kingdom', image: newyork, link: '/coursefinder?name=&country=united-kingdom' },
  { name: 'United States', image: usa, link: '/coursefinder?name=&country=united-states' },
  { name: 'Canada', image: canada, link: '/coursefinder?name=&country=canada' },
  { name: 'Australia', image: Australia, link: '/coursefinder?name=&country=australia' },
  { name: 'Germany', image: germany, link: '/coursefinder?name=&country=germany' },
  { name: 'Netherlands', image: netherland, link: '/coursefinder?name=&country=netherlands' },
  { name: 'Singapore', image: singerpore, link: '/coursefinder?name=&country=singapore' },
  { name: 'France', image: france, link: '/coursefinder?name=&country=france' },
  { name: 'Spain', image: southAfrica, link: '/coursefinder?name=&country=spain' },
  { name: 'Italy', image: italy, link: '/coursefinder?name=&country=italy' },
  { name: 'Japan', image: japan, link: '/coursefinder?name=&country=japan' },
  { name: 'Switzerland', image: Switzerland, link: '/coursefinder?name=&country=switzerland' },
  { name: 'Hong Kong', image: hongKong, link: '/coursefinder?name=&country=hong-kong' },
  { name: 'Finland', image: finlad, link: '/coursefinder?name=&country=finland' },
  { name: 'South Korea', image: southKorea, link: '/coursefinder?name=&country=south-korea' },
];

const CountryCarousel = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const carouselRef = useRef(null);

  // Updated scroll handling
  const handleScroll = useCallback(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      setShowLeftButton(carousel.scrollLeft > 0);
      const isAtEnd = 
        Math.ceil(carousel.scrollWidth - carousel.scrollLeft) <= carousel.clientWidth;
      setShowRightButton(!isAtEnd);
    }
  }, []);

  const handleCountryClick = (link) => {
    if (!isDragging) {
      window.location.href = link;
    }
  };

  // Simplified scroll function
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'right' ? 300 : -300;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Mouse handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX);
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
      handleScroll();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add scroll event listener
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div className="w-full relative sm:pl-0 pl-10 max-w-full mx-auto py-20">
      <h2 className="text-2xl bottom-5 left-2 sm:left-3 relative inline font-bold mb-4">
        Browse by Country
      </h2>
      
      <div className="relative">
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto hide-scrollbar scroll-smooth"
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {countries.map((country, index) => (
            <div 
            key={`${country.name}-${index}`}
            className="w-[300px] flex-none px-2 mb-4 sm:mr-0 mr-3 cursor-pointer" // Added cursor-pointer
            style={{ scrollSnapAlign: 'start' }}
            onClick={() => handleCountryClick(country.link)} 
            >
              <div className="rounded-lg overflow-hidden h-[300px] relative group">
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-full object-cover"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 transition duration-300 flex items-end justify-start p-4">
                  <span className="text-white font-semibold">{country.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showLeftButton && (
          <button
            onClick={() => scroll('left')}
            className="absolute top-1/2 sm:block -translate-y-1/2 md:left-[-2%] left-[-6%] bg-white rounded-full p-2 border-[2px] border-grey border-opacity-10 hover:bg-gray-100 transition-colors duration-200 z-10"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-9 h-9" />
          </button>
        )}
      
      {showRightButton && (
          <button
            onClick={() => scroll('right')}
            className="absolute top-1/2 md:top-1/2 -translate-y-1/2 right-[3%] sm:right-[-2%] md:left-[98%] bg-white rounded-full p-2 border-[2px] border-grey border-opacity-10 hover:bg-gray-100 transition-colors duration-200 z-10"
            aria-label="Next slide"
          >
            <FiChevronRight className="w-9 h-9" />
          </button>
        )}
      </div>
    </div>
  );
};
export default CountryCarousel;
