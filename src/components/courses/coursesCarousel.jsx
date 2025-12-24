import { useState, useEffect } from 'react';
import CourseCard from './coursecard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import config from '../../config';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function CoursesCarousel({ props, onAddToWishlist }) {
  const courseList = useSelector((state) => state.courses.coursesList);
  const APP_BASE_URL = config.VITE_BASE_URL;
  const [courses, setCourses] = useState(courseList);
  const [isMobile, setIsMobile] = useState(false);

  const discipline = props ? props.discipline : null;
  const school = props ? props.school : null;
  const country = props ? props.country : null;
  const setRelated = props.setRelated;
  const currentIndex = props.currentIndex;
  const [wasDragged, setWasDragged] = useState(false);

  const handleCardClick = (e, program) => {
    if (wasDragged) {
      e.preventDefault();
      setWasDragged(false);
      return;
    }
    // Handle card click navigation here
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize); // Check on window resize

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let url = '';
  if (discipline) {
    url = `${APP_BASE_URL}academics/course/list?discipline=${discipline}&ordering=random`;
  }
  if (school) {
    url = `${APP_BASE_URL}academics/course/list?school_slug=${school}&ordering=random`;
  }
  if (country) {
    url = `${APP_BASE_URL}academics/course/list?country=${country}&ordering=random`;
  }

  useEffect(() => {
    axios.get(url)
      .then(response => {
        if (response.data.results) {
          setCourses(response.data.results);
          setRelated(true);
        } else {
          axios.get(`${APP_BASE_URL}academics/course/list?featured=true&ordering=random`)
            .then(response => {
              if (response.data.results) {
                setCourses(response.data.results);
                setRelated(true);
              }
            });
        }
      })
      .catch(error => console.error('Error:', error));
  }, [setRelated, url]);

  const hasData = courses.length > 0;

  

  return (
     <div className="w-screen">
      {hasData && (
        <div className="flex justify-between items-baseline lg:mt-12">
          <div className="text-left text-2xl sm:ms-2 font-bold my-8 md:text-3xl md:my-2 lg:my-0 lg:text-3xl lg:font-semibold">
            Related <span className="text-orange">Courses</span>
          </div>
        </div>
      )}

      <div className="flex">
        {courses.slice(0, 6).map((program) => (
          <div
            key={program.id}
            className="w-[300px] flex-none px-2 mb-4 mr-5"
            style={{ scrollSnapAlign: 'start' }}
          >
            <CourseCard
              prop={program}
              onAddToWishlist={() => onAddToWishlist(program.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesCarousel;