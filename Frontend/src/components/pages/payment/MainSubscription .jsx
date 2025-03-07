import React, { useEffect } from 'react';
import SubscriptionInfo from './SubscriptionInfo';
import Feature from './Feature';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { verifyActiveSubscription } from '../../../store/subscriptionSlice';
import { STATUS } from '../../../globals/components/enumStatus/Status';
import Plan from './Plan';

const MainSubscription = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { status, subscription } = useSelector((state) => state.subscription);
    console.log("Subscription is ", subscription);
    console.log("Status is ", status);

    useEffect(() => {
        dispatch(verifyActiveSubscription());
    }, [dispatch]);

    return (
        <>
            {/* If subscription exists and status is SUCCESS, show the subscription details */}
            {status === STATUS.SUCCESS && subscription ? (
            <section className="h-full bg-gradient-to-r from-black via-gray-900 to-purple-700 py-12">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold text-white">Your Active Subscription</h2>
                <p className="mt-4 text-lg text-gray-300">
                  You are subscribed to the 
                  <span className="text-white font-semibold"> {subscription?.planName} </span> plan.
                </p>
              </div>
          
              <div className="bg-gray-900 rounded-2xl shadow-lg p-8 text-center">
                <h3 className="text-3xl font-semibold text-white">{subscription?.planName}</h3>
                
                <p className="mt-4 text-lg text-gray-300">
                  <span className="font-semibold text-white">Valid Until: </span>
                  {new Date(subscription?.endDate).toLocaleDateString()}
                </p>
          
                <p className="mt-4 text-lg text-gray-300">
                  <span className="font-semibold text-white">Amount Paid: </span>
                  ${subscription?.amount}
                </p>
          
                <p className="mt-4 text-lg">
                  <span className="font-semibold text-white">Status: </span>
                  <span className={`font-semibold ${subscription?.status === "active" ? "text-green-500" : "text-red-500"}`}>
                    {subscription?.status === "active" ? "Active" : "Expired"}
                  </span>
                </p>
          
                {/* Extend Subscription Button */}
                <button 
                    className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => navigate("/plan")} // Navigate to the plan page
                    >
                    Add a new subscription
                </button>
              </div>
            </div>
          </section>
          
            ) : (
                <>
                 {/* Subscription Info heading part */}
                 <div className='subscriptionInfo'>
                    <SubscriptionInfo />
                </div>
                
                <div className='plan'>
                    <Plan/>
                </div>

                  {/* Feature last part */}
            <div className='feature'>
            <Feature />
        </div>
                  
                </>
            )}

          
        </>
    );
};

export default MainSubscription;
