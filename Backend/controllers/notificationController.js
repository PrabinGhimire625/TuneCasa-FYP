import notificationModel from "../models/notifiactionModel.js";

//get the notification by the user
export const getNotificationsByUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const notifications = await notificationModel
      .find({ userId: userId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      message: "Successfully fetched notifications",
      data: notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//make the notifaction as read
export const markAllNotificationsAsRead = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await notificationModel.updateMany(
      { userId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: "All notifications marked as read", result });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//notification to admin
export const getEventAndMusicNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel.find({
      type: { $in: ['event', 'music'] },
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// get the artist notifiation
export const getArtistNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await notificationModel.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({ data: notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};