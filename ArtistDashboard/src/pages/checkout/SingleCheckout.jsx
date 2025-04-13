import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { singleArtistCheckoutHistory } from '../../store/checkoutSlice';
import { STATUS } from '../../globals/components/Status';
import { FaCheckCircle, FaClock, FaEnvelope, FaUser, FaMoneyBillWave } from 'react-icons/fa';
import Footer from '../../globals/components/Footer';

const SingleCheckout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleCheckout, status } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (id) {
      dispatch(singleArtistCheckoutHistory(id));
    }
  }, [dispatch, id]);

  if (status === STATUS.LOADING) {
    return <div className="text-center text-gray-300 text-lg mt-10">Loading...</div>;
  }

  if (status === STATUS.ERROR || !singleCheckout) {
    return <div className="text-center text-red-500 mt-10">Something went wrong. Please try again later.</div>;
  }

  const isCompleted = singleCheckout.status === 'completed';

  return (
 <>
    <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg text-gray-100">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Checkout Summary</h2>

        {/* Status Badge */}
        <div className={`mb-6 flex justify-center`}>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
            ${isCompleted ? 'bg-green-600 text-white' : 'bg-yellow-500 text-black'}`}>
            {isCompleted ? (
              <>
                <FaCheckCircle className="w-4 h-4" />
                Done
              </>
            ) : (
              <>
                <FaClock className="w-4 h-4" />
                Done
              </>
            )}
          </div>
        </div>

        {/* Checkout Details */}
        <div className="space-y-5 bg-gray-700 p-6 rounded-xl shadow-inner border border-gray-600">
          <div className="flex items-center gap-3">
            <FaUser className="text-gray-300" />
            <span className="font-medium">Username:</span>
            <span>{singleCheckout.userId?.username || 'N/A'}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-gray-300" />
            <span className="font-medium">Email:</span>
            <span>{singleCheckout.userId?.email || 'N/A'}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaMoneyBillWave className="text-green-400" />
            <span className="font-medium">Amount:</span>
            <span className="text-green-300">NPR {singleCheckout.amount.toFixed(2)}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaClock className="text-yellow-400" />
            <span className="font-medium">Requested On:</span>
            <span>{new Date(singleCheckout.createdAt).toLocaleString()}</span>
          </div>
        </div>

        {/* Done Stamp */}
        {isCompleted && (
          <div className="mt-8 text-center">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-2" />
            <p className="text-green-300 font-semibold text-lg">Checkout successfully processed!</p>
          </div>
        )}
      </div>
    
    </div>
 </>
  );
};

export default SingleCheckout;
