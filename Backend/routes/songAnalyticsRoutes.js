import {Router} from "express"
import { getSingleTotalSongAnalyticsById, getTotalSongAnalytics, getTotalSongAnalyticsPerSong, trackSongAnalytics, trackSongView } from "../controllers/songAnalyticsController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import errorHandler from "../services/catchAsyncError.js";
const router=Router();

router.route("/").post(isAuthenticated, trackSongAnalytics)
router.route("/view").post(isAuthenticated, trackSongView)
router.route("/totalAnalyticsPerSong").get(getTotalSongAnalyticsPerSong)
router.route("/totalAnalyticsPerSong/:id").get(getSingleTotalSongAnalyticsById)

router. route("/total/:songId").get(getTotalSongAnalytics);

export default router
