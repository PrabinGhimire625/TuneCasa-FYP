import mongoose from "mongoose";

const AdSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  file: { type: String, required: true },
  image: { type: String },
  duration: { type: Number, required: true },
  // isSkippable: { type: Boolean, default: true },
  totalViews: { type: Number, default: 0 }, // Ensure this is set as a Number
  totalPlays: { type: Number, default: 0 },
  totalWatchTime: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  // totalClicks: { type: Number, default: 0 },
  // totalSkips: { type: Number, default: 0 },
  status: { type: String, default: 'active' }, // Add status field with default value 'active'
  createdAt: { type: Date, default: Date.now },
});


const Ad = mongoose.model("Ad", AdSchema);
export default Ad;
