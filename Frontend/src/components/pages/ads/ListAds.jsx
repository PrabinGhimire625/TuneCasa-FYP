import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllAds } from "../../../store/adsSlice";

const ListAds = () => {
  const dispatch = useDispatch();
  const { ads } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(listAllAds());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto min-h-screen">
        <div className="p-4">
          <div className="w-full p-6 text-white bg-stone-900 rounded-lg shadow-xl">
            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">All Ads</h3>
            <div className="space-y-4">
              {ads.map((adsItem, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-stone-800 p-3 rounded-lg shadow-md transition duration-300 hover:bg-gray-700 cursor-pointer"
                >
                  <div className="w-14 h-14 bg-gray-600 rounded-md overflow-hidden">
                    {/* Replace image with video player */}
                    <video
                      controls
                      className="w-full h-full object-cover"
                    >
                      <source src={adsItem?.file} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <span className="text-white font-semibold text-lg">{adsItem?.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListAds;