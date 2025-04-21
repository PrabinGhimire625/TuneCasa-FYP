import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

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
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(error.response?.data?.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="relative w-full max-w-md rounded-xl shadow-lg p-8 md:p-10 border border-white">
        {/* Center Icon */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black p-4 rounded-full border border-white">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
          </svg>
        </div>

        {/* Form */}
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-white text-xl font-semibold text-center mb-4">Reset Your Password</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full py-3 px-4 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full py-3 px-4 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full py-3 px-4 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />

          <button
            type="submit"
            className="w-full py-3 text-white font-semibold bg-gradient-to-r from-gray-700 to-gray-900 rounded-md hover:from-gray-600 hover:to-gray-800 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
