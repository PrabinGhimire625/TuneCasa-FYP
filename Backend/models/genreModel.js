import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  bgColour: { type: String },
});

const genreModel = mongoose.models.genre || mongoose.model("genre", genreSchema);
export default genreModel;
