import { v2 as cloudinary } from "cloudinary";
import Ads from "../models/adModel.js";
import User from "../models/userModel.js";
import subscriptionModel from "../models/subscriptionModel.js";

//add the ads to the system
export const createAds = async (req, res) => {
  const { name, totalPlays } = req.body;
  const audioFile = req?.files?.audio[0];
  const imageFile = req?.files?.image[0];
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ message: "User not authenticated or userId missing" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "Invalid userId, user not found" });
  }

  if (!audioFile) {
    return res.status(400).json({ message: "No video file uploaded" });
  }

  const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
  const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

  const duration = Math.floor(audioUpload.duration); // Convert duration to a number (in seconds)

  // Prepare ad data based on schema
  const adData = {
    name,
    userId,
    totalPlays,
    file: audioUpload.secure_url,
    image: imageUpload.secure_url,
    duration,
    isSkippable: true,
    totalPlays: totalPlays,
    totalClicks: 0,
    totalWatchTime: 0,
  };

  // Create the ad in the database
  const ad = await Ads.create(adData);
  res.status(200).json({ message: "Ad is successfully added!", data: ad });
};

// Get All Ads
export const getAllAds = async (req, res) => {
  try {
    const allAds = await Ads.find().sort({ createdAt: -1 });
    if (allAds.length < 1) {
      return res.status(404).json({ message: "Ads not found" });
    }
    res.status(200).json({ message: "Successfully fetched all ads", data: allAds });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Fetch Single Ad
export const fetchSingleAds = async (req, res) => {
  const id = req.params.id;
  const singleAd = await Ads.findById(id);

  if (!singleAd) {
    return res.status(404).json({ message: "Ad not found" });
  }

  res.status(200).json({ message: "Successfully fetched the ad", data: singleAd });
};

// Delete Ad
export const deleteAds = async (req, res) => {
  const { id } = req.params;
  const deleteSingleAd = await Ads.findByIdAndDelete(id);

  if (!deleteSingleAd) {
    return res.status(404).json({ message: "Ad not found" });
  }

  res.status(200).json({ message: "Successfully deleted the ad" });
};

// Update Ad
export const updateAds = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const audioFile = req?.files?.audio ? req.files.audio[0] : null;
  const imageFile = req?.files?.image ? req.files.image[0] : null;

  try {
    const ad = await Ads.findById(id);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    if (name) ad.name = name;

    if (audioFile) {
      try {
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        ad.file = audioUpload.secure_url;
        ad.duration = Math.floor(audioUpload.duration);
      } catch (error) {
        return res.status(500).json({ message: "Failed to upload audio file", error: error.message });
      }
    }
    if (imageFile) {
      try {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        ad.image = imageUpload.secure_url;
      } catch (error) {
        return res.status(500).json({ message: "Failed to upload image file", error: error.message });
      }
    }

    await ad.save();

    res.status(200).json({ message: "Ad updated successfully", data: ad });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating ad", error: error.message });
  }
};

//get the random ads for the free user
export const getAdsForFreeUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID: ", userId);

    // Check if user has an active subscription
    const activeSubscription = await subscriptionModel.findOne({ userId, status: "active" });

    if (activeSubscription) {
      return res.status(200).json({ message: "User is subscribed, no ads shown", data: null });
    }
    const ad = await Ads.aggregate([
      { $match: { status: "active" } },
      { $sample: { size: 1 } }
    ]);

    if (ad.length === 0) {
      return res.status(404).json({ message: "No active ads available" });
    }

    res.status(200).json({ message: "Fetched a random active ad successfully", data: ad[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching ad", errorMessage: error.message });
  }
};

//track ad view
export const trackAdView = async (req, res) => {
  try {
    const { id, watchTime } = req.body;

    if (!id || typeof watchTime !== 'number' || watchTime <= 0) {
      return res.status(400).json({ message: "Valid Ad ID and watch time are required" });
    }
    const ad = await Ads.findById(id);

    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    // Check if watchTime is greater than 5 seconds before updating the view count
    if (watchTime > 5) {
      // Increment the totalViews by 1
      ad.totalViews += 1;

      // Check if the totalPlays equals totalViews, and set status to expired if true
      if (ad.totalPlays === ad.totalViews) {
        ad.status = "expired";
      }
      await ad.save();

      res.status(200).json({
        message: "Ad view updated successfully",
        data: ad
      });
    } else {
      res.status(400).json({ message: "Ad view not tracked: watch time must be greater than 5 seconds" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error tracking ad view" });
  }
};


//track ad skip
export const trackAdSkip = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Ad ID is required" });
    }

    const updatedAd = await Ads.findByIdAndUpdate(
      id,
      { $inc: { totalSkips: 1 } },
      { new: true }
    );

    if (!updatedAd) {
      return res.status(404).json({ message: "Ad not found" });
    }

    res.status(200).json({ message: "Ad skip tracked successfully", data: updatedAd });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error tracking ad skip" });
  }
};

//track ad click
export const trackAdClick = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Ad ID is required" });
    }

    const updatedAd = await Ads.findByIdAndUpdate(
      id,
      { $inc: { totalClicks: 1 } },
      { new: true }
    );

    if (!updatedAd) {
      return res.status(404).json({ message: "Ad not found" });
    }

    res.status(200).json({ message: "Ad click tracked successfully", data: updatedAd });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error tracking ad click" });
  }
};

//get ads revenue calculation
export const getAdsRevenue = async (req, res) => {
  const allAds = await Ads.find();
  if (allAds.length < 1) {
    return res.status(404).json({ message: "Ads not found" });
  }
  res.status(200).json({ message: "Successfully fetched all ads", data: allAds });
};


