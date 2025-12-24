import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Eye, EyeOff } from 'lucide-react';
import logo from '../../assets/images/hillpad-transparent.png'
import config from "../../config";
import { showLoginModal } from '../../redux/loginSlice';

const SetNewPassword = () => {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const APP_BASE_URL = config.VITE_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Password visibility state
    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        confirmPassword: false
    });

    // Password validation regex
    const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    const [passwordErrors, setPasswordErrors] = useState({
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        document.title = "Set New Password | hillPad - Partner Dashboard";
        const bodyElement = document.body;
        bodyElement.classList.add('flex', 'items-center', 'justify-center', 'min-h-screen', 'bg-slate-50', 'font-sans');
        return () => {
            bodyElement.classList.remove('flex', 'items-center', 'justify-center', 'min-h-screen', 'bg-slate-50', 'font-sans');
        };
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        
        // Update form data
        setFormData(prev => ({ ...prev, [id]: value }));

        // Reset specific error when typing
        setPasswordErrors(prev => ({ ...prev, [id]: '' }));

        // Validate password
        if (id === 'password') {
            if (!passwordPattern.test(value)) {
                setPasswordErrors(prev => ({
                    ...prev, 
                    password: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
                }));
            }
        }

        // Check password match when confirm password changes
        if (id === 'confirmPassword' && formData.password !== value) {
            setPasswordErrors(prev => ({
                ...prev, 
                confirmPassword: "Passwords do not match"
            }));
        }
    };

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {
            password: '',
            confirmPassword: ''
        };

        // Validate password
        if (!formData.password) {
            errors.password = "Password is required";
            isValid = false;
        } else if (!passwordPattern.test(formData.password)) {
            errors.password = "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!";
            isValid = false;
        }

        // Validate confirm password
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setPasswordErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset error messages
        setErrorMessage("");

        // Validate form
        if (!validateForm()) {
            return;
        }

        const urlParams = new URLSearchParams(location.search);
        const user = urlParams.get('user');
        const token = urlParams.get('token');

        if (!user || !token) {
            setErrorMessage("Invalid reset link. Please request a new password reset.");
            return;
        }

        setIsLoading(true);

        try {
            const setPasswordUrl = `${APP_BASE_URL}/account/password_reset_confirm/${encodeURIComponent(user)}/${encodeURIComponent(token)}`;
            await axios.post(setPasswordUrl, { new_password: formData.password });
            setSuccessMessage("Password reset successful. Please login.");
            
            // Delay to show success message, then show login modal
            setTimeout(() => {
                // Dispatch the show login modal action
                dispatch(showLoginModal());
                
                // Use window.location for a full page reload to ensure modal shows
                window.location.href = "/";
            }, 2000);
        } catch (error) {
            console.error('Error:', error.response);
            setErrorMessage(error.response?.data?.detail || error.response?.data?.error || error.response?.data?.new_password[0] || "Failed to reset password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginClick = () => {
        // Dispatch show login modal action
        navigate('/?login=true');
    };

    return (
        <div className="w-[100vw] font-sans font-thin relative sm:right-10 max-w-md p-8 bg- rounded-lg shaow-md">
            <img src={logo} alt="hillPad Logo" className="h-8 mx-auto mb-8" />
            
            <h2 className="text-xl font-sans font-thin text-tmpt_navy_blue text-center mb-2">Set a New Password</h2>
            
            <p className="text-center text-sm text-grey mb-6">
                Your new password should be distinct from any of your prior passwords
            </p>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="relative">
                    <label htmlFor="password" className="block text-sm text-grey mb-1">Password</label>
                    <input
                        type={passwordVisibility.password ? "text" : "password"}
                        id="password"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
                            ${passwordErrors.password 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-light_grey focus:ring-custom'
                            }`}
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => togglePasswordVisibility('password')}
                        className="absolute right-3 top-9 text-grey"
                    >
                        {passwordVisibility.password ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                    {passwordErrors.password && (
                        <p className="text-orange text-xs mt-1">{passwordErrors.password}</p>
                    )}
                </div>
                <div className="relative">
                    <label htmlFor="confirmPassword" className="block text-sm text-grey mb-1">Confirm Password</label>
                    <input
                        type={passwordVisibility.confirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
                            ${passwordErrors.confirmPassword 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-light_grey focus:ring-custom'
                            }`}
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                        className="absolute right-3 top-9 text-grey"
                    >
                        {passwordVisibility.confirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                    {passwordErrors.confirmPassword && (
                        <p className="text-orange text-xs mt-1">{passwordErrors.confirmPassword}</p>
                    )}
                </div>
                {errorMessage && (
                    <p className="text-orange text-sm text-center">{errorMessage}</p>
                )}
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange hover:bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red"
                    disabled={isLoading}
                >
                    {isLoading ? "Resetting Password..." : "Reset Password"}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-grey">
                     <button 
                         onClick={handleLoginClick} 
                         className="text-black hover:underline"
                     >
                         Click here to login
                     </button>
                </p>
            </div>
        </div>
    );
};

export default SetNewPassword;