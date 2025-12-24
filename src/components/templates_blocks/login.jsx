import { useState } from "react";
import FormInput from "./FormInput";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast"; // Add this import
import config from "../../config";
import axios from "axios";
import GoogleAuth from "./oAuth";
import { fetchUser } from "../../redux/userSlice";
import AnimatedCheckmark from "./animatedCheckMark";

// Object used like an enum for form states
const FormState = {
  LOGIN: "login",
  REGISTER: "register",
  RESET_PASSWORD: "reset_password",
};

export default function Login({ handleModal }) {
  const APP_BASE_URL = config.VITE_BASE_URL;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState(FormState.LOGIN);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const inputs = {
    [FormState.LOGIN]: [
      {
        id: 1,
        name: "email",
        type: "email",
        placeholder: "Enter your Email",
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        errorMessage: "It should be a valid email address!",
        label: "Email*",
        required: true,
      },
      {
        id: 2,
        name: "password",
        type: "password",
        placeholder: "Enter Password",
        errorMessage:
          "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
        label: "Password*",
        required: true,
      },
    ],
    [FormState.REGISTER]: [
      {
        id: 1,
        name: "first_name",
        type: "text",
        placeholder: "First name",
        title:
          "First name should be 3-16 characters and shouldn't include any special character!",
        label: "First name",
        pattern: "^[A-Za-z0-9]{3,16}$",
        required: true,
      },
      {
        id: 2,
        name: "last_name",
        type: "text",
        placeholder: "Last name",
        title:
          "Last name should be 3-16 characters and shouldn't include any special character!",
        label: "Last name",
        pattern: "^[A-Za-z0-9]{3,16}$",
        required: true,
      },
      {
        id: 3,
        name: "email",
        type: "email",
        placeholder: "Enter your email",
        title: "It should be a valid email address!",
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        label: "Email*",
        required: true,
      },
      {
        id: 4,
        name: "password",
        type: "password",
        placeholder: "Create a password",
        title:
          "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
        label: "Password*",
        pattern:
          "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
        required: true,
      },
    ],
    [FormState.RESET_PASSWORD]: [
      {
        id: 1,
        name: "email",
        type: "email",
        placeholder: "Enter your Email",
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        errorMessage: "It should be a valid email address!",
        label: "Email",
        required: true,
      },
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      switch (formState) {
        case FormState.REGISTER:
          const registerResponse = await axios.post(
            `${APP_BASE_URL}account/register`,
            values,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (registerResponse.status === 201) {
            dispatch(fetchUser(values));
            console.log({ registerResponse });

            navigate(`/post-sign-up?email=${values.email}`);
            handleModal();
            toast.success("Account created successfully!");
          }
          break;

        case FormState.LOGIN:
          const loginResponse = await axios.post(
            `${APP_BASE_URL}account/token`,
            values
          );
          if (loginResponse.status === 200) {
            dispatch(fetchUser(values));
            setShowSuccessModal(true);
            setShowLoginForm(false);
            setTimeout(() => {
              setShowSuccessModal(false);
              handleModal();
              window.location.reload();
            }, 2000);
          }
          break;

        case FormState.RESET_PASSWORD:
          await axios.post(`${APP_BASE_URL}account/password_reset`, {
            email: values.email,
          });
          toast.success(
            "Please check your email for password reset instructions."
          );
          setFormState(FormState.LOGIN);
          break;
      }
    } catch (error) {
      console.error("Error:", error.response);

      if (
        error.response?.data?.detail ===
        "No active account found with the given credentials"
      ) {
        toast.error("No active account found with the given credentials", {
          action: {
            label: "Sign Up",
            onClick: () => {
              setFormState(FormState.REGISTER);
            },
          },
        });
      } else {
        toast.error(
          error.response?.data?.detail ||
            error.response?.data?.email ||
            (error.response?.data?.password
              ? "Ensure password field has at least 8 characters"
              : "") ||
            "An error occurred. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const renderFormHeader = () => {
    switch (formState) {
      case FormState.LOGIN:
        return (
          <>
            <h2>Welcome back.</h2>
            <div className="text-sm text-light_black">
              Don't have an account?{" "}
              <span
                className="text-light underline hover:no-underline px-1 cursor-pointer"
                onClick={() => setFormState(FormState.REGISTER)}
              >
                Create account
              </span>
            </div>
          </>
        );
      case FormState.REGISTER:
        return (
          <>
            <h2>Create an account</h2>
            <div className="text-sm text-light_black">
              Already have an account?{" "}
              <span
                className="text-light no-underline hover:underline px-1 cursor-pointer"
                onClick={() => setFormState(FormState.LOGIN)}
              >
                Sign In
              </span>
            </div>
          </>
        );
      case FormState.RESET_PASSWORD:
        return (
          <>
            <h2 className="text-2xl font-bold">Reset Password</h2>
            <p className="text-base text-light_black my-2">
              Enter your registered email address
            </p>
            <p className="text-base text-light_black my-4">
              You will receive a link to create a new password via email.
            </p>
          </>
        );
    }
  };

  const renderFormButton = () => {
    switch (formState) {
      case FormState.LOGIN:
        return (
          <>
            <div
              className="text-sm text-orange text-right underline hover:no-underline cursor-pointer"
              onClick={() => setFormState(FormState.RESET_PASSWORD)}
            >
              Forgot Password?
            </div>
            <button className="text-white cursor-pointer bg-orange font-bold w-full py-4 my-4 rounded-md">
              Sign In
            </button>
          </>
        );
      case FormState.REGISTER:
        return (
          <button className="text-white bg-orange font-bold w-full py-4 rounded-md cursor-pointer">
            Sign Up
          </button>
        );
      case FormState.RESET_PASSWORD:
        return (
          <>
            <button
              className="text-white bg-orange mb-5 font-bold w-full py-4 rounded-md mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
            <span
              className="text-base mr-3  text-orange cursor-pointer text-left underline hover:no-underline "
              onClick={() => setFormState(FormState.LOGIN)}
            >
              Return to Sign in
            </span>
            <span>or</span>
            <span
              className="text-base ml-3 text-orange cursor-pointer text-left underline hover:no-underline mt-4"
              onClick={() => setFormState(FormState.REGISTER)}
            >
              Sign Up
            </span>
          </>
        );
    }
  };

  return (
    <div className="relative">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          className: "bg-white text-grey border-l-4 border-orange",
          duration: 4000,
          success: {
            className: "bg-green-50 text-green-700 border-l-4 border-green-500",
          },
          error: {
            className: "bg-red-50 text-red-700 border-l-4 border-red-500",
          },
        }}
      />
      {/* Form Container */}
      {showLoginForm && (
        <div className="w-full  loginModal">
          <div className="flex w-full flex-col sm:flex-row h-fit sm:min-w-fit lg:w-full max-w-4xl items-center">
            {/* Image Side */}
            <div
              className="sm:w-1/2 hidden sm:block lg:w-84 bg-cover"
              style={{
                background: `url(${
                  formState === FormState.LOGIN
                    ? "/loginBgi.jpg"
                    : "/signIn.png"
                })`,
                height: "37rem",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />

            {/* Form Side */}
            <div className="sm:w-1/2 p-4 flex flex-col justify-center">
              <div className="mb-6">{renderFormHeader()}</div>

              <form onSubmit={handleSubmit} className="w-full">
                {inputs[formState].map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}

                {renderFormButton()}
              </form>

              {formState !== FormState.RESET_PASSWORD && (
                <button className="text-white font-bold w-full py-4 rounded-md flex items-center lg:gap-x-12 px-4">
                  <GoogleAuth
                    text={
                      formState === FormState.LOGIN
                        ? "signin_with"
                        : "signup_with"
                    }
                    handleModal={handleModal}
                    setShowLoginForm={setShowLoginForm}
                    setShowSuccessModal={setShowSuccessModal} // Pass this if you want to control from parent
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Success and Error Modals */}
      {showSuccessModal && (
        <AnimatedCheckmark
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            handleModal();
          }}
          text={
            formState === FormState.LOGIN
              ? "Login Successful!"
              : "Sign Up Successful!"
          }
        />
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
}
