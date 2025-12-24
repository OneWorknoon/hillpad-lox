import React, { useState, useEffect } from "react";
import { FiCalendar, FiClock, FiHeart, FiMapPin } from "react-icons/fi";
import { FaCoins, FaFlagCheckered } from "react-icons/fa";
import { BiTrashAlt } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { AiFillHeart } from "react-icons/ai";
import { addCourseToWishList, removeCourseFromWishList } from '../../redux/wishList'; 

import { useDispatch } from 'react-redux'; 


export default function WishListCard(courses) {
    const [isRemoved, setIsRemoved] = useState(false);
    const dispatch = useDispatch();
    const month = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May ',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct ',
        11: 'Nov',
        12: 'Dec'
      };
      
      console.log(courses.course)
      const [course, setCourse] = useState(courses.course.course)

    const handleLike = () => {
      dispatch(removeCourseFromWishList(course))
      setIsRemoved(!isRemoved)
      const event = new CustomEvent('wishlistUpdate', { detail: course.id });
      window.dispatchEvent(event);
    //  window.location.reload()
      console.log('isRemoved', isRemoved)
    };
  return (<>

   { course && !isRemoved && <div className=' card-hover border border-light_black border-opacity-20 p-3 flex gap-x-4 items-center shadow-2 w-full'>

    <div className='text-light_black w-full'>
      <div className='flex justify-between items-center'>
      <div className=' font-bold text-base  text-light_black '>{course.name.length > 60 ? `${course.name.substring(0, 64) + '...'} ` : course.name}</div>
      <div className='' onClick={handleLike}>
{
isRemoved ?  <FiHeart />: <AiFillHeart /> 
}

</div>
      </div>
      <a href={`/course/${course.slug}`}>
      <div>
        <div className='flex gap-x-8 items-center text-light'>
          <a href={`/school/${course.school.slug}`} className='hidden lg:block'>
            <div className=' text-sm text-normal'><h3>{course.school.name}</h3></div>
          </a>
            
         
        </div>
        <div className='flex justify-center align-middle'>
          <div className='w-20 px-2 pt-4 '>
            <img src={course.school.logo} className=' w-full' />
          </div>
          <p className='text-xs py-1'>
            <span className=''>{course.about.length > 120 ? `${course.about.substring(0, 120) + '...'} ` : course.about}</span>
          </p>
        </div>
        <div className='flex font-semibold text-xs xl:text-sm text-opacity-40 gap-x-4 mt-2'>
          <div className='flex items-center gap-x-2'><span className='hidden'><FiCalendar /></span><span>{course.duration} {course.duration_base.toLowerCase()}</span></div>
          <div className='flex items-center gap-x-2'><span className='hidden '><FiClock /></span><span>{course.course_format.charAt(0) + course.course_format.slice(1).toLowerCase()}-time</span></div>
          <div className='flex items-center gap-x-2'><span className='hidden '><FaFlagCheckered /></span><span>{month[course.course_dates.start_month]} {course.course_dates.start_year}</span></div>
          <div className='hidden lg:flex items-center gap-x-2'><span className='hidden'><FaCoins /></span><span>{course.tuition_fee < 0 ? 'N/A ' : course.tuition_fee == 0 ? 'Free' : course.tuition_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} { course.tuition_currency ? course.tuition_currency.short_code.toUpperCase() : ' '}</span><span>/ {course.tuition_fee_base.toLowerCase()}</span></div>
        </div>
      </div>
      </a>
    </div>
  </div>}

  </>
  )
}
