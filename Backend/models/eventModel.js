import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
 userId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  eventDate: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
