import AdTracking from "../models/AdTrackingModel.js"; // Analytics model

// 🔹 1. Track Watch Time (after ad is played or skipped)
export const trackAdAnalytics = async (req, res) => {
  const { adId, watchTime = 0 } = req.body;

  if (!adId) {
    return res.status(400).json({ message: "Ad ID is required." });
  }

  try {
    let adTracking = await AdTracking.findOne({ adId });

    if (adTracking) {
      adTracking.watchTime += watchTime;
      await adTracking.save();
      return res.status(200).json({
        message: "Ad analytics updated successfully.",
        data: adTracking,
      });
    } else {
      const newTracking = await AdTracking.create({ adId, watchTime, views: 0 });
      return res.status(201).json({
        message: "New ad analytics created.",
        data: newTracking,
      });
    }
  } catch (error) {
    console.error("Error in trackAdAnalytics:", error);
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// 🔹 2. Track Views (immediately when ad starts playing)
export const trackAdView = async (req, res) => {
  const { adId } = req.body;

  if (!adId) {
    return res.status(400).json({ message: "Ad ID is required." });
  }

  try {
    let adTracking = await AdTracking.findOne({ adId });

    if (adTracking) {
      adTracking.views = (adTracking.views || 0) + 1;
      await adTracking.save();
    } else {
      adTracking = await AdTracking.create({ adId, views: 1, watchTime: 0 });
    }

    return res.status(200).json({ message: "Ad view counted successfully.", data: adTracking });
  } catch (error) {
    console.error("Error in trackAdView:", error);
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};
