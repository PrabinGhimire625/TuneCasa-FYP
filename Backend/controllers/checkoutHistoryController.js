import { v2 as cloudinary } from "cloudinary";
import User from "../models/userModel.js";
import Checkout from "../models/checkoutModel.js";

// Get all Events
export const getArtistCheckoutHistory = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const history = await Checkout.find({ userId })
        .sort({ createdAt: -1 })
        .populate({
          path: "userId",      
          select: "username",  
        });
  
      res.status(200).json(history);
    } catch (error) {
      console.error("Error fetching user checkout history:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  