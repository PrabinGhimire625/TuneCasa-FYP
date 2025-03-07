import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { paymentVerification } from '../../../store/subscriptionSlice';
import { STATUS } from '../../../globals/components/enumStatus/Status';


const VerifyPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paymentStatusFromState = useSelector(state => state.subscription.status); // Assuming state has status
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the pidx from the URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const pidx = urlParams.get('pidx');

    if (pidx) {
      console.log(`PIDX: ${pidx}`); // Debug log to check the pidx param
      // Dispatch payment verification function with pidx
      dispatch(paymentVerification(pidx));
    } else {
      // Provide a more detailed error message if pidx is missing
      setError('Payment information is missing. Please ensure you are redirected correctly after making the payment.');
    }
  }, [dispatch]);

  const renderPaymentStatus = () => {
    if (paymentStatusFromState === STATUS.LOADING) {
      return <p className="text-center">Verifying your payment...</p>;
    }
    if (paymentStatusFromState === STATUS.SUCCESS) {
      return <p className="text-center">Payment successful, subscription activated!</p>;
    }
    if (paymentStatusFromState === STATUS.ERROR) {
      return <p className="text-center">{error || 'Payment verification failed. Please try again later.'}</p>;
    }
    return null;
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Payment Verification</h2>
        {renderPaymentStatus()}
        {paymentStatusFromState === STATUS.SUCCESS && (
          <button
            onClick={() => navigate('/plan')}
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md"
          >
           Done
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyPayment;
