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
          _id: { songId: "$songId", analyticsId: "$_id" },
          totalViews: { $sum: "$views" },
          totalWatchTime: { $sum: "$watchTime" },
          totalEarning: { $sum: "$totalEarning" },
        },
      },
      {
        $lookup: {
          from: "songs",
          localField: "_id.songId",
          foreignField: "_id",
          as: "song",
        },
      },
      { $unwind: { path: "$song", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: "$_id.analyticsId",
          songId: "$_id.songId",
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
      { $sort: { totalEarning: -1 } }, // Sort by highest earning first
    ]);

    res.status(200).json({
      message: "Songs sorted by total earnings",
      data: songStats,
    });
  } catch (error) {
    console.error("Error fetching song analytics:", error);
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


export const fetchArtistSongAnalytics = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId format for userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid artist ID format." });
    }

    // Find all songs created by the given artist (userId)
    const artistSongs = await songModel.find(
      { userId: new mongoose.Types.ObjectId(userId) }, 
      { _id: 1 } // Only fetch the _id (songId)
    );

    if (!artistSongs.length) {
      return res.status(404).json({ message: "No songs found for this artist." });
    }

    const songIds = artistSongs.map(song => song._id); // Extract song IDs

    // Fetch analytics for these songs
    const artistSongStats = await songAnalyticsModel.aggregate([
      {
        $match: { 
          songId: { $in: songIds.map(id => new mongoose.Types.ObjectId(id)) } // Cast songId to ObjectId
        }
      },
      {
        $group: {
          _id: { songId: "$songId", analyticsId: "$_id" },
          totalViews: { $sum: "$views" },
          totalWatchTime: { $sum: "$watchTime" },
          totalEarning: { $sum: "$totalEarning" }
        }
      },
      {
        $lookup: {
          from: "songs", // Join with the songs collection
          localField: "_id.songId",
          foreignField: "_id",
          as: "song"
        }
      },
      {
        $unwind: { path: "$song", preserveNullAndEmptyArrays: true }
      },
      {
        $project: {
          _id: "$_id.analyticsId",
          songId: "$_id.songId",
          songName: { $ifNull: ["$song.name", "Unknown"] },
          album: { $ifNull: ["$song.album", "Unknown"] },
          desc: { $ifNull: ["$song.desc", "Unknown"] },
          image: { $ifNull: ["$song.image", "Unknown"] },
          file: { $ifNull: ["$song.file", "Unknown"] },
          totalViews: 1,
          totalWatchTime: 1,
          totalEarning: 1
        }
      }
    ]);

    if (!artistSongStats.length) {
      return res.status(404).json({ message: "No analytics found for this artist's songs." });
    }

    res.status(200).json({
      message: "Artist song analytics fetched successfully",
      data: artistSongStats
    });

  } catch (error) {
    console.error("Error fetching artist song analytics:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const fetchMonthlyArtistEarnings = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId format for userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid artist ID format." });
    }

    // Find all songs created by the given artist (userId)
    const artistSongs = await songModel.find(
      { userId: new mongoose.Types.ObjectId(userId) },
      { _id: 1 } // Only fetch the _id (songId)
    );

    if (!artistSongs.length) {
      return res.status(404).json({ message: "No songs found for this artist." });
    }

    const songIds = artistSongs.map(song => song._id); // Extract song IDs

    // Fetch total earnings for these songs (sum all earnings)
    const totalEarnings = await songAnalyticsModel.aggregate([
      {
        $match: {
          songId: { $in: songIds.map(id => new mongoose.Types.ObjectId(id)) } // Match songId
        }
      },
      {
        $group: {
          _id: null, // No grouping by song, just sum all earnings
          totalEarnings: { $sum: "$totalEarning" } // Sum all totalEarnings
        }
      }
    ]);

    const total = totalEarnings.length ? totalEarnings[0].totalEarnings : 0;

    res.status(200).json({
      message: "Total earnings for the artist fetched successfully",
     data:{ userId,
      totalEarnings: total}
    });
  } catch (error) {
    console.error("Error fetching total earnings for the artist:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
