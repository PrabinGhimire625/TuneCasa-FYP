import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FiMusic,
  FiUsers,
  FiHeadphones,
  FiList,
  FiPlusCircle,
} from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { countArtistSong } from "../../store/songSlice";
import { CountArtistUpcommingEvent } from "../../store/eventSlice";
import { Link } from "react-router-dom";
import { countArtistFollower } from "../../store/authSlice";
import { calculateArtistMonthlyEarning } from "../../store/analyticSlice";
import TrendingSong from "../mostPlaySong/TrendingSong";

// Sample listener data
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

// Generate Y-axis ticks dynamically from 0 to max
const maxListeners = Math.max(...data.map((d) => d.listeners));
const yAxisTicks = Array.from(
  { length: Math.ceil(maxListeners / 1000) + 1 },
  (_, i) => i * 1000
);

export default function ArtistDashboard() {
  const dispatch = useDispatch();
  const { artistSongCount } = useSelector((state) => state.song);
  const { artistUpcomingEvent } = useSelector((state) => state.event);
  const { artistFollower } = useSelector((state) => state.auth);
  const { artistMonthlyEarning } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(countArtistSong());
    dispatch(CountArtistUpcommingEvent());
    dispatch(countArtistFollower());
    dispatch(calculateArtistMonthlyEarning());
  }, [dispatch]);

  return (
    <div className="bg-gray-900 text-white p-5 min-h-screen">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {[
          {
            label: "Total Songs",
            value: artistSongCount?.songCount?.toLocaleString() || 0,
            icon: <FiMusic />,
            color: "text-yellow-400",
            link: "/allSong",
          },
          {
            label: "Upcoming Events",
            value: artistUpcomingEvent?.count?.toLocaleString() || 0,
            icon: <FiList />,
            color: "text-purple-400",
            link: "/upcomingEvents",
          },
          {
            label: "Followers",
            value: artistFollower?.totalFollowers?.toLocaleString() || 0,
            icon: <FiUsers />,
            color: "text-blue-400",
            link: "/followerList",
          },
          {
            label: "Total earning",
            value: `NPR ${artistMonthlyEarning?.totalEarnings?.toLocaleString() || 0}`,
            icon: <FiPlusCircle />,
            color: "text-red-400",
            link: "/songAnalytics",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800 p-5 rounded-xl flex items-center gap-4 hover:bg-gray-700 transition duration-300 shadow-md"
          >
            {stat.link ? (
              <Link to={stat.link} className="w-full flex items-center gap-4">
                <div className={`text-3xl ${stat.color}`}>{stat.icon}</div>
                <div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </Link>
            ) : (
              <div className="w-full flex items-center gap-4">
                <div className={`text-3xl ${stat.color}`}>{stat.icon}</div>
                <div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Listener Growth Chart (Monthly) */}
      <div className="bg-gray-800 p-6 rounded-lg mt-6 shadow-lg">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
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

      {/* Trending Songs */}
      <div className="mt-6">
        <TrendingSong />
      </div>

      {/* Upcoming Events */}
      <div className="bg-gray-800 p-6 rounded-lg mt-8 shadow-lg">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <FiList className="text-purple-400" /> Upcoming Events
        </h3>
        <Link to="/upcomingEvents">
          <ul className="space-y-2 list-disc list-inside text-gray-300">
            {artistUpcomingEvent?.events
              ?.filter((event) => new Date(event.eventDate) >= new Date())
              .slice(0, 5)
              .map((event) => {
                const date = new Date(event.eventDate);
                const formattedDate = date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <li key={event._id}>
                    {event.title} | {formattedDate}
                  </li>
                );
              })}
          </ul>
        </Link>
      </div>
    </div>
  );
}
