import songAnalyticsModel from "../models/SongAnalyticsModel .js";
import songModel from "../models/songModel.js";
import mongoose from "mongoose";
import Checkout from "../models/checkoutModel.js"

// Function to track song views and watch time
export const trackSongAnalytics = async (req, res) => {
  try {
    const { songId, watchTime } = req.body;
    const userId = req.user.id;
    if (!songId || !userId || !watchTime) {
      return res.status(400).json({ message: "Song ID, User ID, and Watch Time are required." });
    }

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

    await analytics.save();

    return res.status(200).json({ message: "Song analytics updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Could not update song analytics." });
  }
};


// fet the total song analytice
export const getTotalSongAnalytics = async (req, res) => {
  try {
    const { songId } = req.params;
    if (!songId) {
      return res.status(400).json({ message: "Song ID is required." });
    }
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

    if (analytics.length === 0) {
      return res.status(404).json({ message: "No analytics data found for this song." });
    }

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


//get total song analytics per song
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
      { $sort: { totalEarning: -1 } },
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


//get single total song analytics
export const getSingleTotalSongAnalyticsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Analytics ID is required" });
    }

    const songStats = await songAnalyticsModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
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
          _id: 1,
          songId: 1,
          songName: { $ifNull: ["$song.name", "Unknown"] },
          album: { $ifNull: ["$song.album", "Unknown"] },
          desc: { $ifNull: ["$song.desc", "Unknown"] },
          image: { $ifNull: ["$song.image", "Unknown"] },
          file: { $ifNull: ["$song.file", "Unknown"] },
          totalViews: { $ifNull: ["$views", 0] },
          totalWatchTime: { $ifNull: ["$watchTime", 0] },
          totalEarning: { $ifNull: ["$totalEarning", 0] },
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


//fetch artist song analytic
export const fetchArtistSongAnalytics = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid artist ID format." });
    }

    const artistSongs = await songModel.find(
      { userId: new mongoose.Types.ObjectId(userId) },
      { _id: 1 }
    );

    if (!artistSongs.length) {
      return res.status(404).json({ message: "No songs found for this artist." });
    }

    const songIds = artistSongs.map(song => song._id);
    const artistSongStats = await songAnalyticsModel.aggregate([
      {
        $match: {
          songId: { $in: songIds.map(id => new mongoose.Types.ObjectId(id)) }
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
          from: "songs",
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

//calculate the artist monthly earning 
export const fetchMonthlyArtistEarnings = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid artist ID format." });
    }

    const artistSongs = await songModel.find(
      { userId: new mongoose.Types.ObjectId(userId) },
      { _id: 1 }
    );

    if (!artistSongs.length) {
      return res.status(404).json({ message: "No songs found for this artist." });
    }

    const songIds = artistSongs.map(song => song._id);

    const totalEarnings = await songAnalyticsModel.aggregate([
      {
        $match: {
          songId: { $in: songIds.map(id => new mongoose.Types.ObjectId(id)) }
        }
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$totalEarning" }
        }
      }
    ]);

    const total = totalEarnings.length ? totalEarnings[0].totalEarnings : 0;

    res.status(200).json({
      message: "Total earnings for the artist fetched successfully",
      data: {
        userId,
        totalEarnings: total
      }
    });
  } catch (error) {
    console.error("Error fetching total earnings for the artist:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


//fetcht the  artist song 
export const fetchArtist = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid artist ID format." });
    }
    const artistSongs = await songModel.find(
      { userId: new mongoose.Types.ObjectId(userId) },
      { _id: 1 }
    );

    if (!artistSongs.length) {
      return res.status(404).json({ message: "No songs found for this artist." });
    }

    const songIds = artistSongs.map(song => song._id);

    const artistSongStats = await songAnalyticsModel.aggregate([
      {
        $match: {
          songId: { $in: songIds }
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
          from: "songs",
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


//fetch artist top view song
export const fetchArtistTrendingSong = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid artist ID format." });
    }
    const artistSongs = await songModel.find(
      { userId: new mongoose.Types.ObjectId(userId) },
      { _id: 1 }
    );

    if (!artistSongs.length) {
      return res.status(404).json({ message: "No songs found for this artist." });
    }

    const songIds = artistSongs.map(song => song._id);
    const topSongs = await songAnalyticsModel.aggregate([
      {
        $match: {
          songId: { $in: songIds.map(id => new mongoose.Types.ObjectId(id)) }
        }
      },
      {
        $group: {
          _id: "$songId",
          totalViews: { $sum: "$views" }
        }
      },
      {
        $sort: { totalViews: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: "songs",
          localField: "_id",
          foreignField: "_id",
          as: "song"
        }
      },
      {
        $unwind: { path: "$song", preserveNullAndEmptyArrays: true }
      },
      {
        $project: {
          songName: { $ifNull: ["$song.name", "Unknown"] },
          songImage: { $ifNull: ["$song.image", "Unknown"] },
          album: { $ifNull: ["$song.album", "Unknown"] },
          totalViews: 1
        }
      }
    ]);

    if (!topSongs.length) {
      return res.status(404).json({ message: "No trending songs found for this artist." });
    }

    res.status(200).json({
      message: "Top 5 trending songs fetched successfully",
      data: topSongs
    });

  } catch (error) {
    console.error("Error fetching artist trending songs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


//recommend the user best on their must played song 
export const getRecommendedSongsForUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const analytics = await songAnalyticsModel.find({ userId })
      .sort({ views: -1 })
      .limit(6)
      .populate("songId");

    const topSongs = analytics.map((item) => ({
      song: item.songId,
      views: item.views,
      watchTime: item.watchTime,
    }));

    res.json({ data: topSongs });
  } catch (error) {
    console.error("Recommended songs error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//fetch monthly earning of the artist
export const fetchMonthlyEarning = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid artist ID format." });
    }
    const artistSongs = await songModel.find(
      { userId: new mongoose.Types.ObjectId(userId) },
      { _id: 1 }
    );

    if (!artistSongs.length) {
      return res.status(404).json({ message: "No songs found for this artist." });
    }

    const songIds = artistSongs.map(song => song._id);
    const totalEarnings = await songAnalyticsModel.aggregate([
      {
        $match: {
          songId: { $in: songIds }
        }
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$totalEarning" }
        }
      }
    ]);

    const total = totalEarnings.length ? totalEarnings[0].totalEarnings : 0;

    res.status(200).json({
      message: "Total earnings for the artist fetched successfully",
      data: {
        userId,
        totalEarnings: total
      }
    });
  } catch (error) {
    console.error("Error fetching total earnings for the artist:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

