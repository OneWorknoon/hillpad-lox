import { useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";
import config from "../../config";

export default function ResetPassword({ showLogin, handleModal }) {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const [values, setValues] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [resetStatus, setResetStatus] = useState({
    type: "",
    message: "",
  });

  const resetInputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Enter your Email",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      errorMessage: "Please enter a valid email address",
      label: "Email",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResetStatus({ type: "", message: "" });

    try {
      const response = await axios.post(
        `${APP_BASE_URL}account/password_reset`,
        { email: values.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setResetStatus({
          type: "success",
          message: "Password reset instructions have been sent to your email.",
        });
        // Clear the form
        setValues({ email: "" });

        // Automatically return to login after 3 seconds
        setTimeout(() => {
          showLogin();
        }, 3000);
      }
    } catch (error) {
      setResetStatus({
        type: "error",
        message:
          error.response?.data?.detail ||
          "Unable to process your request. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-72 lg:w-88 p-4">
      <h2 className="text-2xl font-bold">Reset Password</h2>
      <p className="text-base text-light_black my-2">Enter your email</p>
      <p className="text-base text-light_black my-4">
        Enter your registered email address. You will receive a link to create a
        new password via email.
      </p>

      <form onSubmit={handleSubmit} className="w-full my-6">
        {resetInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        {resetStatus.message && (
          <div
            className={`p-4 mb-4 rounded-md ${
              resetStatus.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {resetStatus.message}
          </div>
        )}

        <button
          className={`text-white bg-orange font-bold w-full py-4 rounded-md mt-4 
            ${
              isLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-orange-600"
            }`}
          disabled={isLoading}
        >
          {isLoading ? "Sending Reset Link..." : "Reset Password"}
        </button>
      </form>

      <button
        onClick={showLogin}
        className="text-orange text-base hover:underline"
      >
        Return to Sign in
      </button>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
}
