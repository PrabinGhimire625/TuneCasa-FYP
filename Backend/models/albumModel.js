import mongoose from "mongoose";

const albumSchema= new mongoose.Schema({
    name:{type:String,required:true, unique:true},
    desc:{type:String,required:true},
    bgColour:{type:String,required:true},
    image:{type:String,required:true},
    genre: { type: String},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
}, { timestamps: true }
);

const albumModel=mongoose.models.album || mongoose.model("album",albumSchema);
export default albumModel