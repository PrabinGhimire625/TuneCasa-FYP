import {Router} from "express"
import { trackAdAnalytics, trackAdView } from "../controllers/adsAnalyticsController.js";
import errorHandler from "../services/catchAsyncError.js";

const router=Router();

router.route("/").post(errorHandler(trackAdAnalytics))
router.route("/view").post(errorHandler(trackAdView))

export default router
