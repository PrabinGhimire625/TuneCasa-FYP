import mongoose from "mongoose";

const songAnalyticsSchema = new mongoose.Schema({
  songId: { type: mongoose.Schema.Types.ObjectId, ref: "song", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Nullable for anonymous users
  views: { type: Number, default: 0 }, // Total plays count
  watchTime: { type: Number, default: 0 }, // Total seconds listened
});

// Check and create if "songAnalytics" model is not created
const songAnalyticsModel =
  mongoose.models.songAnalytics || mongoose.model("songAnalytics", songAnalyticsSchema);

export default songAnalyticsModel;

