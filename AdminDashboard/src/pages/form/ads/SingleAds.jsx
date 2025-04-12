import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAds, listSingleAds } from '../../../store/adsSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { FaClock, FaPlay, FaEye, FaMoneyBill, FaTrashAlt } from 'react-icons/fa';

const SingleAds = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleAds } = useSelector((state) => state.ads);

  useEffect(() => {
    if (id) dispatch(listSingleAds(id));
  }, [dispatch, id]);

  const handleDeleteAds = (id) => {
    dispatch(deleteAds(id));
    navigate('/ads'); // Redirect after delete
  };

  if (!singleAds) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="flex justify-center  px-4">
      <div className="w-full max-w-3xl bg-gray-900 text-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{singleAds.name}</h2>
            <p className={`text-sm mt-1 font-semibold ${
              singleAds.status === "expired" ? "text-red-400" : "text-green-400"
            }`}>
              {singleAds.status === "expired" ? "Expired" : "Active"}
            </p>
          </div>
          <button
            onClick={() => handleDeleteAds(singleAds._id)}
            className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-500 flex items-center gap-2"
          >
            <FaTrashAlt /> Delete
          </button>
        </div>

        {/* Image */}
        <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-800 shadow">
          <img
            src={singleAds.image}
            alt={singleAds.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Audio Preview */}
        <div>
          <audio controls className="w-full">
            <source src={singleAds.file} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FaPlay className="text-green-400" />
            <span>Total Plays:</span>
            <span className="font-bold ml-auto">{singleAds.totalPlays}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEye className="text-blue-400" />
            <span>Total Views:</span>
            <span className="font-bold ml-auto">{singleAds.totalViews}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-yellow-400" />
            <span>Duration:</span>
            <span className="font-bold ml-auto">{singleAds.duration}s</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMoneyBill className="text-purple-400" />
            <span>Total Amount:</span>
            <span className="font-bold ml-auto">Rs {singleAds.totalPlays * 20}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-teal-300" />
            <span>Status:</span>
            <span className="font-bold ml-auto">{singleAds.status}s</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Created:</span>
            <span className="ml-auto text-gray-300">
              {new Date(singleAds.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAds;
