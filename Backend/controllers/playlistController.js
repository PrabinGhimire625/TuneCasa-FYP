import Playlist from "../models/playlistModel.js";
import Song from "../models/songModel.js"
import { v2 as cloudinary } from "cloudinary";

//create playlist
export const createPlaylist = async (req, res) => {
  try {
    const { title, description, privacy, songs } = req.body;
    const userId = req.user.id;

    const newPlaylist = new Playlist({
      title,
      description,
      privacy,
      userId,
      songs: songs || [],
    });

    const savedPlaylist = await newPlaylist.save();
    res.status(200).json({ message: "Playlist is created successfully", data: savedPlaylist });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//get all playlist
export const getAllPlaylist = async (req, res) => {
  try {
    const allPlaylist = await Playlist.find().sort({ createdAt: -1 });

    if (allPlaylist.length < 1) {
      return res.status(404).json({ message: "No playlists found." });
    }

    res.status(200).json({
      message: "Successfully fetched all playlists sorted by latest.",
      data: allPlaylist,
    });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ message: "Something went wrong while fetching playlists." });
  }
};


//get single playlist
export const getSinglePlaylist = async (req, res) => {
  const id = req.params.id;
  const singlePlaylist = await Playlist.findById(id).populate('songs', 'name file image album duration');

  if (!singlePlaylist) {
    return res.status(400).json({ message: "Playlist not found" });
  }
  res.status(200).json({
    message: "Successfully got the single playlist",
    data: singlePlaylist
  });
}


// Get playlists of the logged-in user
export const getPlaylistOfSingleUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const userPlaylists = await Playlist.find({ userId: userId })
      .populate('userId', 'username')
      .exec();

    if (userPlaylists.length < 1) {
      return res.status(404).json({ message: "No playlists found for this user" });
    }

    res.status(200).json({ message: "Successfully retrieved user's playlists", data: userPlaylists });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};



// Get public playlists of a specific user
export const getPublicPlaylistsByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const publicPlaylists = await Playlist.find({ userId, privacy: "public" })
      .populate('userId', 'username')
      .exec();

    if (publicPlaylists.length < 1) {
      return res.status(404).json({ message: "No public playlists found for this user" });
    }
    res.status(200).json({
      message: "Successfully retrieved public playlists for this user",
      data: publicPlaylists,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};


//delete playlist 
export const deletePlaylist = async (req, res) => {
  const id = req.params.id;
  const playlist = await Playlist.findByIdAndDelete(id);
  if (!playlist) {
    return res.status(400).json({ message: "Playlist not found" });
  }
  res.status(200).json(({ message: " Playlist deleted successfully" }));
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



//update playlist image
export const updatePlaylistImage = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const imageFile = req.files?.image?.[0];

  if (!imageFile) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  try {
    const updateData = {};
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    updateData.image = imageUpload.secure_url;
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

// Count totalPlaylist
export const countAllPlaylist = async (req, res) => {
  const totalPlaylist = await Playlist.countDocuments();
  res.status(200).json({ message: "TotalPlaylist count fetched successfully", data: totalPlaylist });
};
