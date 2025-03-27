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
          _id: "$songId", // Grouping by songId
          totalViews: { $sum: "$views" }, // Sum total views
          totalWatchTime: { $sum: "$watchTime" }, // Sum total watch time
          totalEarning: { $sum: "$totalEarning" }, // Sum total earnings (if you have earnings field)
        },
      },
      {
        $lookup: {
          from: "songs", // Assuming songs collection is named "songs"
          localField: "_id", // Matching songId with _id
          foreignField: "_id", // Foreign field is also _id in the songs collection
          as: "song",
        },
      },
      {
        $unwind: { path: "$song", preserveNullAndEmptyArrays: true }, // Unwind the song data
      },
      {
        $project: {
          _id: 0,
          songId: "$_id",
          songName: { $ifNull: ["$song.name", "Unknown"] }, // If song name is missing, default to "Unknown"
          album: { $ifNull: ["$song.album", "Unknown"] }, // If album is missing, default to "Unknown"
          desc: { $ifNull: ["$song.desc", "Unknown"] }, // If description is missing, default to "Unknown"
          image: { $ifNull: ["$song.image", "Unknown"] }, // If image is missing, default to "Unknown"
          file: { $ifNull: ["$song.file", "Unknown"] }, // If file is missing, default to "Unknown"
          totalViews: 1, // Total views
          totalWatchTime: 1, // Total watch time
          totalEarning: 1, // Total earnings
        },
      },
    ]);

    res.status(200).json({ message: "Total views, watch time, and earnings per song", data: songStats });
  } catch (error) {
    console.error("Error fetching total views, watch time, and earnings:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

import { ObjectId } from 'mongodb'; // Make sure to import ObjectId

export const getSingleSongAnalytics = async (req, res) => {
  try {
    const { songId } = req.params; // Extract songId from the URL parameters

    if (!songId) {
      return res.status(400).json({ message: "Song ID is required" });
    }

    // Ensure the songId is an ObjectId type (assuming it's stored as an ObjectId in MongoDB)
    const objectId = ObjectId(songId);

    const songStats = await songAnalyticsModel.aggregate([
      {
        $match: { songId: objectId }, // Match the songId from the request parameter
      },
      {
        $group: {
          _id: "$songId", // Group by songId
          totalViews: { $sum: "$views" }, // Sum of total views
          totalWatchTime: { $sum: "$watchTime" }, // Sum of total watch time
          totalEarning: { $sum: "$totalEarning" }, // Sum of total earnings
        },
      },
      {
        $lookup: {
          from: "songs", // Assuming the songs collection is called "songs"
          localField: "_id", // The songId from the analytics model
          foreignField: "_id", // The _id field in the songs collection
          as: "song", // The joined data will be stored in "song"
        },
      },
      {
        $unwind: { path: "$song", preserveNullAndEmptyArrays: true }, // Unwind the song data
      },
      {
        $project: {
          _id: 0,
          songId: "$_id", // The songId
          songName: { $ifNull: ["$song.name", "Unknown"] }, // Song name, fallback to "Unknown" if missing
          album: { $ifNull: ["$song.album", "Unknown"] }, // Album, fallback to "Unknown" if missing
          desc: { $ifNull: ["$song.desc", "Unknown"] }, // Description, fallback to "Unknown" if missing
          image: { $ifNull: ["$song.image", "Unknown"] }, // Image, fallback to "Unknown" if missing
          file: { $ifNull: ["$song.file", "Unknown"] }, // File, fallback to "Unknown" if missing
          totalViews: 1, // Total views
          totalWatchTime: 1, // Total watch time
          totalEarning: 1, // Total earnings
        },
      },
    ]);

    if (!songStats.length) {
      return res.status(404).json({ message: "No analytics found for the specified song" });
    }

    res.status(200).json({ message: "Song analytics fetched successfully", data: songStats[0] });
  } catch (error) {
    console.error("Error fetching song analytics:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
