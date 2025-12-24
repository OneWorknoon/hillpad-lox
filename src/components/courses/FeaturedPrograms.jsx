import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import axios from "axios";
import CourseCard from "./coursecard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchWishList } from "../../redux/wishList";
import getOSUsingUserAgent from "../../utility/checkOS.jsx";

const categories = [
  { name: "Featured", value: "featured" },
  { name: "Agriculture & Forestry", value: "agriculture-and-forestry" },
  // { name: 'Art', value: 'art' },
  { name: "Art & Humanities", value: "art-and-humanities" },
  { name: "Business & Administration", value: "business-and-administration" },
  { name: "Communication", value: "communication" },
  { name: "Computer Science", value: "computer-science" },
  { name: "Education & Training", value: "education-and-training" },
  { name: "Engineering & Technology", value: "engineering-and-technology" },
  { name: "Environmental Sciences", value: "environmental-sciences" },
  { name: "Health Sciences", value: "health-sciences" },
  {
    name: "Hospitality, Leisure & Sports",
    value: "hospitality-leisure-and-sports",
  },
  { name: "Humanities", value: "humanities" },
  { name: "Law", value: "law" },
  { name: "Medicine", value: "medicine" },
  { name: "Music", value: "music" },
  { name: "Natural Sciences", value: "natural-sciences" },
  { name: "Psychology", value: "psychology" },
  { name: "Social Sciences", value: "social-sciences" },
];

const demoPrograms = [];
const programTypes = [
  "Featured Undergraduate Programs",
  "Certificate Courses",
  "Short Courses",
  "Executive Education",
  "Featured Graduate Programs",
];

