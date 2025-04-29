import Like from '../models/likeModel.js';

// Add a Like
export const addLike = async (req, res) => {
  const songId = req.params.songId;
  const userId = req.user.id;

  try {
    const existingLike = await Like.findOne({ userId, songId });

    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this song.' });
    }
    const newLike = new Like({ userId, songId });
    await newLike.save();

    res.status(200).json({ message: 'Song liked successfully!', newLike });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Fetch all likes
export const getLikes = async (req, res) => {
  const userId = req.user.id;
  try {
    const likes = await Like.find({ userId }).populate('songId', 'name album image file');

    if (!likes.length) {
      return res.status(404).json({ message: 'No likes found.' });
    }

    res.status(200).json({ message: 'Likes retrieved successfully', data: likes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Delete a Like 
export const deleteLike = async (req, res) => {
  const songId = req.params.songId;
  const userId = req.user.id;
  try {

    const like = await Like.findOneAndDelete({ userId, songId });

    if (!like) {
      return res.status(404).json({ message: 'Like not found or already removed.' });
    }

    res.status(200).json({ message: 'Like removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

//get total like per song
export const getTotalLikesPerSong = async (req, res) => {
  try {
    const totalLikes = await Like.aggregate([
      {
        $group: {
          _id: "$songId",
          totalLikes: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "songs",
          localField: "_id",
          foreignField: "_id",
          as: "song",
        },
      },
      {
        $unwind: { path: "$song", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 0,
          songId: "$_id",
          songName: { $ifNull: ["$song.name", "Unknown"] },
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
