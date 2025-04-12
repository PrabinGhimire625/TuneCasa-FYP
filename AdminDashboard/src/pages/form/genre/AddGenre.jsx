import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGenre } from "../../../store/genreSlice";
import { STATUS } from "../../../globals/enumStatus/Status";
import Sidebar from "../../sidebar/Sidebar";

const AddGenre = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.genre);

  const [genreData, setGenreData] = useState({
    name: "",
    desc: "",
    bgColour: "#1DB954",
  });

  const [alertMessage, setAlertMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGenreData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(addGenre(genreData));
  };

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      setAlertMessage({ type: "success", text: "✅ Genre added successfully!" });
      setGenreData({ name: "", desc: "", bgColour: "#1DB954" });
      setIsSubmitting(false);
    } else if (status === STATUS.ERROR) {
      setAlertMessage({ type: "error", text: "❌ Failed to add genre. Try again!" });
      setIsSubmitting(false);
    }
  }, [status]);

  // Auto-dismiss alert after 3 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto min-h-screen bg-gray-900 text-white px-4 py-6 md:px-10">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 border-b border-gray-600 pb-3 tracking-wide">
          🎧 Add New Genre
        </h2>

        {/* Alert Message */}
        {alertMessage && (
          <div
            className={`mb-6 px-4 py-3 rounded-md font-medium transition-all duration-500 ${
              alertMessage.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {alertMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Genre Name */}
          <div>
            <label className="block text-sm mb-2 font-medium">🎵 Genre Name</label>
            <input
              name="name"
              value={genreData.name}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Sad, Hip-Hop"
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
            />
            <p className="text-xs text-gray-400 mt-1">
              This will be visible to users and artists.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-2 font-medium">📝 Short Description</label>
            <textarea
              name="desc"
              value={genreData.desc}
              onChange={handleChange}
              placeholder="Describe this genre..."
              rows="3"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
            />
          </div>

          {/* Background Color */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div>
              <label className="block text-sm mb-2 font-medium">🎨 Background Color</label>
              <input
                type="color"
                name="bgColour"
                value={genreData.bgColour}
                onChange={handleChange}
                className="w-12 h-12 border-2 border-gray-600 rounded-md shadow cursor-pointer"
              />
            </div>

            {/* Live Preview */}
            <div
              className="w-48 h-20 flex items-center justify-center rounded-xl shadow-inner font-semibold transition-all duration-300 border border-gray-700"
              style={{ backgroundColor: genreData.bgColour }}
            >
              Preview Box
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`text-white font-semibold py-2 px-8 rounded-lg transition-all duration-300 ${
                isSubmitting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isSubmitting ? "Adding..." : "➕ Add Genre"}
            </button>
          </div>
        </form>
      </div>

      {/* Footer Info */}
      <div className="mt-12 max-w-3xl mx-auto text-xs text-gray-500 text-center">
        <p>ℹ️ Genres help users explore music by category. Once added, they will be available for artists and users across the platform.</p>
      </div>
    </div>
  );
};

export default AddGenre;
