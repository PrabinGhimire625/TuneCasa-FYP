import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/artist-assets/assets";
import { useSelector, useDispatch } from "react-redux";
import { STATUS } from "../../globals/components/Status";

const Form = ({ type, onSubmit }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
    bio: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { resetStatus, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (name === "image") {
      const file = files[0];
      setUserData({ ...userData, [name]: file });
    } else {
      setUserData({ ...userData, [name]: value });
    }
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
  }, [status, dispatch]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <img
            src={assets.tunecasaLogo}
            alt="TuneCasa Logo"
            className="w-16 h-16 mx-auto mb-2 rounded-full"
          />
          <h1 className="text-3xl font-extrabold text-white">
            {type === "register" ? "Register as an Artist" : "Artist login"}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {type === "register"
              ? "Join TuneCasa and discover your vibe"
              : "Log in to continue"}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {type === "register" && (
            <div className="relative">
              <label htmlFor="username" className="text-white mb-2 block text-sm">
                Username
              </label>
              <input
                name="username"
                onChange={handleChange}
                type="text"
                placeholder="Username"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>
          )}

          <div className="relative">
            <label htmlFor="email" className="text-white mb-2 block text-sm">
              Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="text-white mb-2 block text-sm">
              Password
            </label>
            <input
              name="password"
              onChange={handleChange}
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 pr-12 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute top-10 right-4 text-sm text-gray-400 cursor-pointer select-none"
            >
              {passwordVisible ? "Hide" : "Show"}
            </span>
          </div>


          {type === "register" && (
            <div className="relative">
              <label htmlFor="bio" className="text-white mb-2 block text-sm">
                Tell us about yourself
              </label>
              <textarea
                name="bio"
                onChange={handleChange}
                placeholder="Tell us about yourself"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full  bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition"
          >
            {type === "register" ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {type === "login" && (
              <Link to="/forgetPassword" className="hover:underline">
                Forgot password?
              </Link>
            )}
          </p>

          <p className="mt-3 text-sm text-gray-300">
            {type === "register" ? (
              <>
                Already have an account?{" "}
                <Link to="/login" className="text-white underline">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <Link to="/register" className="text-white underline">
                  Register now
                </Link>
                <div className="mt-3">
                  <button
                    onClick={() => window.location.href = "http://localhost:5173/login"}
                    className="mt-2 px-4 py-2 bg-gray-900 text-white font-semibold rounded hover:bg-gray-600 transition"
                  >
                    Login as user
                  </button>

                </div>
              </>
            )}
          </p>

          {type === "login" && errorMessage && (
            <p className="text-red-500 mt-3 text-sm">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
