import React, { useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import bachelor from "../../assets/images/bachelors.svg";
import masters from "../../assets/images/masters.svg";
import doctorates from "../../assets/images/doctorates.svg";
import executive from "../../assets/images/executive.svg";
import certificate from "../../assets/images/certificate.svg";
import free from "../../assets/images/free.svg";
function Carousel() {
  const [hoverStates, setHoverStates] = useState([false, false, false, false, false]);

  const handleMouseOver = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = true;
    setHoverStates(newHoverStates);
  };

  const handleMouseOut = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    setHoverStates(newHoverStates);
  };

  const scrollLeft = () => {
    const content = document.getElementById("content");
    content.scrollLeft -= 572; // Adjusted for two columns
  };

  const scrollRight = () => {
    const content = document.getElementById("content");
    content.scrollLeft += 572; // Adjusted for two columns
  };

  const carouselItems = [
    // {
    //   title: "Free Courses",
    //   image: free,
    //   description: "Explore free online courses from top universities and institutions worldwide",
    //   linkTo: "/coursefinder?tuition=0%2C-1",
    //   buttonText: "Search Free Courses"
    // },
    {
      title: "Undergraduate Program",
      image: bachelor,
      description: "Choose top online Undergraduate's programs at universities and colleges worldwide",
      linkTo: "/undergraduate",
      buttonText: "Search Undergraduates"
    },
    {
      title: "Graduate Program",
      image: masters,
      description: "Choose top online Graduate's programs from top universities and colleges worldwide",
      linkTo: "/graduate",
      buttonText: "Search Graduates"
    },
    {
      title: "Executive Education",
      image: executive,
      description: "Explore executive education programs designed for experienced professionals and leaders ",
      linkTo: "https://hillpad.com/coursefinder?name=executive",
      buttonText: "Search Executive Education"
    },
    {
      title: "Short Courses",
      image: doctorates,
      description: "Choose top online Short Courses and programs on hillpad from top universities, and colleges worldwide ",
      linkTo: "/shortcourse",
      buttonText: "Search Short Courses"
    },
  
    {
      title: "Certificate Courses",
      image: certificate,
      description: "Discover a wide range of certificate courses to enhance your skills and advance your career on hillpad",
      linkTo: "https://hillpad.com/coursefinder?name=Certificate",
      buttonText: "Search Certificate Courses"
    }
  ];
  
  return (
    <div className="relative">
      <div className="hidden absolute xl:right-28 xl:bottom-0 transition-all duration-300" id="arrow">
        <button onClick={scrollLeft} className="p-2 m-2 absolute top-60 left-4 shadow-2 rounded-full bg-white">
          <FiChevronLeft />
        </button>
        <button onClick={scrollRight} className="p-2 absolute top-60 right-4 m-2 shadow-2 rounded-full bg-white">
          <FiChevronRight />
        </button>
      </div>
      <div id="content" className="carousel p-4 flex flex-col sm:flex-row flex-wrap items-center justify-start md:justify-center overflow-x-auto scroll-smooth scrollbar-hide">
        {carouselItems.map((item, index) => (
          <div key={index} className="sm:w-1/2 px-2 mb-8">
            <div
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={() => handleMouseOut(index)}
              className={`transition-all duration-300 h-full ${hoverStates[index] ? 'deepShadow rounded-lg' : ''}`}
            >
              <div className="p-4 flex flex-col h-full">
                <div className="w-40 sm:w-32 mx-auto p-2">
                  <img src={item.image} alt={`${item.title.toLowerCase()}_icon`} />
                </div>
                <div className="font-bold text-xl text-center mt-4">{item.title}</div>
                <div className="text-sm text-light_black p-4 my-2 text-center flex-grow">{item.description}</div>
                <Link to={item.linkTo} className="mt-auto">
                  <div className="flex justify-center">
                    <button className={`border-orange border rounded-md font-bold text-base py-2 px-4 ${hoverStates[index] ? 'bg-orange text-white' : 'text-orange hover:bg-orange hover:text-white'}`}>
                      {item.buttonText}
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;