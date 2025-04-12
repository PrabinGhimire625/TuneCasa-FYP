import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAds, listAllAds } from "../../../store/adsSlice";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const ListAds = () => {
  const dispatch = useDispatch();
  const { ads } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(listAllAds());
  }, [dispatch]);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold tracking-tight">📢 All Ads</h3>
          <Link
            to="/dashboard/create-ads"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition"
          >
            <PlusCircle className="w-5 h-5" />
            Create Ad
          </Link>
        </div>

        {/* Ads List */}
        {ads.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No ads found. Go ahead and create your first one!
          </div>
        ) : (
          <div className="space-y-4">
            {ads.map((adsItem, index) => (
              <Link
                to={`/singleAds/${adsItem._id}`}
                key={index}
                className={`flex items-center md:items-start flex-col md:flex-row gap-4 p-4 rounded-xl shadow-lg transition hover:scale-[1.01] cursor-pointer border ${
                  adsItem.status === "expired"
                    ? "bg-red-950 hover:bg-red-900 border-red-800"
                    : "bg-gray-800 hover:bg-gray-700 border-gray-700"
                }`}
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-700">
                  <img
                    src={adsItem?.image}
                    alt={adsItem?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Ad Info */}
                <div className="flex flex-col flex-grow w-full">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                    <span className="text-xl font-semibold">{adsItem?.name}</span>
                    <span className="text-teal-400 font-medium mt-2 md:mt-0">
                      NPR: {adsItem?.totalPlays * 20}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="mt-1">
                    {adsItem.status === "expired" ? (
                      <span className="bg-red-800 text-red-300 px-2 py-1 rounded text-xs font-semibold">
                        Expired
                      </span>
                    ) : (
                      <span className="bg-green-800 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                        Active
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListAds;
