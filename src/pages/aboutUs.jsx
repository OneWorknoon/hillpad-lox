import React from "react";
import pic from "../assets/images/student_collab.jpg";
import pic2 from "../assets/images/about2.jpg";
import pic3 from "../assets/images/about1.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const AboutUs = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="w-screen mx-auto mt-20">
      {/* Hero / Banner Section */}
      <section
        className="relative flex items-center"
        style={{
          width: "100vw",
          height: "480px",
          backgroundImage: `url('/student_collab.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="z-10 h-full flex flex-col justify-center px-6 md:px-[10%] bg-black/40 w-full">
          <h4 className="text-sm text-white uppercase tracking-wider mb-4">
            About Us
          </h4>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-snug max-w-3xl">
            On a mission to make <br />
            global education <br />
            <span className="text-orange">universally</span> accessible.
          </h1>
          {/* <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl">
            Education should be a right, not a privilege. That’s why we’re
            rethinking how knowledge is shared and accessed worldwide.
          </p> */}
        </div>
      </section>

      {/* About Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              We are <br />
              <span className="text-orange">Hillpad</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 italic">
              We believe education should have no borders.
            </p>
          </div>
          <div className="md:w-1/2 text-lg md:text-xl text-gray-700 space-y-4">
            <p>
              Hillpad is an edtech startup dedicated to making education
              accessible to everyone universally. By partnering with leading
              universities to design and deliver programs that meet the needs of
              today's learners.
            </p>
            <p>
              From bachelor’s and master’s degrees to executive programs and
              short courses, Hillpad offers flexible pathways that fit into
              learners’ lives. Our platform is built to make quality education
              affordable, practical, and globally available.
            </p>
            <p>
              Beyond courses, we provide guidance, community, and tools that
              support learners in achieving their personal and professional
              goals.
            </p>
          </div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            What makes us <span className="text-orange">different</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              {
                title: "Perfect matchmaking",
                caption: "Right students, right programs",
                icon: (
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.60122 11.3333C9.85104 11.5816 10.189 11.721 10.5412 11.721C10.8935 11.721 11.2314 11.5816 11.4812 11.3333C11.7296 11.0834 11.8689 10.7455 11.8689 10.3933C11.8689 10.041 11.7296 9.70307 11.4812 9.45326L3.12122 1.05325C2.87015 0.802183 2.52962 0.661133 2.17455 0.661133C1.81949 0.661133 1.47896 0.802183 1.22789 1.05325C0.976816 1.30433 0.835765 1.64485 0.835765 1.99992C0.835765 2.35499 0.976816 2.69552 1.22789 2.94659L9.60122 11.3333ZM26.0012 16.6666C25.6476 16.6666 25.3085 16.8071 25.0584 17.0571C24.8084 17.3072 24.6679 17.6463 24.6679 17.9999V22.7866L18.5879 16.6666C18.3333 16.412 17.988 16.2689 17.6279 16.2689C17.2678 16.2689 16.9225 16.412 16.6679 16.6666C16.4133 16.9212 16.2702 17.2665 16.2702 17.6266C16.2702 17.9867 16.4133 18.332 16.6679 18.5866L22.7879 24.6666H18.0012C17.6476 24.6666 17.3085 24.8071 17.0584 25.0571C16.8084 25.3072 16.6679 25.6463 16.6679 25.9999C16.6679 26.3535 16.8084 26.6927 17.0584 26.9427C17.3085 27.1928 17.6476 27.3333 18.0012 27.3333H26.0012C26.1755 27.3311 26.3476 27.2949 26.5079 27.2266C26.8337 27.0913 27.0926 26.8324 27.2279 26.5066C27.2962 26.3463 27.3324 26.1742 27.3346 25.9999V17.9999C27.3346 17.6463 27.1941 17.3072 26.944 17.0571C26.694 16.8071 26.3548 16.6666 26.0012 16.6666ZM27.2279 1.49325C27.0926 1.16746 26.8337 0.908555 26.5079 0.773255C26.3476 0.704934 26.1755 0.668695 26.0012 0.666588H18.0012C17.6476 0.666588 17.3085 0.807064 17.0584 1.05711C16.8084 1.30716 16.6679 1.6463 16.6679 1.99992C16.6679 2.35354 16.8084 2.69268 17.0584 2.94273C17.3085 3.19278 17.6476 3.33326 18.0012 3.33326H22.7879L1.05455 25.0533C0.929583 25.1772 0.83039 25.3247 0.762699 25.4872C0.695007 25.6496 0.660156 25.8239 0.660156 25.9999C0.660156 26.1759 0.695007 26.3502 0.762699 26.5127C0.83039 26.6752 0.929583 26.8226 1.05455 26.9466C1.1785 27.0716 1.32597 27.1708 1.48845 27.2384C1.65093 27.3061 1.8252 27.341 2.00122 27.341C2.17724 27.341 2.35151 27.3061 2.51399 27.2384C2.67647 27.1708 2.82394 27.0716 2.94789 26.9466L24.6679 5.21325V9.99992C24.6679 10.3535 24.8084 10.6927 25.0584 10.9427C25.3085 11.1928 25.6476 11.3333 26.0012 11.3333C26.3548 11.3333 26.694 11.1928 26.944 10.9427C27.1941 10.6927 27.3346 10.3535 27.3346 9.99992V1.99992C27.3324 1.82569 27.2962 1.65355 27.2279 1.49325Z"
                      fill="#F14B4B"
                    />
                  </svg>
                ),
                description:
                  "We connect schools with highly motivated, culturally curious, and purpose-driven students who are the best fit for your institution.",
              },
              {
                title: "Tailored solutions",
                caption: "Customized recruitment strategies",
                icon: (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M31.6508 0.239813C31.815 0.379938 31.9294 0.569412 31.977 0.779929C32.0245 0.990447 32.0027 1.21071 31.9148 1.40781C28.8548 8.26781 22.4288 17.7478 17.7248 22.6878C16.4047 24.0678 14.7791 25.1187 12.9788 25.7558C12.9428 26.2098 12.8588 26.8318 12.6588 27.4918C12.2568 28.8098 11.3248 30.4498 9.24281 30.9718C7.22659 31.4528 5.1368 31.5425 3.08681 31.2358C2.70612 31.173 2.33047 31.0828 1.96281 30.9658C1.62365 30.8617 1.30737 30.694 1.03081 30.4718C0.847845 30.3178 0.70738 30.1195 0.622809 29.8958C0.516269 29.6096 0.519118 29.2941 0.630809 29.0098C0.820809 28.5198 1.26281 28.2498 1.55281 28.1058C2.34081 27.7118 2.80281 27.1998 3.28681 26.4538C3.47681 26.1658 3.65481 25.8598 3.86081 25.5098L4.09481 25.1138C4.39681 24.6038 4.74681 24.0338 5.18681 23.4178C6.24281 21.9398 7.58881 21.5678 8.67881 21.6258C8.93214 21.6418 9.16414 21.6738 9.37481 21.7218C9.49881 21.3778 9.65881 20.9618 9.85081 20.5058C10.3728 19.2678 11.1668 17.6678 12.2248 16.3678C16.5768 11.0278 24.5848 3.95581 30.4588 0.159813C30.6396 0.0430924 30.8533 -0.0121675 31.0681 0.0022453C31.2828 0.0166582 31.4872 0.0999746 31.6508 0.239813ZM9.41081 23.8238C9.14583 23.7071 8.86192 23.6394 8.57281 23.6238C8.08081 23.5978 7.42681 23.7238 6.81481 24.5818C6.42081 25.1318 6.10481 25.6458 5.81481 26.1358L5.60481 26.4898C5.39281 26.8518 5.17881 27.2138 4.96481 27.5458C4.55945 28.2018 4.04545 28.7842 3.44481 29.2678C4.82481 29.4918 6.91681 29.4898 8.75881 29.0278C9.87681 28.7498 10.4448 27.8898 10.7448 26.9078C10.8921 26.4205 10.9768 25.9165 10.9968 25.4078L9.41081 23.8238ZM12.2908 23.8758C12.5308 23.7958 12.8448 23.6758 13.2068 23.5098C14.3582 22.974 15.3994 22.2279 16.2768 21.3098C20.0768 17.3178 25.1008 10.1698 28.3808 4.04781C23.2008 7.90181 17.2488 13.3678 13.7768 17.6318C12.8928 18.7178 12.1868 20.1178 11.6928 21.2838C11.4508 21.8598 11.2648 22.3638 11.1428 22.7238L12.2908 23.8758Z"
                      fill="#F14B4B"
                    />
                  </svg>
                ),
                description:
                  "With our unique data, market insights, and detailed data, we can create a campaign that suits your recruitment and marketing goals.",
              },
              {
                title: "International reach",
                caption: "Global access, local impact",
                icon: (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.9993 28.3331C22.3631 28.3331 28.3327 22.3636 28.3327 14.9998C28.3327 7.63601 22.3631 1.6665 14.9993 1.6665C7.63555 1.6665 1.66602 7.63601 1.66602 14.9998C1.66602 22.3636 7.63555 28.3331 14.9993 28.3331Z"
                      stroke="#F14B4B"
                      stroke-width="2.66667"
                    />
                    <path
                      d="M3 19.6566C4.75461 20.3602 6.01773 20.3602 6.78927 19.6566C7.9466 18.6012 6.94793 15.398 8.5688 14.5146C10.1896 13.6312 12.6591 17.5471 14.9672 16.2586C17.2753 14.9701 14.7497 11.5344 16.3515 10.1415C17.9532 8.74864 20.036 10.3195 20.4001 7.99051C20.7641 5.66154 18.7014 6.67164 18.3056 4.4708C18.0417 3.00358 18.0417 2.23207 18.3056 2.15625"
                      stroke="#F14B4B"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                    />
                    <path
                      d="M18.347 27.8997C17.0976 26.621 16.6478 25.4325 16.9976 24.334C17.5224 22.6862 18.3881 22.7836 18.7656 21.7648C19.143 20.746 18.0767 19.2949 20.4425 18.0544C22.0197 17.2274 24.1883 18.1856 26.9482 20.929"
                      stroke="#F14B4B"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                    />
                  </svg>
                ),
                description:
                  "Broaden your outreach to students globally, motivating driven applicants from all around the world to apply and join your institution.",
              },
              {
                title: "Flexible learning",
                caption: "Education on your terms",
                icon: (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="4"
                      y="6"
                      width="22"
                      height="14"
                      rx="2"
                      stroke="#F14B4B"
                      strokeWidth="2"
                    />
                    <path
                      d="M2 24C2 22.8954 2.89543 22 4 22H26C27.1046 22 28 22.8954 28 24V26H2V24Z"
                      stroke="#F14B4B"
                      strokeWidth="2"
                    />
                    <path
                      d="M10 12H20"
                      stroke="#F14B4B"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 16H16"
                      stroke="#F14B4B"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ),
                description:
                  "We design programs that adapt to learners’ schedules, making education truly accessible anytime, anywhere.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-2xl mb-5">{item.icon}</span>
                <h3 className="text-2xl font-semibold mb-1">{item.title}</h3>
                <p className="text-sm uppercase text-orange font-medium mb-3">
                  {item.caption}
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How We Work */}
      <div className="max-w-6xl mx-auto px-6 pt-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          How we <span className="text-orange">work</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-700">
          <div className="border-2 border-orange rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-2">1. Partner</h3>
            <p>
              We collaborate with universities and educators to bring their
              programs online without compromising quality.
            </p>
          </div>

          <div className="border-2 border-orange rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-2">2. Build</h3>
            <p>
              Our team designs learner-friendly programs that combine academic
              rigor with real-world relevance.
            </p>
          </div>

          <div className="border-2 border-orange rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-2">3. Deliver</h3>
            <p>
              Through our platform, students access flexible and affordable
              courses, supported by tools and guidance for success.
            </p>
          </div>
        </div>
      </div>

      <section className="bg-gray-50 max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto mb-6">
          <section className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-orange">Approach</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                At Hillpad, we keep our approach human. We don’t start with
                systems or institutions, we start with the student. What do they
                dream of? What’s standing in their way? Once we know that, we
                make the path clearer, simpler, and possible.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We connect learners to programs and universities around the
                world, not just as a platform, but as a guide. We believe access
                without support is just half the work. That’s why we walk
                alongside students as they take each step, making sure no door
                feels out of reach.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                And for universities, we make it easier to welcome talent from
                every corner of the world. Together, we’re proving that when
                education is truly borderless, potential is limitless.
              </p>
            </motion.div>

            {/* Image */}
            <div>
              <img
                src={pic2}
                alt="Our Approach"
                className="rounded-xl shadow-md object-cover w-full h-[400px]"
              />
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-8 items-center mt-20">
            {/* Image */}
            <div>
              <img
                src={pic3}
                alt="The Heart of Hillpad"
                className="rounded-xl shadow-md object-cover w-full h-[400px]"
              />
            </div>
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Heart of <span className="text-orange">Hillpad</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                At the heart of Hillpad is a belief we can’t ignore: talent is
                everywhere, but opportunity isn’t. That’s what keeps us moving.
                We’ve seen too many bright students shut out, not because they
                lacked ability, but because of where they were born, what they
                could afford, or the doors that never opened. We’re here to
                change that. For us, it’s personal.
              </p>
              <blockquote className="border-l-4 border-orange pl-4 italic text-xl text-gray-800 mb-4">
                "Education isn’t just about classes and degrees, it’s about
                possibility. It’s about giving every learner a fair shot to
                grow, to dream bigger, and to reach further than they thought
                they could."
              </blockquote>
              <p className="text-lg text-gray-700 leading-relaxed">
                That’s why Hillpad exists: to make education borderless, human,
                and within reach for everyone.
              </p>
            </motion.div>
          </section>
        </div>
      </section>

      {/* Closing Section */}
      <div className="bg-hero-gradient text-white py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Commitment</h2>

        <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed">
          <p>
            Brilliance knows no boundaries. Talent is everywhere, yet too often,
            opportunity is not. Barriers of geography, finances, and access
            still hold back countless students from the education they deserve.
          </p>

          <p>
            That’s why we founded{" "}
            <span className="font-semibold">Hillpad </span>
            in 2024, with a mission to make education universally accessible. We
            believe every learner, no matter their background, deserves a fair
            chance to reach their full potentials.
          </p>

          <p>
            Hillpad opens doors to global programs, universities, and pathways
            once out of reach. By removing barriers and building bridges, we
            help learners step into futures filled with possibility.
          </p>

          <p className="font-semibold text-orange-300">
            Because education should not be defined by borders, but by dreams.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Join the Mission
          </h3>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Education is the most powerful equalizer in the world. Together, we
            can make it borderless. Join us.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/explore">
              <button className="bg-orange-500 border border-white hover:bg-white hover:text-orange text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition">
                Explore Programs
              </button>
            </Link>
            <button
              onClick={toggleModal}
              className="bg-white text-orange hover:bg-gray-100 hover:bg-transparent font-semibold px-6 py-3 rounded-xl shadow-lg transition"
            >
              Partner With Us
            </button>
         

            {/* Modal */}
            {isOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-light_orange rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
                  {/* Close button */}
                  <button
                    onClick={toggleModal}
                    className="absolute top-3 right-3 text-black hover:text-gray-900 transition"
                  >
                    ✖
                  </button>

                  {/* Headline */}
                  <h2 className="text-2xl font-bold text-orange mb-6 text-center">
                    Let’s build an educational future together.
                  </h2>

                  {/* Form */}
                  <form className="space-y-4">
                    {/* Full Name */}
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none"
                    />

                    {/* Organization */}
                    <input
                      type="text"
                      placeholder="Organization / Institution"
                      className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none"
                    />

                    {/* Email */}
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none"
                    />

                    {/* Website (optional) */}
                    <input
                      type="url"
                      placeholder="Website (optional)"
                      className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none"
                    />

                    {/* Partnership Interest */}
                    <select className="w-full bg-white border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none">
                      <option value="">Partnership Interest</option>
                      <option>University Partner</option>
                      <option>Program Provider</option>
                      <option>Corporate Partner</option>
                      <option>NGO / Nonprofit</option>
                      <option>Other</option>
                    </select>

                    {/* Message */}
                    <textarea
                      placeholder="Message / How would you like to collaborate?"
                      rows={4}
                      className="w-full border border-gray-300 text-black rounded-lg px-4 py-2  focus:outline-none"
                    ></textarea>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="w-full bg-orange text-white font-semibold py-3 rounded-lg shadow-md hover:bg-orange-600 transition"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
