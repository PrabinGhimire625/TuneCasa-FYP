import songAnalyticsModel from "../models/SongAnalyticsModel .js";
import songModel from "../models/songModel.js";
import mongoose from "mongoose";


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


export const getTotalSongAnalyticsPerSong = async (req, res) => {
  try {
    const songStats = await songAnalyticsModel.aggregate([
      {
        $group: {
          _id: { songId: "$songId", analyticsId: "$_id" }, // Keep both songId and analytics _id
          totalViews: { $sum: "$views" }, // Sum total views
          totalWatchTime: { $sum: "$watchTime" }, // Sum total watch time
          totalEarning: { $sum: "$totalEarning" }, // Sum total earnings (if applicable)
        },
      },
      {
        $lookup: {
          from: "songs", // Assuming songs collection is named "songs"
          localField: "_id.songId", // Matching songId with _id in songs collection
          foreignField: "_id",
          as: "song",
        },
      },
      {
        $unwind: { path: "$song", preserveNullAndEmptyArrays: true }, // Unwind the song data
      },
      {
        $project: {
          _id: "$_id.analyticsId", // Use analytics _id
          songId: "$_id.songId", // Use songId separately
          songName: { $ifNull: ["$song.name", "Unknown"] },
          album: { $ifNull: ["$song.album", "Unknown"] },
          desc: { $ifNull: ["$song.desc", "Unknown"] },
          image: { $ifNull: ["$song.image", "Unknown"] },
          file: { $ifNull: ["$song.file", "Unknown"] },
          totalViews: 1,
          totalWatchTime: 1,
          totalEarning: 1,
        },
      },
    ]);

    res.status(200).json({ message: "Total views, watch time, and earnings per song", data: songStats });
  } catch (error) {
    console.error("Error fetching total views, watch time, and earnings:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getSingleTotalSongAnalyticsById = async (req, res) => {
  try {
    const { id } = req.params; // Extract `_id` from request parameters

    if (!id) {
      return res.status(400).json({ message: "Analytics ID is required" });
    }

    const songStats = await songAnalyticsModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) }, // Match by analytics `_id`
      },
      {
        $lookup: {
          from: "songs",
          localField: "songId",
          foreignField: "_id",
          as: "song",
        },
      },
      {
        $unwind: { path: "$song", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1, // Keep analytics `_id`
          songId: 1, // Keep songId
          songName: { $ifNull: ["$song.name", "Unknown"] },
          album: { $ifNull: ["$song.album", "Unknown"] },
          desc: { $ifNull: ["$song.desc", "Unknown"] },
          image: { $ifNull: ["$song.image", "Unknown"] },
          file: { $ifNull: ["$song.file", "Unknown"] },
          totalViews: { $ifNull: ["$views", 0] }, // Ensure default 0 if missing
          totalWatchTime: { $ifNull: ["$watchTime", 0] }, // Ensure default 0 if missing
          totalEarning: { $ifNull: ["$totalEarning", 0] }, // Ensure default 0 if missing
        },
      },
    ]);

    if (!songStats.length) {
      return res.status(404).json({ message: "No analytics found for the specified ID" });
    }

    res.status(200).json({ message: "Song analytics fetched successfully", data: songStats[0] });
  } catch (error) {
    console.error("Error fetching song analytics:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
