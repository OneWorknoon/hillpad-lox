import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginModal } from '../../redux/loginSlice';

export default function Finance({ prop }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const containerRef = useRef(null);
  const [processedContent, setProcessedContent] = useState({
    tuition_and_aid: prop.tuition_and_aid,
    scholarship: prop.scholarship
  });

  useEffect(() => {
    if (!user.isLoggedIn) {
      // Process content to convert links to spans
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
        tuition_and_aid: processLinks(prop.tuition_and_aid),
        scholarship: processLinks(prop.scholarship)
      });
    } else {
      // Reset to original content when logged in
      setProcessedContent({
        tuition_and_aid: prop.tuition_and_aid,
        scholarship: prop.scholarship
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

  // If no content is available
  if (!prop.tuition_and_aid && !prop.scholarship) {
    return (
      <h2 className='font-semibold text-light_black text-2xl my-6'>No Scholarship and Aids available for now.</h2>
    );
  }

  return (
    <div ref={containerRef}>
      {prop.tuition_and_aid && (
        <div>
          <h2 className='font-semibold text-black text-2xl my-6'>Tuition and Aids</h2>
        </div>
      )}
      <div 
        dangerouslySetInnerHTML={{ __html: processedContent.tuition_and_aid }} 
        id='finance' 
        className='text-light_black' 
      />
      
      {prop.scholarship && (
        <div>
          <h2 className='font-semibold text-black text-2xl my-6'>Scholarships</h2>
        </div>
      )}
      <div 
        dangerouslySetInnerHTML={{ __html: processedContent.scholarship }} 
        id='scholarship' 
        className='text-light_black' 
      />
    </div>
  );
}