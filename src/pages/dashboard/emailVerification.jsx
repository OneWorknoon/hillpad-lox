import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/hillpad-transparent.png";

const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Extract email from URL parameters
    const searchParams = new URLSearchParams(location.search);
    const emailFromParams = searchParams.get("email");
    
    if (emailFromParams) {
      setEmail(emailFromParams);
    }

    document.title = "Email Verification Sent | hillPad - Dashboard";
    const bodyElement = document.body;
    bodyElement.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "min-h-screen",
      "bg-slate-50",
      "font-sans"
    );
    return () => {
      bodyElement.classList.remove(
        "flex",
        "items-center",
        "justify-center",
        "min-h-screen",
        "bg-slate-50",
        "font-sans"
      );
    };
  }, [location]);

  const resendEmail = async () => {
    if (!email) {
      setResponseMessage("No email address found. Please contact support.");
      return;
    }

    setIsLoading(true);
    setResponseMessage(""); // Clear previous message

    try {
      const response = await fetch("https://api.hillpad.com/api/account/resend-verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message || "Verification email resent successfully"); // Success message
      } else if (data.error === "No user found with this email address") {
        setResponseMessage("No user found with this email address");
      } else {
        setResponseMessage("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending resend email request:", error);
      setResponseMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] sm:w-[400px] bg-white p-6 rounded-lg shadow-lg">
      <img src={logo} alt="hillPad Logo" className="h-12 mx-auto mb-6" />

      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-medium text-gray-800 mb-2">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          We've sent a verification link to {email}. Please check your inbox
          to verify your account.
        </p>
        <p className="text-sm text-gray-500">
          Didn't receive the email?{" "}
          {isLoading ? (
            <span className="text-orange">Resending...</span>
          ) : (
            <span
           
            className="text-orange cursor-pointer hover:underline font-semibold"
            onClick={resendEmail} 
          >
            Resend
          </span>
          )}
        </p>
        {responseMessage && <p className="mt-4 text-sm">{responseMessage}</p>}
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <Link
          to="https://hillpad.com/contact-us/"
          className="w-full text-sm text-center text-orange hover:underline"
          
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default EmailVerification;