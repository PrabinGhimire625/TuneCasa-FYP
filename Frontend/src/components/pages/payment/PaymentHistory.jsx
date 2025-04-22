import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentHistory } from '../../../store/subscriptionSlice';

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const { status, paymentHistory } = useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(fetchPaymentHistory());
  }, [dispatch]);

  return (
    <div className="text-white min-h-screen w-full ">
    <section className="px-4 md:px-10 lg:px-20 py-10">
      <div className="w-full space-y-6">
        <h1 className="text-3xl font-bold mb-6">All Payment History</h1>
  
        {paymentHistory.length === 0 ? (
          <p className="text-gray-400">No payment history available.</p>
        ) : (
          <div className="space-y-4 w-full">
            {paymentHistory.map((payment) => (
              <div
                key={payment._id}
                className="w-full bg-white/10 backdrop-blur-md p-6 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Date */}
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p>{new Date(payment.createdAt).toLocaleDateString()}</p>
                </div>
  
                {/* Plan */}
                <div>
                  <p className="text-sm text-gray-400">Plan</p>
                  <p className="capitalize">{payment.subscriptionId?.planName}</p>
                </div>
  
                {/* Amount */}
                <div>
                  <p className="text-sm text-gray-400">Amount</p>
                  <p>Rs {payment.totalAmount.toFixed(2)}</p>
                </div>
  
                {/* Method */}
                <div>
                  <p className="text-sm text-gray-400">Method</p>
                  <p>{payment.paymentMethod}</p>
                </div>
  
                {/* Status */}
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p
                    className={`font-semibold ${
                      payment.paymentStatus === 'paid' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {payment.paymentStatus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  </div>
  
  );
};

export default PaymentHistory;
