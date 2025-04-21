import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPendingArtists, approveArtistHandler, rejectArtistHandler } from "../../store/dataSlice"; // Import updated thunks
import { STATUS } from "../../globals/enumStatus/Status";

const ArtistRequest = () => {
  const dispatch = useDispatch();
  const { artists, status } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchAllPendingArtists()); 
  }, [dispatch]);

  // Approve artist function (using Redux action)
  const approveArtistHandlerClick = (artistId) => {
    dispatch(approveArtistHandler(artistId)); 
  };

  // Reject artist function (using Redux action)
  const rejectArtistHandlerClick = (artistId) => {
    dispatch(rejectArtistHandler(artistId)); 
  };

  console.log("Artist", artists)

  return (
    <section className=" bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <h1 className="text-3xl font-bold text-white text-center my-4">
          Pending Artist Requests
        </h1>
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">Artist Name</th>
                  <th scope="col" className="px-4 py-3">Email</th>
                  <th scope="col" className="px-4 py-3 ml-5">Action</th>
                  <th scope="col" className="px-4 py-3 ml-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {status === STATUS.LOADING ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : artists && artists.length > 0 ? (
                  artists.map((artist) => (
                    <tr key={artist._id} className="border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {artist?.userId?.username}
                      </th>
                      <td className="px-4 py-3">{artist?.userId?.email}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => approveArtistHandlerClick(artist._id)}
                          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                        >
                          Approve
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => rejectArtistHandlerClick(artist._id)}
                          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No pending artists found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistRequest;
