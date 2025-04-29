import mongoose from "mongoose";

const AdSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  file: { type: String, required: true },
  image: { type: String },
  duration: { type: Number, required: true },
  totalViews: { type: Number, default: 0 }, 
  totalPlays: { type: Number, default: 0 },
  totalWatchTime: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  status: { type: String, default: 'active' }, 
  createdAt: { type: Date, default: Date.now },
});


const Ad = mongoose.model("Ad", AdSchema);
export default Ad;
