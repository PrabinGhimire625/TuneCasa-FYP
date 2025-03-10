import { v2 as cloudinary } from "cloudinary";
import Ads from "../models/adModel.js";
import User from "../models/userModel.js";

// Create Ads
export const createAds = async (req, res) => {
    const { name } = req.body; // Only the name is required from the body
    const videoFile = req.files?.video?.[0]; // Use optional chaining to safely check for the file
    const userId = req.user.id; // Ensure userId is extracted correctly from authenticated user
    
    // Ensure the userId is valid
    if (!userId) {
      return res.status(400).json({ message: "User not authenticated or userId missing" });
    }
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid userId, user not found" });
    }
  
    if (!videoFile) {
      return res.status(400).json({ message: "No video file uploaded" }); // Check if the file exists
    }
  
    // Upload video file to Cloudinary
    const videoUpload = await cloudinary.uploader.upload(videoFile.path, { resource_type: "video" });
  
    // Get the duration of the video from Cloudinary's response
    const duration = videoUpload.duration;
  
    // Prepare ad data based on schema
    const adData = {
      name,
      userId, // Make sure userId is passed here
      file: videoUpload.secure_url, // URL of the uploaded video
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
    const { id } = req.params; // Get the ad ID from the request params
    const { name } = req.body; // Get the new name from the body
    const videoFile = req.files?.video?.[0]; // Get the video file if provided
  
    // Check if the ad exists
    const ad = await Ads.findById(id);
  
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }
  
    // If a video file is provided, upload it to Cloudinary
    let videoUrl = ad.file; // If no new video is uploaded, keep the current one
    let duration = ad.duration; // Keep the current duration if no new video
  
    if (videoFile) {
      // Upload video file to Cloudinary
      const videoUpload = await cloudinary.uploader.upload(videoFile.path, { resource_type: "video" });
      videoUrl = videoUpload.secure_url; // Update video URL
      duration = videoUpload.duration; // Update video duration
    }
  
    // Update the ad data
    const updatedAd = await Ads.findByIdAndUpdate(id, {
      name: name || ad.name, // Update name if provided, otherwise keep the old one
      file: videoUrl, // Always update the video URL
      duration: duration, // Update the video duration
    }, { new: true });
  
    // Respond with success message and updated ad details
    res.status(200).json({ message: "Ad successfully updated!", data: updatedAd });
  };
  