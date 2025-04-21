import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchSingleCheckout, completeCheckout } from '../../store/checkoutSlice';
import { toast } from 'react-toastify';
import { STATUS } from '../../globals/enumStatus/Status';

const SingleCheckout = () => {
  const { singleCheckout, status } = useSelector((state) => state.checkout);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleCheckout(id));
    }
  }, [dispatch, id]);

  const handleCompleteCheckout = async () => {
    setCompleting(true);
  
    const resultAction = await dispatch(completeCheckout(id));
  
    if (status===STATUS.SUCCESS) {
      toast.success('Checkout completed successfully!');
    } else {
      toast.error('Failed to complete checkout.');
    }
  
    await dispatch(fetchSingleCheckout(id)); // Refresh the data after completion
    setCompleting(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 bg-gray-800 text-white rounded-2xl shadow-lg border border-white/10">
      <h2 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">Checkout Details</h2>

      {status === "loading" ? (
        <p className="text-gray-400">Loading...</p>
      ) : singleCheckout ? (
        <div className="space-y-5">
          <div className="flex justify-between">
            <span className="text-gray-400">Amount:</span>
            <span className="font-semibold text-lg text-green-400">Rs. {singleCheckout.amount}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Status:</span>
            <span className={`px-3 py-1 rounded-full font-semibold text-sm ${
              singleCheckout.status === "requested" ? "bg-yellow-600 text-white" :
              singleCheckout.status === "approved" ? "bg-green-600 text-white" :
              "bg-red-600 text-white"
            }`}>
              {singleCheckout.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Requested On:</span>
            <span>{new Date(singleCheckout.createdAt).toLocaleString()}</span>
          </div>

          {singleCheckout.userId && (
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-lg font-semibold mb-2">User Details</h3>
              <div className="flex justify-between">
                <span className="text-gray-400">Username:</span>
                <span>{singleCheckout.userId.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span>{singleCheckout.userId.email}</span>
              </div>

              {singleCheckout.status === "requested" && (
                <button
                  onClick={handleCompleteCheckout}
                  className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md text-sm mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={completing}
                >
                  {completing ? "Processing..." : "Complete Checkout"}
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="text-red-400">No checkout data found.</p>
      )}
    </div>
  );
};

export default SingleCheckout;
