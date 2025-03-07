import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createSubscription } from '../../../store/subscriptionSlice';
import { assets } from '../../../assets/frontend-assets/assets';

export const PLAN_PRICES = {
  monthly: 2.99,
  halfYear: 15.99,
  yearly: 29.99,
};


const Checkout = () => {
  const { planName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected plan:", planName);
    dispatch(createSubscription(planName));
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-[-50px]">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Complete your purchase</h2>
        <div className="flex items-center gap-4 mb-4">
          <img src={assets.tunecasaLogo} alt="Music Premium" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">Music Premium</p>
            <p className="text-sm text-gray-500">Membership</p>
          </div>
          <span className="ml-auto text-green-500 text-sm">Free trial</span>
        </div>
        <div className="border-t pt-4">
          <p className="font-medium">Monthly charge</p>
          <p className="text-sm text-gray-500">Billing starts: 9 Mar 2025</p>
          <p className="text-lg font-semibold">${PLAN_PRICES[planName]} /mo</p>
        </div>
        <div className="mt-6">
          <p className="mb-2 font-medium">Payment method</p>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" defaultChecked className="accent-blue-500" />
            Pay from Khalti
          </label>
        </div>
        {/* Replace Buy button with Khalti payment image */}
        <div onClick={handleSubmit} className="cursor-pointer mt-6  border-gray border-2 hover:border-2 hover:border-black rounded-lg">
          <img 
            src={assets.khalti} 
            alt="Pay with Khalti" 
            className="w-20 h-auto mx-auto"
          />
      </div>

        <button 
          onClick={() => navigate(-1)} 
          className="w-full text-sm text-blue-600 mt-4 underline">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Checkout;
