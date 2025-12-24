import logo from "../../assets/images/hillpad-transparent.png";
import logoWhite from "../../assets/images/hillpad-white.png";
import signlogo from "../../assets/images/user.png";
import userWhite from "../../assets/images/user_white.png";
import {
  FiMenu,
  FiLayers,
  FiUser,
  FiHeart,
  FiSettings,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { FaGraduationCap, FaHeart, FaPaperPlane } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LuUser } from "react-icons/lu";
import { RiArrowDropDownLine, RiArrowRightSLine } from "react-icons/ri";
import { BiWorld, BiBriefcase } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Login from "./login";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import "../templates_blocks/modal.css";
import { BsViewList } from "react-icons/bs";
import config from "../../config";
import WishList from "./wishList";
import { useLocation } from "react-router-dom";

export default function HomePageHeader({ props }) {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [modal, setModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [hideCountryList, setCountryList] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Where?");
  const [showWishList, setShowWishList] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const browseRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showdropDown, setShowDropDown] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  // Add refs for timeouts
  const timeoutRef = useRef(null);
  const programsTimeoutRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const headerNavRef = useRef(null);
  useEffect(() => {
    const shouldReload = sessionStorage.getItem("shouldReloadHome");
    console.log(sessionStorage.getItem("shouldReloadHome"));
    if (shouldReload === "true") {
      // Remove the flag
      sessionStorage.removeItem("shouldReloadHome");
      // Reload the page
      window.location.reload();
    }
  }, []);
  useEffect(() => {}, [showdropDown]);

  useEffect(() => {}, [showSubMenu]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (browseRef.current && !browseRef.current.contains(event.target)) {
        setIsBrowseOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBrowseClick = () => {
    setIsBrowseOpen(!isBrowseOpen);
  };

  // Updated hover handlers with delays
  const handleBrowseHover = () => {
    clearTimeout(timeoutRef.current);
    clearTimeout(programsTimeoutRef.current);

    if (!isBrowseOpen) {
      setIsHovering(true);
    }
  };

  const handleBrowseLeave = () => {
    if (!isBrowseOpen) {
      timeoutRef.current = setTimeout(() => {
        if (!isHovering2) {
          // Only close if not hovering over programs
          setIsHovering(false);
        }
      }, 50);
    }
  };

  const handleProgramsHover = () => {
    clearTimeout(timeoutRef.current);
    clearTimeout(programsTimeoutRef.current);
    setIsHovering2(true);
  };

  const handleProgramsLeave = () => {
    programsTimeoutRef.current = setTimeout(() => {
      setIsHovering2(false);
      // Add delay before closing main menu
      timeoutRef.current = setTimeout(() => {
        setIsHovering(false);
      }, 3000);
    }, 3000);
  };

  const countries = useSelector((state) => state.country.countryList);

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (
        hideCountryList &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setCountryList(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [hideCountryList, searchValue, selectedCountry]);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleMouseOver2 = () => {
    setIsHovering2(true);
  };

  const handleMouseOut2 = () => {
    setIsHovering2(false);
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  function toggleHeader(e) {
    if (e) e.stopPropagation();
    const base = document.querySelector("#headerNav");
    const isCurrentlyHidden = base.classList.contains("hidden");

    // Toggle menu state
    if (isCurrentlyHidden) {
      base.classList.remove("hidden");
      setIsMenuOpen(true);
    } else {
      base.classList.add("hidden");
      setIsMenuOpen(false);

      // Also close browse menu if it's open
      const nav = document.querySelector("#mobileNav");
      if (nav && !nav.classList.contains("hidden")) {
        nav.classList.add("hidden");
        setIsBrowseOpen(false);
      }
    }
  }

  function toggleNav(e) {
    e.stopPropagation();
    const nav = document.querySelector("#mobileNav");

    // Only toggle the browse dropdown without affecting parent menu
    if (nav.classList.contains("hidden")) {
      nav.classList.remove("hidden");
      setIsBrowseOpen(true);
    } else {
      nav.classList.add("hidden");
      setIsBrowseOpen(false);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (!headerNavRef.current) return;

      // Check if click is outside both menus
      const isOutsideHeader = !headerNavRef.current.contains(event.target);
      const isOutsideBrowse =
        mobileNavRef.current && !mobileNavRef.current.contains(event.target);
      const isMenuTrigger = event.target.closest(".menu-trigger");
      const isBrowseTrigger = event.target.closest(".browse-trigger");

      // Ignore clicks on triggers
      if (isMenuTrigger || isBrowseTrigger) return;

      // If clicking outside header nav, close everything
      if (isOutsideHeader) {
        const headerNav = document.querySelector("#headerNav");
        const mobileNav = document.querySelector("#mobileNav");

        headerNav.classList.add("hidden");
        setIsMenuOpen(false);

        if (mobileNav) {
          mobileNav.classList.add("hidden");
          setIsBrowseOpen(false);
        }
      }
    }

    // Only add listener if any menu is open
    if (isMenuOpen || isBrowseOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isBrowseOpen]);

  // function showUser () {
  //   const user = document.querySelector('#userCard');
  //   user.classList.toggle('hidden');
  // }

  function hideUser() {
    const user = document.querySelector("#userCard");
    user.classList.add("hidden");
  }

  const handleSignOut = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${APP_BASE_URL}account/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.userInfo.token}`,
          },
        }
      );
      if (response.status === 200) {
        // Handle successful logout here
        //console.log('Signed Out');
        window.location.reload(); // Refresh the app
      } else {
        // Handle logout failure here
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const location = useLocation();

  const pos = scrollPosition >= 400;

  const isRoot = location.pathname === "/" || location.pathname === "/";

  useEffect(() => {
    function handleScroll() {
      // Close menus on scroll
      const headerNav = document.querySelector("#headerNav");
      const mobileNav = document.querySelector("#mobileNav");
      const userCard = document.querySelector("#userCard");

      if (headerNav && !headerNav.classList.contains("hidden")) {
        headerNav.classList.add("hidden");
        setIsMenuOpen(false);
      }

      if (mobileNav && !mobileNav.classList.contains("hidden")) {
        mobileNav.classList.add("hidden");
        setIsBrowseOpen(false);
      }

      // Close user dropdown
      if (showUser) {
        setShowUser(false);
      }
    }

    // Add scroll and touchmove listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("touchmove", handleScroll);
    };
  }, [showUser]); // Add showUser to dependencies

  return (
    // <header className={scrolled ? ' w-screen py-4 fixed top-0 bg-white z-50 shadow-md ' : ' w-screen py-4 fixed top-0 bg-white z-50'}>
    <header
      className={`w-full   py-4 fixed top-0 z-50 ${
        isRoot && scrollPosition === 0
          ? "bg-transparent custom:bg-transparent transition-colors   "
          : isRoot && scrollPosition < 400
          ? "mdd:bg-orange  [@media(min-width:1024px)]:bg-hero-gradient  ss:bg-orange sm:bg-hero-gradient transition-all "
          : "bg-white   "
      }`}
    >
      <nav className=" max-w-full text-sm font-bold mx-auto justify-between hidden lg:flex px-2 xl:px-4 items-center gap-x-4">
        <div>
          <Link
            to="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.location.reload();
              }
            }}
          >
            <div className="w-20 relative cursor-pointer">
              <img
                className="custom:relative ss:left-[35vw] custom:left-[190%] md:static lg:static"
                src={
                  scrollPosition >= 400 && logo
                    ? logo
                    : "https://i.ibb.co/yYGL7XV/hillpad-white.png"
                }
                alt="Hillpad Logo"
              />
            </div>
          </Link>
        </div>

        <div className="flex w-4/5 lg:w-8/12 xl:w-8/12 gap-x-4 items-center">
          <div
            className=" h-12 flex items-center"
            ref={browseRef}
            onMouseOver={() => setShowDropDown(true)}
            onMouseLeave={() => {
              setShowDropDown(false);
              setShowSubMenu(false);
            }}
          >
            <div
              className="flex gap-3 items-center cursor-pointer"
              onClick={handleBrowseClick}
            >
              <div className="flex gap-3 items-center relative">
                <div className="flex gap-3 items-center hover:text-orange text-nav_black">
                  <FiLayers
                    className={
                      scrollPosition >= 400
                        ? "hover:text-orange text-2xl"
                        : "text-white text-2xl"
                    }
                  />
                  <div
                    className={
                      scrollPosition >= 400 ? "hover:text-orange" : "text-white"
                    }
                  >
                    Browse
                  </div>
                  <div
                    className={
                      scrollPosition >= 400
                        ? "hover:text-orange text-2xl"
                        : "text-white text-2xl"
                    }
                  >
                    <RiArrowDropDownLine />
                  </div>
                </div>
                {showdropDown && (
                  <div
                    className="absolute top-8 left-0 deepShadow bg-white w-52 rounded-lg py-1 px-4 font-normal z-30"
                    id="subMenu1"
                  >
                    <Link to="/discipline/">
                      <div className="flex gap-x-2 border-b border-opacity-10 border-b-light_black pt-2 hover:text-orange">
                        <BiBriefcase className="text-xl text-light_black text-opacity-60" />
                        <div className="mb-2">Browse by discipline</div>
                      </div>
                    </Link>
                    <div
                      className="flex gap-x-2 justify-between py-2 hover:text-orange"
                      onClick={() => setShowSubMenu(!showSubMenu)}
                      onMouseEnter={() => setShowSubMenu(true)}
                    >
                      <div className="flex gap-x-2 relative">
                        <FaGraduationCap className="text-xl text-light_black text-opacity-60" />
                        <div className="">Programs</div>
                      </div>
                      <div className="text-lg">
                        <RiArrowRightSLine />
                      </div>
                      {showdropDown && showSubMenu && (
                        <div
                          className="absolute font-normal left-52 p-4 shadow top-12 rounded-md bg-white text-light_black"
                          id="subMenu2"
                          onMouseEnter={handleProgramsHover}
                          onMouseLeave={handleProgramsLeave}
                        >
                          {/* <Link to='/coursefinder?tuition=0%2C-1'><div className='p-1 w-32 hover:text-orange'>Free Courses</div></Link> */}
                          <Link to="/coursefinder?programme=undergraduate">
                            <div className="p-1 w-32 hover:text-orange">
                              Undergraduate
                            </div>
                          </Link>
                          <Link to="/coursefinder?programme=postgraduate">
                            <div className="p-1 w-32 hover:text-orange">
                              Graduate
                            </div>
                          </Link>
                          <Link
                            to="/coursefinder?programme=Executive+Education"
                            reloadDocument
                          >
                            <div className="p-1 w-40 hover:text-orange">
                              Executive Education
                            </div>
                          </Link>
                          <Link to="/coursefinder?programme=Short+Courses">
                            <div className="p-1 w-32 hover:text-orange">
                              Short Courses
                            </div>
                          </Link>
                          <Link
                            to="/coursefinder?programme=Certificate+Courses"
                            reloadDocument
                          >
                            <div className="p-1 w-32 hover:text-orange">
                              Certificate Courses
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {pos && (
            <div className="w-72 mx-auto md:w-full md:rounded-full bg-white 2xl:w-9/12">
              <form className="relative rounded-md md:flex justify-between md:px-2 md:py-1 md:rounded-full md:mx-8 md:items-center lg:mx-0 bg-white 2xl:w-full border border-light_black border-opacity-60">
                <fieldset className="border-b border-light_black border-opacity-20 mx-2 px-2 py-2 md:border-0">
                  <div className="flex items-center gap-x-2">
                    {/* <AiOutlineSearch className='text-light_black' /> */}
                    <input
                      type="text"
                      className="focus:outline-none md:w-72 font-normal"
                      placeholder="What do you want to study?"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                </fieldset>

                <Link
                  to={`/coursefinder?name=${searchValue}&country=${selectedCountry}`}
                >
                  <button className="w-full text-white bg-orange py-3 px-3 text-lg font-bold rounded-3xl md:w-fit md:rounded-full">
                    <AiOutlineSearch className="text-white" />
                  </button>
                </Link>
              </form>
            </div>
          )}
        </div>

        {/* {props.isLoggedIn && (
          <div>
            <div
              className="relative text-light flex align-top"
              onClick={() => {
                setShowWishList(!showWishList);
                setShowUser(false);
              }}
            >
              {pos ? (
                <FiHeart className="text-2xl text-light cursor-pointer" />
              ) : (
                <FiHeart className="text-2xl text-white cursor-pointer" />
              )}
              <sub className='text-xl absolute left-7  rounded-full text-light_black'>3</sub>
            </div>
          </div>
        )} */}
        <div className="flex gap-x-3 w-30 justify-between">
          {/* {props.isLoggedIn ? (
            <>
              <button
                className="text-orange flex items-center gap-x-2 relative"
                onClick={() => setShowUser(!showUser)}
              >
                <div className=' relative right-3'>
              { pos ? <div className='w-8'>
                  <img src={signlogo} className='w-8 text-white' />
                  
                </div>: <div className='w-8'>
                  <img src={userWhite} className='w-8 text-white' />
                  
                </div>}
                </div>
                {pos ? (
                  props.userInfo.profile_pic ? (
                    <img
                      src={`https://api.hillpad.com${props.userInfo.profile_pic}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border border-orange"
                    />
                    <div className="border relative border-orange text-orange rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {props.userInfo.firstName.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <div className="border relative sm:left-[20px] border-orange text-orange rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {props.userInfo.firstName.charAt(0).toUpperCase()}
                    </div>
                  )
                ) : props.userInfo.profile_pic ? (
                  <img
                    src={`https://api.hillpad.com${props.userInfo.profile_pic}`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-white"
                  />
                  <div className="border relative border-orange text-orange rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {props.userInfo.firstName.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <div className="border border-white relative sm:left-[20px] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {props.userInfo.firstName.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>
              {showUser && (
                <div
                  className="w-60 text-sm absolute top-20 right-1/5 deepShadow rounded-md py-2 px-6 bg-white font-normal text-light_black"
                  id="userCard"
                  onMouseLeave={() => setShowUser(false)}
                >
                  <div className="flex gap-x-4 items-center py-2">
                    <div>
                      <img src={signlogo} className="w-8" />
                    </div>
                    <div>
                      <div className="font-bold">
                        <span>{props.userInfo.lastName}</span>
                        <span>{props.userInfo.firstName}</span>
                      </div>
                      <div className="font-normal">{props.userInfo.email}</div>
                    </div>
                  </div>
                  <div className="flex gap-x-4 py-3 border-y-light_black border-opacity-20 border-y">
                    <div className="text-xl text-light_black">
                      <FiHeart />{" "}
                    </div>
                    <div
                      className="hover:text-orange cursor-pointer "
                      onClick={() => {
                        setShowWishList(!showWishList);
                        setShowUser(false);
                      }}
                    >
                      Wishlist
                    </div>
                  </div>
                  <div className="flex gap-x-4 py-3 border-b-light_black border-opacity-20 border-b">
                    <div className="text-xl  text-light_black ">
                      <FiSettings />{" "}
                    </div>
                    <div className="hover:text-orange">
                      <Link to="/settings">Account Settings</Link>
                    </div>
                  </div>
                  <button
                    className="flex gap-x-4 py-3 hover:text-orange"
                    onClick={handleSignOut}
                  >
                    <div className="text-xl text-light_black">
                      <FiLogOut />{" "}
                    </div>
                    <div className="hover:text-orange">Sign Out</div>
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                className="text-orange flex items-center gap-x-2"
                onClick={toggleModal}
              >
                <div>
                  <LuUser
                    className={
                      scrollPosition >= 400
                        ? "hover:text-orange "
                        : "text-white "
                    }
                  />
                </div>
                <div
                  className={
                    scrollPosition >= 400 ? "hover:text-orange " : "text-white "
                  }
                >
                  Sign in
                </div>
              </button>
            </>
          )} */}
          <Link to="/explore">
            <button
              className={
                scrollPosition >= 400
                  ? "bg-orange text-white px-4 py-2 rounded-full flex items-center gap-2"
                  : "bg-white text-orange px-4 py-2 rounded-full flex items-center gap-2"
              }
            >
              <div className="text-md">
                <FaPaperPlane />
              </div>
              <div>Explore</div>
            </button>
          </Link>
        </div>
      </nav>
      <nav className="mx-auto px-3 lg:hidden">
        <div className="flex justify-between">
          <Link
            to="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.location.reload();
              }
            }}
          >
            <div className="w-20 relative cursor-pointer">
              <img
                className="custom:relative ss:left-[35vw] custom:left-[190%] md:static lg:static"
                src={
                  scrollPosition >= 400 && logo
                    ? logo
                    : "https://i.ibb.co/yYGL7XV/hillpad-white.png"
                }
                alt="Hillpad Logo"
              />
            </div>
          </Link>
          <div className="flex gap-x-6 items-center">
            {props.isLoggedIn ? (
              // Show user info when logged in
              <div className="relative">
                <div
                  className={`flex items-center gap-2 ${
                    scrollPosition >= 400 ? "text-orange" : "text-white"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUser(!showUser);
                  }}
                >
                  {/* <img
                    src={scrollPosition >= 400 ? signlogo : userWhite}
                    className=" w-6 h-6"
                  /> */}
                  {/* <span className="block sm:hidden ss:relative ss:left-[30%]">
                    {props.userInfo.firstName}
                  </span> */}
                </div>

                {/* User dropdown for mobile */}
                {/* {showUser && (
                  <div className="absolute right-0 bg-white py-4 px-6 rounded-lg shadow-lg z-50 w-52">
                    <div className="flex flex-col gap-y-4">
                      <div className="text-sm text-light_black text-opacity-60">
                        Signed in as{" "}
                        <span className="font-bold text-black">
                          {props.userInfo.email}
                        </span>
                      </div>
                      <Link
                        to="/settings"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowUser(false); // Close dropdown after click
                        }}
                        className="hover:text-orange w-full block py-2"
                      >
                        Account Settings
                      </Link>
                      <button
                        className="flex gap-x-4 py-3 hover:text-orange w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSignOut();
                        }}
                      >
                        <div className="text-xl text-light_black">
                          <FiLogOut />
                        </div>
                        <div>Sign Out</div>
                      </button>
                    </div>
                  </div>
                )} */}
              </div>
            ) : (
              // Show sign in when logged out
              <>
                <div
                  className="text-2xl hidden text-light_black font-bold"
                  onClick={toggleModal}
                >
                  <FiUser />
                </div>
                <div
                  className={`block sm:hidden ss:relative ss:left-[0%] ${
                    scrollPosition >= 400 ? "text-orange" : "text-white"
                  }`}
                  onClick={toggleModal}
                >
                  Sign in
                </div>
              </>
            )}

            <div
              className={`text-2xl absolute custom:right-[350%] ss:left-[10%] xss:right-[310%] ${
                scrollPosition >= 400
                  ? "text-orange md:text-light_black"
                  : "text-white md:text-white"
              } font-bold menu-trigger`}
              onClick={(e) => {
                e.stopPropagation();
                toggleHeader();
              }}
            >
              <FiMenu />
            </div>
          </div>
        </div>
        <div
          className="hidden fixed left-0 right-0 bg-white py-2 justify-normal px-3"
          id="headerNav"
          ref={headerNavRef}
          style={{
            top: "52px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="font-bold text-black text-opacity-80 flex flex-col gap-y-6 mt-12 max-w-[90%] mx-auto">
            <div className="border border-light_black border-opacity-20 px-2 py-4 rounded-md justify-between items-center mb-2">
              <div
                className="flex gap-3 items-center justify-between browse-trigger"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleNav(e);
                }}
              >
                <div className="flex gap-3 items-center">
                  <FiLayers />
                  <div>Browse</div>
                </div>
                <div className="text-2xl">
                  <RiArrowDropDownLine />
                </div>
              </div>
              <div className="ms-2" id="mobileNav" ref={mobileNavRef}>
                <div className="border-e border-opacity-30 border-light_black" />
                <div className="font-normal px-4 w-full text-sm">
                  <Link to="/discipline">
                    <div className="flex gap-x-2 border-b border-opacity-10 border-b-light_black py-2">
                      <BiBriefcase className="text-xl text-light_black text-opacity-60" />
                      <div className="mb-2">Browse by discipline</div>
                    </div>
                  </Link>
                  <div className="flex gap-x-2">
                    <FaGraduationCap className="text-xl text-light_black text-opacity-60" />{" "}
                    <div className="">Programmes</div>
                  </div>
                  <div className="flex">
                    <div className="border-e border-opacity-30 border-light_black" />
                    <div className="px-2">
                      {/* <Link to='/coursefinder?tuition=0%2C-1'><div className='p-1 w-32 hover:text-orange'>Free Courses</div></Link> */}
                      <Link to="/coursefinder?programme=undergraduate">
                        <div className="p-1 w-32 hover:text-orange">
                          Undergraduate
                        </div>
                      </Link>
                      <Link to="/coursefinder?programme=postgraduate">
                        <div className="p-1 w-32 hover:text-orange">
                          Graduate
                        </div>
                      </Link>
                      <Link
                        to="/coursefinder?programme=Executive+Education"
                        reloadDocument
                      >
                        <div className="p-1 w-40 hover:text-orange">
                          Executive Education
                        </div>
                      </Link>
                      <Link to="/coursefinder?programme=Short+Courses">
                        <div className="p-1 w-32 hover:text-orange">
                          Short Courses
                        </div>
                      </Link>
                      <Link
                        to="/coursefinder?programme=Certificate+Courses"
                        reloadDocument
                      >
                        <div className="p-1 w-32 hover:text-orange">
                          Certificate Courses
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link to="/explore">
            <button
              className="bg-orange text-white flex gap-1 items-center py-2 px-4 rounded-full w-[80%] justify-center mx-auto"
              onClick={(e) => {
                e.stopPropagation();
                const headerNav = document.querySelector("#headerNav");
                const mobileNav = document.querySelector("#mobileNav");

                if (headerNav) {
                  headerNav.classList.add("hidden");
                  setIsMenuOpen(false);
                }

                if (mobileNav) {
                  mobileNav.classList.add("hidden");
                  setIsBrowseOpen(false);
                }
              }}
            >
              <span>Explore</span>
              <span>
                <FaPaperPlane />
              </span>
            </button>
          </Link>
        </div>
      </nav>

      {modal && (
        <div className="modal ">
          {" "}
          <div onClick={toggleModal} className="overlay " />{" "}
          <div className="modal-content mx-1 w-84 2xs:w-88 sm:w-screen lg:w-fit bg-white">
            <Login
              handleModal={() => {
                setModal(!modal);
              }}
            />
            <button className="close-modal text-2xl" onClick={toggleModal}>
              {" "}
              <IoCloseOutline />{" "}
            </button>
          </div>
        </div>
      )}
      {showWishList && <WishList />}
    </header>
  );
}
