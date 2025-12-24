import React, { useEffect, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { RiGlobalLine } from "react-icons/ri";
import { FaDollarSign } from "react-icons/fa";

import calendar from "../../assets/images/calendar.svg";

/**
 * LOX Course Card (independent)
 * - Same Hillpad styling classes so it blends in
 * - Full control: you can change layout, badge, price, buttons, link, etc.
 * - Uses dummy data shape: { id, slug, name, duration, duration_base, course_format, attendance, school{}, tuition_fee... }
 */
export default function LoxCourseCard({ course }) {
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const toTitleCase = (str = "") =>
    str
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const formatPrice = (c) => {
    if (c?.tuition_fee === 0) return "Free";
    if (c?.tuition_fee === -1 || c?.tuition_fee == null) return "N/A";

    const base = c?.tuition_fee_base
      ? ` / ${toTitleCase(c.tuition_fee_base)}`
      : "";

    return `$${Number(c.tuition_fee).toLocaleString()}${base}`;
  };

  useEffect(() => {
    if (!feedbackMessage) return;
    const t = setTimeout(() => setFeedbackMessage(""), 2000);
    return () => clearTimeout(t);
  }, [feedbackMessage]);

  return (
    <div className="relative card card-hover my-3 w-76 2xs:w-80 sm:w-72 md:w-64 lg:w-card xl:w-73 2xl:w-card justify-center mx-2 xs:ms-4 2xs:ms-7 sm:mx-0">
      <div className="rounded-b-2xl h-card 2xs:h-card2 sm:h-card">
        {/* IMAGE */}
        <div className="rounded-xl h-imgHeight relative">
          <a href={`/lox/${course.slug}`}>
            <img
              className="rounded-t-xl h-full w-full"
              src={course.school?.thumbnail || course.school?.banner}
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
              alt={course.name}
            />
          </a>

          {/* LOX badge */}
          {/* <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-bold text-orange shadow">
            LOX
          </div> */}

          {/* Feedback toast */}
          {feedbackMessage && (
            <div className="absolute top-0 right-0 mt-12 mr-2 bg-white text-orange text-xs py-1 px-2 rounded-full opacity-90">
              {feedbackMessage}
            </div>
          )}
        </div>

        {/* BODY */}
        <a href={`/lox/${course.slug}`}>
          <div className="flex flex-col h-textCard relative justify-between">
            <div className="mt-12 pt-2">
              {/* Logo */}
              {/* <div className="w-14 z-0 mx-4 bg-white shadow-lg p-1 absolute -top-8">
                <img src={course.school?.logo} alt="logo" />
              </div> */}
              <div className="w-14 h-14 z-0 mx-4 bg-white shadow-lg absolute -top-8 flex items-center justify-center">
                <span className="font-extrabold text-black tracking-widest">
                  LOX
                </span>
              </div>

              <div className="mx-4">
                <div
                  className="text-light_black opacity-70 one-line-truncate max-h-7 overflow-hidden"
                  style={{ fontSize: "15px" }}
                >
                  {course.school?.name}
                </div>

                <div className="font-bold text-light_black two-line-truncate max-h-14 overflow-hidden">
                  {course.name}
                </div>

                {/* ✅ Replace "LIVE • ONLINE" with PRICE */}
                <div className="text-xs mt-1 opacity-70 text-orange">
                  {formatPrice(course)}
                </div>
              </div>
            </div>

            {/* FOOTER META */}
            <div className="flex gap-x-3 justify-between px-4 text-light_black text-xs xs:text-sm md:text-xs border-t border-light_black border-opacity-10 py-2">
              <div className="flex items-center gap-x-1">
                <div className="font-bold text-xl md:text-xs xl:text-xl">
                  <img src={calendar} alt="calendar" />
                </div>
                <div>
                  {course.duration} {course.duration_base}
                </div>
              </div>

              {/* ✅ Replace "live time" with "LIVE" */}
              <div className="flex items-center gap-x-1">
                <div className="font-bold text-xl md:text-xs xl:text-xl">
                  <BiTimeFive />
                </div>
                <div>{course.course_format || "LIVE"}</div>
              </div>

              <div className="flex items-center gap-x-1">
                <div className="font-bold text-xl md:text-xs xl:text-xl">
                  <RiGlobalLine />
                </div>
                <div>{course.attendance === "SITE" ? "On-Site" : "Online"}</div>
              </div>
            </div>
          </div>
        </a>

        {/* Optional CTA (if you ever want it)
        <div className="px-4 pb-4">
          <button
            onClick={() => setFeedbackMessage("Coming soon!")}
            className="w-full mt-2 text-white bg-orange py-2 px-6 text-sm font-bold rounded-full"
          >
            Enroll
          </button>
        </div>
        */}
      </div>
    </div>
  );
}
