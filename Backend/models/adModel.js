import mongoose from "mongoose";

const AdSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  file: { type: String, required: true }, 
  duration: { type: Number, required: true }, 
  isSkippable: { type: Boolean, default: true }, 
  totalPlays: { type: Number, default: 0 }, 
  totalClicks: { type: Number, default: 0 }, 
  totalSkips: { type: Number, default: 0 }, 
  totalWatchTime: { type: Number, default: 0 }, 
  createdAt: { type: Date, default: Date.now },
});

const Ad = mongoose.model("Ad", AdSchema);
export default Ad;
