import { FiCalendar, FiClock, FiHeart } from 'react-icons/fi';
import { AiFillHeart, AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaFlagCheckered, FaCoins } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import axios from 'axios';
import { fetchWishList } from '../../redux/wishList'; 
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { showLoginModal } from '../../redux/loginSlice';

export default function FlatCourseCard ({ prop, onAddToWishlist }) {
  const [wish, setWish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);
  const courses = useSelector((state) => state.wishList.courses);

  useEffect(() => {
    dispatch(fetchWishList());
    const isInWishlist = courses.some(item => item.course.id === prop.id);
    setWish(isInWishlist);
  }, [dispatch, courses.length]);

  useEffect(() => {
    const handleWishlistUpdate = (event) => {
      if (event.detail === prop.id) {
        setWish(false); 
      }
    };

    window.addEventListener('wishlistUpdate', handleWishlistUpdate);

    return () => {
      window.removeEventListener('wishlistUpdate', handleWishlistUpdate);
    };
  }, [prop.id]);
  
  const toggleWishlist = async () => {
    if (!user.email) {
      dispatch(showLoginModal());
      return;
    }

    setIsLoading(true);
    setFeedbackMessage('');

    try {
      if (wish) {
        // Remove from wishlist
        await axios.delete(`${import.meta.env.VITE_BASE_URL}wishlists/delete`, {
          data: { email: user.email, course: prop.id }
        });
        setWish(false);
        setFeedbackMessage('Removed from wishlist!');
        const event = new CustomEvent('wishlistUpdate', { detail: prop.id });
        window.dispatchEvent(event);
      } else {
        // Add to wishlist
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}wishlists/create`, {
          course: prop.id,
          user: user.email
        });
        if (response.status === 201) {
          setWish(true);
          setFeedbackMessage('Added to wishlist!');
       //   onAddToWishlist(prop.id);
        }
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      setWish(false);
      setFeedbackMessage('Error updating wishlist');
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setFeedbackMessage('');
      }, 2000); // Clear feedback message after 2 seconds
    }
  };

  const month = {
    1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May ', 6: 'Jun',
    7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct ', 11: 'Nov', 12: 'Dec'
  };

  return (
    <div className="relative">
      <div className=' card-hover border border-light_black border-opacity-20 p-3 flex gap-x-4 items-center shadow-2 w-full'>
        <Link to={`/course/${prop.slug}`} state={prop}>
          <div className='hidden lg:w-28 md:block '>
            <img src={prop.school.logo} className=' lg:h-28 w-28' />
          </div>
        </Link>

        <div className='text-light_black w-full md:w-4/5'>
          <div className='flex justify-between items-center relative'>
            <Link to={`/course/${prop.slug}`} state={prop}>
              <div className='font-bold text-base sm:text-lg md:text-2xl text-light_black'>
                {prop.name.length > 60 ? `${prop.name.substring(0, 64) + '...'} ` : prop.name}
              </div>
            </Link>

            <div 
              className={`
                cursor-pointer
                transition-all duration-300 ease-in-out 
                ${isLoading ? 'animate-pulse' : ''}
              `}
              onClick={toggleWishlist}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-orange" />
              ) : wish ? (
                <AiFillHeart className="text-orange" />
              ) : (
                <FiHeart />
              )}
            </div>

            {feedbackMessage && (
              <div className="absolute top-full right-0 mt-1 bg-white text-orange text-xs py-1 px-2 rounded-full opacity-90 z-10">
                {feedbackMessage}
              </div>
            )}
          </div>
          {/* Rest of the component remains the same */}
          <div>
            <div className='flex gap-x-8 items-center text-light'>
              <Link to={`/course/${prop.slug}`} className='hidden lg:block'>
                <div className=' text-sm md:text-lg text-normal'><h3>{prop.school.name}</h3></div>
              </Link>
              <div className='w-20 px-2 pt-4 lg:p-0  md:hidden '>
                <img src={prop.school.logo} className='md:w-20 lg:h-28 w-full' />
              </div>
              <div className=' text-sm md:text-lg text-normal lg:hidden'><h3>{prop.school.name}</h3></div>
            </div>
            <div className='flex lg:block justify-center align-middle'>
              <Link to={`/course/${prop.slug}`} state={prop}>
                <p className='text-xs py-1'>
                  <span className='hidden md:block'>{prop.about.length > 250 ? `${prop.about.substring(0, 250) + '...'} ` : prop.about}</span>
                  <span className='md:hidden'>{prop.about.length > 120 ? `${prop.about.substring(0, 120) + '...'} ` : prop.about}</span>
                </p>
              </Link>
            </div>
            <Link to={`/course/${prop.slug}`} state={prop}>
              <div className='flex font-semibold text-xs xl:text-sm text-opacity-40 gap-x-4 mt-2'>
                <div className='flex items-center gap-x-2'><span className='hidden md:block'><FiCalendar /></span><span>{prop.duration} {prop.duration_base.toLowerCase()}</span></div>
                <div className='flex items-center gap-x-2'><span className='hidden md:block'><FiClock /></span><span>{prop.course_format.charAt(0) + prop.course_format.slice(1).toLowerCase()}-time</span></div>
                {prop.course_dates.start_month > 0 && <div className='flex items-center gap-x-2'><span className='hidden md:block'><FaFlagCheckered /></span><span>{month[prop.course_dates.start_month]} {prop.course_dates.start_year}</span></div>}
{/*                 <div className='hidden lg:flex items-center gap-x-2'><span className='hidden md:block'><FaCoins /></span><span>{prop.tuition_fee < 0 ? 'N/A ' : prop.tuition_fee == 0 ? 'FREE' : prop.tuition_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} { prop.tuition_currency ? prop.tuition_currency.short_code.toUpperCase() : ' '}</span>{prop.tuition_fee > 0 && <span>/ {prop.tuition_fee_base.toLowerCase()}</span>}</div> */}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
