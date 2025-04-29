import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser, sendMessageToArtist, userProfile } from '../../../store/authSlice';
import { listEventForSpecificArtist } from '../../../store/eventSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import LatestArtistSong from '../recommendation/LatestArtistSong';
import Footer from '../../../globals/components/footer/Footer';

const SingleArtist = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleUser, profile, status } = useSelector((state) => state.auth);
  const { eventOfArtist } = useSelector((state) => state.event);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUser(id));
      dispatch(listEventForSpecificArtist(id))
    }
  }, [dispatch, id]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(userProfile());
    }
  }, [dispatch]);

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessageToArtist(id, message, phone, address));
    toast.success("Successfully sent the message to the artist");
    setIsModalOpen(false);
  };

  console.log("All the events of the specific artist are", eventOfArtist);

  return (
    <div className="text-white px-4 md:px-8 pb-10">
      <div className="max-w-7xl mx-auto ">
        <div className="shadow-lg rounded-lg p-6 md:p-10 text-white mx-4 md:mx-10 mt-6">
          <div className="flex flex-col md:flex-row md:items-end gap-8">
            <div className="flex-shrink-0">
              <img
                src={
                  singleUser?.user?.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxefhNkXqWRGkpA53l-oBhVZLrxfGke1VG8w&s"
                }
                alt="Artist Cover"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg"
              />
            </div>
            <div className="flex-1">
              <p className="text-gray-400">Artist</p>
              <h2 className="text-4xl md:text-6xl font-bold mb-3">
                {singleUser?.user?.username || "Unknown Artist"}
              </h2>
              <h4 className="text-md md:text-lg text-gray-400">
                {singleUser?.bio || "No bio available"}
              </h4>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
              >
                Book for event
              </button>
            </div>
          </div>
        </div>


        {/* Events Section */}
        <div className="py-10 px-5 bg-[#121212] text-white">
          <h3 className="text-3xl font-bold mb-6">Upcoming Events</h3>
          {eventOfArtist && eventOfArtist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventOfArtist
                .filter((event) => new Date(event.eventDate) > new Date()) // Filter future events
                .map((event) => (
                  <Link
                    key={event._id}
                    to={`/singleEvent/${event._id}`} // Link to the single event page
                    className="bg-neutral-900 p-5 rounded-lg shadow-lg border border-gray-700 flex items-center gap-4"
                  >
                    <img
                      src={event.image || "https://via.placeholder.com/150"}
                      alt={event.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="text-xl font-semibold">{event.title}</h4>
                      {/* <p className="text-gray-300">{event.description}</p> */}
                      <p className="text-sm text-gray-400 mt-2">Date: {event.eventDate}</p>
                      <p className="text-sm text-gray-400">Location: {event.location}</p>
                    </div>
                  </Link>
                ))
              }
            </div>
          ) : (
            <p className="text-gray-400">No upcoming events.</p>
          )}
        </div>


        {/* Modal Popup */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/60">
            <div className="bg-[#111111] p-6 rounded-lg shadow-xl w-96 text-white border border-gray-900">
              <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Send a Message to the Artist
              </h2>
              <form onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-gray-300">Your Name</label>
                <input
                  type="text"
                  value={profile?.username}
                  className="mt-1 p-2 w-full bg-[#1c1c1c] border border-purple-500/30 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-lg shadow-purple-500/20"
                  placeholder="Enter your name"
                  required
                />

                <label className="block text-sm font-medium text-gray-300 mt-4">Your Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 p-2 w-full bg-[#1c1c1c] border border-purple-500/30 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-lg shadow-purple-500/20"
                  placeholder="Enter your phone"
                />

                <label className="block text-sm font-medium text-gray-300 mt-4">Your Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 p-2 w-full bg-[#1c1c1c] border border-purple-500/30 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-lg shadow-purple-500/20"
                  placeholder="Enter your address"
                  required
                />

                <label className="block text-sm font-medium text-gray-300 mt-4">Valid Email</label>
                <input
                  type="email"
                  value={profile?.email}
                  className="mt-1 p-2 w-full bg-[#1c1c1c] border border-purple-500/30 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-lg shadow-purple-500/20"
                  placeholder="Enter your email"
                  required
                />

                <label className="block text-sm font-medium text-gray-300 mt-4">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 p-2 w-full bg-[#1c1c1c] border border-purple-500/30 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-lg shadow-purple-500/20"
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
      {/* Latest Songs Recommendation */}
      <div className='latest artist sectiom'>
        <LatestArtistSong id={id} />
      </div>

      {/*footer */}
      <div className='latest artist sectiom'>
        <Footer />
      </div>
    </div>
  );
};

export default SingleArtist;
