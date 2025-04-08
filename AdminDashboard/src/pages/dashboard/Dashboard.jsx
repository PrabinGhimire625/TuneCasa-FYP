import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FiMusic, FiUsers, FiHeadphones, FiList } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTotalAlbums, fetchTotalArtists, fetchTotalPlaylists, fetchTotalSongs, fetchTotalSubscriptionUsers, fetchTotalUsers } from "../../store/analyticSlice";
import DisplayArtist from "../artist/DisplayArtist";

const data = [
  { year: "Jan", listeners: 100, prevListeners: 800 },
  { year: "Feb", listeners: 500, prevListeners: 3000 },
  { year: "Mar", listeners: 1200, prevListeners: 7000 },
  { year: "Apr", listeners: 2500, prevListeners: 18000 },
  { year: "May", listeners: 4000, prevListeners: 32000 },
  { year: "Jun", listeners: 7000, prevListeners: 55000 },
];

const trendingArtists = [
  { name: "Aria Melody", plays: 2500, img: "/images/artist1.jpg" },
  { name: "Skyler Beats", plays: 220, img: "/images/artist2.jpg" },
  { name: "Echo Rhythms", plays: 180, img: "/images/artist3.jpg" },
  { name: "Neon Vibes", plays: 1500, img: "/images/artist4.jpg" },
  { name: "Horizon Tunes", plays: 1200, img: "/images/artist5.jpg" },
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const { totalUsers, totalArtists, totalSongs, totalAlbums, totalPlaylist, totalSubscriptionUser } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchTotalUsers());
    dispatch(fetchTotalArtists());
    dispatch(fetchTotalSongs());
    dispatch(fetchTotalAlbums());
    dispatch(fetchTotalPlaylists());
    dispatch(fetchTotalSubscriptionUsers());
  }, [dispatch]);

  return (
    <div className="bg-gray-900 text-white p-5 min-h-screen">
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        {[
          { label: "Total Artists", value: totalArtists?.toLocaleString() || 0, icon: <FiUsers />, color: "text-blue-400" },
          { label: "Total Songs", value: totalSongs?.toLocaleString() || 0, icon: <FiMusic />, color: "text-yellow-400" },
          { label: "Total Listeners", value: totalUsers?.toLocaleString() || 0, icon: <FiHeadphones />, color: "text-green-400" },
          { label: "Playlists Created", value: totalPlaylist?.toLocaleString() || 0, icon: <FiList />, color: "text-purple-400" },
        ].map((stat, index) => (
          <div key={index} className="bg-gray-800 p-5 rounded-xl flex items-center gap-4">
            <div className={`text-3xl ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Listener Growth Chart */}
      <div className="bg-gray-800 p-6 rounded-lg mt-6 shadow-lg">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FaChartLine className="text-green-400" /> Listener Growth
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="year" tick={{ fill: "white" }} />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="listeners" stroke="#4CAF50" strokeWidth={2} dot={{ fill: "#4CAF50" }} />
            <Line type="monotone" dataKey="prevListeners" stroke="#2196F3" strokeWidth={2} dot={{ fill: "#2196F3" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trending Artists */}
      <div className="bg-gray-800 p-6 rounded-lg mt-6">      
         <DisplayArtist/>
        
      </div>
      
    </div>
  );
}
