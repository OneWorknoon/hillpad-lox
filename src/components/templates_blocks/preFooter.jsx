import { useState, useEffect, useRef, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CourseCard from "../courses/coursecard";
import axios from "axios";
import config from "../../config";

export default function Prefooter({ props, onAddToWishlist }) {
  const [programs, setPrograms] = useState([]);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const carouselRef = useRef(null);
  const APP_BASE_URL = config.VITE_BASE_URL;
  const discipline =
    props?.discipline || props?.school || props?.country || "law";

  const [scrollPosition, setScrollPosition] = useState(0);

  // Updated scroll handling
  const handleScroll = useCallback(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const currentScroll = carousel.scrollLeft;
      setScrollPosition(currentScroll);

      // Show left button if scrolled at all
      setShowLeftButton(currentScroll > 0);

      // Show right button if not at end
      const isAtEnd =
        Math.ceil(carousel.scrollWidth - currentScroll - 1) <=
        carousel.clientWidth;
      setShowRightButton(!isAtEnd);
    }
  }, []);

  // Add touch event handlers
  const handleTouchEnd = () => {
    if (carouselRef.current) {
      handleScroll();
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      carousel.addEventListener("touchend", handleTouchEnd);

      // Initial check
      handleScroll();

      return () => {
        carousel.removeEventListener("scroll", handleScroll);
        carousel.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [handleScroll]);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "right" ? 300 : -300;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      // Update button visibility after scroll
      setTimeout(handleScroll, 100);
    }
  };

  // Fetch programs
  useEffect(() => {
    let url = "";
    if (props.discipline) {
      url = `${APP_BASE_URL}academics/course/list?discipline=${props.discipline}&ordering=random`;
    } else if (props.school) {
      url = `${APP_BASE_URL}academics/course/list?school_slug=${props.school}&ordering=random`;
    } else if (props.country) {
      url = `${APP_BASE_URL}academics/course/list?country=${props.country}&ordering=random`;
    }

    axios
      .get(url)
      .then((response) => {
        if (response.data.results) {
          setPrograms(response.data.results);
        } else {
          // Fallback to featured courses if no results
          axios
            .get(
              `${APP_BASE_URL}academics/course/list?featured=true&ordering=random`
            )
            .then((response) => {
              if (response.data.results) {
                setPrograms(response.data.results);
              }
            });
        }
      })
      .catch((error) => console.error("Error:", error));
  }, [props.discipline, props.school, props.country, APP_BASE_URL]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      return () => carousel.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return (
    <div className="w-full">
      {programs.length > 0 && (
        <section className="relative">
          <div className="text-left text-2xl sm:ms-2 font-bold my-8 md:text-3xl md:my-2 lg:my-0 lg:text-3xl lg:font-semibold">
            Related <span className="text-orange">Courses</span>
          </div>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto hide-scrollbar scroll-smooth"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {programs.slice(0, 6).map((program) => (
              <div
                key={program.id}
                className="w-[300px] flex-none px-2 mb-4 sm:mr-5 mr-7 "
                style={{ scrollSnapAlign: "start" }}
              >
                <CourseCard
                  prop={program}
                  onAddToWishlist={() => onAddToWishlist(program.id)}
                />
              </div>
            ))}
          </div>

          {showLeftButton && (
            <button
              onClick={() => scroll("left")}
              className="absolute sm:top-1/2 top-[55%] -translate-y-1/2 md:left-[-2%] left-[2%] bg-white rounded-full p-2 border-[2px] border-grey border-opacity-10 hover:bg-gray-100 transition-colors duration-200 z-10"
              aria-label="Previous slide"
            >
              <FiChevronLeft className="w-9 h-9" />
            </button>
          )}

          {showRightButton && (
            <button
              onClick={() => scroll("right")}
              className="absolute md:top-[43%]  top-[49%]  md:block md:left-[97%] left-[80%] bg-white rounded-full p-2 border-[2px] border-grey border-opacity-10 hover:bg-gray-100 transition-colors duration-200 z-10"
              aria-label="Next slide"
            >
              <FiChevronRight className="w-9 h-9" />
            </button>
          )}
        </section>
      )}
    </div>
  );
}
