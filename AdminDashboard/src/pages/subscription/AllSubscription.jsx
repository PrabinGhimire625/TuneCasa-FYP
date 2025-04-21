import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CalculateTotalSubscriptionAmount, listAllSubscription } from "../../store/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaDollarSign, FaCalendarAlt, FaUserCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const AllSubscription = () => {
  const dispatch = useDispatch();
  const { subscription, currentMonthSubscriptionAmount } = useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(listAllSubscription());
    dispatch(CalculateTotalSubscriptionAmount());
  }, [dispatch]);

  console.log("currentMonthSubscriptionAmount", currentMonthSubscriptionAmount);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto min-h-screen bg-gray-800">
      <div className="p-6">
        <div className="w-full p-8 bg-gray-900 rounded-lg shadow-xl relative">
          <h3 className="text-3xl font-bold text-white mb-10">Subscription List</h3>

          {/* Displaying current month subscription amount */}
          <div className="absolute top-6 right-6 bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md">
            <span className="text-lg font-semibold">Current month total: </span>
            <span className="text-xl font-bold">
              NPR {currentMonthSubscriptionAmount?.totalAmount}
            </span>
          </div>

          <div className="space-y-6 mt-14">
            {subscription.map((subItem) => (
              <div
                key={subItem._id}
                className="flex items-center justify-between bg-gray-800 p-5 rounded-lg shadow-lg transition-transform transform hover:scale-102"
              >
                <Link
                  to={`/singleSubscription/${subItem._id}`}
                  className="flex flex-col flex-grow"
                >
                  <div className="flex items-center gap-4">
                    <FaUserCircle className="text-white text-2xl" />
                    <span className="text-xl font-semibold text-white">
                      {subItem?.userId?.username || "Unknown User"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {subItem.planName} Plan
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                   
                    <span className="text-sm text-gray-400">
                      NPR {subItem.amount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Start: {new Date(subItem.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <FaCalendarAlt className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      End: {new Date(subItem.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </Link>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold mt-3 ${
                    subItem.status === "active"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {subItem.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSubscription;
