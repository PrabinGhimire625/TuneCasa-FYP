import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/user/forgetPassword", { email })
      .then((res) => {
        console.log("Response:", res); 
        toast.success("Check your email for the OTP");
        navigate("/verifyOtp"); 
      })
      .catch((err) => {
        console.error("Error:", err); 
        toast.error("Email is not regster in the system");
      });
  };

  return (
    <div className="flex justify-center  bg-center bg-[url('path/to/your/background.jpg')]">
      <div className="w-[420px] bg-transparent mt-16 h-[250px] text-white rounded-lg border-2 border-white/20 shadow-lg backdrop-blur-md p-8">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl text-center font-bold mb-6">Forgot Password</h1>
          <div className="relative mb-6">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] bg-transparent border border-gray-300 rounded-full text-white text-lg px-6 py-2 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full h-[45px] bg-white text-black font-bold rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
          >
            Send
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default ForgetPassword;
