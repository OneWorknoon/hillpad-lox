import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from '../../assets/images/hillpad-transparent.png';

const VerifyEmail = () => {
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [error, setError] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const { token1, token2 } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Verify Email | hillPad - Dashboard";
        const bodyElement = document.body;
        bodyElement.classList.add('flex', 'items-center', 'justify-center', 'min-h-screen', 'bg-slate-50', 'font-sans');

        // Automatically verify email on component mount
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`https://api.hillpad.com/api/account/verify-email/${token1}/${token2}/`);
                if (response.status === 200) {
                    const { access_token, refresh_token } = response.data;
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);
                    setVerificationStatus('success');
                    setShowSuccessModal(true);
                    
                    // Start countdown for auto-redirection
                    const countdownTimer = setInterval(() => {
                        setCountdown(prevCountdown => {
                            if (prevCountdown <= 1) {
                                clearInterval(countdownTimer);
                                navigate('/welcome');
                                return 0;
                            }
                            return prevCountdown - 1;
                        });
                    }, 1000);

                    return () => clearInterval(countdownTimer);
                } else {
                    setVerificationStatus('error');
                    setError("An unexpected error occurred.");
                    
                    // Start countdown for auto-redirection
                    const countdownTimer = setInterval(() => {
                        setCountdown(prevCountdown => {
                            if (prevCountdown <= 1) {
                                clearInterval(countdownTimer);
                                navigate('/welcome');
                                return 0;
                            }
                            return prevCountdown - 1;
                        });
                    }, 1000);

                    return () => clearInterval(countdownTimer);
                }
            } catch (error) {
                console.error('Error verifying email:', error);
                setVerificationStatus('error');
                
                if (error.response && error.response.data && error.response.data.detail) {
                    setError(error.response.data.detail);
                } else {
                    setError("An unexpected error occurred.");
                }
                
                // Start countdown for auto-redirection
                const countdownTimer = setInterval(() => {
                    setCountdown(prevCountdown => {
                        if (prevCountdown <= 1) {
                            clearInterval(countdownTimer);
                            navigate('/welcome');
                            return 0;
                        }
                        return prevCountdown - 1;
                    });
                }, 1000);

                return () => clearInterval(countdownTimer);
            }
        };

        verifyEmail();

        return () => {
            bodyElement.classList.remove('flex', 'items-center', 'justify-center', 'min-h-screen', 'bg-slate-50', 'font-sans');
        };
    }, [token1, token2, navigate]);

    const handleContinue = () => {
        navigate('/welcome');
    };

    // Green Checkmark SVG Component
    const GreenCheckmark = () => (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 100 100" 
            className="w-48 h-48 mx-auto mb-6 "
        >
            <circle cx="50" cy="50" r="45" fill="#FF5757" />
            <path 
                d="M25 50 L40 65 L75 30" 
                stroke="white" 
                strokeWidth="8" 
                fill="none" 
                strokeLinecap="round"
            />
        </svg>
    );


    
    return (
        <div className="w-[100vw] font-sans font-thin relative sm:right-10 max-w-md p-8 bg-white rounded-lg shadow-md">
            <img src={logo} alt="hillPad Logo" className="h-8 mx-auto mb-8" />
            
            {verificationStatus === 'success' && (
                <div className="mt-4 mb-6 text-center">
                    <GreenCheckmark />
                    <p className="text-grey text-xl font-semibold mb-4">
                        Email Verified Successfully
                    </p>
                    <p className="text-grey  mb-4">
                        You will be redirected in {countdown} seconds
                    </p>
                    <button 
                        onClick={handleContinue}
                        className="bg-orange text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-300"
                    >
                        Continue 
                    </button>
                </div>
            )}

            {verificationStatus === 'error' && (
                <div className="mt-4 mb-6 text-center">
                    <p className="text-red-600 mb-4">
                        {error || "Verification failed"}
                    </p>
                    <p className="text-red-600 mb-4">
                        You will be redirected in {countdown} seconds
                    </p>
                    <button 
                        onClick={handleContinue}
                        className="bg-orange text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-300"
                    >
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;