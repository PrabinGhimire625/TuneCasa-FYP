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
    const navigate = useNavigate();
    const { status, subscription } = useSelector((state) => state.subscription);

    useEffect(() => {
        dispatch(verifyActiveSubscription());
    }, [dispatch]);

    return (
        <>
            {status === STATUS.SUCCESS && subscription ? (
                <section className="min-h-screen py-16 text-white">
                    <div className="max-w-7xl mx-auto text-center px-6 sm:px-8 lg:px-12">
                        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
                            Your Active Subscription
                        </h2>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8">
                            You are subscribed to the <span className="font-semibold">{subscription?.planName}</span> plan.
                        </p>

                        <div className="bg-gray-900 bg-opacity-60 p-12 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <h3 className="text-3xl sm:text-4xl font-semibold mb-6">
                                {subscription?.planName}
                            </h3>

                            <p className="text-xl sm:text-2xl text-gray-300 mb-2">
                                <span className="font-semibold text-white">Valid Until:</span> 
                                {new Date(subscription?.endDate).toLocaleDateString()}
                            </p>

                            <p className="text-xl sm:text-2xl text-gray-300 mb-2">
                                <span className="font-semibold text-white">Amount Paid:</span> 
                                ${subscription?.amount}
                            </p>

                            <p className="text-xl sm:text-2xl text-gray-300 mb-4">
                                <span className="font-semibold text-white">Status:</span> 
                                <span className={`font-semibold ${subscription?.status === "active" ? "text-green-500" : "text-red-500"}`}>
                                    {subscription?.status === "active" ? "Active" : "Expired"}
                                </span>
                            </p>

                            <button
                                onClick={() => navigate("/plan")}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                                Renew or Change Plan
                            </button>
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="mt-16 px-6 sm:px-8 lg:px-12 text-center">
                        <h3 className="text-3xl sm:text-4xl font-semibold mb-8">
                            Benefits of Your Plan
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                <div className="text-purple-400 text-4xl mb-4">
                                    <i className="fas fa-music"></i>
                                </div>
                                <h4 className="text-xl sm:text-2xl font-semibold mb-4">Exclusive Music Access</h4>
                                <p className="text-lg sm:text-xl text-gray-300">
                                    Enjoy uninterrupted access to premium music tracks.
                                </p>
                            </div>

                            <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                <div className="text-blue-400 text-4xl mb-4">
                                    <i className="fas fa-play-circle"></i>
                                </div>
                                <h4 className="text-xl sm:text-2xl font-semibold mb-4">Offline Mode</h4>
                                <p className="text-lg sm:text-xl text-gray-300">
                                    Download your favorite tracks and listen offline anytime.
                                </p>
                            </div>

                            <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                <div className="text-green-400 text-4xl mb-4">
                                    <i className="fas fa-gift"></i>
                                </div>
                                <h4 className="text-xl sm:text-2xl font-semibold mb-4">Exclusive Gifts</h4>
                                <p className="text-lg sm:text-xl text-gray-300">
                                    Get surprise gifts and offers from artists and other partners.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Customer Testimonials Section */}
                    <div className="mt-16 bg-gray-900 py-16 px-6 sm:px-8 rounded-xl shadow-xl text-center">
                        <h3 className="text-3xl sm:text-4xl font-semibold mb-8 text-white">
                            What Our Customers Say
                        </h3>

                        <div className="flex justify-center space-x-8">
                            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white hover:bg-purple-600 transform transition-all duration-300 hover:scale-105">
                                <p className="italic text-lg mb-4">
                                    "This is the best music experience I've had. Totally worth it!"
                                </p>
                                <span className="font-semibold">- John Doe</span>
                            </div>

                            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white hover:bg-purple-600 transform transition-all duration-300 hover:scale-105">
                                <p className="italic text-lg mb-4">
                                    "Amazing collection and seamless offline mode. Love it!"
                                </p>
                                <span className="font-semibold">- Jane Smith</span>
                            </div>
                        </div>
                    </div>

                    {/* Featured Plans Section */}
                    <div className="mt-16 text-center">
                        <h3 className="text-3xl sm:text-4xl font-semibold text-white mb-8">
                            Explore Other Plans
                        </h3>
                        <div className="flex justify-center space-x-6">
                            <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-white hover:bg-purple-600 transition-all duration-300 transform hover:scale-105">
                                <h4 className="text-2xl mb-4">Basic Plan</h4>
                                <p className="text-lg mb-4">Affordable plan for casual listeners.</p>
                                <button
                                    onClick={() => navigate("/plan/basic")}
                                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-300"
                                >
                                    Learn More
                                </button>
                            </div>
                            <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-white hover:bg-purple-600 transition-all duration-300 transform hover:scale-105">
                                <h4 className="text-2xl mb-4">Premium Plan</h4>
                                <p className="text-lg mb-4">For the ultimate music experience.</p>
                                <button
                                    onClick={() => navigate("/plan/premium")}
                                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-300"
                                >
                                    Learn More
                                </button>
                            </div>
                            <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-white hover:bg-purple-600 transition-all duration-300 transform hover:scale-105">
                                <h4 className="text-2xl mb-4">Family Plan</h4>
                                <p className="text-lg mb-4">Share with your family at a discounted rate.</p>
                                <button
                                    onClick={() => navigate("/plan/family")}
                                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-300"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="px-4 sm:px-6 md:px-10 lg:px-20">
                    <SubscriptionInfo />
                    <Plan />
                    <Feature />
                </div>
            )}
        </>
    );
};

export default MainSubscription;
