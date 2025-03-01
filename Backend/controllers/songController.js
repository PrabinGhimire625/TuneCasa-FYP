import {v2 as cloudinary} from "cloudinary"
import songModel from "../models/songModel.js";
import albumModel from "../models/albumModel.js"
import Artist from "../models/artistModel.js"
import User from "../models/userModel.js";

//add songs
export const addSong = async (req, res) => {
  const { name, desc, album, genre } = req.body;
  const audioFile = req.files.audio[0];
  const imageFile = req.files.image[0];
  const userId=req.user.id;
  try {
    const artist = await User.findById(userId);
    if (!artist) {
      return res.status(400).json({ message: "Invalid artistId, artist not found" });
    }

    // Upload audio and image to Cloudinary
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

    // Format the song duration in minutes and seconds
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

    // Prepare the song data 
    const songData = {
      name,
      desc,
      album,
      genre,
      userId, 
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration
    };

    const song = await songModel.create(songData);
    res.status(200).json({ message: "Song is successfully added!", data: song });
  } catch (error) {
    console.error("Error adding song:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//get all the song
export const getAllSong=async(req,res)=>{
        const allSongs=await songModel.find();
        if(allSongs.length<1){
            return res.status(404).json({message:"Songs not found"});   
        }
        res.status(200).json({message: "Successfull get all the songs",data:allSongs});
}

//fetch single song
export const fetchSingleSong=async(req,res)=>{
    const id=req.params.id;
    const singleSong=await songModel.findById(id);
    if(!singleSong){
        return res.status(404).json({message:"Songs not found"});   
    }
    res.status(200).json({message:"Successfully fetch the single song",data:singleSong});
}

//delete song
export const deleteSong=async(req,res)=>{
    const {id}=req.params;
    const deleteSingleSong=await songModel.findByIdAndDelete(id);
     if (!deleteSingleSong) {
        return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json({message:"Successfully delete the song"});
}

//update song
export const updateSong = async (req, res) => {
    const { id } = req.params;
    const { name, desc } = req.body;
    const imageFile = req.files?.image?.[0]; // Check if image exists

    // Prepare update object
    const updateData = {};
    if (name) updateData.name = name;
    if (desc) updateData.desc = desc;

    if (imageFile) {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
        });
        updateData.image = imageUpload.secure_url;
    }

    // Update song
    const updatedSong = await songModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
    );

    if (!updatedSong) {
        return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json({ message: "Song updated successfully", data: updatedSong });
};

// Fetch songs by album name
export const fetchSongsByAlbum = async (req, res) => {
    // Extract the album name from the URL parameters
    const { album } = req.params;
  
    try {
      // Query songs that match the album name
      const songs = await songModel.find({ album });
  
      // If no songs are found, return a 404 response
      if (!songs || songs.length === 0) {
        return res.status(404).json({
          message: "No songs found for this album",
        });
      }
  
      // Return the found songs
      res.status(200).json({
        message: "Successfully fetched songs for the album",
        data: songs,
      });
    } catch (error) {
      console.error("Error fetching songs by album:", error);
      res.status(500).json({
        message: "Server error while fetching songs",
        error: error.message,
      });
    }
  };

  //fetch artist song
  export const fetchArtistSongs = async (req, res) => {
    const { userId } = req.params;
  
    const songs = await songModel.find({ userId });
  
    if (!songs.length) {
      return res.status(404).json({ message: "No songs found for this artist." });
    }
  
    res.status(200).json({ message: "Songs fetched successfully", data: songs });
  };
  