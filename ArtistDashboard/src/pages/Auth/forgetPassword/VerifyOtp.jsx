import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/user/verifyOtp", {
        email,
        otp,
      });

      if (response.status === 200) {
        alert(response.data.message); 
        navigate("/resetPassword"); 
      }
    } catch (err) {
      console.log("Error:", err);
      alert(err.response?.data?.message || "Error verifying OTP. Please try again."); 
    }
  };

  return (
    <div className="flex  justify-center bg-gray-900 h-screen overflow-hidden ">
      <div className=" bg-stone-800 w-17/12 lg:w-5/12 md:w-6/12 shadow-3xl mt-10 h-[380px]">
        <form className="p-3 md:p-10" onSubmit={handleSubmit}>
          <h1 className="text-lg md:text-2xl mb-6">Verify OTP</h1>
          <div className="flex items-center mb-6 text-lg md:mb-8">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full py-2 pl-12 bg-gray-200 md:py-4 focus:outline-none"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center mb-6 text-lg md:mb-8">
            <input
              type="text"
              id="otp"
              name="otp"
              className="w-full py-2 pl-12 bg-gray-200 md:py-4 focus:outline-none"
              placeholder="OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button className="w-full p-2 font-medium text-white uppercase bg-gradient-to-b from-gray-700 to-gray-900 md:p-4">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
