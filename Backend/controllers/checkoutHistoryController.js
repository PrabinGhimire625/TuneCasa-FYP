import { v2 as cloudinary } from "cloudinary";
import User from "../models/userModel.js";
import Checkout from "../models/checkoutModel.js";

import songAnalyticsModel from "../models/SongAnalyticsModel .js";
import songModel from "../models/songModel.js";


export const requestCheckout = async (req, res) => {
  const userId = req.user?.id;
  const { totalEarnings } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User ID not found" });
  }

  if (!totalEarnings || totalEarnings < 1000) {
    return res.status(400).json({ message: "Minimum earnings of NPR 1000 not reached." });
  }

  try {
    // Check if a pending checkout already exists for this user
    const existingCheckout = await Checkout.findOne({
      userId,
      status: "requested"
    });

    if (existingCheckout) {
      return res.status(400).json({
        message: "You’ve already requested a checkout. Please wait for it to be processed."
      });
    }

    // Create new checkout request
    const checkoutRecord = new Checkout({
      userId,
      amount: totalEarnings,
      status: "requested"
    });

    await checkoutRecord.save();

    res.status(200).json({
      message: "Checkout request submitted successfully.",
      checkoutId: checkoutRecord._id
    });

  } catch (error) {
    console.error("Error requesting checkout:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const fetchRequestedCheckout = async (req, res) => {
  try {
    // Fetch all checkouts with status "requested" and populate user info
    const requestedCheckouts = await Checkout.find({
      status: "requested"
    }).populate({
      path: "userId",
      select: "username email" // Fetch only the username and email from user
    });

    if (requestedCheckouts.length === 0) {
      return res.status(404).json({ message: "No requested checkouts found." });
    }

    res.status(200).json({
      message: "Requested checkouts fetched successfully.",
      data: requestedCheckouts
    });

  } catch (error) {
    console.error("Error fetching requested checkouts:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const fetchSingleRequestedCheckout = async (req, res) => {
  const { checkoutId } = req.params; // Get checkoutId from the URL params

  try {
    // Fetch the requested checkout by its ID and populate user info
    const requestedCheckout = await Checkout.findById(checkoutId).populate({
      path: "userId",
      select: "username email" // Fetch only the username and email from user
    });

    if (!requestedCheckout) {
      return res.status(404).json({ message: "Requested checkout not found." });
    }

    res.status(200).json({
      message: "Requested checkout fetched successfully.",
      data: requestedCheckout
    });

  } catch (error) {
    console.error("Error fetching requested checkout:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const completeCheckout = async (req, res) => {
  const { checkoutId } = req.params;  // Checkout ID passed as a URL parameter

  try {
    // Fetch the checkout record by its ID and populate the 'userId' field
    const checkout = await Checkout.findById(checkoutId).populate('userId');

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found." });
    }

    // Check if the checkout status is "requested" before marking it as "completed"
    if (checkout.status !== "requested") {
      return res.status(400).json({ message: "Checkout status is not 'requested'. Cannot complete it." });
    }

    // Update the checkout status to 'completed'
    checkout.status = "completed";
    await checkout.save();

    // Get userId from the checkout record to update song earnings
    const userId = checkout.userId._id;

    // 2. Get all songs by the artist (userId)
    const songs = await songModel.find({ userId }, { _id: 1 }); // Get all songs for this user (only the _id)
    if (songs.length === 0) {
      return res.status(404).json({ message: "No songs found for this artist." });
    }

    // Extract all songIds from the songs retrieved
    const songIds = songs.map(song => song._id);

    // 3. Update the song analytics, resetting totalEarning to 0 for all songs by this user
    const result = await songAnalyticsModel.updateMany(
      { songId: { $in: songIds } },  // Find all song analytics by songId from the list of songIds
      { $set: { totalEarning: 0 } }  // Reset earnings to 0
    );

    if (result.modifiedCount === 0) {
      return res.status(500).json({ message: "Failed to reset song earnings." });
    }

    res.status(200).json({
      message: "Checkout completed successfully. Earnings reset for all songs of the user."
    });
  } catch (error) {
    console.error("Error completing checkout:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//fetch all checkout history
export const fetchAllCompletedCheckout = async (req, res) => {
  try {
    // Fetch all checkouts with status "completed", populate user info, and sort by createdAt in descending order
    const completedCheckouts = await Checkout.find({
      status: "completed"
    })
      .populate({
        path: "userId",
        select: "username email" // Fetch only the username and email from user
      })
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order (latest first)

    if (completedCheckouts.length === 0) {
      return res.status(404).json({ message: "No completed checkouts found." });
    }

    res.status(200).json({
      message: "Completed checkouts fetched successfully.",
      data: completedCheckouts
    });

  } catch (error) {
    console.error("Error fetching completed checkouts:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Fetch completed checkout history of the logged-in user
export const fetchArtistCompletedCheckoutHistory = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using a middleware to attach user to req

    // Fetch completed checkouts for the logged-in user, sorted by createdAt in descending order
    const userCheckouts = await Checkout.find({
      status: "completed",
      userId: userId
    })
      .populate({
        path: "userId",
        select: "username email"
      })
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order (latest first)

    if (userCheckouts.length === 0) {
      return res.status(404).json({ message: "No completed checkouts found for this user." });
    }

    res.status(200).json({
      message: "User's completed checkouts fetched successfully.",
      data: userCheckouts
    });

  } catch (error) {
    console.error("Error fetching user's completed checkouts:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
