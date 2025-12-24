import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/hillpad-transparent.png'
import AuthIcon from "./AuthIcon";
const PasswordReset = () => {
    React.useEffect(() => {
        document.title = "Reset Password | hillPad - Partner Dashboard";
        const bodyElement = document.body;
        bodyElement.classList.add('flex', 'items-center', 'justify-center', 'min-h-screen', 'bg-slate-50', 'font-sans');
        return () => {
            bodyElement.classList.remove('flex', 'items-center', 'justify-center', 'min-h-screen', 'bg-slate-50', 'font-sans');
        };
    }, []);

    return (
        <div className="w-[100vw]  font-sans font-thin relative sm:right-10 max-w-md p-8 bg-white rounded-lg shadow-md">
            <img src={logo} alt="hillPad Logo" className="h-8 mx-auto mb-8" />
            
            <h2 className="text-xl font-sans font-thin text-tmpt_blue text-center mb-4">Reset your password</h2>
            
            <h4 className="bg-yellow text-xs bg-opacity-10   text-yellow px-4 py-3 rounded-md mb-6">
                Provide your email address, and instructions will be sent to you
            </h4>
            
            <form className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm text-grey mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full  px-3 py-2 border border-light_grey rounded-md focus:outline-none focus:ring-2 focus:ring-custom-500"
                        placeholder="Enter email"
                    />
                </div>
                
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-orange hover:hover:bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                    Send Reset Link
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-grey">
                    Wait, I remember my password... <Link to="/dashboard/partner/login" className="text-tmpt_blue hover:text-blue">Click here</Link>
                </p>
            </div>
            <AuthIcon />
        </div>
    );
};

export default PasswordReset;