import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginModal } from '../../redux/loginSlice';

export default function AdmissionReq({ prop }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const [processedContent, setProcessedContent] = useState({
    who_for: prop.who_for,
    admission_requirements: prop.admission_requirements,
    other_requirements: prop.other_requirements
  });

  const month = {
    1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May ",
    6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep",
    10: "Oct", 11: "Nov", 12: "Dec"
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize); // Check on window resize

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!user.isLoggedIn) {
      // Process content to convert links to spans
      const processLinks = (html) => {
        return html.replace(
          /(<a\s+[^>]*href\s*=\s*["'])([^"']+)(["'][^>]*>)(.*?)(<\/a>)/gi,
          (match, prefix, href, midfix, linkText, suffix) => {
            // Convert to span with original link information
            return `<span class="disabled-link text-[#0071b3] cursor-pointer" data-original-href="${href}">${linkText}</span>`;
          }
        );
      };

      setProcessedContent({
        who_for: processLinks(prop.who_for),
        admission_requirements: processLinks(prop.admission_requirements),
        other_requirements: prop.other_requirements
          ? processLinks(prop.other_requirements)
          : undefined
      });
    } else {
      // Reset to original content when logged in
      setProcessedContent({
        who_for: prop.who_for,
        admission_requirements: prop.admission_requirements,
        other_requirements: prop.other_requirements
      });
    }
  }, [user.isLoggedIn, prop]);

  const handleDisabledLinkClick = useCallback((e) => {
    const disabledLink = e.target.closest('.disabled-link');
    if (disabledLink) {
      dispatch(showLoginModal());
    }
  }, [dispatch]);

  useEffect(() => {
    const container = containerRef.current;
    if (container && !user.isLoggedIn) {
      container.addEventListener('click', handleDisabledLinkClick);

      return () => {
        container.removeEventListener('click', handleDisabledLinkClick);
      };
    }
  }, [handleDisabledLinkClick, user.isLoggedIn]);

  return (
    <div ref={containerRef}>
      {processedContent.who_for &&
        <div>
          <h2 className="font-semibold text-2xl my-4">Who is this degree for: </h2>
          <div dangerouslySetInnerHTML={{ __html: processedContent.who_for }} />
        </div>
      }

      <div className='mt-8'>
        <div className='font-semibold text-light'>
          Intakes and Deadlines
        </div>
        <div className='flex flex-wrap gap-1'>
          <div className='my-5 w-1/2 border border-light_black border-opacity-50 rounded-md px-4 py-8'>
            <span className='font-semibold'>Application Deadline: </span>
            <div className='flex mt-1 text-sm'>
              <div>Submit your application before {month[prop.course_dates.deadline_month] !== 0 ? month[prop.course_dates.deadline_month] : ''} </div>
              <br />
              <span className='mx-1'> {prop.course_dates.deadline_year !== 0 ? prop.course_dates.deadline_year : ''}</span>
            </div>
          </div>

          <div className='my-5 w-1/2 border border-light_black border-opacity-50 rounded-md px-2 py-8'>
            <span className='font-semibold'>Session Starts </span>
            <div className='flex mt-1 text-sm'>
              <div className='mr-1'>Session starts {month[prop.course_dates.start_month]} </div>
              <span className='mr-1'> {prop.course_dates.start_year !== 0 ? prop.course_dates.start_year : ''}</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-2xl my-4">Requirements For Admission</h2>
      <div className="text-lg text-light_black" id="requirements">
        <div dangerouslySetInnerHTML={{ __html: processedContent.admission_requirements }} />
      </div>

      {processedContent.other_requirements &&
        <div>
          <h2 className="font-semibold text-2xl my-4">Other Requirements </h2>
          <div
            dangerouslySetInnerHTML={{ __html: processedContent.other_requirements }}
            id="others"
          />
        </div>
      }
    </div>
  );
}