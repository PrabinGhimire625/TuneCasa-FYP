import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { STATUS } from "../../../globals/components/enumStatus/Status";
import { updatePlaylist } from "../../../store/playlistSlice";

const EditPlaylist = ({ id, playlistData, onClose }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.playlist);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    privacy: "public",
  });

  useEffect(() => {
    if (playlistData) setFormData(playlistData);
  }, [playlistData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePlaylist({ id, playlistData: formData })).then(() => {
      alert(status === STATUS.SUCCESS ? "Playlist updated successfully" : "Failed to update playlist");
      if (status === STATUS.SUCCESS) onClose();
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#1a1a1a] p-8 rounded-lg w-[700px]">
        <h2 className="text-2xl font-medium text-white mb-4">Edit Playlist</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Title", name: "title", type: "text", placeholder: "Playlist Name" },
            { label: "Description", name: "description", type: "textarea", placeholder: "Playlist Description" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name} className="mb-4">
              <label htmlFor={name} className="block text-gray-400 text-sm mb-2">{label}</label>
              {type === "textarea" ? (
                <textarea
                  id={name}
                  name={name}
                  rows="3"
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full  bg-[#222222] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              ) : (
                <input
                  type={type}
                  id={name}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full  bg-[#222222]  rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                  required
                />
              )}
            </div>
          ))}

          <div className="mb-6">
            <label htmlFor="privacy" className="block text-gray-400 text-sm mb-2">Privacy</label>
            <select
              id="privacy"
              name="privacy"
              value={formData.privacy}
              onChange={handleChange}
              className="w-full  bg-[#222222]  rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-stone-900"
            >
              {["public", "private"].map((option) => (
                <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-600 px-4 py-2 rounded-md text-white hover:bg-gray-700">Cancel</button>
            <button type="submit" className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlaylist;