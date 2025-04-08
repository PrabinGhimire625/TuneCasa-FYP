import React, { useEffect, useState } from "react";
import { assets } from "../../../assets/artist-assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { createAds } from "../../../store/adsSlice";
import { STATUS } from "../../../globals/enumStatus/Status";

const CreateAds = () => {
  const { status } = useSelector((state) => state.ads);
  const dispatch = useDispatch();

  const [adsData, setAdsData] = useState({
    name: "",
    audio: null,
    image: null,
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
      alert("Ad successfully added!");
      setAdsData({ name: "", audio: null, image: null });
      setAudioPreview(null);
      setImagePreview(null);
    } else if (status === STATUS.ERROR) {
      alert("Failed to add the ad. Please try again.");
    }
  }, [status]);

  return (
    <section className="p-8 flex justify-center">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create New Ad
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex gap-6 items-center justify-between">
            {/* Upload Audio */}
            <div className="flex flex-col gap-4 items-center w-1/2">
              <label className="text-lg text-gray-400" htmlFor="audio">
                Upload Ad Audio
              </label>
              <input
                onChange={handleChange}
                type="file"
                id="audio"
                name="audio"
                accept="audio/*"
                hidden
              />
              <label htmlFor="audio">
                <img
                  src={audioPreview ? assets.upload_added : assets.upload_song}
                  className="w-32 h-32 cursor-pointer rounded-lg object-cover transition-transform transform hover:scale-110"
                  alt="Upload Audio"
                />
              </label>
            </div>
            
            {/* Upload Image */}
            <div className="flex flex-col gap-4 items-center w-1/2">
              <label className="text-lg text-gray-400" htmlFor="image">
                Upload Image
              </label>
              <input
                onChange={handleChange}
                type="file"
                id="image"
                accept="image/*"
                name="image"
                hidden
              />
              <label htmlFor="image">
                <img
                  src={imagePreview || assets.upload_area}
                  className="w-32 h-32 cursor-pointer rounded-lg object-cover transition-transform transform hover:scale-110"
                  alt="Upload Image"
                />
              </label>
            </div>
          </div>

          {/* Ad Name */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="name" className="text-lg text-gray-800">
              Ads Name
            </label>
            <input
              onChange={handleChange}
              name="name"
              value={adsData.name}
              className="bg-transparent border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50"
              placeholder="Ads title"
              type="text"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gray-950 text-white text-lg py-3 px-10 rounded-lg hover:bg-teal-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75"
          >
            Add Ad
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateAds;