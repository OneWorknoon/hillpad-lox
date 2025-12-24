import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../redux/userSlice';
import AnimatedCheckmark from './animatedCheckMark';
import { toast } from 'react-hot-toast';

export default function GoogleAuth({ 
  text, 
  authPage, 
  handleModal,  // Ensure this prop is passed
  setShowLoginForm,  // Ensure this prop is passed
  setShowSuccessModal  // Add this prop to directly control success modal from parent
}) {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const [localShowSuccessModal, setLocalShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseMessage = (response) => {
    const userObject = jwtDecode(response.credential);
    const userDetails = {
      first_name: userObject.given_name,
      last_name: userObject.family_name,
      email: userObject.email
    };

    if (text === 'signin_with') {
      axios.post(
        `${APP_BASE_URL}account/google_login`,
        { credential: response.credential },
        { headers: { 'Content-Type': 'application/json' } }
      )
        .then((loginRes) => {
          dispatch(fetchUser(userDetails));
          
          // Hide the login form
          setShowLoginForm(false);
          
          // Show success modal (using either local or parent state)
          if (setShowSuccessModal) {
            setShowSuccessModal(true);
          } else {
            setLocalShowSuccessModal(true);
          }
          
          setTimeout(() => {
            // Close success modal
            if (setShowSuccessModal) {
              setShowSuccessModal(false);
            } else {
              setLocalShowSuccessModal(false);
            }
            
            // Close modal
            handleModal();
            
            // Navigate or reload
            if (authPage) navigate("/");
            window.location.reload();
          }, 2000);
        })
        .catch((loginErr) => {
          console.error('Login error:', loginErr.response ? loginErr.response.data : loginErr.message);
          toast.error('Login failed. Please try again.');
        });
    } else {
      axios.post(
        `${APP_BASE_URL}account/google_signup`,
        { credential: response.credential },
        { headers: { 'Content-Type': 'application/json' } }
      )
        .then((res) => {
          if (res.status === 201) {
            axios.post(
              `${APP_BASE_URL}account/google_login`,
              { credential: response.credential },
              { headers: { 'Content-Type': 'application/json' } }
            )
              .then((loginRes) => {
                dispatch(fetchUser(userDetails));
                
                // Hide the login form
                setShowLoginForm(false);
                
                // Show success modal (using either local or parent state)
                if (setShowSuccessModal) {
                  setShowSuccessModal(true);
                } else {
                  setLocalShowSuccessModal(true);
                }
                
                setTimeout(() => {
                  // Close success modal
                  if (setShowSuccessModal) {
                    setShowSuccessModal(false);
                  } else {
                    setLocalShowSuccessModal(false);
                  }
                  
                  // Close modal
                  handleModal();
                  
                  // Navigate or reload
                  navigate('/post-sign-up?google=true');
                  window.location.reload();
                }, 2000);
              })
              .catch((loginErr) => {
                console.error('Login error:', loginErr.response ? loginErr.response.data : loginErr.message);
                toast.error('Signup successful, but login failed. Please try logging in.');
              });
          }
        })
        .catch((err) => {
          console.error('Signup error:', err.response ? err.response.data.error : err.message);
          toast.error(err.response?.data?.error || 'Signup failed. Please try again.');
        });
    }
  };

  const errorMessage = (error) => {
    console.log(error);
    toast.error('An error occurred. Please try again.');
  };

  return (
    <div className="google-auth-container">
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} text={text} />
      
      {(localShowSuccessModal) && (
        <AnimatedCheckmark
          isOpen={true}
          onClose={() => {
            setLocalShowSuccessModal(false);
            handleModal();
          }}
          text={text === 'signin_with' ? "Login Successful!" : "Sign Up Successful!"}
        />
      )}
    </div>
  );
}