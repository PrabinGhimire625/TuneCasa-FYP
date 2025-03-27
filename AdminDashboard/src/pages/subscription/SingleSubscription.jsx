import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleSubscription } from '../../store/subscriptionSlice';
import { useParams } from 'react-router-dom';
import { FaUserCircle, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';

const SingleSubscription = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Fetch single subscription data from the store
  const { singleSubscription } = useSelector(state => state.subscription);

  useEffect(() => {
    if (id) {
      dispatch(getSingleSubscription(id)); // Dispatch action to fetch subscription details
    }
  }, [dispatch, id]);

  if (!singleSubscription) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-lg font-semibold text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex justify-center  bg-gray-900 py-10">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-xl space-y-6">
        <h2 className="text-3xl text-center text-white font-bold mb-6">Subscription Details</h2>

        {/* Subscription Card */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <FaUserCircle className="text-white text-3xl" />
              <span className="text-xl font-semibold text-white">
                {singleSubscription?.userId?.username || 'Unknown User'}
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-bold ${
                singleSubscription.status === 'active'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {singleSubscription.status.toUpperCase()}
            </span>
          </div>

          {/* Plan Information */}
          <div className="mt-4">
            <div className="flex items-center gap-2 text-gray-400">
              <FaCalendarAlt />
              <span className="text-sm">{singleSubscription.planName} Plan</span>
            </div>

            <div className="flex items-center gap-2 mt-2 text-gray-400">
              <FaDollarSign className="text-green-400" />
              <span className="text-lg">${singleSubscription.amount.toFixed(2)}</span>
            </div>

            {/* Date Information */}
            <div className="flex items-center gap-2 mt-2 text-gray-400">
              <FaCalendarAlt />
              <span className="text-sm">
                Start: {new Date(singleSubscription.startDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1 text-gray-400">
              <FaCalendarAlt />
              <span className="text-sm">
                End: {new Date(singleSubscription.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>

      
        </div>
      </div>
    </div>
  );
};

export default SingleSubscription;
