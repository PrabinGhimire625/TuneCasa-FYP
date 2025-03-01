import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'song',
      required: true,
    },
  },
  {
    timestamps: true, // To automatically create createdAt and updatedAt fields
  }
);

const Like = mongoose.model('Like', likeSchema);

export default Like;
