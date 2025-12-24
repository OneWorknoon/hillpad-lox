import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../redux/userSlice';
import axios from 'axios';
import FormInput from './FormInput';
import GoogleAuth from './oAuth';
import AnimatedCheckmark from './animatedCheckMark';
import config from '../../config';

const AuthModal = ({ isOpen, onClose }) => {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const dispatch = useDispatch();
  const [toggleLogin, setToggleLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const inputs = [
    {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'Enter your Email',
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      errorMessage: 'It should be a valid email address!',
      label: 'Email*',
      required: true
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      placeholder: 'Enter Password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password*',
      required: true
    }
  ];

  const register = [
    {
      id: 1,
      name: 'first_name',
      type: 'text',
      placeholder: 'First name',
      title: "First name should be 3-16 characters and shouldn't include any special character!",
      label: 'First name',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true
    },
    {
      id: 2,
      name: 'last_name',
      type: 'text',
      placeholder: 'Last name',
      title: "Last name should be 3-16 characters and shouldn't include any special character!",
      label: 'Last name',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true
    },
    {
      id: 3,
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      title: 'It should be a valid email address!',
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      label: 'Email*',
      required: true
    },
    {
      id: 4,
      name: 'password',
      type: 'password',
      placeholder: 'Create a password',
      title: 'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password*',
      pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
      required: true
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (!toggleLogin) {
        // Registration
        const response = await axios.post(`${APP_BASE_URL}account/register`, values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 201) {
          dispatch(fetchUser(values));
          onClose();
        } else {
          setErrorMessage('Failed to register. Please try again.');
        }
      } else {
        // Login
        const response = await axios.post(`${APP_BASE_URL}account/token`, values);
        if (response.status === 200) {
          dispatch(fetchUser(values));
          setShowLoginForm(false);
          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
            onClose();
            window.location.reload();
          }, 200000);
        } else {
          setErrorMessage('Invalid credentials. Please try again.');
        }
      }
    } catch (error) {
      if (error.response?.data?.detail === "No active account found with the given credentials") {
        setErrorMessage("No active account found with the given credentials");
      } else {
        setErrorMessage(error.response?.data?.detail || error.response?.data?.email || (error.response?.data?.password ? "Ensure password field has at least 8 characters" : '') || 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toggle = () => {
    setToggleLogin(!toggleLogin);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        {showLoginForm && (
          <div className="w-full loginModal">
            {toggleLogin ? (
              <div className="flex w-full flex-col sm:flex-row h-fit sm:min-w-fit lg:w-full max-w-4xl items-center">
                <div className="sm:w-1/2 hidden sm:block lg:w-84 bg-cover" style={{ background: `url(${'/loginBgi.jpg'})`, height: '37rem', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                  <div className="flex flex-col gap-y-10 text-white bannerBg m-4" />
                </div>
                <div className="sm:w-fit lg:p-4 flex items-center justify-center lg:gap-x-8 mx-4">
                  <div className="w-64 mx-auto flex flex-col justify-center lg:w-fit">
                    <div className="flex flex-col gap-y-3">
                      <div className="font-bold relative top-[10px] sm:top-[0px] left-[20%] sm:left-[0%] text-xl sm:text-2xl leading-normal">
                        <h2>Welcome back.</h2>
                      </div>
                      <div className="text-sm text-light_black">
                        <div>Don't have an account? <span className="text-light underline hover:no-underline px-1 cursor-pointer" onClick={toggle}>Create account</span></div>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full sm:w-78 lg:w-80 mb-2">
                      {inputs.map((input) => (
                        <FormInput
                          key={input.id}
                          {...input}
                          value={values[input.name]}
                          onChange={onChange}
                        />
                      ))}
                      <button className="text-white cursor-pointer bg-orange font-bold w-full py-4 my-4 rounded-md">Sign In</button>
                    </form>
                    <button className="text-white relative left-[11%] sm:left-[10%] font-bold w-full py-4 rounded-md flex items-center lg:gap-x-12 px-4">
                      <GoogleAuth text="signin_with" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-w-fit w-full max-w-4xl items-center">
                <div className="sm:w-1/2 sm:block hidden lg:w-84 bg-cover" style={{ background: `url(${'/signIn.png'})`, height: '37rem', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                </div>
                <div className="w-full sm:w-1/2 sm:p-4 items-center gap-x-0 sm:gap-x-10 mx-4">
                  <div className="flex flex-col">
                    <div className="font-bold relative left-[20%] top-[10px] sm:top-[0%] sm:left-[0%] text-xl sm:text-2xl leading-normal">
                      <h2>Create an account</h2>
                    </div>
                    <div className="text-sm relative left-[15%] top-[10px] sm:top-[0%] sm:left-[0%] text-light_black">
                      <div>Already have an account? <span className="text-light no-underline hover:underline px-1 cursor-pointer" onClick={toggle}>Sign In</span></div>
                    </div>
                  </div>
                  <div className="sm:w-full relative top-[30px] sm:top-[0%] left-[10%] sm:left-[0%] w-10/12">
                    <form onSubmit={handleSubmit} className="w-full mb-6">
                      {register.map((input) => (
                        <FormInput
                          key={input.id}
                          {...input}
                          value={values[input.name]}
                          onChange={onChange}
                        />
                      ))}
                      <button className="text-white bg-orange font-bold w-full py-4 rounded-md cursor-pointer">Sign Up</button>
                    </form>
                    <button className="text-white relative left-[0%] sm:left-[10%] top-[-30px] sm:top-[0%] font-bold w-full py-4 rounded-md flex items-center lg:gap-x-12 px-4">
                      <GoogleAuth text="signup_with" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {showSuccessModal && (
          <AnimatedCheckmark
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            text={toggleLogin ? "Login Successful!" : "Sign Up Successful!"}
          />
        )}
        
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white" />
          </div>
        )}

        {errorMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-red">Error</h3>
                <button onClick={() => setErrorMessage('')} className="text-gray-500 hover:text-gray-700">
                  X
                </button>
              </div>
              <p className="text-gray-700 mb-4">{errorMessage}</p>
              {errorMessage === "No active account found with the given credentials" && (
                <button 
                  onClick={() => {
                    setErrorMessage('');
                    setToggleLogin(false);
                  }} 
                  className="bg-orange text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;