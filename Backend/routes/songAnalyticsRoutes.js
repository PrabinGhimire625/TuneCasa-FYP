import {Router} from "express"
import { getTotalSongAnalytics, trackSongAnalytics } from "../controllers/songAnalyticsController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import errorHandler from "../services/catchAsyncError.js";
const router=Router();

router.route("/").post(isAuthenticated, trackSongAnalytics)
router. route("/total/:songId").get(getTotalSongAnalytics);



export default router