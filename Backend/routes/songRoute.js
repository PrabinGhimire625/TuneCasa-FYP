import {Router} from "express"
import { addSong, deleteSong, fetchArtistSongs, fetchSingleSong, fetchSongsByAlbum, getAllSong, updateSong } from "../controllers/songController.js";
import upload from "../middleware/multer.js";
import errorHandler from "../services/catchAsyncError.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router=Router();

router.route("/").post(isAuthenticated, upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]),addSong)
.get( errorHandler(getAllSong))


router.route("/:album").get( errorHandler(fetchSongsByAlbum))
router.route("/artist/:userId").get( errorHandler(fetchArtistSongs))


router.route("/:id").get(isAuthenticated, errorHandler((fetchSingleSong)))
.delete(isAuthenticated, errorHandler(deleteSong))
.patch(isAuthenticated, upload.fields([{ name: 'image', maxCount: 1 }]),errorHandler(updateSong))


export default router