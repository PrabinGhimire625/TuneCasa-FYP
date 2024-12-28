import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, resetStatus } from '../../../store/authSlice';
import { STATUS } from '../../../globals/enumStatus/Status';
import Sidebar from '../../sidebar/Sidebar';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState(""); // Initialize error message as an empty string

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData)); // Dispatch login action
  };

  // Effect hook to manage login status
  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      dispatch(resetStatus()); // Reset status after successful login
      navigate("/"); 
    } else if (status === STATUS.ERROR) {
      setErrorMessage("Your email or password is incorrect!"); // Show error message if login fails
    } else {
      setErrorMessage(""); // Clear error message for other states (loading or success)
    }
  }, [status, dispatch, navigate]);

  const errorMessageStyle = {
    color: "red",
    marginTop: "10px",
    textAlign: "center"
  };

  return (
    <>
      <div className='flex h-screen bg-stone-900'>
        <Sidebar />
        <div className='flex flex-col flex-1 overflow-y-auto min-h-screen'>
          <div className='p-4'>
            <section className="bg-stone-900 dark:bg-gray-900 pt-8">
              <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white ml-5">
                      Sign in to the admin account
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input
                          type="email"
                          onChange={handleChange}
                          name="email"
                          id="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="email"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                          type="password"
                          onChange={handleChange}
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Sign in
                      </button>
                    </form>

                    {/* Display error message only if login fails */}
                    {errorMessage && (
                      <div style={errorMessageStyle}>
                        <p>{errorMessage}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
