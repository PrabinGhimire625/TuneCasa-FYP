import { v2 as cloudinary } from "cloudinary";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import Artist from "../models/artistModel.js"
import notifiactionModel from "../models/notifiactionModel.js";
import moment from 'moment';

//post the event 
export const addEvent = async (req, res) => {
  const { title, description, eventDate, location } = req.body;
  const imageFile = req.file;

  const userId = req.user.id;
  const artist = await User.findById(userId);
  if (!artist) {
    return res.status(400).json({ message: "Invalid artistId, artist not found" });
  }

  if (!title || !eventDate || !location) {
    return res.status(400).json({ message: "Please provide title, eventDate, and location." });
  }

  const existingEvent = await Event.findOne({ title });
  if (existingEvent) {
    return res.status(400).json({ message: "Event title must be unique." });
  }

  let imageUrl = "";
  if (imageFile) {
    try {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return res.status(500).json({ message: "Failed to upload image." });
    }
  }

  const eventData = {
    userId,
    title,
    description,
    eventDate,
    location,
    image: imageUrl,
  };

  const event = await Event.create(eventData);
  if (!event) {
    return res.status(500).json({ message: "Failed to create event." });
  }

  // 🔔 Notify followers
  try {
    const artistProfile = await Artist.findOne({ userId });

    if (
      artistProfile &&
      Array.isArray(artistProfile.followers) &&
      artistProfile.followers.length > 0
    ) {
      for (const followerId of artistProfile.followers) {
        await notifiactionModel.create({
          userId: followerId,
          content: `📅 ${artist.username} just announced a new event: "${title}". Don’t miss it!`,
          type: "event",
          isRead: false,
          name: title,
          image: imageUrl || "", // Optional image of event
        });
      }
    }
  } catch (err) {
    console.error("Error sending event notifications:", err);
    // Not returning error here to avoid stopping response due to notification failure
  }

  res.status(201).json({ message: "Event successfully added!", data: event });
};

// Get all Events
export const getAllEvents = async (req, res) => {
  const allEvents = await Event.find();
  if (allEvents.length < 1) {
    return res.status(404).json({ message: "No events found." });
  }
  res.status(200).json({ message: "Successfully fetched all events.", data: allEvents });
};

// Get single Event
export const fetchSingleEvent = async (req, res) => {
  const { id } = req.params;
  const singleEvent = await Event.findById(id);
  if (!singleEvent) {
    return res.status(404).json({ message: "Event not found." });
  }
  res.status(200).json({ message: "Successfully fetched the event.", data: singleEvent });
};

// Delete Event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const deletedEvent = await Event.findByIdAndDelete(id);
  if (!deletedEvent) {
    return res.status(404).json({ message: "Event not found." });
  }
  res.status(200).json({ message: "Event successfully deleted." });
};

//update event
export const updateEvent = async (req, res) => {
  const id = req.params.id;
  const { title, description, eventDate, location } = req.body;
  const imageFile = req.files?.image?.[0];

  const updateData = {};
  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (eventDate) updateData.eventDate = eventDate;
  if (location) updateData.location = location;


  if (imageFile) {
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    updateData.image = imageUpload.secure_url;
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );

  if (!updatedEvent) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.status(200).json({ message: "Event updated successfully", data: updatedEvent });
};

// Fetch Events for a Specific Artist
export const fetchEventsOfEachArtist = async (req, res) => {
  const { userId } = req.params;
  const artist = await User.findById(userId);
  if (!artist) {
    return res.status(404).json({ message: "Artist not found." });
  }
  const artistEvents = await Event.find({ userId });

  if (artistEvents.length === 0) {
    return res.status(404).json({ message: "No events found for this artist." });
  }

  res.status(200).json({ message: "Successfully fetched artist's events.", data: artistEvents });
};

// fetch  and all the upcomming event of the specific artist
export const fetchAndCountArtistUpcomingEvents = async (req, res) => {
  const userId = req.user.id;

  try {
    const artist = await User.findById(userId);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found." });
    }

    const today = moment().format("YYYY-MM-DD");
    const upcomingEventCount = await Event.countDocuments({
      userId,
      eventDate: { $gte: today },
    });

    // 🔄 Fetch events sorted by latest (newest first)
    const sortedEvents = await Event.find({ userId }).sort({ eventDate: -1 });

    res.status(200).json({
      message: "Fetched all events sorted by latest with count of upcoming ones.",
      data: {
        count: upcomingEventCount,
        events: sortedEvents,
      },
    });

  } catch (error) {
    console.error("Error fetching artist events:", error);
    res.status(500).json({ message: "Something went wrong while fetching events." });
  }
};



