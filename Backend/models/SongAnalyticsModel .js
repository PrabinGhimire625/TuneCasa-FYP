import mongoose from "mongoose";

const songAnalyticsSchema = new mongoose.Schema({
  songId: { type: mongoose.Schema.Types.ObjectId, ref: "song", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  views: { type: Number, default: 0 }, 
  watchTime: { type: Number, default: 0 }, 
  totalEarning: { type: Number, default: 0 },
});

// Pre-save hook to calculate totalEarning before saving the document
songAnalyticsSchema.pre("save", function (next) {
  this.totalEarning = this.views * 0.3;
  next();
});

// Check and create if "songAnalytics" model is not created
const songAnalyticsModel =
  mongoose.models.songAnalytics || mongoose.model("songAnalytics", songAnalyticsSchema);

export default songAnalyticsModel;
