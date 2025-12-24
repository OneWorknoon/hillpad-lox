import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginModal } from '../../redux/loginSlice';

export default function ProjectStructure({ prop }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const containerRef = useRef(null);
  const [processedContent, setProcessedContent] = useState({
    programme_structure: prop.programme_structure,
    syllabus: prop.syllabus
  });

  useEffect(() => {
    if (!user.isLoggedIn) {
      // Process content to convert links to spans
      const processLinks = (html) => {
        if (!html) return html;
        return html.replace(
          /(<a\s+[^>]*href\s*=\s*["'])([^"']+)(["'][^>]*>)(.*?)(<\/a>)/gi, 
          (match, prefix, href, midfix, linkText, suffix) => {
            // Convert to span that opens link in new tab
            return `<span class="text-light cursor-pointer" onclick="window.open('${href}', '_blank')">${linkText}</span>`;
          }
        );
      };

      setProcessedContent({
        programme_structure: processLinks(prop.programme_structure),
        syllabus: processLinks(prop.syllabus)
      });
    } else {
      // Reset to original content when logged in
      setProcessedContent({
        programme_structure: prop.programme_structure,
        syllabus: prop.syllabus
      });
    }
  }, [user.isLoggedIn, prop]);

  // Commented out login modal handler
  /*const handleDisabledLinkClick = useCallback((e) => {
    const disabledLink = e.target.closest('.disabled-link');
    if (disabledLink) {
      dispatch(showLoginModal());
    }
  }, [dispatch]);*/

  /*useEffect(() => {
    const container = containerRef.current;
    if (container && !user.isLoggedIn) {
      container.addEventListener('click', handleDisabledLinkClick);
      
      return () => {
        container.removeEventListener('click', handleDisabledLinkClick);
      };
    }
  }, [handleDisabledLinkClick, user.isLoggedIn]);*/

  return (
    <div ref={containerRef}>
      <div>
        <h2 className='font-semibold text-black text-2xl my-6'>Project Structure</h2>
      </div>
      <div 
        dangerouslySetInnerHTML={{ __html: processedContent.programme_structure }} 
        id='programmes' 
        className='text-light_black' 
      />
      
      {prop.syllabus && (
        <div>
          <h2 className='font-semibold text-black text-2xl my-6'>Syllabus and Curriculum</h2>
        </div>
      )}
      <div 
        dangerouslySetInnerHTML={{ __html: processedContent.syllabus }} 
        id='programmes' 
        className='text-light_black' 
      />
    </div>
  );
}