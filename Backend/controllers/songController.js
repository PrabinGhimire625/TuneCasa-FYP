import {v2 as cloudinary} from "cloudinary"
import songModel from "../models/songModel.js";
import albumModel from "../models/albumModel.js"
import Artist from "../models/artistModel.js"
import User from "../models/userModel.js";
import notifiactionModel from "../models/notifiactionModel.js";

//add songs
export const addSong = async (req, res) => {
  const { name, desc, album, genre } = req.body;
  const audioFile = req.files.audio[0];
  const imageFile = req.files.image[0];
  const userId = req.user.id;

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
      duration,
    };

    const song = await songModel.create(songData);

    // Find artist profile to get followers
    const artistProfile = await Artist.findOne({ userId });



    // Notify followers about the new song release
if (artistProfile && Array.isArray(artistProfile.followers) && artistProfile.followers.length > 0) {
  for (const followerId of artistProfile.followers) {
    await notifiactionModel.create({
      userId: followerId,
      content: `🎵 ${artist.username} just released a new track: ${name} — check it out now!`, // Song name included
      type: "music",
      isRead: false,
      name: name, // Store the song name for the notification
      image: imageUpload.secure_url, // Store the song image URL for the notification
    });
  }
}


    // Optional: Create a global notification (if needed)
    // await Notification.create({
    //   content: `🎵 ${artist.username} just released a new track: ${name} — check it out now!`,
    //   type: "music",
    //   isRead: false,
    // });

    res.status(200).json({ message: "Song is successfully added!", data: song });
  } catch (error) {
    console.error("Error adding song:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


//get all the song
export const getAllSong = async (req, res) => {
  try {
      const allSongs = await songModel.find().sort({ createdAt: -1 }); // Sort by newest first
      if (allSongs.length < 1) {
          return res.status(404).json({ message: "Songs not found" });
      }
      res.status(200).json({ message: "Successfully fetched all songs", data: allSongs });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};




// Count all songs
export const countAllSong = async (req, res) => {
  const totalSongs = await songModel.countDocuments();
  // Send the count as a response
  res.status(200).json({ message: "Song count fetched successfully", data: totalSongs });
};



export const fetchSingleSong = async (req, res) => {
    try {
        const id = req.params.id;

        // Find the song
        const singleSong = await songModel.findById(id);
        if (!singleSong) {
            return res.status(404).json({ message: "Song not found" });
        }

        // Fetch the user by userId
        const user = await User.findById(singleSong.userId).select('username');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Append username to response
        const responseData = {
            ...singleSong._doc,
            username: user.username
        };

        res.status(200).json({ message: "Successfully fetched the single song", data: responseData });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


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
  
//song by genre
  export const fetchSongByGenre = async (req, res) => {
      const { genre } = req.params;
  
      try {
          // Case-insensitive regex search to find albums with the specified genre
          const songs = await songModel.find({
              genre: { $regex: new RegExp(`^${genre}$`, 'i') } // 'i' for case-insensitive search
          });
  
          // Check if songs were found
          if (!songs || songs.length === 0) {
              return res.status(404).json({
                  message: "No albums found for this genre", 
              });
          }
  
          // Return the fetched songs
          res.status(200).json({
              message: "Successfully fetched songs for the genre", 
              data: songs,
          });
  
      } catch (error) {
          console.error("Error fetching albums by genre:", error); 
          res.status(500).json({
              message: "Server error while fetching songs", 
              error: error.message,
          });
      }
  };
  

// Count songs and list them for an artist
export const countAndListArtistSongs = async (req, res) => {
  const userId = req.user.id;
  try {
    // Fetch the count of songs
    const songCount = await songModel.countDocuments({ userId });
    
    // Fetch the songs for the artist, sorted by the latest `createdAt`
    const songs = await songModel.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Songs fetched successfully",
      data: {
        songCount,
        songs,
      },
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ message: "Something went wrong while fetching songs" });
  }
};


// recommend latest 6 songs created by an artist
export const getLatestSongsByArtist = async (req, res) => {
  const { userId } = req.params;
  const latestSongs = await songModel.find({ userId })
    .sort({ createdAt: -1 })
    .limit(6);
  res.status(200).json({  message: "Successfully fetched 6 latest song of the user", data: latestSongs });
};

// recommend overall latest 6 songs uploaded
export const getLatestSongs = async (req, res) => {
  const latestSongs = await songModel.find()
    .sort({ createdAt: -1 })
    .limit(6);
  res.status(200).json({ message: "Successfully fetched songs 6 latest song on the system",  data : latestSongs });
};



  
