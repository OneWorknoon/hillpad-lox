import {
  FiCalendar,
  FiChevronDown,
  FiClock,
  FiLock,
  FiMapPin,
  FiStar,
  FiUnlock,
} from "react-icons/fi";
import hero from "../assets/images/Rectangle_3.png";
import { FaCoins, FaFlagCheckered, FaPaperPlane } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import Background from "../components/courses/background";
import AdmissionReq from "../components/courses/admissionRequirement";
import ProjectStructure from "../components/courses/projectStructure";
import Prefooter from "../components/templates_blocks/preFooter";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../App.css";
import axios from "axios";
import { showLoginModal, hideLoginModal } from "../../src/redux/loginSlice.js";
import { useDispatch } from "react-redux";
import RegisterInterestForm from "../components/templates_blocks/registerInterestForm.jsx";
import config from "../config";
import Login from "../components/templates_blocks/login";
import Overview from "../components/courses/overview";
import Finance from "../components/courses/finance";
import Reviews from "../components/templates_blocks/reviews";
import { BiShareAlt } from "react-icons/bi";
import Share from "../components/templates_blocks/share";
import NotFound from "./404";
import FeaturedPrograms from "../components/courses/FeaturedPrograms";

export default function CourseDetails() {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const location = useLocation();
  const param = useParams();
  const slug = param.slug;
  const [loading, setLoading] = useState(true);
  const [showApply, setShowApply] = useState(false);
  const user = useSelector((state) => state.user);
  console.log("user", user);

  const navigationRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(user.isLoggedIn);
  const [data, setData] = useState({});
  const [showShare, setShowShare] = useState(false);
  const [noData, setNoData] = useState(false);
  const [buttonText, setbuttonText] = useState("Visit University Website");

  const [showInterestForm, setShowInterestForm] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [isSticky, setIsSticky] = useState(false);
  const infoSectionRef = useRef(null);
  const sectionRefs = {
    overview: useRef(null),
    admission: useRef(null),
    academics: useRef(null),
    finance: useRef(null),
  };

  const scrollToSection = (sectionName) => {
    setInfo(sectionName);
    const sectionElement = sectionRefs[sectionName].current;
    if (sectionElement) {
      // Scroll to 50 pixels before the section
      const offset = sectionElement.offsetTop - 200;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (infoSectionRef.current) {
        const sectionTop = infoSectionRef.current.offsetTop;
        const sectionBottom = sectionTop + infoSectionRef.current.offsetHeight;
        const scrollPosition = window.scrollY;

        // Check if user has scrolled past the info section
        setIsSticky(
          scrollPosition >= sectionTop && scrollPosition < sectionBottom
        );

        // Section active tracking
        Object.entries(sectionRefs).forEach(([sectionName, ref]) => {
          if (ref.current) {
            const sectionTop = ref.current.offsetTop;
            const sectionHeight = ref.current.offsetHeight;

            // Adjust the condition to check 50 pixels before the section
            if (
              scrollPosition >= sectionTop - 250 &&
              scrollPosition < sectionTop + sectionHeight - 100
            ) {
              setActiveSection(sectionName);
            }
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setNoData(true);
      }
    }, 30000); // 30 seconds timeout for loading

    axios
      .get(`${APP_BASE_URL}academics/course/detail/${slug}`)
      .then((res) => {
        const programmeData = res.data;
        console.log(res.data);
        setData(programmeData);
        console.log({ programmeData });
        setbuttonText("Visit School Website");
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          console.log("No data found jere");
          setNoData(true);
        }
      });

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    setIsLoggedIn(user.isLoggedIn);
  }, [user.isLoggedIn]);

  const ActionButton = () => (
    <button
      className="bg-orange px-4 py-3 rounded-md w-full text-white flex items-center gap-x-2 justify-center"
      onClick={handleButtonClick}
    >
      <span className="text-white font-semibold">{buttonText}</span>
      <div>
        {/* {isLoggedIn ? (
          <FiUnlock className="font-bold text-lg" />
        ) : (
          <FiLock className="font-bold text-lg" />
        )} */}
        <FiUnlock className="font-bold text-lg" />
      </div>
    </button>
  );

  const handleAddToWishlist = (courseId) => {
    if (!user.email) {
      // dispatch(showLoginModal());
    } else {
      // Logic to add to wishlist when user is logged in
      console.log("Adding course", courseId, "to wishlist");
    }
  };

  //console.log(data);
  const month = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May ",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const [info, setInfo] = useState("overview");
  const [showBg, setShowBg] = useState(true);
  const [showAdmission, setshowAdmission] = useState(false);
  const [showScholarship, setShowScholarship] = useState(false);
  const [showFees, setShowFees] = useState(false);
  const [showStructure, setShowStructure] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);

  function renderInfo(info) {
    if (info === "overview") {
      console.log(info);
      return <Overview props={data} />;
    }
    if (info === "admission") {
      return <AdmissionReq prop={data} />;
    }
    if (info === "academics") {
      return <ProjectStructure prop={data} />;
    }
    if (info === "finance") {
      return <Finance prop={data} />;
    }
  }

  //console.log(data.disciplines)

  const buttons = document.querySelectorAll(".courseButton");
  let selectedButton = buttons[0];

  function buttonClick(button) {
    if (selectedButton) {
      selectedButton.classList.remove("text-white");
      selectedButton.classList.remove("bg-orange");
    }
    button.classList.add("bg-orange");
    button.classList.add("text-white");
    selectedButton = button;
  }

  const dispatch = useDispatch();

  const toggleModal = () => {
    // setModal(!modal);
    //console.log(modal)
  };
  const handleButtonClick = () => {
    // if (!user.isLoggedIn) {
    //   dispatch(showLoginModal());
    //   return;
    // }

    if (buttonText === "Apply Now") {
      setShowInterestForm(true);
    } else {
      window.open(data.official_programme_website, "_blank");
    }
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      buttonClick(this);
    });
  }

  if (noData) {
    console.log("No data found");
    return <NotFound />;
  }
  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-light" />
        </div>
      ) : (
        <div>
          {/* ----------------------------- Desktop View  ----------------------------------- */}
          {showShare && <Share />}
          <div className="w-screen my-20 xl:px-0 hidden lg:block">
            <div className="w-full text-lg ">
              <div
                className="xl:flex mx-auto bg-no-repeat bg-cover bg-center text-white absolute -z-10 "
                style={{
                  width: "100vw",
                  height: "400px",
                  background: `url(${data.school.banner})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center 25%",
                }}
              >
                <div className=" w-full " style={{ heigth: "400px" }} />
              </div>
              <div className="flex justify-between w-full max-w-full mx-auto xl:mx-4 2xl:mx-auto">
                <div className=" py-20 xl:w-9/12">
                  <section
                    className="mx-auto flex flex-col max-w-full text-white "
                    style={{ minHeight: "800px !important" }}
                  >
                    <div className="max-w-full w-full mx-auto mt-6 w-max-full"></div>
                  </section>
                  <div className="w-full mt-48 pt-12">
                    <div className="w-full items-center">
                      <div className=" items-center">
                        <div className="w-32 border-8 border-white shadow-lg bg-white">
                          <img src={data.school.logo} alt={data.school.name} />
                        </div>
                        <Link to={`/school/${data.school.slug}`}>
                          <h2 className="font-semibold text-xl text-light mt-6">
                            {data.school.name}
                          </h2>
                        </Link>
                      </div>
                      <div className="flex items-center gap-x-4">
                        <div>
                          <div className="my-2 text-2xl"></div>

                          <div className=" flex align-middle items-center gap-x-80">
                            <h1 className="text-5xl font-bold leading-tight">
                              {data.name}
                              <span className="text-xl ms-2">
                                {/* ({data.degree_type?.short_name}) */}
                              </span>
                            </h1>
                            <BiShareAlt
                              className="text-4xl cursor-pointer text-light_black"
                              onClick={() => setShowShare(!showShare)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="my-6">
                        <div className="text-light_black">
                          <p>{data.about}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <section
                    ref={infoSectionRef}
                    className="w-full mx-auto  my-6 text-light_black"
                  >
                    <div
                      className={`${
                        isSticky
                          ? "fixed top-[82px] rounde left-0 right-0 z-10 w-full   mx-auto shadow-md"
                          : "rounded-full relative"
                      } bg-orange `}
                      style={
                        {
                          // transition: 'all 0.3s ease',
                          // width: isSticky ? 'calc(100% - 2rem)' : '100%'
                        }
                      }
                    >
                      <div className="flex p-2 justify-around  border-opacity-20 rounded-full">
                        <div
                          className={`px-12 py-2 cursor-pointer ${
                            activeSection === "overview"
                              ? "text- bg-white rounded-full "
                              : "text-white"
                          }`}
                          onClick={() => scrollToSection("overview")}
                        >
                          Overview
                        </div>
                        <div
                          className={`px-12 py-2 cursor-pointer ${
                            activeSection === "admission"
                              ? " bg-white rounded-full "
                              : "text-white"
                          }`}
                          onClick={() => scrollToSection("admission")}
                        >
                          Admission
                        </div>
                        <div
                          className={`px-12 py-2 cursor-pointer ${
                            activeSection === "academics"
                              ? " bg-white rounded-full"
                              : "text-white"
                          }`}
                          onClick={() => scrollToSection("academics")}
                        >
                          Academics
                        </div>
                        <div
                          className={`px-12 py-2 cursor-pointer ${
                            activeSection === "finance"
                              ? " bg-white rounded-full "
                              : "text-white"
                          }`}
                          onClick={() => scrollToSection("finance")}
                        >
                          Tuition and Finance
                        </div>
                      </div>
                    </div>
                    {isSticky && (
                      <div
                        style={{
                          height: navigationRef.current?.offsetHeight || "60px",
                        }}
                      />
                    )}
                    <div className="w-full">
                      <div ref={sectionRefs.overview} id="overview-section">
                        {renderInfo("overview")}
                      </div>
                      <div ref={sectionRefs.admission} id="admission-section">
                        {renderInfo("admission")}
                      </div>
                      <div ref={sectionRefs.academics} id="academics-section">
                        {renderInfo("academics")}
                      </div>
                      <div ref={sectionRefs.finance} id="finance-section">
                        {renderInfo("finance")}
                      </div>
                    </div>
                  </section>
                </div>
                <aside className="w-100  lg:flex flex-col py-20 items-end">
                  <div className="sticky" style={{ top: "12rem" }}>
                    <div className=" rounded-lg card shadow-2 w-88 bg-white h-fit p-2 text-light_black flex flex-col justify-between ">
                      <div className="rounded-lg">
                        {/* <iframe width="350" height="190" src="https://www.youtube.com/embed/Uk4xjhq2QjE?si=dOn-PbbIEo3aTcfZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                        <iframe
                          className="rounded-lg w-full aspect-video"
                          src={data.school.video}
                          title="YouTube video player"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowfullscreen
                        />
                      </div>
                      <div>
                        <Link to={`/school/${data.school.slug}`}>
                          <h3 className="font-semibold text-lg px-4">
                            {data.school.name}
                          </h3>
                        </Link>
                        <div className="text-sm px-4">
                          <div className="flex items-center gap-x-2 border-b border-light_black border-opacity-30 py-2">
                            <span>
                              <FiMapPin />
                            </span>
                            <span>
                              {data.school.city} {data.school.country.name}
                            </span>
                          </div>
                          {/* <div className='flex items-center gap-x-2'><span><FiStar /></span><span>4.4 (53 Reviews)</span></div> */}
                          <div />
                        </div>
                      </div>
                      {/*                       <div className="flex items-center gap-x-2 px-4 text-light_black border-b border-light_black border-opacity-30 py-2">
                        <span className="text-xl text-light_black">
                          <FaCoins />
                        </span>
                        <span className="text-light_black">Tuition: </span>
                        <span className="font-semibold text-xl">
                          {data.tuition_fee < 0
                            ? "N/A "
                            : data.tuition_fee == 0
                              ? "FREE"
                              : data.tuition_fee.toLocaleString()}
                        </span>{" "}
                        <span>
                          {" "}
                          {data.tuition_currency
                            ? data.tuition_currency.short_code.toUpperCase()
                            : " "}
                        </span>
                        
                      {  data.tuition_fee > 0 &&
                        <span>/ {toTitleCase(data.tuition_fee_base)}</span>
                      }
                      </div> */}
                      <div className="flex flex-col gap-y-2 py-2 px-4 font-semibold text-opacity-40">
                        <div className="flex items-center gap-x-2">
                          <span>
                            <FiCalendar />
                          </span>
                          <span>
                            {data.duration} {data.duration_base.toLowerCase()}
                          </span>
                          <span className="text-sm font-normal"></span>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <span>
                            <FiClock />
                          </span>
                          <span>
                            {data.course_format.charAt(0) +
                              data.course_format.slice(1).toLowerCase()}
                            -time
                          </span>
                          <span className="text-sm font-normal"></span>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <span>
                            <FiMapPin />
                          </span>
                          <span>
                            {data.attendance === "SITE"
                              ? "On-site"
                              : data.attendance.toLowerCase()}
                          </span>
                          <span className="text-sm font-normal"></span>
                        </div>
                        {data.course_dates.deadline_month ? (
                          <div className="flex items-center gap-x-2">
                            <span>
                              <FaPaperPlane />
                            </span>
                            <span className="text-sm font-normal">
                              Deadline:{" "}
                            </span>
                            <span>
                              {month[data.course_dates.deadline_month]}{" "}
                              {data.course_dates.deadline_year}
                            </span>
                          </div>
                        ) : null}
                        {data.course_dates.start_month ? (
                          <div className="flex items-center gap-x-2">
                            <span>
                              <FaFlagCheckered />
                            </span>
                            <span className="text-sm font-normal">
                              Start Date:{" "}
                            </span>
                            <span>
                              {month[data.course_dates.start_month]}{" "}
                              {data.course_dates.start_year}
                            </span>
                          </div>
                        ) : null}
                      </div>
                      <div className="py-3">
                        <ActionButton />
                      </div>
                      <div className="py-2">
                        {/* {isLoggedIn ? (
                          <button
                            className="bg-white border-2 border-orange px-4 py-3 rounded-md w-full text-orange flex items-center gap-x-2 justify-center"
                            onClick={() => setShowInterestForm(true)}
                          >
                            <span className="font-semibold">Download Brochure</span>
                          </button>
                        ) : (
                          <button
                            className="bg-white border-2 border-orange px-4 py-3 rounded-md w-full text-orange flex items-center gap-x-2 justify-center"
                            onClick={toggleModal}
                          >
                            <span className="font-semibold"> Download Brochure</span>
                          </button>
                        )} */}
                      </div>
                    </div>
                  </div>
                </aside>
              </div>

              <div className="w-full max-w-full mx-auto my-10 xl:mx-4 2xl:mx-auto 2xl:px-4">
                {data ? (
                  <Prefooter
                    props={{ discipline: data.disciplines[0]["slug"] }}
                    onAddToWishlist={handleAddToWishlist}
                  />
                ) : // <FeaturedPrograms programType={data.disciplines[0]["slug"].split('-')[0]} title={'Related Programs'} hideCat={true} onAddToWishlist={handleAddToWishlist} />

                null}
              </div>
            </div>
          </div>

          {/* ----------------------------- Mobile View  ----------------------------------- */}
          <div className="w-screen lg:hidden">
            <div
              className="flex mx-auto items-center justify-center bg-no-repeat bg-cover bg-center text-white  mt-16 relative"
              style={{
                width: "100vw",
                height: "400px",
                background: `url(${data.school.banner})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
            >
              <div className="flex flex-col  mt-52 w-full ">
                <div className="flex  justify-center mx-auto w-full">
                  <div className=" card shadow-2 w-82 2xs:w-88 bg-white p-4 h-fit rounded-lg text-light_black flex flex-col justify-between ">
                    <div>
                      <h3 className="font-semibold text-2xl">
                        {data.school.name}
                      </h3>
                      <div className="text-sm">
                        <div className="flex items-center gap-x-2 border-b border-light_black border-opacity-30 py-2">
                          <span>
                            <FiMapPin />
                          </span>
                          <span>
                            {data.school.city} {data.school.country.name}
                          </span>
                        </div>
                        {/* <div className='flex items-center gap-x-2'><span><FiStar /></span><span>4.4 (53 Reviews)</span></div> */}
                        <div />
                      </div>
                    </div>
                    {/*                     <div className="flex items-center gap-x-2 text-light_black border-b border-light_black border-opacity-30 py-2">
                      <span className="text-xl text-light_black">
                        <FaCoins />
                      </span>
                      <span className="text-light_black">Tuition: </span>
                      <span className="font-semibold text-sm lg:text-xl lg:px-2">
                      {data.tuition_fee < 0
                          ? "N/A "
                          : data.tuition_fee == 0
                            ? "Free"
                            : data.tuition_fee.toLocaleString()}
                      </span>
                      <span className="text-xs sm:text-sm">
                      {data.tuition_currency
                          ? data.tuition_currency.short_code.toUpperCase()
                          : null} <span> </span>
                       / {data.tuition_fee > 1 ? toTitleCase(data.tuition_fee_base) : null}
                      </span>
                    </div>
 */}
                    <div className="flex flex-col gap-y-2 py-2 font-semibold text-opacity-40">
                      <div className="flex items-center gap-x-2">
                        <span>
                          <FiCalendar />
                        </span>
                        <span>
                          {data.duration} {data.duration_base}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <span>
                          <FiClock />
                        </span>
                        <span>
                          {data.course_format.charAt(0) +
                            data.course_format.slice(1).toLowerCase()}
                          -time
                        </span>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <span>
                          <FiMapPin />
                        </span>
                        <span>
                          {data.attendance === "SITE"
                            ? "On-site"
                            : data.attendance}
                        </span>
                      </div>
                      {data.course_dates.deadline_month ? (
                        <div className="flex items-center gap-x-2">
                          <span>
                            <FaPaperPlane />
                          </span>
                          <span className="text-sm font-normal">Deadline:</span>
                          <span>
                            {month[data.course_dates.deadline_month]}{" "}
                            {data.course_dates.deadline_year}
                          </span>
                        </div>
                      ) : null}
                      {data.course_dates.start_month ? (
                        <div className="flex items-center gap-x-2">
                          <span>
                            <FaFlagCheckered />
                          </span>
                          <span className="text-sm font-normal">
                            Start Date:
                          </span>
                          <span>
                            {month[data.course_dates.start_month]}{" "}
                            {data.course_dates.start_year}
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <div className="py-3">
                      <ActionButton />
                    </div>
                    {/* <div className="py-3">
                        {isLoggedIn && buttonText === 'Apply Now' ? (
                       
                            <button className="bg-orange px-4 py-3 rounded-md w-full text-white flex items-center gap-x-2 justify-center"
                            onClick={() => setShowInterestForm(true)}
                            >
                              <span className="text-white font-semibold">
                                {buttonText}
                              </span>
                              <div>
                                <FiUnlock className="font-bold text-lg" />
                              </div>
                            </button>
                        
                        ) : (
                          <button
                            className="bg-orange px-4 py-3 rounded-md w-full text-white flex items-center gap-x-2 justify-center"

                            onClick={toggleModal}
                          >
                            <span className="text-white font-semibold">
                            {buttonText}
                            </span>
                            <div>
                              <FiLock className="font-bold text-lg" />
                            </div>
                          </button>
                        )}
                      </div> */}
                  </div>
                </div>
              </div>
            </div>

            <section className="w-full mx-2 max-w-full mt-40 text-light_black px-2">
              <div className="w-full">
                {/* <div>
                  <h2 className='font-semibold text-black text-2xl my-6'>About Course</h2>
                </div>
                <div className={data.about.length < 320 ? 'mt-3 mb-16' : 'mt-3'}>
                  <p>  {data.about}
                  </p>
                </div> */}
                <div className="w-full">
                  <div>
                    <h2 className="font-semibold text-black text-3xl my-6">
                      Course Overview
                    </h2>
                  </div>
                  <div
                    className="myStyle"
                    dangerouslySetInnerHTML={{ __html: data.overview }}
                  />
                  {/* <a href='' className='text-light underline py-1'>Show more</a> */}
                </div>
              </div>
            </section>
            <section className="my-8">
              <div className="flex flex-col text-light_black text-lg font-medium">
                <div
                  className="border-t border-1 w-full py-3 px-4 border-light_black border-opacity-20"
                  onClick={() => setShowBg(!showBg)}
                >
                  <div className="flex items-center justify-between text-black">
                    <div>Background </div>
                    <div>
                      <FiChevronDown />
                    </div>
                  </div>
                  <div>{showBg ? <Background prop={data} /> : null}</div>
                </div>
                <div
                  className="border-t border-1 w-full py-3 px-4 border-light_black border-opacity-20 "
                  onClick={() => setshowAdmission(!showAdmission)}
                >
                  <div className="flex items-center justify-between text-black">
                    <div>Admission Requirements </div>
                    <div>
                      <FiChevronDown />
                    </div>
                  </div>
                  <div>
                    {showAdmission ? <AdmissionReq prop={data} /> : null}
                  </div>
                </div>

                <div
                  className="border-t border-1 w-full py-3 px-4 border-light_black border-opacity-20 "
                  onClick={() => setShowStructure(!showStructure)}
                >
                  <div className="flex items-center justify-between text-black">
                    <div>Programme Structure </div>
                    <div>
                      <FiChevronDown />{" "}
                    </div>
                  </div>
                  <div>
                    {showStructure ? <ProjectStructure prop={data} /> : null}
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full hidden sm:block mx-2 max-w-full my-6 text-light_black px-2">
              <Reviews />
            </section>

            <div className="w-full  my-10 flex  justify-center px-4 ">
              <Prefooter
                props={{ discipline: data.disciplines[0]["slug"] }}
                onAddToWishlist={handleAddToWishlist}
              />
              {/* <FeaturedPrograms programType={data.disciplines[0]["slug"].split('-')[0]} title={'Related Programs'} hideCat={true} onAddToWishlist={handleAddToWishlist} /> */}
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className="modal ">
          {" "}
          <div onClick={toggleModal} className="overlay " />{" "}
          <div className="modal-content mx-1 w-84 2xs:w-88 sm:w-screen lg:w-fit bg-white">
            <Login
              handleModal={() => {
                dispatch(hideLoginModal());
              }}
            />
            <button className="close-modal text-2xl" onClick={toggleModal}>
              {" "}
              <IoCloseOutline />{" "}
            </button>
          </div>
        </div>
      )}
      {showInterestForm && (
        <div className="modal">
          <div onClick={() => setShowInterestForm(false)} className="overlay" />
          <div className="modal-content mt-10 mx-1 w-84 2xs:w-88 sm:w-screen lg:w-fit bg-white">
            <RegisterInterestForm
              onClose={() => setShowInterestForm(false)}
              courseId={data.id}
              slug={data?.official_programme_website}
            />
            <button
              className="close-modal text-2xl"
              onClick={() => setShowInterestForm(false)}
            >
              <IoCloseOutline />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
