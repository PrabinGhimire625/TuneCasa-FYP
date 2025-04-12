import mongoose from 'mongoose';

// Notification Schema
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // null for global
  type: { type: String, enum: ['music', 'event', 'chat', 'app', 'ad', "album", "subscription"], default: 'music' }, // type of notification
  content: { type: String, required: true }, // content of the notification
  name: { type: String },
  image: { type: String },
  isRead: { type: Boolean, default: false }, // if the notification has been read
  createdAt: { type: Date, default: Date.now }, // when the notification was created
});

// Create and export the Notification model
export default mongoose.model('Notification', notificationSchema);
