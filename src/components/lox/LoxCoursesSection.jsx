import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import LoxCourseCard from "./LoxCourseCard.jsx";
import { loxCourses as defaultCourses } from "../../data/loxCourses.js";

export default function LoxCoursesSection({
  title = "LOX Courses",
  subtitle = "",
  viewAllHref = "/lox",
  courses = defaultCourses, // ✅ now flexible
}) {
  const carouselRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scrollByCards = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = direction === "right" ? 320 : -320;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onScroll = () => {
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollWidth - el.scrollLeft <= el.clientWidth + 10;
      setShowLeft(!atStart);
      setShowRight(!atEnd);
    };

    onScroll();
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="w-full relative md:left-4 sm:left-0 max-w-full mx-auto py-8">
      {/* Header */}
      <div className="flex items-start justify-between px-2">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {!!subtitle && (
            <p className="text-light_black opacity-70 mt-1">{subtitle}</p>
          )}
        </div>

        <div className="hidden md:inline font-bold text-orange">
          <a href={viewAllHref} className="text-blue-600 hover:underline">
            View all →
          </a>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative mt-4">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto hide-scrollbar scroll-smooth"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="w-[300px] flex-none px-2 mb-4 sm:mr-5 mr-8"
              style={{ scrollSnapAlign: "start" }}
            >
              <LoxCourseCard course={course} />
            </div>
          ))}
        </div>

        {/* Left button */}
        {showLeft && (
          <button
            onClick={() => scrollByCards("left")}
            className="absolute top-1/2 -translate-y-1/2 left-[-2%] bg-white rounded-full p-2 border-[2px] border-grey border-opacity-10 hover:bg-gray-100 transition-colors duration-200 z-10"
            aria-label="Previous"
          >
            <FiChevronLeft className="w-9 h-9" />
          </button>
        )}

        {/* Right button */}
        {showRight && (
          <button
            onClick={() => scrollByCards("right")}
            className="absolute md:top-[43%] top-[45%] md:left-[98%] left-[80%] bg-white rounded-full p-2 border-[2px] border-grey border-opacity-10 hover:bg-gray-100 transition-colors duration-200 z-10"
            aria-label="Next"
          >
            <FiChevronRight className="w-9 h-9" />
          </button>
        )}
      </div>

      {/* Mobile view all */}
      <div className="md:hidden px-2 mt-2 font-bold text-orange">
        <a href={viewAllHref} className="text-blue-600 hover:underline">
          View all →
        </a>
      </div>
    </section>
  );
}
