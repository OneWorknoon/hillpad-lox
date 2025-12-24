import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/hillpad-transparent.png'
import AuthIcon from "./AuthIcon";
const  SalesAgentRegister = () => {
  React.useEffect(() => {
    document.title = "Create an account | hillPad -  Sales Agent Dashboard";
    const bodyElement = document.body;
    bodyElement.classList.add('flex', 'items-center', 'justify-center', 'min-h-screen', 'bg-slate-50', 'font-sans');
    return () => {
      bodyElement.classList.remove('flex', 'items-center', 'justify-center', 'min-h-screen', 'bg-slate-50', 'font-sans');
    };
  }, []);

  return (
    <div className="w-[100vw] font-sans font-thin relative sm:right-10 max-w-md p-8 bg-white rounded-lg shadow-md">
      <img src={logo} alt="hillPad Logo" className="h-8 mx-auto mb-8" />
      <h2 className="text-xl font-sans font-thin text-red  text-center mb-2">hillPad</h2>
      <h3 className="text-lg font-sans font-thin text-center text-blue  mb-2">Create an account</h3>
      <h4 className="text-center font-sans font-thin text-grey  mb-8">Create an Hillpad Sales Agent's account</h4>

      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm text-grey  mb-1">Email</label>
          <input
            type="email"
            id="email"
            className="w-full  px-3 py-2 border border-light_grey rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label htmlFor="firstName" className="block text-sm text-grey  mb-1">First Name</label>
          <input
            type="text"
            id="firstName"
            className="w-full  px-3 py-2 border border-light_grey rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm text-grey  mb-1">Last Name</label>
          <input
            type="text"
            id="lastName"
         className="w-full  px-3 py-2 border border-light_grey rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
            placeholder="Enter last name"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm text-grey  mb-1">Password</label>
          <input
            type="password"
            id="password"
            className="w-full  px-3 py-2 border border-light_grey rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
            placeholder="Enter password"
          />
        </div>
        <div className="text-sm text-grey ">
          By registering you agree to the Hillpad <Link to="/terms" className="text-blue  hover:underline">Terms of Use</Link>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange  hover:bg-red  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red "
        >
          Sign In
        </button>
      </form>

      <div className="mt-6">
        <p className="text-center text-sm text-grey ">
          Already have an account? <Link to="/dashboard/sales/login" className="text-blue  hover:underline">Login</Link>
        </p>
      </div>
      <AuthIcon />
    </div>
  );
};

export default  SalesAgentRegister;