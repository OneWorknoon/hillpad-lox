import { HiOutlineCash } from "react-icons/hi";
import { BiTimeFive } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";
import london from "../../assets/images/san-diego.jpeg";
import logo from "../../assets/images/hillpad_icon_3.png";
import tag from "../../assets/images/tag.svg";
import { RiAwardLine, RiGlobalLine } from "react-icons/ri";
import calendar from "../../assets/images/calendar.svg";
import award from "../../assets/images/award.svg";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Login from "../templates_blocks/login";
import { showLoginModal, hideLoginModal } from "../../redux/loginSlice";
import { fetchWishList } from "../../redux/wishList";

export default function CourseCard({
  prop,
  onAddToWishlist,
  onRemoveFromWishlist,
}) {
  const [wish, setWish] = useState(false);
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const showLogin = useSelector((state) => state.login.showLogin);
  const courses = useSelector((state) => state.wishList.courses);

  const user = useSelector((state) => state.user.userInfo);

  // useEffect(() => {
  //   const fetchWishlist = async () => {
  //     if (user.email) {
  //       try {
  //         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}wishlists/list?email=${user.email}`);
  //         const wishlist = response.data;
  //         console.log({ wishlist })
  //         const isInWishlist = wishlist.some(item => item.course.id === prop.id);
  //         setWish(isInWishlist);
  //       } catch (error) {
  //         console.error('Error fetching wishlist:', error);
  //       }
  //     }
  //   };

  //   fetchWishlist();
  // }, [user.email, prop.id]);
  useEffect(() => {
    const handleWishlistUpdate = (event) => {
      if (event.detail === prop.id) {
        setWish(false);
      }
    };

    window.addEventListener("wishlistUpdate", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlistUpdate", handleWishlistUpdate);
    };
  }, [prop.id]);

  // console.log({ courses })
  useEffect(() => {
    dispatch(fetchWishList());
    const isInWishlist = courses.some((item) => item.course.id === prop.id);
    setWish(isInWishlist);
  }, [dispatch]);

  const toggleWishlist = async () => {
    if (!user.email) {
      //onAddToWishlist(prop.id);
      dispatch(showLoginModal());
      return;
    }
    setIsLoading(true);
    setFeedbackMessage("");

    try {
      if (wish) {
        // Remove from wishlist
        await axios.delete(`${import.meta.env.VITE_BASE_URL}wishlists/delete`, {
          data: { email: user.email, course: prop.id },
        });
        setWish(false);
        setFeedbackMessage("Removed from wishlist!");
        const event = new CustomEvent("wishlistUpdate", { detail: prop.id });
        window.dispatchEvent(event);
        // onRemoveFromWishlist(prop.id);
      } else {
        // Add to wishlist
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}wishlists/create`,
          {
            course: prop.id,
            user: user.email,
          }
        );
        if (response.status === 201) {
          setWish(true);
          setFeedbackMessage("Added to wishlist!");
          onAddToWishlist(prop.id);
        }
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      setWish(false);
      setFeedbackMessage("Error updating wishlist");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setFeedbackMessage("");
      }, 2000); // Clear feedback message after 2 seconds
    }
  };
  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <div className="relative card card-hover my-3 w-76 2xs:w-80 sm:w-72 md:w-64 lg:w-card xl:w-73 2xl:w-card justify-center mx-2 xs:ms-4 2xs:ms-7 sm:mx-0">
      <div className="rounded-b-2xl  h-card 2xs:h-card2 sm:h-card  ">
        <div className="rounded-xl h-imgHeight ">
          <a href={`/course/${prop.slug}`} state={prop}>
            <img
              className="rounded-t-xl h-full w-full"
              src={
                prop.school.thumbnail
                  ? prop.school.thumbnail
                  : prop.school.banner
              }
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
              alt="bachelors_degree"
            />
          </a>

          <div className="flex p-1 text-light justify-between w-full absolute top-4 px-4 align-middle items-center">
            {/* <div className="flex items-center gap-x-1 bg-white p-1 rounded-lg">
              {prop.degree_type &&
                <img src={award} />
              }
              <span className="text-xs text-light_black">
                {prop.degree_type?.short_name}
              </span>
            </div> */}

            {/* <div className="bg-white p-2 rounded-full text-light_black" onClick={addWishList}>

             { wish ? <IoHeart /> : <IoHeartOutline />}
            </div> */}

            {/* Nath Add to Watchlist */}
            {/* <div
              className={`
                bg-white relative left-[90%] p-2 rounded-full text-light_black cursor-pointer
                transition-all duration-300 ease-in-out 
                ${isLoading ? "animate-pulse" : ""}
              `}
              onClick={toggleWishlist}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin  text-orange" />
              ) : wish ? (
                <IoHeart className="text-orange" />
              ) : (
                <IoHeartOutline />
              )}
            </div> */}

            {feedbackMessage && (
              <div className="absolute top-0 right-0 mt-12 mr-2 bg-white text-orange text-xs py-1 px-2 rounded-full opacity-90">
                {feedbackMessage}
              </div>
            )}
          </div>
        </div>
        <a href={`/course/${prop.slug}`} state={prop}>
          <div className="flex flex-col h-textCard relative justify-between">
            <div className="mt-12 pt-2">
              <div className="w-14 z-0 mx-4   bg-white shadow-lg p-1 absolute -top-8">
                <img
                  src={prop.school.logo}
                  // src={logo}
                  alt="logo"
                  className=""
                />
              </div>
              <div>
                <div className=" mx-4">
                  <div>
                    <div
                      className="text-light_black opacity-70 one-line-truncate max-h-7 overflow-hidden "
                      style={{ fontSize: "15px" }}
                    >
                      {prop.school.name}
                    </div>

                    {/* <div className='text-light_black text-sm opacity-70'>
                {`${prop.school.city}, ${prop.school.country.name}`}
              </div> */}
                  </div>
                </div>
                <div className="text-left mx-4">
                  {/* <div className='font-normal text-sm text-light_black'>{prop.degree_type.short_name}</div> */}
                  <div className="font-bold text-light_black two-line-truncate max-h-14 overflow-hidden ">
                    {prop.name}
                  </div>
                  {/*                   <div className="flex gap-x-2 items-center opacity-90 text-light_black ">
                    <div className='text-2xl'>
                <HiOutlineCash />
              </div>
              {prop.tuition_fee && (
  <div className="text-light text-lg font-bold">
    {prop.tuition_fee === 0 ? (
      <span><i class="fas fa-free-code-camp    "></i></span>
    ) : prop.tuition_fee === -1 ? (
      <span>N/A</span>
    ) : (
      <>
        <span>{prop.tuition_fee.toLocaleString()} </span>
        {prop.tuition_currency
          ? prop.tuition_currency.short_code.toUpperCase()
          : "USD"}{" "}
          
        {` ${prop.tuition_fee_base && prop.tuition_fee > 0 ? '/' : ''} ${toTitleCase(prop.tuition_fee_base)}`}
      </>
    )}
  </div>
)}
                  </div> */}
                </div>
              </div>
            </div>

            <div className="flex gap-x-3 justify-between px-4 text-light_black text-xs xs:text-sm md:text-xs border-t border-light_black border-opacity-10 py-2 ">
              <div className="flex items-center gap-x-1">
                <div className="font-bold text-xl  md:text-xs xl:text-xl">
                  <img src={calendar} />
                </div>
                <div>
                  {prop.duration} {prop.duration_base}
                </div>
              </div>
              <div className="flex items-center gap-x-1">
                <div className="font-bold text-xl md:text-xs xl:text-xl ">
                  <BiTimeFive />
                </div>
                <div>{prop.course_format.toLowerCase()} time</div>{" "}
              </div>
              <div className="flex items-center gap-x-1">
                <div className="font-bold text-xl  md:text-xs xl:text-xl">
                  <RiGlobalLine />
                </div>
                <div>{prop.attendance === "SITE" ? "On-Site" : "Online"}</div>{" "}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
