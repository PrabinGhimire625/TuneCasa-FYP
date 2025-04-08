import mongoose from "mongoose";

const AdTrackingSchema = new mongoose.Schema({
  adId: { type: mongoose.Schema.Types.ObjectId, ref: "Ads", required: true },
  views: { type: Number, default: 0 },
  watchTime: { type: Number, default: 0 }, 
  createdAt: { type: Date, default: Date.now },
});

const AdTracking = mongoose.model("AdTracking", AdTrackingSchema);
export default AdTracking;
