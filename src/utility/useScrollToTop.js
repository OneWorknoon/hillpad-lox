import { useState, useEffect } from 'react';

const useScrollToTop = (heroHeight = 600) => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    // Show the button only when user has scrolled beyond the hero section height
    if (scrollPosition > heroHeight) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { showScrollToTop, scrollToTop };
};

export default useScrollToTop;
