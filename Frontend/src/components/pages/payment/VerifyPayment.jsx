import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { paymentVerification } from '../../../store/subscriptionSlice';
import { STATUS } from '../../../globals/components/enumStatus/Status';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const VerifyPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paymentStatusFromState = useSelector(state => state.subscription.status);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pidx = urlParams.get('pidx');

    if (pidx) {
      dispatch(paymentVerification(pidx));
    } else {
      setError(
        'Payment information is missing. Please ensure you are redirected correctly after making the payment.'
      );
    }
  }, [dispatch]);

  const renderPaymentStatus = () => {
    switch (paymentStatusFromState) {
      case STATUS.LOADING:
        return (
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin w-12 h-12 text-blue-500 mb-2" />
            <p className="text-blue-600 font-medium">Verifying your payment...</p>
          </div>
        );

      case STATUS.SUCCESS:
        return (
          <div className="flex flex-col items-center">
            <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
            <p className="text-green-600 font-semibold text-lg text-center">
              Payment successful! <br />
              Your subscription is now active.
            </p>
          </div>
        );

      case STATUS.ERROR:
        return (
          <div className="flex flex-col items-center">
            <XCircle className="w-12 h-12 text-red-500 mb-2" />
            <p className="text-red-600 font-semibold text-center">
              {error || 'Payment verification failed. Please try again later.'}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className=" p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Verification</h2>
        {renderPaymentStatus()}

        {paymentStatusFromState === STATUS.SUCCESS && (
          <button
            onClick={() => navigate('/mainSubcription')}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyPayment;
