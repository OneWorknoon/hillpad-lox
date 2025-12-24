import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/hillpad-transparent.png';
import AuthIcon from "./AuthIcon";

const PartnerLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sign In | hillPad - Partner Dashboard";
        const bodyElement = document.body;
        bodyElement.style.backgroundImage = "url('https://images.pexels.com/photos/7972315/pexels-photo-7972315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch("YOUR_API_ENDPOINT_HERE", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                navigate("/email-sent");
            } else {
                setErrorMessage("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full  p-8 relative">
            <div className="backdrop-blur-md bg-white/0 rounded-lg p-9 sm:w-[200%] relative sm:right-[50%]  shadow-lg">
                <img src={logo} alt="hillPad Logo" className="h-8 mx-auto mb-6 filter brightness-4 " />
                <h2 className="text-xl   text-white text-center mb-2">Welcome Back!</h2>
                <h4 className="text-center   text-white/90 mb-8">Sign in to Partner's Dashboard</h4>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-white text-sm mb-2">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                                placeholder="Enter your email"
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
                        <label className="block text-white text-sm mb-2">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                                placeholder="Enter your password"
                                required
                            />
                            <span className="absolute right-3 top-2.5 text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 rounded border-white/30 bg-white/20 text-white focus:ring-white/50"
                        />
                        <label className="ml-2  text-grey">Remember me</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-orange hover:bg-red border border-transparent rounded-md text-white font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/50"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>

                    <div className="text-center">
                        <p className="text-white text-bold">
                            Can't remember password?{" "}
                            <Link to="/dashboard/reset-pw" className="text-orange hover:text-red">
                                Reset
                            </Link>
                        </p>
                    </div>
                </form>

                <hr className="my-6 border-white/20" />

                <div className="text-center">
                    <p className="text-white text-sm">
                        Don't have an account?{" "}
                        <Link to="/dashboard/partner/register" className="text-orange hover:text-red">
                            SignUp
                        </Link>
                    </p>
                </div>

            
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

export default PartnerLogin;