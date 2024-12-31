import mongoose from "mongoose";

// Define the artist schema
const artistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bio: { type: String, required: true },
    status: { 
        type: String, 
        enum: ["pending", "approved", "rejected"], 
        default: "pending",
    },
});

// Create and export the Artist model
const Artist = mongoose.model("Artist", artistSchema);
export default Artist;
