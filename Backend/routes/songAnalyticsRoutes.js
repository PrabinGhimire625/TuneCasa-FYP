import {Router} from "express"
import { artistCheckout, fetchArtist, fetchArtistSongAnalytics, fetchArtistTrendingSong, fetchMonthlyArtistEarnings, fetchMonthlyEarning, getSingleTotalSongAnalyticsById, getTotalSongAnalytics, getTotalSongAnalyticsPerSong, trackSongAnalytics, trackSongView } from "../controllers/songAnalyticsController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import errorHandler from "../services/catchAsyncError.js";
const router=Router();

router.route("/").post(isAuthenticated, trackSongAnalytics)
router.route("/view").post(isAuthenticated, trackSongView)
router.route("/trendingSong").get(isAuthenticated, fetchArtistTrendingSong)
router.route("/totalAnalyticsPerSong").get(getTotalSongAnalyticsPerSong)
router.route("/totalAnalyticsPerSong/:id").get(getSingleTotalSongAnalyticsById)
router.route("/artistSong/:userId").get(fetchArtistSongAnalytics)
router.route("/artistSong").get(isAuthenticated, fetchArtist)
router.route("/artist/monthly-earnings/:userId").get(fetchMonthlyArtistEarnings)
router.route("/artist/monthly-earnings").get(isAuthenticated, fetchMonthlyEarning)
router.route("/checkout").post(isAuthenticated, artistCheckout)


router. route("/total/:songId").get(getTotalSongAnalytics);

export default router
