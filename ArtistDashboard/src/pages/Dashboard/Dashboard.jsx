import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FiSearch, FiMusic, FiUsers, FiHeadphones, FiList, FiPlusCircle, FiFacebook, FiInstagram } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { countArtistSong } from "../../store/songSlice";
import { CountArtistUpcommingEvent } from "../../store/eventSlice";
import { Link } from "react-router-dom";
import { countArtistFollower } from "../../store/authSlice";
import { calculateArtistMonthlyEarning } from "../../store/analyticSlice";
import TrendingSong from "../mostPlaySong/TrendingSong";


const data = [
  { year: "2018", listeners: 1000, prevListeners: 800 },
  { year: "2019", listeners: 5000, prevListeners: 3000 },
  { year: "2020", listeners: 12000, prevListeners: 7000 },
  { year: "2021", listeners: 25000, prevListeners: 18000 },
  { year: "2022", listeners: 40000, prevListeners: 32000 },
  { year: "2023", listeners: 70000, prevListeners: 55000 },
];

const trendingSongs = [
  {
    title: "Rise Above",
    artist: "Aria Melody",
    plays: 25000,
    img: "/images/song1.jpg",
  },
  {
    title: "Echoes of the Night",
    artist: "Skyler Beats",
    plays: 22000,
    img: "/images/song2.jpg",
  },
  {
    title: "Into the Horizon",
    artist: "Echo Rhythms",
    plays: 18000,
    img: "/images/song3.jpg",
  },
  {
    title: "Vibes of Neon",
    artist: "Neon Vibes",
    plays: 15000,
    img: "/images/song4.jpg",
  },
  {
    title: "Waves of Sound",
    artist: "Horizon Tunes",
    plays: 12000,
    img: "/images/song5.jpg",
  },
];

export default function ArtistDashboard() {
  const dispatch = useDispatch();
  const { artistSongCount } = useSelector((state) => state.song);
  const { artistUpcomingEvent } = useSelector((state) => state.event);
  const { artistFollower } = useSelector((state) => state.auth);
  const { artistMonthlyEarning } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(countArtistSong());
    dispatch(CountArtistUpcommingEvent());
    dispatch(countArtistFollower())
    dispatch(calculateArtistMonthlyEarning());
  }, [dispatch]);

  console.log("artistUpcomingEvent, ", artistUpcomingEvent)

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
            {/* Wrap the whole div in a Link */}
            {stat.link ? (
              <Link to={stat.link} className="w-full flex items-center gap-4">
                <div className={`text-3xl ${stat.color}`}>{stat.icon}</div>
                <div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </Link>
            ) : (
              <div className={`w-full flex items-center gap-4`}>
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

      {/* Listeners Growth Chart */}
      <div className="bg-gray-800 p-6 rounded-lg mt-8 shadow-lg">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <FaChartLine className="text-green-400" /> Listener Growth
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="year" tick={{ fill: "white" }} />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="listeners"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={{ fill: "#4CAF50" }}
            />
            <Line
              type="monotone"
              dataKey="prevListeners"
              stroke="#2196F3"
              strokeWidth={2}
              dot={{ fill: "#2196F3" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trending Songs */}
      <div className="">
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
              ?.filter((event) => new Date(event.eventDate) >= new Date()) // Optional: show only future events
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
