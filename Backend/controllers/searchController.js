import songModel from "../models/songModel.js";
import albumModel from "../models/albumModel.js";
import Artist from "../models/artistModel.js";

export const searchSongAlbumArtist = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search songs based on name or description
    const songs = await songModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ]
    });

    // Search albums based on name
    const albums = await albumModel.find({
      name: { $regex: query, $options: "i" }
    });

    // Search artists by bio (and populate user)
    const artistsByBio = await Artist.find({
      bio: { $regex: query, $options: "i" }
    }).populate("userId", "username image");

    // Filter artists with valid userId
    const artistsByBioFiltered = artistsByBio.filter(artist => artist.userId !== null);

    // Search artists by username (via populated userId)
    const artistByUsername = await Artist.find().populate({
      path: "userId",
      match: { username: { $regex: query, $options: "i" } },
      select: "username image"
    });

    const artistByUsernameFiltered = artistByUsername.filter(artist => artist.userId !== null);

    // Merge both results and remove duplicates
    const uniqueArtistsMap = new Map();

    [...artistsByBioFiltered, ...artistByUsernameFiltered].forEach(artist => {
      uniqueArtistsMap.set(artist._id.toString(), artist);
    });

    const finalArtists = Array.from(uniqueArtistsMap.values());

    res.json({
      data: {
        songs,
        albums,
        artists: finalArtists
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
