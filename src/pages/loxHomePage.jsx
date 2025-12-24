import React from "react";
import { useSelector, useDispatch } from "react-redux";

import LoxHero from "../components/lox/LoxHeroSection";
import LoxCoursesSection from "../components/lox/LoxCoursesSection";
import FeaturedPrograms from "../components/courses/FeaturedPrograms";
import NewsletterSubscription from "../components/templates_blocks/newsLetterSub.jsx";
import ReviewCarousel from "../components/templates_blocks/ReviewCarousel.jsx";
import AuthModal from "../components/templates_blocks/authModal.jsx";

import { hideLoginModal, showLoginModal } from "../redux/loginSlice.js";

export default function LoxHomePage() {
  const dispatch = useDispatch();
  const showLogin = useSelector((state) => state.login.showLogin);
  const user = useSelector((state) => state.user.userInfo);

  const handleAddToWishlist = (courseId) => {
    if (!user?.email) dispatch(showLoginModal());
    else console.log("Add to wishlist", courseId);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <LoxHero />

      {/* CONTENT (this is the next section the icon overlays onto) */}
      <div className="w-full">
        <div className="max-w-full mx-auto">
          {/* This pulls content up so the icon sits “between” hero and this section */}
          <div className="relative -mt-16 sm:-mt-20 z-10">
            {/* Add top padding so the floating logo doesn't cover the first heading */}
            <div className="pt-20 sm:pt-24">
              <LoxCoursesSection />

              <LoxCoursesSection
                title="AI & Automation Live Classes"
                subtitle=""
                viewAllHref="/coursefinder?programme=undergraduate"
              />
              <LoxCoursesSection
                title="Business & Strategy Live Classes"
                subtitle=""
                viewAllHref="/coursefinder?programme=undergraduate"
              />
              <LoxCoursesSection
                title="Cloud & DevOps Live Classes"
                subtitle=""
                viewAllHref="/coursefinder?programme=undergraduate"
              />
              <LoxCoursesSection
                title="Business & Strategy Live Classes"
                subtitle=""
                viewAllHref="/coursefinder?programme=undergraduate"
              />
              {/* 
              <FeaturedPrograms
                title={"Related Courses"}
                programType={"undergraduate"}
                hideCat={true}
                url={"/coursefinder?programme=undergraduate"}
                onAddToWishlist={handleAddToWishlist}
                programmeUrl={"undergraduate"}
              /> */}

              <NewsletterSubscription />
              <ReviewCarousel />
            </div>
          </div>

          <AuthModal
            isOpen={showLogin}
            onClose={() => dispatch(hideLoginModal())}
          />
        </div>
      </div>
    </div>
  );
}
