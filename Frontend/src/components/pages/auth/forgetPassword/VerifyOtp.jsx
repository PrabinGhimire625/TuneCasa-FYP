import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Mail, Key } from 'lucide-react'; // Optional: For icons
import { toast } from 'react-toastify';

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
        toast.success(response.data.message);
        navigate("/resetPassword");
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err.response?.data?.message || "Error verifying OTP. Please try again.");
    }
  };

  return (
    <div className="px-4 py-10">
      <div className="w-full  p-8 border border-white rounded-2xl shadow-xl bg-[#121212]">
        <h1 className="text-2xl font-semibold text-center text-white mb-6">Verify OTP</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute top-3.5 left-3 text-gray-500 w-5 h-5" />
            <input
              type="email"
              id="email"
              name="email"
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-200 focus:outline-none text-black"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Key className="absolute top-3.5 left-3 text-gray-500 w-5 h-5" />
            <input
              type="text"
              id="otp"
              name="otp"
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-200 focus:outline-none text-black"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-semibold rounded-md bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
