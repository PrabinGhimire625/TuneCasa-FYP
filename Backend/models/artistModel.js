import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bio: { type: String, required: true },
    status: { 
        type: String, 
        enum: ["pending", "approved", "rejected"], 
        default: "pending",
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] 
});

const Artist = mongoose.model("Artist", artistSchema);
export default Artist;
