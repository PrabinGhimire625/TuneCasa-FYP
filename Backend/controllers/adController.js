import { v2 as cloudinary } from "cloudinary";
import Ads from "../models/adModel.js";
import User from "../models/userModel.js";
import subscriptionModel from "../models/subscriptionModel.js";

// Create Ads
// export const createAds = async (req, res) => {
//     const { name } = req.body; // Only the name is required from the body
//     const audioFile = req.files?.video?.[0]; // Use optional chaining to safely check for the file
//     const userId = req.user.id; // Ensure userId is extracted correctly from authenticated user
    
//     // Ensure the userId is valid
//     if (!userId) {
//       return res.status(400).json({ message: "User not authenticated or userId missing" });
//     }
  
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(400).json({ message: "Invalid userId, user not found" });
//     }
  
//     if (!audioFile) {
//       return res.status(400).json({ message: "No video file uploaded" }); // Check if the file exists
//     }
  
//     // Upload video file to Cloudinary
//     const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
  
//     // Get the duration of the video from Cloudinary's response
//     const duration = audioUpload.duration;
  
//     // Prepare ad data based on schema
//     const adData = {
//       name,
//       userId, // Make sure userId is passed here
//       file: audioUpload.secure_url, // URL of the uploaded video
//       duration,
//       isSkippable: true, // Default value is true
//       totalPlays: 0, // Default value
//       totalClicks: 0, // Default value
//       totalSkips: 0, // Default value
//       totalWatchTime: 0, // Default value
//     };
  
//     // Create the ad in the database
//     const ad = await Ads.create(adData);
  
//     // Respond with success message and ad details
//     res.status(200).json({ message: "Ad is successfully added!", data: ad });
//   };

export const createAds = async (req, res) => {
  const { name } = req.body; // Only the name is required from the body
  const audioFile = req?.files?.audio[0];
  const imageFile = req?.files?.image[0];
  const userId = req.user.id; // Ensure userId is extracted correctly from authenticated user
  
  // Ensure the userId is valid
  if (!userId) {
    return res.status(400).json({ message: "User not authenticated or userId missing" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "Invalid userId, user not found" });
  }

  if (!audioFile) {
    return res.status(400).json({ message: "No video file uploaded" }); // Check if the file exists
  }

  const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
  const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

  // Format the song duration in minutes and seconds
  const duration = Math.floor(audioUpload.duration); // Convert duration to a number (in seconds)

  // Prepare ad data based on schema
  const adData = {
    name,
    userId, // Make sure userId is passed here
    file: audioUpload.secure_url, // URL of the uploaded video
    image: imageUpload.secure_url,
    duration,
    isSkippable: true, // Default value is true
    totalPlays: 0, // Default value
    totalClicks: 0, // Default value
    totalSkips: 0, // Default value
    totalWatchTime: 0, // Default value
  };

  // Create the ad in the database
  const ad = await Ads.create(adData);

  // Respond with success message and ad details
  res.status(200).json({ message: "Ad is successfully added!", data: ad });
};
  

// Get All Ads
export const getAllAds = async (req, res) => {
  const allAds = await Ads.find();
  if (allAds.length < 1) {
    return res.status(404).json({ message: "Ads not found" });
  }
  res.status(200).json({ message: "Successfully fetched all ads", data: allAds });
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
  const { id } = req.params; // Get ad ID from URL params
  const { name } = req.body; // Get updated fields from request body
  const audioFile = req?.files?.audio ? req.files.audio[0] : null;
  const imageFile = req?.files?.image ? req.files.image[0] : null;

  try {
    // Find the ad by ID
    const ad = await Ads.findById(id);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    // Update fields if provided
    if (name) ad.name = name;
    
    // Upload new audio file if provided
    if (audioFile) {
      try {
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        ad.file = audioUpload.secure_url;
        ad.duration = Math.floor(audioUpload.duration); // Update duration if audio changes
      } catch (error) {
        return res.status(500).json({ message: "Failed to upload audio file", error: error.message });
      }
    }

    // Upload new image file if provided
    if (imageFile) {
      try {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        ad.image = imageUpload.secure_url;
      } catch (error) {
        return res.status(500).json({ message: "Failed to upload image file", error: error.message });
      }
    }

    // Save the updated ad
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

      // Fetch a single random ad
      const ad = await Ads.aggregate([{ $sample: { size: 1 } }]);

      if (ad.length === 0) {
          return res.status(404).json({ message: "No ads available" });
      }

      res.status(200).json({ message: "Fetched a random ad successfully", data: ad[0] });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching ad", errorMessage: error.message });
  }
};

//track ad view
export const trackAdWatchTime = async (req, res) => {
  try {
      const { id, watchTime } = req.body;

      if (!id || typeof watchTime !== 'number' || watchTime <= 0) {
          return res.status(400).json({ message: "Valid Ad ID and watch time are required" });
      }

      const updatedAd = await Ads.findByIdAndUpdate(
          id,
          { $inc: { totalWatchTime: watchTime } },
          { new: true }
      );

      if (!updatedAd) {
          return res.status(404).json({ message: "Ad not found" });
      }

      res.status(200).json({ message: "Ad watch time updated successfully", data: updatedAd });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error tracking ad watch time" });
  }
};


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


