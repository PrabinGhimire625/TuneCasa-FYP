import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  album: { type: String, required: true },
  genre: { type: String},
  image: { type: String, required: true },
  file: { type: String, required: true },
  duration: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
}, { timestamps: true }
);

//check and create if "song" model is not created
const songModel=mongoose.models.song || mongoose.model("song",songSchema);
export default songModel
