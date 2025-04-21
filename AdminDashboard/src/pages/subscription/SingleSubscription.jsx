import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaUserCircle, FaDollarSign, FaCalendarAlt } from "react-icons/fa";
import { getSingleSubscription } from "../../store/subscriptionSlice";

const SingleSubscription = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Fetch single subscription data from the store
  const { singleSubscription, status } = useSelector((state) => state.subscription);

  useEffect(() => {
    if (id) {
      dispatch(getSingleSubscription(id)); // Dispatch action to fetch subscription details
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <span className="text-xl font-semibold text-gray-300 animate-pulse">Loading...</span>
      </div>
    );
  }

  if (!singleSubscription) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <span className="text-xl font-semibold text-red-400">Subscription details not found.</span>
      </div>
    );
  }

  return (
    <div className="flex justify-center  text-white p-6 mt-10">
      <div className="w-full max-w-3xl bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-700">
        {/* Title */}
        <h2 className="text-4xl text-center font-extrabold mb-6 text-blue-400 tracking-wide">
          Subscription Details
        </h2>

        {/* User Information */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-white text-5xl" />
            <div>
              <span className="text-xl font-semibold">
                {singleSubscription?.userId?.username || "Unknown User"}
              </span>
              {/* <p className="text-gray-400 text-sm">{singleSubscription?.userId?.email || "No Email"}</p> */}
            </div>
          </div>

          {/* Status Badge */}
          <span
            className={`px-4 py-2 rounded-full text-sm font-bold ${
              singleSubscription.status === "active"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {singleSubscription.status.toUpperCase()}
          </span>
        </div>

        {/* Plan Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 text-center">
            <h4 className="text-blue-400 text-xl font-semibold">Plan</h4>
            <p className="text-2xl font-bold">{singleSubscription.planName}</p>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 text-center">
            <h4 className="text-blue-400 text-xl font-semibold">Amount</h4>
            <p className="text-2xl font-bold text-green-400">
              NPR {singleSubscription.amount.toFixed(2)}
            </p>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 text-center">
            <h4 className="text-blue-400 text-xl font-semibold">Status</h4>
            <p className="text-2xl font-bold">
              {singleSubscription.status.charAt(0).toUpperCase() + singleSubscription.status.slice(1)}
            </p>
          </div>
        </div>

        {/* Date Details */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-around gap-6">
          <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 text-center">
            <h4 className="text-blue-400 text-xl font-semibold flex items-center gap-2">
              <FaCalendarAlt /> Start Date
            </h4>
            <p className="text-lg font-bold">
              {new Date(singleSubscription.startDate).toLocaleDateString()}
            </p>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 text-center">
            <h4 className="text-blue-400 text-xl font-semibold flex items-center gap-2">
              <FaCalendarAlt /> End Date
            </h4>
            <p className="text-lg font-bold">
              {new Date(singleSubscription.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSubscription;
