import songAnalyticsModel from "../models/SongAnalyticsModel .js";
import songModel from "../models/songModel.js";

// Function to track song views and watch time
export const trackSongAnalytics = async (req, res) => {
  try {
    const { songId, watchTime } = req.body;
    const userId=req.user.id;

    // Validate the input
    if (!songId || !userId || !watchTime) {
      return res.status(400).json({ message: "Song ID, User ID, and Watch Time are required." });
    }

    // Find the song to ensure it exists
    const song = await songModel.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found." });
    }

    // Find or create song analytics for the user
    let analytics = await songAnalyticsModel.findOne({ songId, userId });
    if (!analytics) {
      analytics = new songAnalyticsModel({
        songId,
        userId,
        watchTime,
      });
    } else {
      analytics.watchTime += watchTime;
    }

    // Save the analytics data
    await analytics.save();

    return res.status(200).json({ message: "Song analytics updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Could not update song analytics." });
  }
};

// Function to get total views and total watch time for a song (all users)
export const getTotalSongAnalytics = async (req, res) => {
  try {
    const { songId } = req.params;

    // Validate the input
    if (!songId) {
      return res.status(400).json({ message: "Song ID is required." });
    }

    // Find the song to ensure it exists
    const song = await songModel.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found." });
    }

    // Aggregate the total views and watch time for all users of the song
    const analytics = await songAnalyticsModel.aggregate([
      { $match: { songId: mongoose.Types.ObjectId(songId) } },
      {
        $group: {
          _id: "$songId",
          totalViews: { $sum: "$views" },
          totalWatchTime: { $sum: "$watchTime" },
        },
      },
    ]);

    // If there is no analytics data
    if (analytics.length === 0) {
      return res.status(404).json({ message: "No analytics data found for this song." });
    }

    // Return the aggregated data
    return res.status(200).json({
      songId: songId,
      totalViews: analytics[0].totalViews,
      totalWatchTime: analytics[0].totalWatchTime,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Could not fetch song analytics." });
  }
};


//get the total views of the song
export const trackSongView = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id;

    if (!songId || !userId) {
      return res.status(400).json({ message: "Song ID and User ID are required." });
    }

    // Check if user has already viewed the song
    let analytics = await songAnalyticsModel.findOne({ songId, userId });

    if (!analytics) {
      analytics = new songAnalyticsModel({ songId, userId, views: 1 });
    } else {
      analytics.views += 1;
    }

    await analytics.save();
    return res.status(200).json({ message: "View counted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error tracking view." });
  }
};


export const getTotalSongAnalyticsPerSong  = async (req, res) => {
  try {
    const songStats = await songAnalyticsModel.aggregate([
      {
        $group: {
          _id: "$songId",
          totalViews: { $sum: "$views" }, // Sum total views
          totalWatchTime: { $sum: "$watchTime" }, // Sum total watch time
        },
      },
      {
        $lookup: {
          from: "songs", // Ensure this matches your actual songs collection name
          localField: "_id",
          foreignField: "_id",
          as: "song",
        },
      },
      {
        $unwind: { path: "$song", preserveNullAndEmptyArrays: true }, // Handle missing song details
      },
      {
        $project: {
          _id: 0,
          songId: "$_id",
          songName: { $ifNull: ["$song.name", "Unknown"] }, // Fetch title from song schema
          totalViews: 1,
          totalWatchTime: 1,
        },
      },
    ]);

    res.status(200).json({ message: "Total views and watch time per song", data: songStats });
  } catch (error) {
    console.error("Error fetching total views and watch time:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
