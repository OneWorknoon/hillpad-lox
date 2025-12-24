import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { AiOutlineSearch } from "react-icons/ai";
import { BsViewList } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import CountryCarousel from "../components/country/countryCarousel";
import FeaturedPrograms from "../components/courses/FeaturedPrograms";
import DisciplinesList from "../components/templates_blocks/disciplineListNew.jsx";
import NewsletterSubscription from "../components/templates_blocks/newsLetterSub.jsx";
import ReviewCarousel from "../components/templates_blocks/ReviewCarousel.jsx";
import AuthModal from "../components/templates_blocks/authModal.jsx";
import Marquee from "../components/templates_blocks/marquee.jsx";
import { showLoginModal, hideLoginModal } from "../../src/redux/loginSlice.js";
import LoxCoursesSection from "../components/lox/LoxCoursesSection";

const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [hideCountryList, setCountryList] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Where?");
  const [countrySearchValue, setCountrySearchValue] = useState("");
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const countries = useSelector((state) => state.country.countryList);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const [related, setRelated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const dispatch = useDispatch();
  const showLogin = useSelector((state) => state.login.showLogin);
  const user = useSelector((state) => state.user.userInfo);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const openInSameTab = (url) => {
    let newUrl = `https://hillpad.com/coursefinder?name=${url}`;
    window.location.href = newUrl;
  };

  useEffect(() => {
    const shouldReload = sessionStorage.getItem("shouldReloadHome");
    const searchParams = new URLSearchParams(location.search);

    if (shouldReload === "true") {
      // Remove the flag
      sessionStorage.removeItem("shouldReloadHome");
      // Reload the page
      window.location.reload();
    }

    if (searchParams.get("login") === "true") {
      // Dispatch login modal
      dispatch(showLoginModal());

      // Remove login param from URL without reloading
      searchParams.delete("login");
      const newUrl =
        window.location.pathname +
        (searchParams.toString() ? "?" + searchParams.toString() : "");

      // Use replaceState to update URL without adding to history
      window.history.replaceState(null, "", newUrl);
    }
  }, [dispatch, location.search]);

  const handleCountryDropdownClick = () => {
    setIsAuthModalOpen(!isAuthModalOpen);
    // setIsCountryDropdownOpen(!isCountryDropdownOpen);
  };
  const handleCountryDropdownToggle = () => {
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
  };

  const handleCountryDropdownHover = () => {
    clearTimeout(timeoutRef.current);

    if (isCountryDropdownOpen) {
      handleCountryDropdownToggle();

      setCountryList(true);
    }
  };

  const handleCountryDropdownLeave = () => {
    if (isAuthModalOpen) {
      handleCountryDropdownClick();
    } else if (!isCountryDropdownOpen) {
      timeoutRef.current = setTimeout(() => {
        setCountryList(false);
        handleCountryDropdownToggle();

        // setCountrySearchValue('');
      }, 500);
    }
  };

  const handleAddToWishlist = (courseId) => {
    if (!user.email) {
      dispatch(showLoginModal());
    } else {
      // Logic to add to wishlist when user is logged in
      console.log("Adding course", courseId, "to wishlist");
    }
  };

  const filteredCountries = countries?.filter((country) =>
    country.name.toLowerCase().includes(countrySearchValue.toLowerCase())
  );

  //
  const getOSUsingUserAgent = () => {
    const userAgent = window.navigator.userAgent;

    if (userAgent.indexOf("Windows") !== -1) return "Windows";
    if (userAgent.indexOf("Mac") !== -1) return "Mac OS";
    if (userAgent.indexOf("Linux") !== -1) return "Linux";
    if (userAgent.indexOf("Android") !== -1) return "Android";
    if (userAgent.indexOf("iOS") !== -1) return "iOS";

    return "Unknown OS";
  };
  const os = getOSUsingUserAgent() === "Mac OS";

  return (
    <div className={`min-h-screen ${os ? "w-" : ""}`}>
      <div
        className={`custom:bg-hero-radial ${
          os ? "px-  w-[100%]" : ""
        } bg-hero-gradient w-full sm:h-screen h-[150vw] sm:mb-0 mb-20 relative md:bottom-[100px] overflow-hidden`}
      >
        <main className="custom:flex  mdd:w-[180%] relative mdd:left-[-40%] mdd:bottom-[10%]  custom:justify-center flex h-full max-w-full w-full mx-auto">
          <div className="relative z-[2] p-4 sm:p-0 top-[15%] w-full sm:w-1/2 flex max-w-full flex-col justify-center">
            <h2 className="text-4xl  sm:text-5xl font-bold md:text-left text-center text-white mb-8">
              Online courses & programs from top universities
            </h2>

            <form className="bg-white xss:-right-[2%] xs:-right-[2%] md:h-[8%] w-[96%] p-4  sm:p-3 md:rounded-full z-10 rounded-t-[20px] rounded-b-[30px] shadow-lg relative flex flex-col sm:flex-row justify-between items-center">
              <fieldset className="flex-grow w-full sm:w-auto flex items-center gap-x-2 px-2 py-2 border-0">
                {/* <AiOutlineSearch className='text-light_black text-opacity-60 text-xl sm:text-3xl' /> */}
                <input
                  type="text"
                  className="w-[100%] outline-none"
                  placeholder="What do you want to study?"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </fieldset>
              <div className="flex items-center w-full sm:w-auto flex-col sm:flex-row">
                {!isCountryDropdownOpen && (
                  <div
                    className="absolute ss:top-[40%] top-full mt-2 w-full  max-h-40 overflow-y-auto shadow p-1 rounded-md bg-white text-light_black text-opacity-60 sm:w-64 focus:outline-none"
                    onMouseEnter={handleCountryDropdownHover}
                    onMouseLeave={handleCountryDropdownLeave}
                  >
                    <div className="sticky top-0 pt-1 transform -translate-y-1 bg-white z-10">
                      <input
                        type="text"
                        placeholder="Search countries..."
                        value={countrySearchValue}
                        onChange={(e) => setCountrySearchValue(e.target.value)}
                        className="w-full p-1  border border-gray-300 rounded-full"
                      />
                    </div>
                    {filteredCountries.map((country) => (
                      <div
                        className="text-light_black text-xs py-2 hover:bg-gray-100 cursor-pointer"
                        key={country.id}
                        onClick={() => {
                          setSelectedCountry(country.name);
                          setIsCountryDropdownOpen(false);
                          setCountryList(false);
                          setCountrySearchValue("");
                        }}
                      >
                        {country.name}
                      </div>
                    ))}
                  </div>
                )}
                <Link
                  to={`/coursefinder?name=${searchValue}&country=${selectedCountry}`}
                  className="w-full sm:w-auto"
                >
                  <button className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4 text-white bg-orange py-2 px-8 text-lg font-bold rounded-full">
                    Search
                  </button>
                </Link>
              </div>
              <div className="w-full sm:w-auto text-light_black text-opacity-20 my-4 border-b-2 border-grey-100 sm:hidden"></div>
            </form>
            <div className="flex flex-wrap gap-2 mt-10">
              <div className="flex hidden sm:block flex-col items-start space-y-4 px-0 md:px-0">
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {["Undergraduates", "Graduates", "Executive Education"].map(
                    (program) => (
                      <a
                        key={program}
                        href={
                          program === "Free Courses"
                            ? "/coursefinder?tuition=0%2C-1"
                            : program === "Graduates"
                            ? "/coursefinder?programme=postgraduate"
                            : program === "Undergraduates"
                            ? "/coursefinder?programme=undergraduate"
                            : program === "Executive Education"
                            ? "/coursefinder?programme=Executive+Education"
                            : "/coursefinder?programme=Certificate+Courses"
                        }
                        className="bg-white bg-opacity-20 text-white hover:text-black px-3 py-2 rounded-full hover:bg-white"
                      >
                        {program}
                      </a>
                    )
                  )}
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 mt-2 md:mt-4">
                  {["Short Courses", "Certificate Courses"].map((program) => (
                    <a
                      key={program}
                      href={
                        program === "Short Courses"
                          ? "/coursefinder?programme=Short+Courses"
                          : "/coursefinder?programme=Certificate+Courses"
                      }
                      className="bg-white bg-opacity-20 text-white hover:text-black px-3 py-2 rounded-full hover:bg-white"
                    >
                      {program}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-1/2 custom:hidden relative h-full"
            style={{ marginLeft: "10px" }}
          >
            <img
              src="https://hillpad.com/blog/wp-content/themes/Hillpad_wp/assets/images/hero_image.png"
              alt="Smiling woman"
              className="absolute bottom-0 right-0 max-w-full md:h-[90%]"
            />
          </div>
        </main>
      </div>
      <div className={`min-h-screen ${os ? "px-  w-[100%]" : ""}`}>
        <div className="flex relative bottom-[100px] flex-col items-center">
          <CountryCarousel />
          {/* <FeaturedPrograms title={'Free Courses'} programType={'Free'} hideCat={true} onAddToWishlist={handleAddToWishlist} url={'/coursefinder?tuition=0%2C-1'} programmeUrl={'free'} /> */}

          <LoxCoursesSection />
          {/* <LoxCoursesSection onAddToWishlist={handleAddToWishlist} /> */}

          <FeaturedPrograms
            title={"Featured Undergraduate Programs"}
            programType={"undergraduate"}
            hideCat={true}
            url={"/coursefinder?programme=undergraduate"}
            onAddToWishlist={handleAddToWishlist}
            programmeUrl={"undergraduate"}
          />
          <FeaturedPrograms
            title={"Featured Graduate Programs"}
            programType={"graduate"}
            hideCat={true}
            url={"/coursefinder?programme=postgraduate"}
            onAddToWishlist={handleAddToWishlist}
            programmeUrl={"postgraduate"}
          />

          <section className="w-full max-w-full mx-auto">
            <div className="hidden md:inline left-[90%] mdd:left-[80%] relative top-[50px] font-bold text-orange inline text-right">
              <a
                href="https://hillpad.com/discipline"
                className="text-blue-600 hover:underline"
              >
                View all →
              </a>
            </div>
            <div>
              <h1 className="text-2xl  w-[80%] left-[8%] md:left-[3%] px-2 bottom-13  relative block sm:inline font-bold mb-4 top-5 sm:top-7">
                Browse By Discipline
              </h1>
            </div>
            <DisciplinesList />
          </section>
          <FeaturedPrograms
            title={"Executive Education"}
            programType={"Executive"}
            hideCat={true}
            onAddToWishlist={handleAddToWishlist}
            programmeUrl={"Executive+Education"}
          />
          <FeaturedPrograms
            title={"Short Courses"}
            programType={"Short"}
            hideCat={true}
            onAddToWishlist={handleAddToWishlist}
            programmeUrl={"Short+Courses"}
          />
          <NewsletterSubscription />
          <br />
          <FeaturedPrograms
            title={"Certificate Courses"}
            programType={"Certificate"}
            hideCat={true}
            onAddToWishlist={handleAddToWishlist}
            programmeUrl={"Certificate+Courses"}
          />
          <ReviewCarousel />
          <section className="w-full max-w-full mx-auto">
            {/* <div className="hidden md:inline left-[90%] mdd:left-[80%] relative top-[20px] font-bold text-orange inline text-right">
            <a href="/countries" className="text-blue-600 hover:underline">View all →</a>
          </div> */}
            <div>
              <h1 className="text-2xl  w-[80%] left-[8%] md:left-[-0.5%] px-2  relative block sm:inline font-bold mb-4 bottom-[10px] ">
                Courses By Countries
              </h1>
            </div>
            <Marquee />
          </section>

          <AuthModal
            isOpen={showLogin}
            onClose={() => dispatch(hideLoginModal())}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
