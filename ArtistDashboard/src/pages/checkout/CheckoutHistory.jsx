import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { artistCheckoutHistory } from '../../store/checkoutSlice';
import { FaCheckCircle } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';

const CheckoutHistory = () => {
  const dispatch = useDispatch();
  const { checkoutHistory } = useSelector((state) => state.checkout);

  useEffect(() => {
    dispatch(artistCheckoutHistory());
  }, [dispatch]);

  const downloadDetails = (item) => {
    const textContent = `
Checkout Details:
---------------------------
Username: ${item?.userId?.username}
Amount: Rs. ${item.amount.toFixed(2)}
Status: ${item.status}
Date: ${new Date(item.createdAt).toLocaleString()}
---------------------------
`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `checkout_${item._id}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-6">Checkout History</h1>

      {checkoutHistory?.length === 0 ? (
        <p className="text-gray-400">No checkout history found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {checkoutHistory
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item) => (
              <div
                key={item._id}
                className="bg-gray-800 border border-gray-700 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-white">Amount</h2>
                  <span className="text-green-500 font-semibold text-md">Rs. {item.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <div>
                    <p>User: <span className="text-white">{item?.userId?.username}</span></p>
                  </div>
                  <div className="text-green-500 flex items-center gap-1">
                    <FaCheckCircle />
                    <span>{item.status}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">Date: {new Date(item.createdAt).toLocaleString()}</p>
                <button
                  onClick={() => downloadDetails(item)}
                  className="mt-3 bg-white text-black px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-600 transition-all"
                >
                  <FiDownload className="text-lg" />
                  Download Details
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CheckoutHistory;
