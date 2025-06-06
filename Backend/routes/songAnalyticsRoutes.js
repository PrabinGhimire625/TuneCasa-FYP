import {Router} from "express"
import { fetchArtist, fetchArtistSongAnalytics, fetchArtistTrendingSong, fetchMonthlyArtistEarnings, fetchMonthlyEarning, getRecommendedSongsForUser, getSingleTotalSongAnalyticsById, getTotalSongAnalytics, getTotalSongAnalyticsPerSong, trackSongAnalytics, trackSongView } from "../controllers/songAnalyticsController.js";
import { isAuthenticated, restrictTo, Role } from "../middleware/authMiddleware.js";
import errorHandler from "../services/catchAsyncError.js";
const router=Router();

router.route("/").post(isAuthenticated, trackSongAnalytics)

router.route("/view").post(isAuthenticated, trackSongView)
router.route("/trendingSong").get(isAuthenticated, fetchArtistTrendingSong)
router.route("/totalAnalyticsPerSong").get(isAuthenticated, restrictTo(Role.Admin),getTotalSongAnalyticsPerSong)


router.route("/totalAnalyticsPerSong/:id").get(getSingleTotalSongAnalyticsById)
router.route("/artistSong/:userId").get(restrictTo(Role.Artist), fetchArtistSongAnalytics)
router.route("/artistSong").get(isAuthenticated, fetchArtist)
router.route("/artist/monthly-earnings/:userId").get(isAuthenticated, fetchMonthlyArtistEarnings)
router.route("/artist/monthly-earnings").get(isAuthenticated, fetchMonthlyEarning)


router.route("/recommend/song/user").get(isAuthenticated, getRecommendedSongsForUser)
router. route("/total/:songId").get(getTotalSongAnalytics);

export default router
