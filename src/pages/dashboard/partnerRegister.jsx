import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from '../../assets/images/hillpad-transparent.png'
import AuthIcon from "./AuthIcon";

const PartnerRegister = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    organization: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = "Create an account | hillPad - Partner Dashboard";
    const bodyElement = document.body;
    bodyElement.style.backgroundImage = "url('https://images.pexels.com/photos/16420473/pexels-photo-16420473/free-photo-of-a-group-of-students-sitting-in-a-library-and-studying.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')";
    bodyElement.style.backgroundSize = "cover";
    bodyElement.style.backgroundPosition = "center";
    bodyElement.classList.add('min-h-screen', 'flex', 'items-center', 'justify-center', 'font-sans');
    
    return () => {
      bodyElement.style.backgroundImage = "";
      bodyElement.style.backgroundSize = "";
      bodyElement.style.backgroundPosition = "";
      bodyElement.classList.remove('min-h-screen', 'flex', 'items-center', 'justify-center', 'font-sans');
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("https://api.hillpad.com/api/account/register_partner", formData);
      console.log("Registration successful", response.data);
      // Handle successful registration
    } catch (error) {
      console.error('Error:', error.response);
      setErrorMessage(error.response?.data?.detail || error.response?.data?.email || 
        (error.response?.data?.password ? "Ensure password field has at least 8 characters" : '') || 
        'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-8 relative">
      <div className=" bg-grey  rounded-lg p-9 sm:w-[150%] relative sm:right-[20%] shadow-lg">
      
        <img src={logo} alt="hillPad Logo" className="h-8 mx-auto mb-6 filter brightness-4" />
        <h3 className="text-xl text-white text-center mb-2">Create an account</h3>
        <h4 className="text-center text-white/90 mb-8">Create a Hillpad partner's account</h4>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-white text-sm mb-2">Company Email</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="absolute right-3 top-2.5 text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="first_name" className="block text-white text-sm mb-2">First Name</label>
            <input
              type="text"
              id="first_name"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter first name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="last_name" className="block text-white text-sm mb-2">Last Name</label>
            <input
              type="text"
              id="last_name"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter last name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white text-sm mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="absolute right-3 top-2.5 text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="organization" className="block text-white text-sm mb-2">Organization</label>
            <input
              type="text"
              id="organization"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter organization name"
              value={formData.organization}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-sm text-white/90">
            By registering you agree to the Hillpad <Link to="/terms" className="text-orange hover:text-red">Terms of Use</Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange hover:bg-red border border-transparent rounded-md text-white font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/50"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <hr className="my-6 border-white/20" />

        <div className="text-center">
          <p className="text-white text-sm">
            Already have an account?{" "}
            <Link to="/dashboard/partner/login" className="text-orange hover:text-red">
              Login
            </Link>
          </p>
        </div>

        {/* <AuthIcon /> */}
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {errorMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-red-600">Error</h3>
              <button onClick={() => setErrorMessage("")} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
            <p className="text-gray-700">{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerRegister;