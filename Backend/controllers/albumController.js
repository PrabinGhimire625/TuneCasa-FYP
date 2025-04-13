import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";
import Artist from "../models/artistModel.js"
import notifiactionModel from "../models/notifiactionModel.js";
import User from "../models/userModel.js";

//add album
// export const addAlbum = async (req, res) => {
//     try {
//       const { name, desc, bgColour, genre } = req.body;
//       const imageFile = req.file;
//       const userId = req.user.id;
  
//       if (!name || !desc || !bgColour) {
//         return res.status(404).json({ message: "Please provide name, description, and background color." });
//       }
  
//       if (!imageFile) {
//         return res.status(403).json({ message: "Please upload an image for the album." });
//       }
  
//       // Check if an album with the same name already exists
//       const existingAlbum = await albumModel.findOne({ name });
//       if (existingAlbum) {
//         return res.status(400).json({ message: "Album name must be unique." });
//       }
  
//       // Upload image to Cloudinary
//       const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
//         resource_type: "image",
//       });
  
//       if (!imageUpload) {
//         return res.status(500).json({ message: "Failed to upload image." });
//       }
  
//       const albumData = {
//         userId, // ✅ Include the artist's userId
//         name,
//         desc,
//         bgColour,
//         genre,
//         image: imageUpload.secure_url,
//       };
  
//       const album = await albumModel.create(albumData);
  
//       if (!album) {
//         return res.status(500).json({ message: "Failed to create album in the database." });
//       }
  
//       res.status(200).json({ message: "Album is successfully added!", data: album });
  
//     } catch (err) {
//       console.error("Album creation error:", err);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   };
  
  export const addAlbum = async (req, res) => {
    try {
      const { name, desc, bgColour, genre } = req.body;
      const imageFile = req.file;
      const userId = req.user.id;
  
      if (!name || !desc || !bgColour) {
        return res.status(404).json({ message: "Please provide name, description, and background color." });
      }
  
      if (!imageFile) {
        return res.status(403).json({ message: "Please upload an image for the album." });
      }
  
      // Check if an album with the same name already exists
      const existingAlbum = await albumModel.findOne({ name });
      if (existingAlbum) {
        return res.status(400).json({ message: "Album name must be unique." });
      }
  
      // Upload image to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
  
      if (!imageUpload) {
        return res.status(500).json({ message: "Failed to upload image." });
      }
  
      const albumData = {
        userId,
        name,
        desc,
        bgColour,
        genre,
        image: imageUpload.secure_url,
      };
  
      const album = await albumModel.create(albumData);
  
      if (!album) {
        return res.status(500).json({ message: "Failed to create album in the database." });
      }
  
      // 🔔 Notify followers
      try {
        const artist = await User.findById(userId);
        const artistProfile = await Artist.findOne({ userId });
  
        if (
          artist &&
          artistProfile &&
          Array.isArray(artistProfile.followers) &&
          artistProfile.followers.length > 0
        ) {
          for (const followerId of artistProfile.followers) {
            await notifiactionModel.create({
              userId: followerId,
              content: `🎵 ${artist.username} just dropped a new album: "${name}"! Check it out now.`,
              type: "album",
              isRead: false,
              name: name,
              image: imageUpload.secure_url,
            });
          }
        }
      } catch (err) {
        console.error("Error sending album notifications:", err);
        // Don't stop the response if notifications fail
      }
  
      res.status(200).json({ message: "Album is successfully added!", data: album });
    } catch (err) {
      console.error("Album creation error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

//get all albums
export const getAllAlbum=async(req,res)=>{
    const allAlbums=await albumModel.find();
    if(allAlbums.length<1){
        return res.status(404).json({message:"Album not found"});   
    }
    res.status(200).json({message:"Successfully get all the album", data:allAlbums})
}

//get album of the specific artist
export const getAlbumsOfArtist = async (req, res) => {
  try {
    const userId = req.user?.id; // Ensure your auth middleware sets this

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    const artistAlbums = await albumModel.find({ userId }).sort({ createdAt: -1 });

    if (artistAlbums.length < 1) {
      return res.status(404).json({ message: "No albums found for this artist." });
    }

    res.status(200).json({
      message: "Successfully retrieved artist's albums",
      data: artistAlbums
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching albums",
      error: error.message
    });
  }
};


//get single album
export const fetchSingleAlbum=async(req,res)=>{
    const id=req.params.id;
    const singleAlbum=await albumModel.findById(id);
    if(!singleAlbum){
        return res.status(404).json({message:"Album not found"});   
    }
    res.status(200).json({message:"Successfully fetch the single album",data:singleAlbum});
}


//fetch album by name
export const fetchSingleAlbumByName = async (req, res) => {
    try {
        const name = req.params.name; 
        const singleAlbum = await albumModel.findOne({ name }); 

        if (!singleAlbum) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.status(200).json({ message: "Successfully fetched the album", data: singleAlbum });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//delete album
export const deleteAlbum=async(req,res)=>{
    const id=req.params.id;
    const deleteAlbum=await albumModel.findByIdAndDelete(id);
    if(!deleteAlbum){
        return res.status(404).json({message:"Album not found"});
    }
    res.status(200).json({message:"Successfully delete the album"})
}

//update album
export const updateAlbum = async (req, res) => {
      const id = req.params.id; 
      const { name, desc, bgColour } = req.body; 
      const imageFile = req.files?.image?.[0]; 

      // Prepare the update data object
      const updateData = {};
      if (name) updateData.name = name;
      if (desc) updateData.desc = desc;
      if (bgColour) updateData.bgColour = bgColour;
  

      if (imageFile) {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image",
        });
        updateData.image = imageUpload.secure_url; 
      }
  
      // Update album details
      const updatedAlbum = await albumModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true } 
      );
  
      if (!updatedAlbum) {
        return res.status(404).json({ message: "Album not found" });
      }
      res.status(200).json({ message: "Album updated successfully", data: updatedAlbum });
};

//fetch album by genre
export const fetchAlbumByGenre = async (req, res) => {
    const { genre } = req.params;

    try {
        // Case-insensitive regex search to find albums with the specified genre
        const albums = await albumModel.find({
            genre: { $regex: new RegExp(`^${genre}$`, 'i') } // 'i' for case-insensitive search
        });

        // Check if albums were found
        if (!albums || albums.length === 0) {
            return res.status(404).json({
                message: "No albums found for this genre", 
            });
        }

        // Return the fetched albums
        res.status(200).json({
            message: "Successfully fetched albums for the genre", 
            data: albums,
        });

    } catch (error) {
        console.error("Error fetching albums by genre:", error); 
        res.status(500).json({
            message: "Server error while fetching albums", 
            error: error.message,
        });
    }
};

// Fetch the latest top 5 albums
export const fetchLatestAlbums = async (req, res) => {
        const latestAlbums = await albumModel.find()
            .sort({ createdAt: -1 }) // Sort by newest first
            .limit(5); // Get only the top 5

        if (!latestAlbums || latestAlbums.length === 0) {
            return res.status(404).json({ message: "No albums found" });
        }

        res.status(200).json({
            message: "Successfully fetched latest albums",
            data: latestAlbums,
        });
};

// Count all album
export const countAllAlbum = async (req, res) => {
  const totalAlbum = await albumModel.countDocuments();
  // Send the count as a response
  res.status(200).json({ message: "Album count fetched successfully", data: totalAlbum });
};

