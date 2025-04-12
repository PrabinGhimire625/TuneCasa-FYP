import React, { useEffect, useState } from "react";
import { assets } from "../../../assets/artist-assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { createAds, resetStatus } from "../../../store/adsSlice";
import { STATUS } from "../../../globals/enumStatus/Status";
import { toast } from 'react-toastify';

const CreateAds = () => {
  const { status } = useSelector((state) => state.ads);
  const dispatch = useDispatch();

  const [adsData, setAdsData] = useState({
    name: "",
    audio: null,
    image: null,
    totalPlays: 1,
  });

  const [audioPreview, setAudioPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setAdsData((prevData) => ({
        ...prevData,
        [name]: file,
      }));

      if (name === "image") {
        setImagePreview(URL.createObjectURL(file));
      } else if (name === "audio") {
        setAudioPreview(URL.createObjectURL(file));
      }
    } else {
      setAdsData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAds(adsData));

  };

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      dispatch(resetStatus());
      toast.success("Ad created successfully!");
      setAdsData({ name: "", audio: null, image: null, totalPlays: 1 });
      setAudioPreview(null);
      setImagePreview(null);
    } else if (status === STATUS.ERROR) {
      toast.error("Something went wrong!");
    }
  }, [status]);

  return (
    <section className=" p-6 md:p-10  flex justify-center">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8 md:p-10">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          🎧 Create New Ad
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Upload Audio & Image */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Audio Upload */}
            <div className="flex flex-col items-center gap-3 w-full md:w-1/2">
              <label htmlFor="audio" className="text-sm text-gray-300 font-medium">
                Upload Ad Audio
              </label>
              <input
                type="file"
                id="audio"
                name="audio"
                accept="audio/*"
                onChange={handleChange}
                hidden
              />
              <label htmlFor="audio" className="cursor-pointer">
                <img
                  src={audioPreview ? assets.upload_added : assets.upload_song}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover border-2 border-dashed border-gray-600 hover:scale-105 transition-transform"
                  alt="Upload Audio"
                />
              </label>
              {audioPreview && <span className="text-xs text-teal-400">Audio selected</span>}
            </div>

            {/* Image Upload */}
            <div className="flex flex-col items-center gap-3 w-full md:w-1/2">
              <label htmlFor="image" className="text-sm text-gray-300 font-medium">
                Upload image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                hidden
              />
              <label htmlFor="image" className="cursor-pointer">
                <img
                  src={imagePreview || assets.upload_area}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover border-2 border-dashed border-gray-600 hover:scale-105 transition-transform"
                  alt="Upload Image"
                />
              </label>
              {imagePreview && <span className="text-xs text-teal-400">Image selected</span>}
            </div>
          </div>

          {/* Ad Name Input */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm text-gray-300 font-medium mb-1">
              Ad Name
            </label>
            <input
              type="text"
              name="name"
              value={adsData.name}
              onChange={handleChange}
              placeholder="Enter ad name"
              className="bg-gray-900 text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Total Plays Input */}
          <div className="flex flex-col">
            <label htmlFor="totalPlays" className="text-sm text-gray-300 font-medium mb-1">
              Total Plays
            </label>
            <input
              type="number"
              name="totalPlays"
              value={adsData.totalPlays}
              onChange={handleChange}
              min="1"
              placeholder="Number of plays"
              className="bg-gray-900 text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-3 rounded-xl mt-2 transition duration-300 focus:outline-none focus:ring-4 focus:ring-teal-400"
          >
            ➕ Create Ad
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateAds;
