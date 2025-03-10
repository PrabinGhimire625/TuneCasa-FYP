const AdTrackingSchema = new mongoose.Schema({
    adId: { type: mongoose.Schema.Types.ObjectId, ref: "Ad", required: true }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    playStartTime: { type: Number, required: true }, 
    playEndTime: { type: Number },
    watchedDuration: { type: Number, default: 0 }, 
    skipped: { type: Boolean, default: false },
    clicked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  });
  
  const AdTracking = mongoose.model("AdTracking", AdTrackingSchema);
  export default AdTracking;
  