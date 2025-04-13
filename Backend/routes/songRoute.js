import {Router} from "express"
import { addSong, countAllSong, countAndListArtistSongs, deleteSong, fetchArtistSongs, fetchSingleSong, fetchSongByGenre, fetchSongsByAlbum, getAllSong, updateSong } from "../controllers/songController.js";
import upload from "../middleware/multer.js";
import errorHandler from "../services/catchAsyncError.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router=Router();

router.route("/").post(isAuthenticated, upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]),addSong)
.get( errorHandler(getAllSong))

router.route("/total/count").get( errorHandler(countAllSong))
router.route("/artistSong/count").get(isAuthenticated, errorHandler(countAndListArtistSongs))

router.route("/:album").get( errorHandler(fetchSongsByAlbum))
router.route("/songByGenre/genres/:genre").get( errorHandler(fetchSongByGenre))
router.route("/artist/:userId").get( errorHandler(fetchArtistSongs))



router.route("/singleSong/:id").get(isAuthenticated, errorHandler((fetchSingleSong)))

router.route("/:id").get(isAuthenticated, errorHandler((fetchSingleSong)))
.delete(isAuthenticated, errorHandler(deleteSong))
.patch(isAuthenticated, upload.fields([{ name: 'image', maxCount: 1 }]),errorHandler(updateSong))



export default router