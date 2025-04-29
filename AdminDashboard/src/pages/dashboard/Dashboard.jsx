import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FiMusic, FiUsers, FiHeadphones, FiList } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTotalAlbums, fetchTotalArtists, fetchTotalPlaylists, fetchTotalSongs, fetchTotalSubscriptionUsers, fetchTotalUsers } from "../../store/analyticSlice";
import DisplayArtist from "../artist/DisplayArtist";
import { Link } from "react-router-dom";

const data = [
  { month: "Jan", listeners: 100 },
  { month: "Feb", listeners: 500 },
  { month: "Mar", listeners: 1200 },
  { month: "Apr", listeners: 2500 },
  { month: "May", listeners: 4000 },
  { month: "Jun", listeners: 7000 },
  { month: "Jul", listeners: 8500 },
  { month: "Aug", listeners: 9200 },
  { month: "Sep", listeners: 10400 },
  { month: "Oct", listeners: 11700 },
  { month: "Nov", listeners: 13000 },
  { month: "Dec", listeners: 14500 },
];
const maxListeners = Math.max(...data.map((d) => d.listeners));
const yAxisTicks = Array.from(
  { length: Math.ceil(maxListeners / 1000) + 1 },
  (_, i) => i * 1000
);



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
          { label: "Total Artists", value: totalArtists?.toLocaleString() || 0, icon: <FiUsers />, color: "text-blue-400", link: "/displayArtist" },
          { label: "Total Songs", value: totalSongs?.toLocaleString() || 0, icon: <FiMusic />, color: "text-yellow-400", link: "/songAnalystic" },
          { label: "Total Listeners", value: totalUsers?.toLocaleString() || 0, icon: <FiHeadphones />, color: "text-green-400", link: "/users" },
          { label: "Playlists Created", value: totalPlaylist?.toLocaleString() || 0, icon: <FiList />, color: "text-purple-400", link: "/allPlaylist" },
        ].map((stat, index) => (
          <Link to={stat.link} key={index} className="bg-gray-800 p-5 rounded-xl flex items-center gap-4 hover:bg-gray-700 transition-all">
            <div className={`text-3xl ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>


      {/* Listener Growth Chart (Monthly) */}
      <div className="bg-gray-800 p-6 rounded-lg mt-6 shadow-lg">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FaChartLine className="text-green-400" /> Monthly Listener Growth
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" tick={{ fill: "white" }} />
            <YAxis
              tick={{ fill: "white" }}
              ticks={yAxisTicks}
              domain={[0, "dataMax"]}
            />
            <Tooltip />
            <Legend />

            {/* Green line: Jan to Apr */}
            <Line
              type="monotone"
              dataKey="listeners"
              data={data.slice(0, 4)} // Jan to Apr
              stroke="#4CAF50"
              strokeWidth={2}
              dot={{ fill: "#4CAF50" }}
              name="Real (Listener)"
            />

            {/* Blue line: Apr to Dec (for continuity, start from Apr) */}
            <Line
              type="monotone"
              dataKey="listeners"
              data={data.slice(3)} // Apr to Dec
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: "#3B82F6" }}
              name="Projected (Listener)"
            />
          </LineChart>
        </ResponsiveContainer>

      </div>


      {/* Trending Artists */}
      <div className="bg-gray-800 p-6 rounded-lg mt-6">
        <DisplayArtist />
      </div>
    </div>
  );
}
