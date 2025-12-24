import React, { useState } from 'react';
import axios from 'axios';
import GoogleAuth from './oAuth';
import config from '../../config';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (isLogin) {
        // Login request
        const response = await axios.post(`${APP_BASE_URL}account/token`, values);
        
        if (response.status === 200) {
          dispatch(fetchUser(values));
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
          }, 2000);
          navigate("/");
        }
      } else {
        // Registration request
        const response = await axios.post(`${APP_BASE_URL}account/register`, values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
          dispatch(fetchUser(values));
          navigate("/email-sent");
        }
      }
    } catch (error) {
      if (error.response?.data?.detail === "No active account found with the given credentials") {
        setErrorMessage("No active account found with the given credentials");
      } else {
        setErrorMessage(
          error.response?.data?.detail || 
          error.response?.data?.email || 
          (error.response?.data?.password ? "Ensure password field has at least 8 characters" : '') || 
          'An error occurred. Please try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = async () => {
    if (!values.email) {
      setErrorMessage('Please enter your email address');
      return;
    }
    
    try {
      setIsLoading(true);
      await axios.post(`${APP_BASE_URL}account/password_reset`, { email: values.email });
      setErrorMessage('Please check your email for password reset instructions.');
    } catch (error) {
      setErrorMessage('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center text-orange">
            Welcome to Hillpad
          </h2>
        </div>

        <div className="mb-6">
          <div className="flex border-b border-gray">
            <button
              className={`flex-1 py-2 text-center ${isLogin ? 'border-b-2 border-orange text-orange' : 'text-gray'}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-center ${!isLogin ? 'border-b-2 border-orange text-orange' : 'text-gray'}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="First name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Last name"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              required
              onChange={handleChange}
            />
            
            {!isLogin && (
              <p className="mt-1 text-xs text-gray">
                Password must be 8-20 characters and include letters, numbers, and special characters
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange text-white py-2 px-4 rounded-md hover:bg-red disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                {isLogin ? "Signing in..." : "Creating account..."}
              </div>
            ) : (
              isLogin ? "Sign In" : "Create Account"
            )}
          </button>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-4 relative left-[20%]">
            <GoogleAuth text={isLogin ? 'signin_with' : 'signup_with'} authPage={true} />
          </div>

          {isLogin && (
            <div className="text-center mt-4">
              <button
                type="button"
                className="text-sm text-orange hover:underline"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>
          )}
        </form>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative">
            <button
              onClick={() => setErrorMessage('')}
              className="absolute top-2 right-2 text-red-700"
            >
              ×
            </button>
            <p>{errorMessage}</p>
            {errorMessage === "No active account found with the given credentials" && (
              <button 
                onClick={() => {
                  setErrorMessage('');
                  setIsLogin(false);
                }} 
                className="mt-2 bg-orange text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
              >
                Sign Up
              </button>
            )}
          </div>
        )}

        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center">
              <svg 
                className="w-12 h-12 text-green-500 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-xl font-semibold">
                {isLogin ? "Login Successful!" : "Sign Up Successful!"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;