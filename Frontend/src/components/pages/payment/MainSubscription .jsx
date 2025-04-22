import React, { useEffect } from 'react';
import SubscriptionInfo from './SubscriptionInfo';
import Feature from './Feature';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { removeSubscription, verifyActiveSubscription } from '../../../store/subscriptionSlice';
import { STATUS } from '../../../globals/components/enumStatus/Status';
import Plan from './Plan';
import { toast } from "react-toastify";

const MainSubscription = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, subscription } = useSelector((state) => state.subscription);

    useEffect(() => {
        dispatch(verifyActiveSubscription());
    }, [dispatch]);

    const handleCancelSubscription = () => {
        if (subscription && subscription._id) {
            dispatch(removeSubscription(subscription._id));
        } else {
            toast.error("Subscription not found.");
        }
    };

    console.log("subscription", subscription)

    return (
        <div className="min-h-screen  text-white">
            {status === STATUS.SUCCESS && subscription ? (
                <section className="px-4 md:px-10 lg:px-20 py-10">
                    <div className="max-w-8xl mx-auto space-y-12">
                        {/* Header */}
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                            <h2 className="text-3xl sm:text-4xl font-bold">Your Subscription</h2>
                            <Link to="/paymentHistory"> <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition">
                                View Payment History
                            </button></Link>
                        </div>
                        <p className="text-base sm:text-lg text-gray-400">
                            Manage your subscription and enjoy premium features.
                        </p>


                        {/* Subscription Details */}
                        <div className="bg-gradient-to-br from-neutral-900 via-black to-neutral-950 p-8 sm:p-10 rounded-2xl shadow-xl border border-neutral-800">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-3xl font-bold text-white">Active Plan</h3>
                                    <p className="text-sm text-gray-400">Your current subscription details</p>
                                </div>
                                <div className="px-4 py-1 text-sm font-medium rounded-full border 
                        border-gray-700 text-white 
                        bg-gradient-to-tr from-black via-neutral-800 to-black 
                        shadow-inner">
                                    {subscription.status === 'active' ? (
                                        <span className="text-green-500">Active</span>
                                    ) : (
                                        <span className="text-red-500">Inactive</span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3 text-base text-gray-300">
                                <p>
                                    <span className="text-gray-400">Plan:</span>{" "}
                                    <span className="text-white font-semibold">{subscription.planName}</span>
                                </p>
                                <p>
                                    <span className="text-gray-400">Valid Until:</span>{" "}
                                    <span className="text-white font-semibold">{new Date(subscription.endDate).toLocaleDateString()}</span>
                                </p>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => {
                                        toast.info("You are already subscribed.");

                                    }}
                                    className="bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 
               text-white font-semibold py-2.5 px-6 rounded-lg border border-neutral-700 
               shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    Renew / Change Plan
                                </button>

                                <button
                                    onClick={handleCancelSubscription}
                                    className="bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 
                   text-white font-semibold py-2.5 px-6 rounded-lg border border-neutral-700 
                   shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    Cancel Subscription
                                </button>
                            </div>

                        </div>


                        {/* Benefits Section */}
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Why Stay Subscribed?</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[
                                        ["🎵 Premium Access", "Unlimited streaming with no ads."],
                                        ["⬇️ Offline Mode", "Download songs and listen offline."],
                                        ["💬 Priority Support", "Get quicker help anytime."],
                                    ].map(([title, desc]) => (
                                        <div className="bg-neutral-800 p-5 rounded-lg shadow-md" key={title}>
                                            <h4 className="text-lg font-semibold mb-2">{title}</h4>
                                            <p className="text-sm text-gray-400">{desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Plan Comparison Table */}
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Compare Plans</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full table-auto border-collapse border border-gray-700 text-sm sm:text-base">
                                        <thead className="bg-neutral-800">
                                            <tr>
                                                <th className="p-3 border border-gray-700">Feature</th>
                                                <th className="p-3 border border-gray-700">Free</th>
                                                <th className="p-3 border border-gray-700">Premium</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-neutral-900">
                                            {[
                                                ["Ad-Free Listening", "❌", "✅"],
                                                ["Offline Access", "❌", "✅"],
                                                ["Song Download", "❌", "✅"],

                                            ].map(([feature, free, premium]) => (
                                                <tr key={feature}>
                                                    <td className="p-3 border border-gray-700">{feature}</td>
                                                    <td className="p-3 border border-gray-700 text-center">{free}</td>
                                                    <td className="p-3 border border-gray-700 text-center">{premium}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>


                                </div>
                            </div>

                            {/* Final Note */}
                            <div className="text-center text-gray-400 text-sm sm:text-base">
                                <p>Thank you for being a valued listener. We’re constantly improving to give you the best experience. 🎧</p>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="px-4 md:px-10 lg:px-20 py-10 ">
                    <SubscriptionInfo />
                    <Plan />
                    <Feature />
                </div>
            )}
        </div>
    );
};

export default MainSubscription;
