import { FiClock, FiCalendar, FiMapPin, FiLock, FiUnlock } from 'react-icons/fi';
import { FaCoins } from 'react-icons/fa';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginModal } from '../../redux/loginSlice';
import Background from './background';

export default function Overview ({ props }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const containerRef = useRef(null);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showChose, setShowChose] = useState(false);
  const [processedContent, setProcessedContent] = useState({
    overview: props.overview,
    why_chose: props.why_chose
  });

  const month = {
    1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 
    5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 
    9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"
  };

  // Process links to disable when not logged in
  useEffect(() => {
    if (!user.isLoggedIn) {
      const processLinks = (html) => {
        if (!html) return html;
        return html.replace(
          /(<a\s+[^>]*href\s*=\s*["'])([^"']+)(["'][^>]*>)(.*?)(<\/a>)/gi, 
          (match, prefix, href, midfix, linkText, suffix) => {
            // Convert to span with original link information
            return `<span class="disabled-link text-[#0071b3] cursor-pointer" data-original-href="${href}">${linkText}</span>`;
          }
        );
      };

      setProcessedContent({
        overview: processLinks(props.overview),
        why_chose: processLinks(props.why_chose)
      });
    } else {
      // Reset to original content when logged in
      setProcessedContent({
        overview: props.overview,
        why_chose: props.why_chose
      });
    }
  }, [user.isLoggedIn, props]);

  // Handle click on disabled links
  const handleDisabledLinkClick = useCallback((e) => {
    const disabledLink = e.target.closest('.disabled-link');
    if (disabledLink) {
      dispatch(showLoginModal());
    }
  }, [dispatch]);

  // Add event listener for disabled links
  useEffect(() => {
    const container = containerRef.current;
    if (container && !user.isLoggedIn) {
      container.addEventListener('click', handleDisabledLinkClick);
      
      return () => {
        container.removeEventListener('click', handleDisabledLinkClick);
      };
    }
  }, [handleDisabledLinkClick, user.isLoggedIn]);

  const toggleOverviewDisplay = () => {
    setShowFullOverview(!showFullOverview);
  };

  const toggleWhyChoseDisplay = () => {
    setShowChose(!showChose);
  };

  const renderOverview = () => {
    const content = processedContent.overview;
    if (showFullOverview) {
      return { __html: content };
    } else {
      // Show first 1000 characters
      return { __html: content.substring(0, 1000) + "..." };
    }
  };

  const renderWhyChose = () => {
    const content = processedContent.why_chose;
    if (showChose) {
      return { __html: content };
    } else {
      // Show first 1000 characters
      return { __html: content.substring(0, 1000) + "..." };
    }
  };

  return (
    <div ref={containerRef}>
      <Background prop={props} />
      <div id="course_overview">
        <div
          className="myStyle"
          dangerouslySetInnerHTML={renderOverview()}
        />
        <button
          onClick={toggleOverviewDisplay}
          className="text-light"
        >
          {showFullOverview ? "Show Less" : "Show More"}
        </button>
      </div>

      <h3 className='my-4 text-2xl font-semibold'>
        Why Choose a {props.name} program from {props.school.name}
      </h3>

      <div id="course_overview">
        <div
          className="myStyle"
          dangerouslySetInnerHTML={renderWhyChose()}
        />
        <button
          onClick={toggleWhyChoseDisplay}
          className="text-light"
        >
          {showChose ? "Show Less" : "Show More"}
        </button>
      </div>

      {/* <div className='mt-8'>
        <div className='font-semibold text-light'>
          Intakes and Deadlines
        </div>
        <div className='flex gap-16'>
          <div className='my-5 w-1/2 border border-light_black border-opacity-50 rounded-md px-4 py-8'> 
            <span className='font-semibold'>Application Deadline: </span>
            <div className='flex mt-1 text-sm'>
              <div>
                Submit your application before {month[props.course_dates.deadline_month] !== 0 ? month[props.course_dates.deadline_month] : '' }
              </div>
              <div className='mx-1'>
                {props.course_dates.deadline_year !== 0 ? props.course_dates.deadline_year : ''}
              </div>
            </div>
          </div>
          
          <div className='my-5 w-1/2 border border-light_black border-opacity-50 rounded-md px-4 py-8'> 
            <span className='font-semibold'>Session Starts </span>
            <div className='flex mt-1 text-sm '>
              <div>
                Session starts on {month[props.course_dates.start_month] !== 0 ? month[props.course_dates.start_month] : '' }
              </div>
              <div className='mx-1'>
                {props.course_dates.start_year !== 0 ? props.course_dates.start_year : ''}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}