import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, resetStatus } from '../../../store/authSlice';
import { STATUS } from '../../../globals/enumStatus/Status';
import tunecasaLogo from '../../../assets/tunecasaLogo.png';
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  // Handle input change and clear error message
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
    setMessage(""); // Clear message on input change
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData)); // Dispatch login action
  };

  // Manage login status and messages
  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      setMessage("Login successful! Redirecting...");
      dispatch(resetStatus()); // Reset the status
      toast.success("Admin successfull login")
      navigate("/")
    } else if (status === STATUS.ERROR) {
      setMessage("Your email or password is incorrect!");
    } else {
      setMessage(""); // Clear the message for other statuses
    }
  }, [status, dispatch, navigate]);

  const messageStyle = {
    color: status === STATUS.ERROR ? "red" : "green",
    marginTop: "10px",
    textAlign: "center"
  };

  return (
    <div className="flex  justify-center  h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 mt-16 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 h-[480px]">
        <div className="text-center mb-6">
          <img
            src={tunecasaLogo}
            className="w-20 h-20 mx-auto mb-2 rounded-full object-cover"
            alt="Logo"
          />
        </div>
        <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Sign in
          </button>
          <p className="mt-3 text-center text-sm text-gray-500 underline">
       
        </p>

        </form>

        {/* Show the message dynamically */}
        {message && <p style={messageStyle}>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
