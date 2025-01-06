import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { assets } from '../../assets/artist-assets/assets'
import {useSelector, useDispatch} from "react-redux"
import { STATUS } from "../../globals/components/Status";

const Form = ({ type, onSubmit }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
    bio:""
  });
  
  const [errorMessage, setErrorMessage]=useState("");
  const {resetStatus,status}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  console.log(status)


  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (name === "image") {
      const file = files[0];
      setPreviewImage(URL.createObjectURL(file)); 
      setUserData({
        ...userData,
        [name]: file,
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
  };

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      //dispatch(resetStatus());
      navigate("/");
    } else if (status === STATUS.ERROR) {
      setErrorMessage("Please enter your correct email and password");
    } else {
      setErrorMessage(""); 
    }
  }, [status, dispatch]);
  
  const errorMessageStyle = {
    color: "red",
    marginLeft: "50px",
    marginTop: "10px"
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-stone-900">
      <div className="max-w-md w-full mt-[-110px] bg-white shadow-lg rounded-lg p-5">
        <div className="text-center">
          <img
          src={assets.tunecasaLogo}
          className="w-20 h-20 mx-auto mb-2 rounded-full object-cover"
          alt="Logo"
          />

          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {type === "register" ? "Sign Up" : "Log in"}
          </h1>
        </div>

        {/* signup wth email part */}
        <div className="flex flex-col items-center">
          <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
            <div className="bg-white p-2 rounded-full">
              <svg className="w-4" viewBox="0 0 533.5 544.3">
                <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
              </svg>
            </div>
            <span className="ml-4" >
              {type==="register" ? (<span>Sign Up</span>) : (<span>Login</span>)} with Google</span>
          </button>
        </div>

        {/* Or sign up with email */}
        <div className="my-2 border-b text-center">
          <div className="leading-none px-2 inline-block text-sm text-black tracking-wide font-bold bg-white transform translate-y-1/2">Or {type==="register" ? (<span>sign up</span>):(<span>login</span>)} with e-mail</div>
        </div>
        
        <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
          {type === "register" && (
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              required
            />
          )}
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />
          {type==='register'&&(
             <textarea
            onChange={handleChange}
            type="bio"
            name="bio"
            placeholder="bio"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            
          />
          )}
          
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition-all"
          >
            {type === "register" ? "Sign Up" : "Log in"}
          </button>
        </form>

        <p className="mt-3 text-center text-sm text-gray-500 underline">
         {
          type==='login' && (
            <Link to="/forgetPassword">Forgot password?</Link>
          ) 
         }
        </p>

        <p className="mt-4 text-center text-base text-black">
          {type === "register" ? (
            <>
              Already have an account?{" "}
              <Link
                className="text-blue-600 hover:underline"
                to="/login"
              >
                Sign in here
              </Link>
            </>
          ) : (
            <>
              Not a member?{" "}
              <Link
                className="text-blue-600 hover:underline"
                to="/register"
              >
                Register now
              </Link>
            </>
          )}
        </p>

          { 
    type === 'login' && errorMessage && (
      <p className="error-message " style={errorMessageStyle}>{errorMessage}</p>
    )
  }
      </div>
    </div>
  );
};

export default Form;
