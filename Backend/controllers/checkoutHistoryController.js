import { v2 as cloudinary } from "cloudinary";
import User from "../models/userModel.js";
import Checkout from "../models/checkoutModel.js";

// Get all user history of the specific artist
export const getArtistCheckoutHistory = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const history = await Checkout.find({ userId })
        .sort({ createdAt: -1 })
        .populate({
          path: "userId",      
          select: "username",  
        });
  
      res.status(200).json({data : history});
    } catch (error) {
      console.error("Error fetching user checkout history:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

// Get details of a single checkout by its ID
export const getSingleCheckoutHistory = async (req, res) => {
    const { id } = req.params;  

    try {
        const checkout = await Checkout.findById(id)
            .populate({
                path: "userId",  
                select: "username email"  
            })
            .exec();
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }
        res.status(200).json({ data: checkout });
    } catch (error) {
        console.error("Error fetching single checkout:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

