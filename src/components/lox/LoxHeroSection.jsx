import React from "react";
import loxIcon from "../../assets/images/hillpad_icon_3.png";

export default function LoxHero() {
  const heroImage =
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=80";

  return (
    <section className="w-full relative">
      <div className="relative isolate w-full min-h-[520px] sm:min-h-[560px] overflow-visible">
        {/* Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center 25%",
              backgroundRepeat: "no-repeat",
              width: "100vw",
              height: "500px",
            }}
          />
        </div>

        {/* Overlay */}
        {/* <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/20" /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/20" />

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="min-h-[520px] sm:min-h-[560px] flex items-center justify-center text-center pt-20">
            <div className="max-w-3xl">
              <p className="text-white/80 font-semibold tracking-wider">
                HILLPAD LOX
              </p>

              <h1 className="text-white text-4xl sm:text-6xl font-bold mt-3 leading-tight">
                LOX Live Courses
              </h1>

              <p className="text-white/80 mt-4 text-base sm:text-lg leading-relaxed">
                A focused learning experience with curated courses, built for
                speed and results.
              </p>
            </div>
          </div>
        </div>

        {/* ✅ Floating icon aligned to same container as “LOX Courses / View all →” */}
        <div className="absolute top-[500px] -translate-y-1/2 z-30 w-full">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="-translate-x-6 sm:-translate-x-7 md:-translate-x-8">
              {/* <div className="w-28 h-28 bg-white shadow-xl rounded-sm flex items-center justify-center">
                <img
                  src={loxIcon}
                  alt="Hillpad LOX"
                  className="w-14 h-14 object-contain"
                />
              </div> */}
              <div className="w-28 h-28 bg-white shadow-xl rounded-sm flex items-center justify-center">
                <span className="text-black font-extrabold tracking-[0.35em] text-2xl">
                  LOX
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
