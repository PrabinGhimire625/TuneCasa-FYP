import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser, sendMessageToArtist, userProfile } from '../../../store/authSlice';

const SingleArtist = () => {
  const { id } = useParams(); // Artist ID from URL
  const dispatch = useDispatch();
  const { singleUser,profile, status } = useSelector((state) => state.auth);
  // Local state for controlling the modal and form fields
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUser(id));
    }
  }, [dispatch, id]);


    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(userProfile()); // Fetch user profile only if the token exists
      }
    }, [dispatch]);

  // Handle form submission: dispatch sendMessageToArtist and close modal
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch your action with artistId (from URL), message text, phone, and address.
    dispatch(sendMessageToArtist(id, message, phone, address));
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full">
      {/* Artist Profile Section */}
      <div className="py-10 flex gap-8 flex-col md:flex-row md:items-end bg-neutral-900">
        <div className="ml-5">
          <img
            src={
              singleUser?.user?.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9nFbCnqa-fAIyStp-cQG9M-LezEqxUz0HYg&s"
            }
            alt="Artist Cover"
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col text-white">
          <p>Artist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {singleUser?.user?.username || "Unknown Artist"}
          </h2>
          <h4 className="text-xl text-gray-200">
            {singleUser?.user?.email || "No bio available"}
          </h4>
          <h4 className="text-lg text-gray-400">
            {singleUser?.bio || "No bio available"}
          </h4>
        </div>

        {/* Button to open modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Message to the artist
        </button>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-90 flex justify-center items-center z-50">
          <div className="bg-gradient-to-br from-[#0a0a1a] to-[#101020] p-6 rounded-lg shadow-xl w-96 text-white border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Send a Message to the Artist
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                value={profile?.username}
                className="mt-1 p-2 w-full bg-[#1a1a40] border border-purple-500/30 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-lg shadow-purple-500/20"
                placeholder="Enter your name"
                required
              />

              <label className="block text-sm font-medium text-gray-300 mt-4">
                Your Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 p-2 w-full bg-[#1a1a40] border border-purple-500/30 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-lg shadow-purple-500/20"
                placeholder="Enter your phone"
              />

              <label className="block text-sm font-medium text-gray-300 mt-4">
                Your Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 p-2 w-full bg-[#1a1a40] border border-purple-500/30 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-lg shadow-purple-500/20"
                placeholder="Enter your address"
                required
              />

              <label className="block text-sm font-medium text-gray-300 mt-4">
                Valid Email
              </label>
              <input
                type="email"
                value={profile?.email}
                className="mt-1 p-2 w-full bg-[#1a1a1a] border border-purple-500/30 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-lg shadow-purple-500/20"
                placeholder="Enter your email"
                required
              />

              <label className="block text-sm font-medium text-gray-300 mt-4">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 p-2 w-full bg-[#1a1a40] border border-purple-500/30 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-lg shadow-purple-500/20"
                placeholder="Enter your message"
                required
              ></textarea>

              <button
                type="submit"
                className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg shadow-pink-500/40 hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
              >
                Send Message
              </button>
            </form>

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-center text-sm text-gray-400 hover:text-red-400 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleArtist;
