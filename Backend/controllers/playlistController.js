import Playlist from "../models/playlistModel.js";
import Song from "../models/songModel.js"
import { v2 as cloudinary } from "cloudinary";
//create playlist
export const createPlaylist = async (req, res) => {
  try {
    const { title, description, privacy, songs } = req.body;
    const userId=req.user.id;

    const newPlaylist = new Playlist({
      title,
      description,
      privacy,
      userId,
      songs: songs || [], // Initialize with an empty array if no songs are provided
    });

    const savedPlaylist = await newPlaylist.save();
    res.status(200).json({message:"Playlist is created successfully", data:savedPlaylist});
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//get all playlist
export const getAllPlaylist=async(req,res)=>{
  const allPlaylist=await Playlist.find();
  if(allPlaylist.length<1){
      return res.status(404).json({message:"allPlaylist not found"});   
  }
  res.status(200).json({message: "Successfull get all the Playlist",data:allPlaylist});
}

//get single playlist
export const getSinglePlaylist=async(req, res)=>{
  const id= req.params.id;
  const singlePlaylist= await Playlist.findById(id);
  if(!singlePlaylist){
    return res.status(400).json({message:"Playlist not found"});
  }
  res.status(200).json(({message: " Successfully get the single playlist", data:singlePlaylist}));
}


//delete playlist 
export const deletePlaylist=async(req, res)=>{
  const id=req.params.id;
  const playlist=await Playlist.findByIdAndDelete(id);
  if(!playlist){
    return res.status(400).json({message:"Playlist not found"});
  }
  res.status(200).json(({message: " Playlist deleted successfully"}));
}

// Update playlist
export const updatePlaylist = async (req, res) => {
    const { title, description, privacy, songs } = req.body;
    const id = req.params.id; 
    const userId = req.user.id;

    const playlist = await Playlist.findOne({ _id: id, userId });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found or unauthorized" });
    }

    if (title) playlist.title = title;
    if (description) playlist.description = description;
    if (privacy) playlist.privacy = privacy;
    if (songs) playlist.songs = songs;

    const updatedPlaylist = await playlist.save();
    res.status(200).json({ message: "Playlist updated successfully", data: updatedPlaylist });
};


//add song in playlist
 export const addSongToPlaylist = async (req, res) => {
  try {
    const { songId } = req.body;
    const playlistId = req.params.id; 
    const userId = req.user.id; 

    const playlist = await Playlist.findOne({ _id: playlistId, userId });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found or unauthorized" });
    }

    if (playlist.songs.includes(songId)) {
      return res.status(400).json({ message: "Song already exists in the playlist" });
    }
    playlist.songs.push(songId);
    
    const updatedPlaylist = await playlist.save();
    res.status(200).json({
      message: "Song added to playlist successfully",
      data: updatedPlaylist
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



//update playlist iamges
export const updatePlaylistImage = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const imageFile = req.files?.image?.[0];

  if (!imageFile) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  try {
    // Prepare the update data object
    const updateData = {};

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    updateData.image = imageUpload.secure_url;

    // Update playlist image
    const playlistImage = await Playlist.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!playlistImage) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json({
      message: "Image successfully added to the playlist",
      data: playlistImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};







// export const addSongToPlaylist = async (req, res) => {
//   const { playlistId, songId } = req.params;
//   try {
//     const playlist = await Playlist.findById(playlistId);
//     const song = await Song.findById(songId);

//     // Add the song to the playlist if not already present
//     if (!playlist.songs.includes(songId)) {
//       playlist.songs.push(songId);
//       await playlist.save();
//     }

//     res.status(200).json({ message: "Song added to playlist" });
//   } catch (err) {
//     res.status(500).json({ message: "Error adding song to playlist", error: err });
//   }
// };
