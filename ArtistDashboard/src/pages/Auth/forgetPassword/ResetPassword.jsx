import React, { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 

const ResetPassword = () => {
  const [email, setEmail] = useState(""); 
  const [newPassword, setNewPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const resetData = {
      email,
      newPassword,
      confirmPassword,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/user/resetPassword", resetData);
      
      if (response.status === 200) {
        alert("Password reset successfully!");
        navigate("/login"); 
      } else {
        alert("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert(error.response?.data?.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex  justify-center h-screen overflow-hidden bg-gray-900">
      <div className=" mt-16 bg-stone-700 lg:w-5/12 md:w-6/12 h-[400px] shadow-3xl">
        <div className="absolute p-4 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-full left-1/2 md:p-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
          </svg>
        </div>
        <form className="p-3 md:p-10" onSubmit={handleSubmit}>
          <div className="flex items-center mb-6 text-lg md:mb-8">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full py-2 pl-12 bg-gray-200 md:py-4 focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center mb-6 text-lg md:mb-8">
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="w-full py-2 pl-12 bg-gray-200 md:py-4 focus:outline-none"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center mb-6 text-lg md:mb-8">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full py-2 pl-12 bg-gray-200 md:py-4 focus:outline-none"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 font-medium text-white uppercase bg-gradient-to-b from-gray-700 to-gray-900 md:p-4"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
