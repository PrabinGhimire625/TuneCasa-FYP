import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { STATUS } from "../../../globals/components/enumStatus/Status";
import { assets } from "../../../assets/frontend-assets/assets";

const Form = ({ type, onSubmit }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    setUserData({
      ...userData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
  };

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      navigate("/");
    } else if (status === STATUS.ERROR) {
      setErrorMessage("Please enter your correct email and password");
    } else {
      setErrorMessage("");
    }
  }, [status, navigate]);

  return (
    <div className="w-full max-w-2xl   p-8 sm:p-10 mx-auto">

      <div className="w-full max-w-3xl bg-[#111] shadow-2xl rounded-2xl p-8 sm:p-10 mx-auto">
        <div className="text-center">
          <img
            src={assets.tunecasaLogo}
            className="w-24 h-24 mx-auto mb-6 rounded-full object-cover border border-gray-600"
            alt="Logo"
          />
          <h1 className="text-4xl font-extrabold mb-4 text-white">
            {type === "register" ? "Sign Up" : "Log In"}
          </h1>
        </div>

        <div className="flex flex-col items-center mt-4">
          <button className="w-full font-semibold shadow-sm rounded-lg py-4 bg-gray-800 text-white flex items-center justify-center gap-3 transition-all duration-300 hover:bg-gray-700">
            <div className="bg-black p-2 rounded-full">
              <svg className="w-5" viewBox="0 0 533.5 544.3">
                <path
                  d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                  fill="#4285f4"
                />
                <path
                  d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                  fill="#34a853"
                />
                <path
                  d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                  fill="#fbbc04"
                />
                <path
                  d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                  fill="#ea4335"
                />
              </svg>
            </div>
            <span>
              {type === "register" ? "Sign Up" : "Login"} with Google
            </span>
          </button>
        </div>

        <div className="my-8 border-b border-gray-700 text-center">
          <span className="px-4 text-base text-gray-400 tracking-wide bg-[#111]">
            Or {type === "register" ? "sign up" : "login"} with email
          </span>
        </div>

        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          {type === "register" && (
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Username"
              className="w-full bg-black text-white placeholder-gray-400 text-lg px-5 py-4 border border-gray-600 rounded-lg focus:outline-none focus:border-white"
              required
            />
          )}
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-black text-white placeholder-gray-400 text-lg px-5 py-4 border border-gray-600 rounded-lg focus:outline-none focus:border-white"
            required
          />
          <div className="relative w-full">
            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full bg-black text-white placeholder-gray-400 text-lg px-5 py-4 border border-gray-600 rounded-lg focus:outline-none focus:border-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-white text-black text-lg font-semibold rounded-lg hover:bg-gray-200 transition-all"
          >
            {type === "register" ? "Sign Up" : "Log In"}
          </button>
        </form>

        {type === "login" && (
          <p className="mt-4 text-center text-sm text-gray-400 underline">
            <Link to="/forgetPassword">Forgot password?</Link>
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-300">
          {type === "register" ? (
            <>
              Already have an account?{" "}
              <Link className="text-white underline" to="/login">
                Sign in here
              </Link>



            </>
          ) : (
            <>
              <div className="text-sm text-gray-300 mt-4">
                <p>
                  Not a member?{" "}
                  <Link
                    className="text-white underline underline-offset-2 hover:text-gray-100 transition"
                    to="/register"
                  >
                    Register now
                  </Link>
                </p>

                <div className="mt-3">
                  <button
                    onClick={() => window.location.href = "http://localhost:5174/login"}
                    className="mt-2 px-4 py-2 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition"
                  >
                   Login as artist
                  </button>

                </div>
              </div>
            </>

          )}
        </p>

        {type === "login" && errorMessage && (
          <p className="text-red-500 mt-4 text-center text-sm">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Form;
