import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/hillpad-transparent.png'
import AuthIcon from "./AuthIcon";
const  AccountOfficerLogin = () => {
    React.useEffect(() => {
        document.title = "Sign In | hillPad -  Account Officer Dashboard";
        const bodyElement = document.body;
        bodyElement.classList.add('flex', 'items-center', 'justify-center', 'min-h-screen', 'bg-slate-50', 'font-sans');
        return () => {
            bodyElement.classList.remove('flex', 'items-center', 'justify-center', 'min-h-screen', 'bg-slate-50', 'font-sans');
        };
    }, []);

    return (
        <div className="w-[100vw]  font-sans font-thin relative sm:right-10 max-w-md p-8 bg-white rounded-lg shadow-md">

            <img src={logo} alt="hillPad Logo" className="h-8 mx-auto mb-8" />
            <h2 className="text-xl font-sans font-thin text-tmpt_blue text-center text-custom-500 mb-2">Welcome Back!</h2>
            <h4 className="text-center font-sans font-thin text-grey mb-8">Sign in to  Account Officer's Dashboard</h4>

            <form className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm  text-grey mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full bg-tmpt_light_blue px-3 py-2 border border-none rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm  text-grey mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full bg-tmpt_light_blue px-3 py-2 border border-none rounded-md focus:outline-none focus:ring-2 focus:ring-custom-500"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4 text-custom-500 focus:ring-custom-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-grey">Remember me</label>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  text-white bg-orange hover:bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-500"
                >
                    Sign In
                </button>
            </form>

            <div className="relative my-2 right-[20%] top-[20%]">
                <p className="text-center  text-sm text-grey">
                    Can't remember password? <Link to="/dashboard/reset-pw" className=" text-orange hover:text-custom-600">Reset</Link>
                </p>
            </div>
            <hr className="opacity-20" />
            <div className="mt-6">
                <p className="text-center text-sm text-grey">
                    Don't have an account? <Link to="/dashboard/account-officer/register" className=" text-orange hover:text-custom">SignUp</Link>
                </p>
            </div>
            <AuthIcon />
        </div>
    );
};

export default  AccountOfficerLogin;