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
    timestamps: true, 
  }
);

const Like = mongoose.model('Like', likeSchema);

export default Like;
