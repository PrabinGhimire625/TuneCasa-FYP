import { Router } from "express";
import { getEventAndMusicNotifications, getNotificationsByUser, markAllNotificationsAsRead } from "../controllers/notificationController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router=Router();

router.route("/singleUser").get(isAuthenticated, getNotificationsByUser )
router.route("/read-all").patch(isAuthenticated, markAllNotificationsAsRead )
router.route("/songEvent").get(getEventAndMusicNotifications )


export default router