import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRequestCheckout, getAllCheckoutCompletedHistory } from '../../store/checkoutSlice';
import { Link } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const { checkoutData, checkoutHistory } = useSelector((state) => state.checkout);

  useEffect(() => {
    dispatch(fetchAllRequestCheckout());
    dispatch(getAllCheckoutCompletedHistory());
  }, [dispatch]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded bg-yellow-500 text-black">Pending</span>;
      case 'approved':
        return <span className="px-2 py-1 text-xs rounded bg-green-600 text-white">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs rounded bg-red-600 text-white">Rejected</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded bg-blue-600 text-white">Completed</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded bg-gray-600 text-white">{status}</span>;
    }
  };

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Requested Checkouts</h1>

      {checkoutData?.length === 0 ? (
        <p className="text-gray-400">No requested checkouts found.</p>
      ) : (
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-sm text-left text-gray-300 border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {checkoutData.map((item) => (
                <tr
                  key={item._id}
                  className="bg-gray-800 border-t border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3">{item.userId?.username || 'Unknown'}</td>
                  <td className="px-4 py-3">Rs. {item.amount}</td>
                  <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                  <td className="px-4 py-3">{item.method || 'N/A'}</td>
                  <td className="px-4 py-3">{new Date(item.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 flex gap-2 justify-center items-center">
                    <Link to={`/checkout/${item._id}`}>
                      <button className="bg-white hover:bg-gray-200 text-black px-3 py-1 rounded-md text-xs">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 mt-10">Checkout History</h1>

      {checkoutHistory?.length === 0 ? (
        <p className="text-gray-400">No checkout history available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300 border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {checkoutHistory.map((item) => (
                <tr
                  key={item._id}
                  className="bg-gray-800 border-t border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3">{item.userId?.username || 'Unknown'}</td>
                  <td className="px-4 py-3">Rs. {item.amount}</td>
                  <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                  <td className="px-4 py-3">{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Checkout;