const FeaturedPrograms = ({
  title,
  programType,
  url,
  hideCat,
  onAddToWishlist,
  onRemoveFromWishlist,
  programmeUrl,
}) => {
  const [currentCategory, setCurrentCategory] = useState(categories[0].value);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRightButton, setShowRightButton] = useState(true);

  const carouselRef = useRef(null);

  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const programsContainerRef = useRef(null);

  const [items, setItems] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  const scrollbarRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (carouselRef.current) {
      setShowLeftButton(carouselRef.current.scrollLeft > 0);
    }
  }, []);

  // Simplified scroll function
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "right" ? 300 : -300; // One card width

      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Add scroll event listener to manage button visibility
  useEffect(() => {
    const carousel = carouselRef.current;

    const handleScroll = () => {
      if (carousel) {
        // Check if scrolled to the end
        const isAtEnd =
          carousel.scrollWidth - carousel.scrollLeft <=
          carousel.clientWidth + 10;

        setShowLeftButton(carousel.scrollLeft > 0);
        setShowRightButton(!isAtEnd);
      }
    };

    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      return () => {
        carousel.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  // Mouse event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = x - startX;
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
      carousel.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (carousel) {
        carousel.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    const carousel = carouselRef.current;
    const scrollbar = scrollbarRef.current;

    if (carousel && scrollbar) {
      const syncScroll = () => {
        const scrollPercentage =
          carousel.scrollLeft / (carousel.scrollWidth - carousel.clientWidth);
        scrollbar.scrollLeft =
          scrollPercentage * (scrollbar.scrollWidth - scrollbar.clientWidth);
      };

      const handleCarouselScroll = () => {
        syncScroll();
      };

      carousel.addEventListener("scroll", handleCarouselScroll);
      return () => {
        carousel.removeEventListener("scroll", handleCarouselScroll);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        setShowLeftButton(carouselRef.current.scrollLeft > 0);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScrollbarScroll = (e) => {
    if (carouselRef.current) {
      const scrollPercentage =
        e.target.scrollLeft / (e.target.scrollWidth - e.target.clientWidth);
      carouselRef.current.scrollLeft =
        scrollPercentage *
        (carouselRef.current.scrollWidth - carouselRef.current.clientWidth);
    }
  };

  // Refs and state for UI interactions
  const categoryScrollRef = useRef(null);
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showLeftProgramChevron, setShowLeftProgramChevron] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);

  // Redux and auth state
  const user = useSelector((state) => state.user.userInfo);
  const courses = useSelector((state) => state.wishList.courses);
  const dispatch = useDispatch();

  // Memoized state and caching
  const [programCache, setProgramCache] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Performance optimization: Memoize category items
  const memoizedCategories = useMemo(() => [...categories], []);

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Fetch wishlist on component mount
  useEffect(() => {
    dispatch(fetchWishList());
  }, [dispatch]);

  // Responsive mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Optimized program fetching with caching
  const fetchPrograms = useCallback(
    async (category, title) => {
      // Check cache first
      const cacheKey = `${category}-${title}`;
      if (programCache[cacheKey]) {
        setPrograms(programCache[cacheKey]);
        return;
      }

      setLoading(true);
      try {
        let params = {
          page: 1,
          ordering: "random",
        };

        // Dynamic parameter setting based on title
        const paramMap = {
          "Featured Undergraduate Programs": {
            programme: "undergraduate",
            featured: true,
          },
          "Certificate Courses": {
            programme: "Certificate Courses",
            featured: true,
          },
          "Short Courses": { programme: "Short Courses", featured: true },
          "Executive Education": {
            programme: "Executive Education",
            featured: true,
          },
          "Featured Graduate Programs": {
            programme: "postgraduate",
            featured: true,
          },
          "Related Programs": { programme: "postgraduate", page: 2 },
        };

        const titleParams = paramMap[title] || {};

        if (category === "featured") {
          params.featured = true;
        } else {
          params.discipline = category;
        }

        params = { ...params, ...titleParams };

        let response;
        if (title === "Related Programs") {
          response = await axios.get(`https://hillpad.com/coursefinder`, {
            params: { name: programType },
          });
        }
        if (title === "Free Courses") {
          console.log("free");
          try {
            response = await axios.get(
              `https://api.hillpad.com/api/academics/course/list?tuition=0,-1&ordering=random&featured=true&published=true`
            );
            console.log({ response });
          } catch (error) {
            console.error("Error fetching free courses:", error);
            response = { data: { results: [] } }; // Fallback to an empty result set
          }
        } else {
          response = await axios.get(
            `https://api.hillpad.com/api/academics/course/list`,
            { params }
          );
        }

        const filteredPrograms = response.data.results.filter(
          (program) =>
            program.school.country.continent !== "AS" &&
            program.school.country.continent !== "AF"
        );

        // Cache the results
        setProgramCache((prev) => ({
          ...prev,
          [cacheKey]: filteredPrograms,
        }));

        setPrograms(filteredPrograms);
      } catch (error) {
        console.error("Error fetching programs:", error);
        setPrograms([]);
      } finally {
        setLoading(false);
        setCurrentIndex(0);
        setShowLeftProgramChevron(false);
      }
    },
    [programCache, programType]
  );

  // Fetch programs when category or title changes
  useEffect(() => {
    fetchPrograms(currentCategory, title);
  }, [currentCategory, title, fetchPrograms]);

  // Slide navigation functions with performance improvements
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      let maxProgramsLength;
      if (isMobile) {
        maxProgramsLength =
          isMobile && programs.length > 8 ? 8 : programs.length - 1;
      } else {
        maxProgramsLength = Math.ceil(programs.length / 2) - 1;
      }
      console.log({ maxProgramsLength, prevIndex }, programs.length);
      const maxIndex = maxProgramsLength;
      let newIndex = prevIndex === maxIndex ? 0 : prevIndex + 1;
      if (!isMobile && prevIndex > 3 && programs.length > 7) {
        newIndex = 0;
      }
      if (!isMobile && maxProgramsLength < 3) {
        newIndex = 0;
      }
      setShowLeftProgramChevron(newIndex > 0);
      return newIndex;
    });
  }, [isMobile, programs.length]);
  // const nextSlide = useCallback(() => {
  //   setCurrentIndex(prevIndex => {
  //     const maxIndex = isMobile ? programs.length - 1 : Math.ceil(programs.length / 2) - 1;
  //     const newIndex = prevIndex === maxIndex ? 0 : prevIndex + 1;
  //     setShowLeftProgramChevron(newIndex > 0);
  //     return newIndex;
  //   });
  // }, [isMobile, programs.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? programs.length - 1 : prevIndex - 1;
      setShowLeftProgramChevron(newIndex > 0);
      return newIndex;
    });
  }, [programs.length]);

  // Memoized rendering calculation
  const getTranslateValue = useCallback(
    (currentIndex, isMobile, windowWidth) => {
      if (isMobile) {
        if (windowWidth >= 300 && windowWidth <= 400) return currentIndex * 100;
        if (windowWidth >= 400 && windowWidth <= 500) return currentIndex * 100;
        return currentIndex * 100;
      }
      return currentIndex * 100;
    },
    []
  );

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      //nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      // prevSlide();
    }
  };
  const windowWidth = window.innerWidth;
  const mos = getOSUsingUserAgent() === "Mac OS";
  return (
    <div
      className={`w-full ${
        mos ? "w[80vw] hid" : ""
      } relative md:left-4 sm:left-0 max-w-full mx-auto py-8`}
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
    >
      <h2 className="text-2xl  md:bottom-[12px] w-[80%] md:left-0 left-7  px-2  relative block sm:inline font-bold mb-4">
        {title ? title : "Featured Undergraduate Programs"}
      </h2>

      {hideCat ? (
        <div className="hidden md:inline left-[90%] mdd:left-[80%] absolute top-[20px] font-bold text-orange inline text-right">
          <a
            href={
              programmeUrl === "free"
                ? `/coursefinder?tuition=0%2C-1`
                : `/coursefinder?programme=${programmeUrl}`
            }
            className="text-blue-600 hover:underline"
          >
            View all →
          </a>
        </div>
      ) : (
        <div className="relative">
          <div className="relative block custom:hidden">
            {showLeftChevron && (
              <button
                onClick={() => scrollCategories("left")}
                className="absolute top-[60%] -translate-y-1/2 left-0 bg-white rounded-full p-2 border-[2px] border-grey border-opacity-10 hover:bg-gray-100 transition-colors duration-200 z-10"
                aria-label="Scroll left"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
            )}

            <div
              ref={categoryScrollRef}
              className="flex items-center w-[85%] relative left-2  overflow-x-auto no-scrollbar"
            >
              {items.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setCurrentCategory(category.value)}
                  className={`px-4 mt-2 py-0 whitespace-nowrap ${
                    category.value === currentCategory
                      ? "text-orange relative  font-semibold border-b-2 border-red-500"
                      : "text-gray-500  relative"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollCategories("right")}
              className="absolute right-40 top-[60%]  -translate-y-1/2 right-0 bg-white rounded-full p-2  border-[2px] border-grey border-opacity-10 hover:bg-gray-100 transition-colors duration-200 z-50"
              aria-label="Scroll right"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="hidden md:inline left-[90%] relative bottom-[24px] font-bold text-orange bottom-10 inline text-right">
            {/* <a href="https://hillpad.com/courses" className="text-blue-600 hover:underline">View all →</a> */}
            <a href={url} className="text-blue-600  hover:underline">
              View all →
            </a>
          </div>
        </div>
      )}
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto hide-scrollbar scroll-smooth"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {programs.map((program) => (
            <div
              key={program.id}
              className="w-[300px] flex-none px-2 mb-4 sm:mr-5 mr-8 "
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
            className="absolute top-1/2 sm:block -translate-y-1/2 left-[-2%] bg-white rounded-full p-2 border-[2px] border-grey border-opacity-10 hover:bg-gray-100 transition-colors duration-200 z-10"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-9 h-9" />
          </button>
        )}

        {showRightButton && (
          <button
            onClick={() => scroll("right")}
            className="absolute md:top-[43%]  top-[45%]  md:block md:left-[98%] left-[80%] bg-white rounded-full p-2 border-[2px] border-grey border-opacity-10 hover:bg-gray-100 transition-colors duration-200 z-10"
            aria-label="Next slide"
          >
            <FiChevronRight className="w-9 h-9" />
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(FeaturedPrograms);
