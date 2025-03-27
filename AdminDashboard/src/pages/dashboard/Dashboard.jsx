import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FiMusic, FiUsers, FiHeadphones, FiList } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTotalAlbums, fetchTotalArtists, fetchTotalPlaylists, fetchTotalSongs, fetchTotalSubscriptionUsers, fetchTotalUsers } from "../../store/analyticSlice";

const data = [
  { year: "2018", listeners: 1000, prevListeners: 800 },
  { year: "2019", listeners: 5000, prevListeners: 3000 },
  { year: "2020", listeners: 12000, prevListeners: 7000 },
  { year: "2021", listeners: 25000, prevListeners: 18000 },
  { year: "2022", listeners: 40000, prevListeners: 32000 },
  { year: "2023", listeners: 70000, prevListeners: 55000 },
];

const trendingArtists = [
  { name: "Aria Melody", plays: 25000, img: "/images/artist1.jpg" },
  { name: "Skyler Beats", plays: 22000, img: "/images/artist2.jpg" },
  { name: "Echo Rhythms", plays: 18000, img: "/images/artist3.jpg" },
  { name: "Neon Vibes", plays: 15000, img: "/images/artist4.jpg" },
  { name: "Horizon Tunes", plays: 12000, img: "/images/artist5.jpg" },
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
        <h3 className="text-lg font-semibold">🔥 Trending Artists</h3>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {trendingArtists.map((artist, index) => (
            <div key={index} className="bg-gray-700 p-3 rounded-lg text-center">
              <img src={artist.img} alt={artist.name} className="w-20 h-20 mx-auto rounded-full border-2 border-green-400" />
              <p className="mt-2 font-semibold">{artist.name}</p>
              <p className="text-sm text-gray-400">{artist.plays.toLocaleString()} plays</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
