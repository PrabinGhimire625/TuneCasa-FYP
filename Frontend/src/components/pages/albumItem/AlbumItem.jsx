import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumItem = ({ id, image, name, desc }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="min-w-[200px] p-3 rounded-lg cursor-pointer hover:bg-stone-900 transition duration-300"
    >
      <div className="w-40 h-40 rounded-lg overflow-hidden">
        <img className="w-full h-full object-cover" src={image} alt={name} />
      </div>
      <p className="font-bold mt-2 mb-1 truncate">{name}</p>
      <p className="text-slate-200 text-sm truncate">{desc}</p>
    </div>
  );
};

export default AlbumItem;
