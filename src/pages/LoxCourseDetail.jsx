import { FiCalendar, FiClock, FiMapPin, FiUnlock } from "react-icons/fi";
import { BiShareAlt } from "react-icons/bi";
import { useEffect, useRef, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCoins } from "react-icons/fa";
import { FaPaperPlane, FaFlagCheckered } from "react-icons/fa";

// Reuse your existing section (carousel)
import LoxCoursesSection from "../components/lox/LoxCoursesSection";

// Your local LOX data
import { loxCourses } from "../data/loxCourses.js";

// If you have a NotFound component already like your guide, keep it:
import NotFound from "./404";

export default function LoxCourseDetail() {
  const param = useParams();
  const slug = param.slug;

  const user = useSelector((state) => state.user);

  const navigationRef = useRef(null);
  const infoSectionRef = useRef(null);

  const sectionRefs = {
    overview: useRef(null),
    learn: useRef(null),
    tools: useRef(null),
    outcomes: useRef(null),
    instructor: useRef(null),
  };

  const [activeSection, setActiveSection] = useState("overview");
  const [isSticky, setIsSticky] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // -------------------------
  // 1) Build data in SAME SHAPE as your guide expects
  // -------------------------
  const found = useMemo(() => loxCourses.find((c) => c.slug === slug), [slug]);

  const buildData = (course) => {
    const banner =
      course?.school?.banner ||
      course?.banner ||
      course?.thumbnail ||
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=80";

    const logo =
      course?.school?.logo ||
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80";

    const video =
      course?.school?.video ||
      course?.youtube_embed ||
      "https://www.youtube.com/embed/ysz5S6PUM-U";

    const academyName = course?.school?.name || "Lox Academy";

    return {
      id: course?.id || "lox-demo-id",
      slug: course?.slug || slug,
      name: course?.name || "Backend Development with Node.js",
      about:
        course?.about ||
        "Build a production-ready backend with Node.js — structured like real teams ship. You’ll learn clean architecture, auth patterns, database modeling, error handling, and deployment fundamentals.",
      duration: course?.duration || "3",
      duration_base: course?.duration_base || "Weeks",
      course_format: course?.course_format || "Live",
      attendance: course?.attendance || "ONLINE",
      tuition_fee:
        typeof course?.tuition_fee === "number" ? course.tuition_fee : 0,
      tuition_currency: course?.tuition_currency || { short_code: "USD" },
      school: {
        name: academyName,
        slug: course?.school?.slug || "lox-academy",
        logo,
        banner,
        video,
        city: "Online",
        country: { name: "United States" },
      },
    };
  };

  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if (!found) {
      setNoData(true);
      setLoading(false);
      return;
    }
    setData(buildData(found));
    setLoading(false);
  }, [found]);

  // -------------------------
  // Sticky nav + active section tracking (same idea as your guide)
  // -------------------------
  const scrollToSection = (sectionName) => {
    const sectionElement = sectionRefs[sectionName]?.current;
    if (sectionElement) {
      const offset = sectionElement.offsetTop - 200;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!infoSectionRef.current) return;

      const sectionTop = infoSectionRef.current.offsetTop;
      const sectionBottom = sectionTop + infoSectionRef.current.offsetHeight;
      const scrollPosition = window.scrollY;

      setIsSticky(
        scrollPosition >= sectionTop && scrollPosition < sectionBottom
      );

      Object.entries(sectionRefs).forEach(([name, ref]) => {
        if (!ref.current) return;
        const top = ref.current.offsetTop;
        const height = ref.current.offsetHeight;

        if (
          scrollPosition >= top - 250 &&
          scrollPosition < top + height - 100
        ) {
          setActiveSection(name);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // -------------------------
  // Helpers
  // -------------------------
  const formatPrice = (c) => {
    if (c?.tuition_fee === 0) return "$0";
    if (c?.tuition_fee === -1 || c?.tuition_fee == null) return "N/A";
    const code = c?.tuition_currency?.short_code
      ? c.tuition_currency.short_code.toUpperCase()
      : "USD";
    if (code === "USD") return `$${Number(c.tuition_fee).toLocaleString()}`;
    return `${Number(c.tuition_fee).toLocaleString()} ${code}`;
  };

  const ActionButton = () => (
    <button
      className="bg-orange px-4 py-3 rounded-md w-full text-white flex items-center gap-x-2 justify-center"
      onClick={() => console.log("Enrol now:", data?.id)}
    >
      <span className="text-white font-semibold">Enrol now</span>
      <div>
        <FiUnlock className="font-bold text-lg" />
      </div>
    </button>
  );

  // -------------------------
  // Related courses (reuse carousel)
  // -------------------------
  const relatedCourses = useMemo(() => {
    return loxCourses.filter((c) => c.slug !== slug).slice(0, 10);
  }, [slug]);

  const month = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  // -------------------------
  // Instructor + content
  // -------------------------
  const instructor = {
    name: "Maya Carter",
    title: "Senior Backend Engineer (Node.js) • Product Infrastructure",
    bio: "Maya has led backend systems for high-traffic products — focusing on reliability, clean architecture, and API design. In LOX, she teaches the same patterns teams use in production.",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
  };

  const whatYouLearn = [
    "Design REST APIs with scalable folder structure",
    "Authentication, roles, and protected routes",
    "Database modeling + query patterns",
    "Validation, error handling, and logging",
    "Testing strategy + deployment checklist",
  ];

  const whoItsFor = [
    "Frontend devs moving into full-stack",
    "Builders shipping MVPs who need a real backend",
    "Junior backend devs who want production patterns",
  ];

  const tools = ["Node.js", "Express", "MongoDB", "JWT", "Postman", "Docker"];

  const outcomes = [
    "A production-ready API project (portfolio-grade)",
    "A deployable backend template you can reuse",
    "Confidence building backend features end-to-end",
  ];

  // -------------------------
  // Guard
  // -------------------------
  if (noData) return <NotFound />;

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-light" />
        </div>
      ) : (
        <div>
          {/* ----------------------------- Desktop View  ----------------------------------- */}
          <div className="w-screen my-20 xl:px-0 hidden lg:block">
            <div className="w-full text-lg">
              {/* Hero background */}
              <div
                className="xl:flex mx-auto bg-no-repeat bg-cover bg-center text-white absolute -z-10"
                style={{
                  width: "100vw",
                  height: "400px",
                  background: `url(${data?.school?.banner})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center 25%",
                }}
              >
                <div className="absolute inset-0 bg-black/55" />
                <div className="w-full" style={{ heigth: "400px" }} />
              </div>

              {/* ✅ IMPORTANT: Wrap the 2-column layout in its own container */}
              <div className="w-full max-w-full mx-auto xl:mx-4 2xl:mx-auto">
                {/* ✅ Row 1: Main content + sticky aside */}
                <div className="flex justify-between w-full">
                  {/* LEFT MAIN */}
                  <div className="py-20 xl:w-9/12">
                    <section className="mx-auto flex flex-col max-w-full text-white">
                      <div className="max-w-full w-full mx-auto mt-6 w-max-full"></div>
                    </section>

                    <div className="w-full mt-48 pt-12">
                      <div className="w-full items-center">
                        <div className="items-center">
                          {/* <div className="w-32 border-8 border-white shadow-lg bg-white">
                            <img
                              src={data?.school?.logo}
                              alt={data?.school?.name}
                            />
                          </div> */}
                          <div className="w-28 h-28 bg-white shadow-xl rounded-sm flex items-center justify-center">
                            <span className="text-black font-extrabold tracking-[0.35em] text-2xl">
                              LOX
                            </span>
                          </div>

                          <Link to={`/school/${data?.school?.slug}`}>
                            <h2 className="font-semibold text-xl text-light mt-6">
                              {data?.school?.name}
                            </h2>
                          </Link>
                        </div>

                        <div className="flex items-center gap-x-4">
                          <div className="w-full">
                            <div className="my-2 text-2xl"></div>

                            <div className="flex align-middle items-center justify-between">
                              <h1 className="text-5xl font-bold leading-tight">
                                {data?.name}
                              </h1>

                              <BiShareAlt
                                className="text-4xl cursor-pointer text-light_black"
                                onClick={() => setShowShare(!showShare)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="my-6">
                          <div className="text-light_black">
                            <p>{data?.about}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sticky nav + sections */}
                    <section
                      ref={infoSectionRef}
                      className="w-full mx-auto my-6 text-light_black"
                    >
                      <div
                        className={`${
                          isSticky
                            ? "fixed top-[82px] rounde left-0 right-0 z-10 w-full mx-auto shadow-md"
                            : "rounded-full relative"
                        } bg-orange`}
                      >
                        <div className="flex p-2 justify-around border-opacity-20 rounded-full">
                          <div
                            className={`px-10 py-2 cursor-pointer ${
                              activeSection === "overview"
                                ? "bg-white rounded-full"
                                : "text-white"
                            }`}
                            onClick={() => scrollToSection("overview")}
                          >
                            Overview
                          </div>

                          <div
                            className={`px-10 py-2 cursor-pointer ${
                              activeSection === "learn"
                                ? "bg-white rounded-full"
                                : "text-white"
                            }`}
                            onClick={() => scrollToSection("learn")}
                          >
                            Curriculum
                          </div>

                          <div
                            className={`px-10 py-2 cursor-pointer ${
                              activeSection === "tools"
                                ? "bg-white rounded-full"
                                : "text-white"
                            }`}
                            onClick={() => scrollToSection("tools")}
                          >
                            Tools
                          </div>

                          <div
                            className={`px-10 py-2 cursor-pointer ${
                              activeSection === "outcomes"
                                ? "bg-white rounded-full"
                                : "text-white"
                            }`}
                            onClick={() => scrollToSection("outcomes")}
                          >
                            Outcomes
                          </div>

                          <div
                            className={`px-10 py-2 cursor-pointer ${
                              activeSection === "instructor"
                                ? "bg-white rounded-full"
                                : "text-white"
                            }`}
                            onClick={() => scrollToSection("instructor")}
                          >
                            Instructor
                          </div>
                        </div>
                      </div>

                      {isSticky && (
                        <div
                          style={{
                            height:
                              navigationRef.current?.offsetHeight || "60px",
                          }}
                        />
                      )}

                      <div className="w-full mt-6">
                        <div ref={sectionRefs.overview} id="overview-section">
                          <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="font-semibold text-black text-3xl mb-4">
                              Course Overview
                            </h2>
                            <p className="text-light_black opacity-80">
                              This live course is designed to help you build
                              real backend systems — not toy examples. You’ll
                              leave with a clean, deployable API template you
                              can reuse for MVPs and client work.
                            </p>
                          </div>
                        </div>

                        <div
                          ref={sectionRefs.learn}
                          id="learn-section"
                          className="mt-6"
                        >
                          <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="font-semibold text-black text-3xl mb-4">
                              What you’ll learn
                            </h2>
                            <ul className="list-disc pl-5 space-y-2 text-light_black opacity-80">
                              {whatYouLearn.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>

                            <h3 className="font-semibold text-black text-2xl mt-8 mb-3">
                              Who it’s for
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 text-light_black opacity-80">
                              {whoItsFor.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div
                          ref={sectionRefs.tools}
                          id="tools-section"
                          className="mt-6"
                        >
                          <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="font-semibold text-black text-3xl mb-4">
                              Tools you’ll use
                            </h2>
                            <div className="flex flex-wrap gap-2">
                              {tools.map((t) => (
                                <span
                                  key={t}
                                  className="px-3 py-1 rounded-full border border-light_black border-opacity-10 text-sm text-light_black opacity-80"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div
                          ref={sectionRefs.outcomes}
                          id="outcomes-section"
                          className="mt-6"
                        >
                          <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="font-semibold text-black text-3xl mb-4">
                              Outcomes
                            </h2>
                            <ul className="list-disc pl-5 space-y-2 text-light_black opacity-80">
                              {outcomes.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div
                          ref={sectionRefs.instructor}
                          id="instructor-section"
                          className="mt-6"
                        >
                          <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="font-semibold text-black text-3xl mb-4">
                              Instructor
                            </h2>

                            <div className="flex items-start gap-x-4">
                              <div className="w-20 h-20 rounded-full overflow-hidden">
                                <img
                                  src={instructor.photo}
                                  alt={instructor.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex-1">
                                <div className="text-2xl font-bold">
                                  {instructor.name}
                                </div>
                                <div className="text-light_black opacity-70">
                                  {instructor.title}
                                </div>
                                <p className="mt-3 text-light_black opacity-80">
                                  {instructor.bio}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ✅ IMPORTANT: DO NOT put Related Courses here anymore */}
                      </div>
                    </section>
                  </div>

                  {/* RIGHT ASIDE */}
                  <aside className="w-100  lg:flex flex-col py-20 items-end">
                    <div className="sticky" style={{ top: "12rem" }}>
                      <div className=" rounded-lg card shadow-2 w-88 bg-white h-fit p-2 text-light_black flex flex-col justify-between ">
                        <div className="rounded-lg">
                          <iframe
                            className="rounded-lg w-full aspect-video"
                            src={data?.school?.video}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>

                        <div>
                          {/* If you don’t have school pages in LOX, keep it as plain text (no Link) */}
                          <h3 className="font-semibold text-lg px-4">
                            {data?.school?.name || "Hillpad Lox Academy"}
                          </h3>

                          <div className="text-sm px-4">
                            <div className="flex items-center gap-x-2 border-b border-light_black border-opacity-30 py-2">
                              <span>
                                <FiMapPin />
                              </span>
                              <span>
                                Online,{" "}
                                {data?.school?.country?.name || "United States"}
                              </span>
                            </div>
                            <div />
                          </div>
                        </div>

                        {/* TUITION ROW — Hillpad style, but LOX uses $ */}
                        <div className="flex items-center gap-x-2 px-4 text-light_black border-b border-light_black border-opacity-30 py-2">
                          <span className="text-xl text-light_black">
                            <FaCoins />
                          </span>

                          <span className="text-light_black">Tuition: </span>

                          <span className="font-semibold text-xl">
                            {data?.tuition_fee < 0 || data?.tuition_fee == null
                              ? "N/A"
                              : data?.tuition_fee == 0
                              ? "FREE"
                              : `$${Number(
                                  data?.tuition_fee
                                ).toLocaleString()}`}
                          </span>

                          {data?.tuition_fee > 0 && data?.tuition_fee_base ? (
                            <span>/ {toTitleCase(data?.tuition_fee_base)}</span>
                          ) : null}
                        </div>

                        {/* META ROWS — EXACT Hillpad block style */}
                        <div className="flex flex-col gap-y-2 py-2 px-4 font-semibold text-opacity-40">
                          <div className="flex items-center gap-x-2">
                            <span>
                              <FiCalendar />
                            </span>
                            <span>
                              {data?.duration}{" "}
                              {String(data?.duration_base || "").toLowerCase()}
                            </span>
                            <span className="text-sm font-normal"></span>
                          </div>

                          <div className="flex items-center gap-x-2">
                            <span>
                              <FiClock />
                            </span>
                            <span>
                              {(data?.course_format || "LIVE")
                                .toString()
                                .toUpperCase()}
                            </span>
                            <span className="text-sm font-normal"></span>
                          </div>

                          <div className="flex items-center gap-x-2">
                            <span>
                              <FiMapPin />
                            </span>
                            <span>
                              {data?.attendance === "SITE"
                                ? "On-site"
                                : "online"}
                            </span>
                            <span className="text-sm font-normal"></span>
                          </div>

                          {/* Removed deadline + start date (per your LOX final decisions) */}
                        </div>

                        <div className="py-3">
                          <ActionButton />
                        </div>

                        <div className="py-2">
                          {/* keep empty like original */}
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>

                {/* ✅ Row 2: Related Courses OUTSIDE the sticky/aside row */}
                <div className="w-full mt-10">
                  <LoxCoursesSection
                    title="Related Courses"
                    subtitle="More LOX live classes you can start next."
                    viewAllHref="/lox"
                    courses={relatedCourses}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ----------------------------- Mobile View  ----------------------------------- */}
          <div className="w-screen lg:hidden">
            <div
              className="flex mx-auto items-center justify-center bg-no-repeat bg-cover bg-center text-white mt-16 relative"
              style={{
                width: "100vw",
                height: "400px",
                background: `url(${data?.school?.banner})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
            >
              <div className="absolute inset-0 bg-black/55" />

              <div className="flex flex-col mt-52 w-full relative z-10">
                <div className="flex justify-center mx-auto w-full">
                  <div className="card shadow-2 w-82 2xs:w-88 bg-white p-4 h-fit rounded-lg text-light_black flex flex-col justify-between">
                    <div className="rounded-lg overflow-hidden">
                      <iframe
                        className="rounded-lg w-full aspect-video"
                        src={data?.school?.video}
                        title="Course video"
                        frameBorder="0"
                        style={{ border: 0 }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>

                    <div className="mt-4">
                      <h3 className="font-semibold text-2xl">
                        {data?.school?.name}
                      </h3>

                      <div className="text-sm">
                        <div className="flex items-center gap-x-2 border-b border-light_black border-opacity-30 py-2">
                          <span>
                            <FiMapPin />
                          </span>
                          <span>
                            Online,{" "}
                            {data?.school?.country?.name || "United States"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                      <div className="border border-light_black border-opacity-10 rounded-md py-3">
                        <div className="text-xs opacity-60">Duration</div>
                        <div className="font-semibold mt-1">
                          {data?.duration} {data?.duration_base}
                        </div>
                      </div>
                      <div className="border border-light_black border-opacity-10 rounded-md py-3">
                        <div className="text-xs opacity-60">Format</div>
                        <div className="font-semibold mt-1">
                          {data?.course_format || "Live"}
                        </div>
                      </div>
                      <div className="border border-light_black border-opacity-10 rounded-md py-3">
                        <div className="text-xs opacity-60">Mode</div>
                        <div className="font-semibold mt-1">
                          {data?.attendance === "SITE" ? "On-site" : "Online"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-sm opacity-60">Price</div>
                      <div className="text-2xl font-bold">
                        {formatPrice(data)}
                      </div>
                    </div>

                    <div className="py-3">
                      <ActionButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="w-full mx-2 max-w-full mt-44 text-light_black px-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-semibold text-black text-3xl mb-4">
                  {data?.name}
                </h2>
                <p className="text-light_black opacity-80">{data?.about}</p>

                <h3 className="font-semibold text-black text-2xl mt-8 mb-3">
                  What you’ll learn
                </h3>
                <ul className="list-disc pl-5 space-y-2 opacity-80">
                  {whatYouLearn.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>

                <h3 className="font-semibold text-black text-2xl mt-8 mb-3">
                  Who it’s for
                </h3>
                <ul className="list-disc pl-5 space-y-2 opacity-80">
                  {whoItsFor.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>

                <h3 className="font-semibold text-black text-2xl mt-8 mb-3">
                  Tools you’ll use
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full border border-light_black border-opacity-10 text-sm opacity-80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="font-semibold text-black text-2xl mt-8 mb-3">
                  Outcomes
                </h3>
                <ul className="list-disc pl-5 space-y-2 opacity-80">
                  {outcomes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>

                <h3 className="font-semibold text-black text-2xl mt-8 mb-3">
                  Instructor
                </h3>
                <div className="flex items-start gap-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={instructor.photo}
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{instructor.name}</div>
                    <div className="opacity-70">{instructor.title}</div>
                    <p className="mt-3 opacity-80">{instructor.bio}</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-8 px-2">
              <LoxCoursesSection
                title="Related Courses"
                subtitle="More LOX live classes you can start next."
                viewAllHref="/lox"
                courses={relatedCourses}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
