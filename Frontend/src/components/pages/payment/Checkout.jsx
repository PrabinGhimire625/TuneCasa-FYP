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

  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSubscription(planName));
    // Optionally redirect to success page
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-10">
      <div className="bg-gray-800 rounded-3xl shadow-xl w-full max-w-md p-8 sm:p-10 text-white">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-100">
          Complete Your Subscription
        </h2>

        {/* Plan Overview */}
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
          <img src={assets.tunecasaLogo} alt="Music Premium" className="w-16 h-16 rounded-full border-2 border-gray-500 shadow-md" />
          <div>
            <p className="text-xl font-semibold text-gray-200">Music Premium Membership</p>
            <p className="text-sm text-gray-400">Ad-free, unlimited music + exclusive perks</p>
          </div>
        </div>

        {/* Pricing Details */}
        <div className="mb-6">
          <p className="text-gray-400 font-medium text-sm">Billing starts: {currentDate}</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">${PLAN_PRICES[planName]} <span className="text-lg font-normal text-gray-400">/mo</span></p>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <p className="text-gray-300 font-medium mb-2">Choose your payment method</p>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="payment" defaultChecked className="accent-purple-500" />
            <span className="text-gray-400 text-sm">Pay via Khalti</span>
          </label>
        </div>

        {/* Payment Button */}
        <div 
          onClick={handleSubmit}
          className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-300 cursor-pointer"
        >
          <img src={assets.khalti} alt="Khalti" className="w-6 h-6 mr-2" />
          Confirm with Khalti
        </div>

        {/* Benefits */}
        <div className="mt-6 text-sm text-gray-400 bg-gray-700 p-4 rounded-lg border border-gray-600">
          <p className="font-semibold mb-2 text-gray-200">With Premium, you get:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Unlimited, uninterrupted music</li>
            <li>Exclusive artist content & early access</li>
            <li>Offline music for on-the-go</li>
            <li>Special access to live concerts/events</li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="mt-6 text-sm text-gray-400 space-y-4">
          <div>
            <p className="font-semibold text-gray-200">How can I cancel my subscription?</p>
            <p>You can cancel anytime from your account settings.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-200">What payment methods do you accept?</p>
            <p>Currently, we accept Khalti payments — secure and convenient.</p>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 text-sm text-blue-400 hover:text-blue-600 underline w-full text-center"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Checkout;
