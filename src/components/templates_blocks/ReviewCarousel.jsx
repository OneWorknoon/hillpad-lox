import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import guy from '../../assets/images/reviewG.jpeg';
import girl from '../../assets/images/reviewW.jpeg';
import girl1 from '../../assets/images/girl2.jpg';
import girl2 from '../../assets/images/review_333.jpg';
import guy1 from '../../assets/images/guy1.jpg';

const reviews = [
  {
    image1: girl,
    image2: guy,
    quote: "\"The best platform for finding courses!\"",
    text: "HillPad has made it so easy for me to find the perfect course for my degree. I'm so happy to have found this amazing platform!",
    author: "Samuel"
  },
  {
    image2: girl,
    image1: guy,
    quote: "\"HillPad: The Ultimate Course Finder!\"",
    text: "HillPad is fantastic! It made finding the right course for my degree super easy. Highly recommend it to everyone!",
    author: "Jane"
  },
  {
    image1: girl1,
    image2: guy1,
    quote: "\"A game-changer for education!\"",
    text: "HillPad has revolutionized the way I search for courses. It's user-friendly and incredibly helpful.",
    author: "Michael"
  },
  {
    image1: girl2,
    image2: girl1,
    quote: "\"Highly recommended!\"",
    text: "HillPad is a must-have tool for anyone looking to further their education. The course recommendations are spot on.",
    author: "Xīn yán"
  },
  {
    image1: girl1,
    image2: girl2,
    quote: "\"Exceptional platform!\"",
    text: "I found the perfect course for my career advancement thanks to HillPad. It's an invaluable resource.",
    author: "Emily"
  },

];

const ReviewCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize); // Check on window resize

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const preloadImages = reviews.map(review => {
      const img1 = new Image();
      const img2 = new Image();
      img1.src = review.image1;
      img2.src = review.image2;
      return [img1, img2];
    });
    // Optional cleanup to clear preloaded images
    return () => {
      preloadImages.forEach(([img1, img2]) => {
        img1.onload = null;
        img2.onload = null;
      });
    };
  }, []);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="relative w-full max-w-full mb-[10%] mx-auto">
      <h2 className="text-2xl sm:relative absolute left-[40px] sm:left-[0px]  sm:right-[7%] sm:top-3 sm:-translate-x-[-1%] font-bold mb-4">Reviews across the Globe</h2>
      
      {/* Desktop Layout */}
      {!isMobile && (
        <div className="flex my-10 gap-4">
          <div className="flex absolute top-[95%] justify-center mt-0 gap-4">
            <button
              onClick={prevSlide}
              className="bg-white shadow  rounded-full p-2 border-[2px] border-grey border-opacity-10 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Previous slide"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white shadow rounded-full p-2 border-[2px] border-grey border-opacity-10 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Next slide"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
          
              <div className="w-1/3 h-[400px] rounded-lg overflow-hidden">
            <img
              src={reviews[currentSlide].image1}
              alt="Reviewer 1"
              className="w-full h-full rounded-[20px] object-cover"
            />
          </div>
          <div className="w-1/3 h-[400px] rounded-lg overflow-hidden relative">
            <img
              src={reviews[currentSlide].image2}
              alt="Reviewer 2"
              className="w-full h-full rounded-[20px] object-cover"
            />
          </div>
          <div className="absolute shadow top-[30%] right-[0%] bg-white p-4 w-[35%] h-[40%] mdd:h-[50%] rounded-[20px]">
            <svg className="text-red-500 text-4xl absolute top-[-10%] right-[0%]" width="49" height="32" viewBox="0 0 49 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M35.7142 22.4076C35.3079 23.7201 34.7532 24.8686 34.0501 25.853C33.347 26.8373 32.6985 27.6264 32.1048 28.2201C31.8235 28.5326 31.6438 28.9467 31.5657 29.4623C31.4876 29.978 31.6048 30.4233 31.9173 30.7983L32.1048 31.0326C32.4173 31.3139 32.7532 31.5014 33.1126 31.5951C33.472 31.6889 33.8079 31.6264 34.1204 31.4076C37.7142 29.5014 40.4798 27.517 42.4173 25.4545C44.3235 23.3608 45.7142 21.3998 46.5892 19.5717C47.4642 17.7436 47.9798 16.1576 48.136 14.8139C48.261 13.4701 48.3235 12.6108 48.3235 12.2358C48.3235 12.1108 48.3235 12.0014 48.3235 11.9076C48.3235 11.8139 48.3235 11.7201 48.3235 11.6264C48.3235 10.1264 48.0267 8.72014 47.4329 7.40764C46.8392 6.09514 46.0423 4.9467 45.0423 3.96233C44.0423 2.97795 42.886 2.20452 41.5735 1.64202C40.2298 1.07952 38.8079 0.798265 37.3079 0.798265C35.8079 0.798265 34.386 1.07952 33.0423 1.64202C31.7298 2.20452 30.5735 2.97795 29.5735 3.96233C28.5735 4.9467 27.7767 6.09514 27.1829 7.40764C26.5892 8.72014 26.2923 10.1264 26.2923 11.6264C26.2923 13.0326 26.5423 14.3451 27.0423 15.5639C27.5423 16.8139 28.2142 17.9233 29.0579 18.892C29.9017 19.8608 30.9017 20.6576 32.0579 21.2826C33.1829 21.8764 34.4017 22.2514 35.7142 22.4076ZM9.9329 22.642C9.6204 23.9233 9.08915 25.0561 8.33915 26.0405C7.58915 27.0248 6.91728 27.8139 6.32353 28.4076C6.01103 28.7201 5.82353 29.1342 5.76103 29.6498C5.69853 30.1655 5.8079 30.6264 6.08915 31.0326H6.51103C6.82353 31.3139 7.15947 31.5014 7.51884 31.5951C7.87822 31.6889 8.21415 31.6264 8.52665 31.4076C12.1204 29.5639 14.886 27.6108 16.8235 25.5483C18.7298 23.4858 20.1126 21.5483 20.972 19.7358C21.8313 17.9233 22.3235 16.3451 22.4485 15.0014C22.5423 13.6889 22.5579 12.8295 22.4954 12.4233C22.4954 12.3295 22.4954 12.228 22.4954 12.1186C22.4954 12.0092 22.4954 11.9076 22.4954 11.8139C22.4954 10.3139 22.2142 8.90764 21.6517 7.59514C21.0579 6.28264 20.261 5.14202 19.261 4.17327C18.261 3.20452 17.0892 2.43889 15.7454 1.87639C14.4329 1.31389 13.0267 1.03264 11.5267 1.03264C10.0267 0.97014 8.60478 1.22014 7.26103 1.78264C5.91728 2.34514 4.7454 3.11858 3.7454 4.10295C2.7454 5.08733 1.96415 6.25139 1.40165 7.59514C0.807904 8.90764 0.511029 10.3139 0.511029 11.8139C0.448529 13.1576 0.651654 14.4389 1.1204 15.6576C1.58915 16.8764 2.25322 17.9701 3.11259 18.9389C3.97197 19.9076 4.97978 20.7201 6.13603 21.3764C7.29228 22.0014 8.5579 22.4233 9.9329 22.642Z" fill="#FF5757" />
            </svg>
            <h3 className="font-bold text-lg mb-2">{reviews[currentSlide].quote}</h3>
            <br />
            <p className="text-sm mb-2">{reviews[currentSlide].text}</p>
            <br />
            <p className="font-bold">{reviews[currentSlide].author}</p>
          </div>
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <div className="flex flex-col items-center my-10">
          <div className="w-[80%] h-[800px] relative overflow-hidden mb-4">
            <img
              src={reviews[currentSlide].image2}
              alt="Reviewer"
              className="w-full h-[50%] object-cover rounded-[10px] "
            />
          </div>
          <div className="absolute bottom-[-20px] h-[29%] left-[50%] top-[43%] transform -translate-x-1/2 p-4 bg-white shadow-lg rounded-[20px] w-[70%] text-center">
            <svg className="text-red-500 text-4xl absolute top-[-5%] right-[0%]" width="49" height="32" viewBox="0 0 49 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M35.7142 22.4076C35.3079 23.7201 34.7532 24.8686 34.0501 25.853C33.347 26.8373 32.6985 27.6264 32.1048 28.2201C31.8235 28.5326 31.6438 28.9467 31.5657 29.4623C31.4876 29.978 31.6048 30.4233 31.9173 30.7983L32.1048 31.0326C32.4173 31.3139 32.7532 31.5014 33.1126 31.5951C33.472 31.6889 33.8079 31.6264 34.1204 31.4076C37.7142 29.5014 40.4798 27.517 42.4173 25.4545C44.3235 23.3608 45.7142 21.3998 46.5892 19.5717C47.4642 17.7436 47.9798 16.1576 48.136 14.8139C48.261 13.4701 48.3235 12.6108 48.3235 12.2358C48.3235 12.1108 48.3235 12.0014 48.3235 11.9076C48.3235 11.8139 48.3235 11.7201 48.3235 11.6264C48.3235 10.1264 48.0267 8.72014 47.4329 7.40764C46.8392 6.09514 46.0423 4.9467 45.0423 3.96233C44.0423 2.97795 42.886 2.20452 41.5735 1.64202C40.2298 1.07952 38.8079 0.798265 37.3079 0.798265C35.8079 0.798265 34.386 1.07952 33.0423 1.64202C31.7298 2.20452 30.5735 2.97795 29.5735 3.96233C28.5735 4.9467 27.7767 6.09514 27.1829 7.40764C26.5892 8.72014 26.2923 10.1264 26.2923 11.6264C26.2923 13.0326 26.5423 14.3451 27.0423 15.5639C27.5423 16.8139 28.2142 17.9233 29.0579 18.892C29.9017 19.8608 30.9017 20.6576 32.0579 21.2826C33.1829 21.8764 34.4017 22.2514 35.7142 22.4076ZM9.9329 22.642C9.6204 23.9233 9.08915 25.0561 8.33915 26.0405C7.58915 27.0248 6.91728 27.8139 6.32353 28.4076C6.01103 28.7201 5.82353 29.1342 5.76103 29.6498C5.69853 30.1655 5.8079 30.6264 6.08915 31.0326H6.51103C6.82353 31.3139 7.15947 31.5014 7.51884 31.5951C7.87822 31.6889 8.21415 31.6264 8.52665 31.4076C12.1204 29.5639 14.886 27.6108 16.8235 25.5483C18.7298 23.4858 20.1126 21.5483 20.972 19.7358C21.8313 17.9233 22.3235 16.3451 22.4485 15.0014C22.5423 13.6889 22.5579 12.8295 22.4954 12.4233C22.4954 12.3295 22.4954 12.228 22.4954 12.1186C22.4954 12.0092 22.4954 11.9076 22.4954 11.8139C22.4954 10.3139 22.2142 8.90764 21.6517 7.59514C21.0579 6.28264 20.261 5.14202 19.261 4.17327C18.261 3.20452 17.0892 2.43889 15.7454 1.87639C14.4329 1.31389 13.0267 1.03264 11.5267 1.03264C10.0267 0.97014 8.60478 1.22014 7.26103 1.78264C5.91728 2.34514 4.7454 3.11858 3.7454 4.10295C2.7454 5.08733 1.96415 6.25139 1.40165 7.59514C0.807904 8.90764 0.511029 10.3139 0.511029 11.8139C0.448529 13.1576 0.651654 14.4389 1.1204 15.6576C1.58915 16.8764 2.25322 17.9701 3.11259 18.9389C3.97197 19.9076 4.97978 20.7201 6.13603 21.3764C7.29228 22.0014 8.5579 22.4233 9.9329 22.642Z" fill="#FF5757" />
            </svg>
              <h3 className="font-bold mt-2 text-lg mb-2">{reviews[currentSlide].quote}</h3>
              <br />
              <p className="text-sm mb-2">{reviews[currentSlide].text}</p>
              <br />
              <p className="relative font-bold left-[-40%] ">{reviews[currentSlide].author}</p>
            </div>
          <div className="flex relative bottom-[200px] justify-center mt-4 gap-4">
            <button
              onClick={prevSlide}
              className="bg-white shadow rounded-full p-2 border-[2px] border-grey border-opacity-10 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Previous slide"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white shadow rounded-full p-2 border-[2px] border-grey border-opacity-10 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Next slide"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCarousel;
