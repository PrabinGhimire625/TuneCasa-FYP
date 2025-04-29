import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, 
  type: { type: String, enum: ['music', 'event', 'chat', 'app', 'ad', "album", "subscription", "follow"], default: 'music' }, 
  content: { type: String, required: true }, 
  name: { type: String },
  image: { type: String },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }, 
});

export default mongoose.model('Notification', notificationSchema);
