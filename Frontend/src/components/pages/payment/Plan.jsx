import React from 'react';
import { Link } from "react-router-dom";

const Plan = () => {
    return (
        <>
                <section className=" ">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-extrabold text-white sm:text-4xl">
                                Choose the Perfect Plan for Your Music Journey
                            </h2>
                            <p className="mt-4 text-xl text-gray-400">
                                Simple, transparent pricing for an uninterrupted music experience.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Individual Plan */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-semibold text-white">Get started</h3>
                                    <p className="mt-4 font-bold text-gray-400">with our individual features.</p>

                                </div>
                                <div className="mb-8">
                                    <span className="text-5xl font-extrabold text-white">$2.99</span>
                                    <span className="text-xl font-medium text-gray-400">/mo</span>
                                </div>
                                <ul className="mb-8 space-y-4 text-gray-400">
                                    <li className="flex items-center">
                                        ✅ Unlimited skips
                                    </li>
                                    <li className="flex items-center">
                                        ✅ Offline downloads
                                    </li>
                                    <li className="flex items-center">
                                        ✅ Ad-free experience
                                    </li>
                                </ul>
                                <Link to={`/checkout/${encodeURIComponent("monthly")}`} 
                                    className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                    Try this Premium
                                </Link>
                            </div>

                            {/* Student Plan */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-semibold text-white">For 6 months</h3>
                                    <p className="mt-4 text-gray-400">of uninterrupted music access.</p>
                                </div>
                                <div className="mb-8">
                                    <span className="text-5xl font-extrabold text-white">$15.99</span>
                                    <span className="text-xl font-medium text-gray-400">/6 mo</span>
                                </div>
                                <ul className="mb-8 space-y-4 text-gray-400">
                                    <li className="flex items-center">
                                        ✅ Unlimited skips
                                    </li>
                                    <li className="flex items-center">
                                        ✅ Offline downloads
                                    </li>
                                    <li className="flex items-center">
                                        ✅ Ad-free experience
                                    </li>
                                </ul>
                                <Link to={`/checkout/${encodeURIComponent("halfYear")}`} 
                                    className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                     Try this Premium
                                </Link>
                            </div>

                            {/* Family Plan */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-semibold text-white">For a full year</h3>
                                    <p className="mt-4 text-gray-400">For a full year of uninterrupted music access.</p>
                                </div>
                                <div className="mb-8">
                                    <span className="text-5xl font-extrabold text-white">$29.99</span>
                                    <span className="text-xl font-medium text-gray-400">/yr</span>
                                </div>
                                <ul className="mb-8 space-y-4 text-gray-400">
                                    <li className="flex items-center">
                                        ✅ Unlimited skips
                                    </li>
                                    <li className="flex items-center">
                                        ✅ Offline downloads
                                    </li>
                                    <li className="flex items-center">
                                        ✅ Ad-free experience
                                    </li>
                                </ul>
                                <Link to={`/checkout/${encodeURIComponent("yearly")}`} 
                                    className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                     Try this Premium
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
        </>
    );
};

export default Plan;
