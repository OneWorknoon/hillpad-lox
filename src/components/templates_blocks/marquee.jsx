import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';


const countriesGroups1 = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Netherlands",
  "Sweden",
  "Norway",
  "Finland",
  "Denmark",
  "Switzerland",
  "New Zealand",
  "Ireland",
  "Singapore",
  "China",
  "India",
  "South Korea",
  "Japan",
  "Malaysia",
  "Hong Kong",
  "Spain",
  "Italy",
  "Portugal",
  "Belgium",
];

const countsriesGroup2 = [
  "Austria",
  "Poland",
  "Russia",
  "Mexico",
  "Brazil",
  "Chile",
  "Argentina",
  "South Africa",
  "United Arab Emirates",
  "Saudi Arabia",
  "Turkey",
  "Israel",
  "Thailand",
  "Philippines",
  "Indonesia",
  "Vietnam",
  "Egypt",
  "Kenya",
  "Nigeria",
  "Colombia",
  "Greece",
  "Romania",
  "Czech Republic",
  "Hungary",
  "Ukraine"
];
const countriesGroup2 = [
  'China',
  'France',
  'South Korea',
  'India',
  'Switzerland',
  'United States',
  'Italy',
  'Japan',
  'Singapore',
  'Netherlands',
  'South Africa',
  'Sweden',
  'Hong Kong',
  'United Kingdom',
  'Germany',
  'Canada',
  'Australia'
];

const countriesGroup1 = [
  'Sweden',
  'United States',
  'Hong Kong',
  'Netherlands',
  'India',
  'Australia',
  'South Africa',
  'France',
  'Japan',
  'Germany',
  'Canada',
  'Italy',
  'China',
  'Switzerland',
  'United Kingdom',
  'South Korea',
  'Singapore'
];

const countrySlugs = {
  'China': 'china',
  'France': 'france',
  'South Korea': 'south-korea',
  'India': 'india',
  'Switzerland': 'switzerland',
  'United States': 'united-states',
  'Italy': 'italy',
  'Japan': 'japan',
  'Singapore': 'singapore',
  'Netherlands': 'netherlands',
  'South Africa': 'south-africa',
  'Sweden': 'sweden',
  'Hong Kong': 'hong-kong',
  'United Kingdom': 'united-kingdom',
  'Germany': 'germany',
  'Canada': 'canada',
  'Australia': 'australia'
};
const useMarqueeAnimation = (isPaused, direction = 'left', speed = 100, moveTime = 1500, pauseTime = 1000, slowMotionTime = 600) => {
  const [position, setPosition] = useState(0);
  const contentRef = React.useRef(null);

  useEffect(() => {
    let animationFrameId;
    let lastTimestamp = 0;
    let isMoving = true;
    let cycleStartTime = 0;
    let isSlowMotion = false;

    const animate = (timestamp) => {
      if (isPaused) {
        lastTimestamp = timestamp;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (!lastTimestamp) {
        lastTimestamp = timestamp;
        cycleStartTime = timestamp;
      }

      const elapsed = timestamp - lastTimestamp;
      const cycleDuration = timestamp - cycleStartTime;

      if (isMoving && cycleDuration >= moveTime - slowMotionTime) {
        isSlowMotion = true;
      }

      if (isMoving && cycleDuration >= moveTime) {
        isMoving = false;
        isSlowMotion = false;
        cycleStartTime = timestamp;
      } else if (!isMoving && cycleDuration >= pauseTime) {
        isMoving = true;
        cycleStartTime = timestamp;
      }

      if (isMoving) {
        const contentWidth = contentRef.current.scrollWidth;
        const containerWidth = contentRef.current.parentElement.offsetWidth;
        let moveDistance = (speed * elapsed) / 1000;

        if (isSlowMotion) {
          const slowdownFactor = 1 - (cycleDuration - (moveTime - slowMotionTime)) / slowMotionTime;
          moveDistance *= Math.max(slowdownFactor, 0.1); // Ensure it doesn't go below 10% speed
        }

        setPosition((prevPosition) => {
          let newPosition = direction === 'left' ? prevPosition - moveDistance : prevPosition + moveDistance;
          
          // Implement infinite scrolling
          if (direction === 'left' && newPosition <= -contentWidth / 2) {
            newPosition += contentWidth / 2;
          } else if (direction === 'right' && newPosition >= 0) {
            newPosition -= contentWidth / 2;
          }
          
          return newPosition;
        });
      }

      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, direction, speed, moveTime, pauseTime, slowMotionTime]);

  return { position, contentRef };
};

const Marquee = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isPaused1, setIsPaused1] = useState(false);
  const { position: leftPosition, contentRef: leftContentRef } = useMarqueeAnimation(isPaused, 'left', 100, 1500, 1000, 600);
  const { position: rightPosition, contentRef: rightContentRef } = useMarqueeAnimation(isPaused1, 'right', 100, 1500, 1000, 600);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);
  const handleMouseEnter1 = useCallback(() => setIsPaused1(true), []);
  const handleMouseLeave1 = useCallback(() => setIsPaused1(false), []);
  const navigate = useNavigate();

  const handleItemClick = useCallback((country) => {
    navigate(`/coursefinder?country=${encodeURIComponent(countrySlugs[country])}`);
  }, [navigate]);

  const memoizedItems = useMemo(() => [...countriesGroup1, ...countriesGroup1], []);
  const memoizedItems2 = useMemo(() => [...countriesGroup2, ...countriesGroup2], []);

  return (
    <article className='mb-24 bg-gray-100 py-4'>
      <section
        className="overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={leftContentRef}
          className="flex"
          style={{ transform: `translateX(${leftPosition}px)`, width: 'fit-content' }}
        >
          {memoizedItems.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-4 py-2 mx-2 bg-white rounded-full border border-black hover:border-white whitespace-nowrap cursor-pointer hover:bg-orange hover:text-white"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section
        className="w-full overflow-hidden py-4"
        onMouseEnter={handleMouseEnter1}
        onMouseLeave={handleMouseLeave1}
      >
        <div
          ref={rightContentRef}
          className="flex"
          style={{ transform: `translateX(${rightPosition}px)`, width: 'fit-content' }}
        >
          {memoizedItems2.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-4 py-2 mx-2 bg-white rounded-full border border-black hover:border-white whitespace-nowrap cursor-pointer hover:bg-orange hover:text-white"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default Marquee;