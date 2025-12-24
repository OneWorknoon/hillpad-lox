import React from "react";
import { useSelector } from "react-redux";
import HillpadImage from "../assets/images/confetti.png"; // Adjust the path to match your project structure
import {  useNavigate } from "react-router-dom";

export default function HillpadWelcome() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleExplore = () => {
    navigate('/coursefinder?name=&country=Where%3F');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light_orange">
      <div className="text-center mt-20 sm:mt-[5%] sm:w-[80vw] sm:h-[40vw] w-[90%] bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          {/* Imported image */}
          <img
            src={HillpadImage}
            alt="Hillpad Logo"
            className="sm:w-[30%] relative bottom-[100px] mx-auto"
          />
        </div>
        <div className="relative bottom-20">
          <h1 className="text-6xl font-bold text-light_black mb-4">
            Welcome to Hillpad, {user.userInfo.firstName}!
          </h1>
          <p className="text-gray-600 mb-6">
          Discover online programs and courses from top schools around the world
            {/* <span className="font-semibold text-grey">{user.userInfo.email}</span>. */}
          </p>
          <button
            onClick={handleExplore}
            className="group relative px-10 py-4 bg-orange text-white font-bold rounded-full 
           transition-all duration-200 ease-in-out 
            hover:bg-red  
         
           focus:outline-none focus:ring-4 focus:ring-orange-300 
           shadow-lg hover:shadow-xl"
          > Explore All Courses
          </button>
        </div>
       
      </div>
    </div>
  );
}
