import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/templates_blocks/Footer";
import Home from "./pages/home";
import HomePage from "./pages/homePage";
import Courses from "./pages/courses";
import DisciplineDetails from "./pages/disciplineDetails";
import Header from "./components/templates_blocks/header";
import HomePageHeader from "./components/templates_blocks/HomePageHeader";
import Countries from "./pages/countries";
import CountryDetail from "./pages/countryDetails";
import AboutUs from "./pages/aboutUs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { fetchUser2, update } from "./redux/userSlice";
import CourseDetails from "./pages/courseDetails";
import Disciplines from "./pages/discipline";
import DisciplinesList from "./components/templates_blocks/disciplineList";
import SchoolDetails from "./pages/school";
import { fetchCountry } from "./redux/countrySlice";
import { fetchCourses } from "./redux/courseSlice";
import { fetchDisciplines } from "./redux/disciplineSlice";
import { fetchUndergraduate } from "./redux/undergraduateSlice";
import { fetchPostgraduate } from "./redux/postgraduateSlice";
import { fetchShortCourse } from "./redux/shortcourseSlice";
import { fetchDegreeTypes } from "./redux/degreeTypeSlice";
import { fetchCurrencies } from "./redux/currencySlice";
import { fetchExecutive } from "./redux/executiveSlice";
import { fetchWishList } from "./redux/wishList";
import { fetchCertificate } from "./redux/certificateSlice";
import Explore from "./pages/explore";
import CountrySearch from "./pages/countrySearch";
import SearchPage from "./pages/searchPage";
import PartnerLogin from "./pages/dashboard/partnerLogin";
import ReturnUp from "./components/templates_blocks/returnUp";
import DisciplineSearchPage from "./pages/disciplineSearch";
import useScrollToTop from "./utility/useScrollToTop";
import NotFound from "./pages/404";
import SetNewPassword from "./pages/dashboard/setNewPassword";
import PasswordReset from "./pages/dashboard/passwordReset";
import PartnerRegister from "./pages/dashboard/partnerRegister";
import SalesAgentLogin from "./pages/dashboard/salesAgentLogin";
// import AccountOfficerLogin from './pages/dashboard/AccountOfficerLogin';
import SalesAgentRegister from "./pages/dashboard/SalesAgentRegister";
// import AccountOfficerRegister from './pages/dashboard/AccountOfficerRegister';
import EmailVerification from "./pages/dashboard/emailVerification";
import VerifyEmail from "./pages/dashboard/verifyEmail";
import PostSignupSelection from "./pages/postSignUp";
import AnimatedCheckmark from "./components/templates_blocks/animatedCheckMark";
import AuthPage from "./components/templates_blocks/authPage";
// import AccountOfficerRegister from './pages/dashboard/accountOfficerRegister';
// import AccountOfficerLogin from './pages/dashboard/AccountOfficerLogin';
import ChatInterface from "./pages/chatInterface";
import AccountSettings from "./pages/accountSettings";
import HillpadWelcome from "./pages/hillpadWelcome";
import HillpadAIChatbot from "./components/templates_blocks/hillpadAIChatbot";
import { WishlistProvider } from "./utility/WishListContext";
import CourseFinder from "./pages/courseFinder";
import ContactForm from "./pages/contactUs";
import FAQ from "./pages/FAQ";

// import LoxCoursesSection from "./components/home/LoxCoursesSection";
import LoxHomePage from "./pages/loxHomePage";
import LoxCourseDetail from "./pages/LoxCourseDetail";
// Testing

function App() {
  const [userName, setUserName] = useState("Logged");
  const user = useSelector((state) => state.user);
  const allCourses = useSelector((state) => state.courses.coursesList);
  const allCoursesCount = useSelector((state) => state.courses.count);
  const undergraduateCourses = useSelector(
    (state) => state.undergraduate.bachelorsList
  );
  const undergraduateCount = useSelector((state) => state.undergraduate.count);
  const postgraduateCourses = useSelector(
    (state) => state.postgraduate.postgraduateList
  );
  const postgraduateCount = useSelector((state) => state.postgraduate.count);
  const shortCourses = useSelector((state) => state.shortcourse.doctoratesList);
  const shortcourseCount = useSelector((state) => state.shortcourse.count);
  const executiveCourses = useSelector(
    (state) => state.executive.executiveList
  );
  const executiveCount = useSelector((state) => state.executive.count);
  const certificateCourses = useSelector(
    (state) => state.certificate?.certificateList || []
  );
  const certificateCount = useSelector(
    (state) => state.certificate?.count || 0
  );

  const certificate = useDispatch();
  const executive = useDispatch();
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const courses = useDispatch();
  const disciplines = useDispatch();
  const undergraduate = useDispatch();
  const postgraduate = useDispatch();
  const shortcourse = useDispatch();
  const degree = useDispatch();
  const country = useDispatch();
  const currency = useDispatch();
  const wishList = useDispatch();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(fetchUser2());
    dispatch2(fetchCountry());
    courses(fetchCourses());
    executive(fetchExecutive());
    certificate(fetchCertificate());
    disciplines(fetchDisciplines());
    undergraduate(fetchUndergraduate());
    postgraduate(fetchPostgraduate());
    shortcourse(fetchShortCourse());
    degree(fetchDegreeTypes());
    currency(fetchCurrencies());
    country(fetchCountry());
    wishList(fetchWishList());

    return () => {
      if (user.userInfo.firstName) {
        setUserName(user.userInfo.firstName);
      }
    };
  }, []);

  useScrollToTop();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);
  const firstKeyword = pathSegments[0];
  const dashboardKeywords = [
    "dashboard",
    "welcome",
    "auth",
    "verify-email",
    "success-anim",
    "set-pw",
    "post-sign-up",
    "email-sent",
  ];
  const isDashboard = dashboardKeywords.includes(firstKeyword);
  const getOSUsingUserAgent = () => {
    const userAgent = window.navigator.userAgent;

    if (userAgent.indexOf("Windows") !== -1) return "Windows";
    if (userAgent.indexOf("Mac") !== -1) return "Mac OS";
    if (userAgent.indexOf("Linux") !== -1) return "Linux";
    if (userAgent.indexOf("Android") !== -1) return "Android";
    if (userAgent.indexOf("iOS") !== -1) return "iOS";

    return "Unknown OS";
  };
  const os = getOSUsingUserAgent() === "Mac OS";

  return (
    <div>
      {!isDashboard ? (
        location.pathname === "/home" || location.pathname === "/lox" ? (
          <HomePageHeader props={user} />
        ) : (
          <Header props={user} />
        )
      ) : (
        ""
      )}
      {/* <Header props={user.userInfo || {}} /> */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<LoxHomePage />} />
        <Route path="/lox/:slug" element={<LoxCourseDetail />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/settings" element={<AccountSettings />} />
        <Route path="/contact-us" element={<ContactForm />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/welcome" element={<HillpadWelcome />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/success-anim" element={<AnimatedCheckmark />} />
        <Route path="/post-sign-up" element={<PostSignupSelection />} />
        <Route path="/dashboard/login" element={<PartnerLogin />} />
        <Route
          path="/dashboard/partner/register"
          element={<PartnerRegister />}
        />
        <Route path="/dashboard/sales/login" element={<SalesAgentLogin />} />
        {/* <Route path='/dashboard/account-officer/login' element={<AccountOfficerLogin />} /> */}
        {/* <Route path='/dashboard/account-officer/register' element={<AccountOfficerRegister />} /> */}
        <Route
          path="/dashboard/sales/register"
          element={<SalesAgentRegister />}
        />
        <Route path="/dashboard/reset-pw" element={<PasswordReset />} />
        <Route path="/email-sent" element={<EmailVerification />} />
        <Route path="/verify-email/:token1/:token2" element={<VerifyEmail />} />
        <Route path="/set-pw" element={<SetNewPassword />} />
        <Route
          path="/courses"
          element={
            <Courses props={{ courses: allCourses, count: allCoursesCount }} />
          }
        >
          <Route path=":id" element={<Courses />} />
        </Route>
        <Route
          path="/executive"
          element={
            <Courses
              props={{
                programme: "executive",
                courses: executiveCourses,
                count: executiveCount,
              }}
            />
          }
        >
          <Route
            path=":id"
            element={
              <Courses
                props={{
                  url: "?name=executive&discipline=",
                  programme: "executive",
                }}
              />
            }
          />
        </Route>
        <Route path="/coursefinder" element={<CourseFinder />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="/search" element={<CourseFinder />} />
        <Route
          path="/certificate"
          element={
            <Courses
              props={{
                programme: "certificate",
                courses: certificateCourses,
                count: certificateCount,
              }}
            />
          }
        >
          <Route
            path=":id"
            element={
              <Courses
                props={{
                  url: "?programme=Certificate Courses&discipline=",
                  programme: "certificate",
                }}
              />
            }
          />
        </Route>
        <Route
          path="/undergraduate"
          element={
            <Courses
              props={{
                programme: "undergraduate",
                courses: undergraduateCourses,
                count: undergraduateCount,
              }}
            />
          }
        >
          <Route
            path=":id"
            element={
              <Courses
                props={{
                  url: "?programme=undergraduate&discipline=",
                  programme: "undergraduate",
                }}
              />
            }
          />
        </Route>

        <Route
          path="/graduate"
          element={
            <Courses
              props={{
                programme: "postgraduate",
                courses: postgraduateCourses,
                count: postgraduateCount,
              }}
            />
          }
        >
          <Route path=":id" element={<Courses />} />
        </Route>

        <Route
          path="/shortcourse"
          element={
            <Courses
              props={{
                programme: "shortcourse",
                courses: shortCourses,
                count: shortcourseCount,
              }}
            />
          }
        >
          <Route path=":id" element={<Courses />} />
        </Route>

        <Route path="/school/:slug" element={<SchoolDetails />} />
        <Route path="/course/:slug" element={<CourseDetails />} />
        <Route path="/discipline" element={<Disciplines />} />
        {/* <Route path='/discipline/:name' element={<DisciplineDetails />} /> */}
        <Route path="*" element={<NotFound />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:name" element={<CountryDetail />} />
        <Route path="/test" element={<CourseFinder />} />
      </Routes>
      <ReturnUp />
      {/* <HillpadAIChatbot /> */}
      {!isDashboard ? <Footer /> : ""}
    </div>
  );
}

export default App;
