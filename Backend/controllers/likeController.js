import Like from '../models/likeModel.js';

// Add a Like (add to favorites)
export const addLike = async (req, res) => {
  const songId = req.params.songId; // Access the correct parameter name
  const userId = req.user.id;

  try {
    // Check if the user has already liked this song
    const existingLike = await Like.findOne({ userId, songId });

    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this song.' });
    }

    // Create a new like
    const newLike = new Like({ userId, songId });
    await newLike.save();

    res.status(200).json({ message: 'Song liked successfully!', newLike });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Fetch all likes by a user (or all likes for a song)
export const getLikes = async (req, res) => {
  const { songId, userId } = req.query; // Optional query params to filter by songId or userId

  try {
    // If both songId and userId are not provided, fetch all likes
    const filters = {};
    if (songId) filters.songId = songId;
    if (userId) filters.userId = userId;

    // Fetch likes and populate the related song data (name, album, image, file)
    const likes = await Like.find(filters).populate('songId', 'name album image file');

    if (!likes.length) {
      return res.status(404).json({ message: 'No likes found.' });
    }

    res.status(200).json({ message: 'Likes retrieved successfully', data:likes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Delete a Like (remove from favorites)
export const deleteLike = async (req, res) => {
  const songId = req.params.songId; // Access the correct parameter name
  const userId = req.user.id;

  try {
    // Find the like to delete
    const like = await Like.findOneAndDelete({ userId, songId });

    if (!like) {
      return res.status(404).json({ message: 'Like not found or already removed.' });
    }

    res.status(200).json({ message: 'Like removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getTotalLikesPerSong = async (req, res) => {
  try {
    const totalLikes = await Like.aggregate([
      {
        $group: {
          _id: "$songId", // Group by songId
          totalLikes: { $sum: 1 }, // Count total likes for each song
        },
      },
      {
        $lookup: {
          from: "songs", // Ensure this matches your actual songs collection name
          localField: "_id",
          foreignField: "_id",
          as: "song",
        },
      },
      {
        $unwind: { path: "$song", preserveNullAndEmptyArrays: true }, // Handle missing song details
      },
      {
        $project: {
          _id: 0,
          songId: "$_id",
          songName: { $ifNull: ["$song.name", "Unknown"] }, // Fetch song name
          totalLikes: 1,
        },
      },
    ]);

    res.status(200).json({ message: "Total likes per song", data: totalLikes });
  } catch (error) {
    console.error("Error fetching total likes:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
