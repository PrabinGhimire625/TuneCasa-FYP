import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FiSearch, FiMusic, FiUsers, FiHeadphones, FiList, FiPlusCircle, FiFacebook, FiInstagram } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";

const data = [
  { year: "2018", listeners: 1000, prevListeners: 800 },
  { year: "2019", listeners: 5000, prevListeners: 3000 },
  { year: "2020", listeners: 12000, prevListeners: 7000 },
  { year: "2021", listeners: 25000, prevListeners: 18000 },
  { year: "2022", listeners: 40000, prevListeners: 32000 },
  { year: "2023", listeners: 70000, prevListeners: 55000 },
];

const trendingSongs = [
  { title: "Rise Above", artist: "Aria Melody", plays: 25000, img: "/images/song1.jpg" },
  { title: "Echoes of the Night", artist: "Skyler Beats", plays: 22000, img: "/images/song2.jpg" },
  { title: "Into the Horizon", artist: "Echo Rhythms", plays: 18000, img: "/images/song3.jpg" },
  { title: "Vibes of Neon", artist: "Neon Vibes", plays: 15000, img: "/images/song4.jpg" },
  { title: "Waves of Sound", artist: "Horizon Tunes", plays: 12000, img: "/images/song5.jpg" },
];

export default function ArtistDashboard() {
  return (
    <div className="bg-gray-900 text-white p-5 min-h-screen">

      {/* Dashboard Stats */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        {[ 
       
          { label: "Total Songs", value: "10", icon: <FiMusic />, color: "text-yellow-400" },
          { label: "Upcoming Events", value: "3", icon: <FiList />, color: "text-purple-400" },
          { label: "Followers", value: "35,000", icon: <FiUsers />, color: "text-blue-400" },
          { label: "Total Revenue", value: "$50,000", icon: <FiPlusCircle />, color: "text-red-400" },
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

      {/* Listeners Growth Chart */}
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

      {/* Trending Songs */}
      <div className="bg-gray-800 p-6 rounded-lg mt-6">
        <h3 className="text-lg font-semibold">🔥 Trending Songs</h3>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {trendingSongs.map((song, index) => (
            <div key={index} className="bg-gray-700 p-3 rounded-lg text-center">
              <img src={song.img} alt={song.title} className="w-20 h-20 mx-auto rounded-full border-2 border-green-400" />
              <p className="mt-2 font-semibold">{song.title}</p>
              <p className="text-sm text-gray-400">{song.plays.toLocaleString()} plays</p>
              <p className="text-sm text-gray-500">{song.artist}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-gray-800 p-6 rounded-lg mt-6 shadow-lg">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiList className="text-purple-400" /> Upcoming Events
        </h3>
        <div className="mt-4 space-y-2">
          <p className="text-gray-400">Live Show in NYC | May 15, 2025</p>
          <p className="text-gray-400">Concert in LA | June 20, 2025</p>
          <p className="text-gray-400">Virtual Event | July 10, 2025</p>
        </div>
      </div>

    </div>
  );
}

