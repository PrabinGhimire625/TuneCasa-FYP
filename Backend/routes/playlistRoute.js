import { Router } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import errorHandler from "../services/catchAsyncError.js";
import { addSongToPlaylist, countAllPlaylist, createPlaylist, deletePlaylist, getAllPlaylist, getPlaylistOfSingleUser, getPublicPlaylistsByUser, getSinglePlaylist, updatePlaylist, updatePlaylistImage } from "../controllers/playlistController.js";
import upload from "../middleware/multer.js";
import { countAllArtists } from "../controllers/userController.js";
const router=Router();

router.route("/").post(isAuthenticated, errorHandler(createPlaylist))
.get(errorHandler(getAllPlaylist))
router.route("/total/count").get(errorHandler(countAllPlaylist))
router.route("/userPlaylist").get(isAuthenticated, errorHandler(getPlaylistOfSingleUser))
router.route("/public").get(isAuthenticated, errorHandler(getPublicPlaylistsByUser))

router.route("/add-song/:id").post(isAuthenticated, errorHandler(addSongToPlaylist))
// router.route("/:playlistId/add-song/:songId").post(isAuthenticated, errorHandler(addSongToPlaylist))

router.route("/:id").get(isAuthenticated, errorHandler(getSinglePlaylist))
.delete(isAuthenticated, errorHandler(deletePlaylist))
.patch(isAuthenticated, errorHandler(updatePlaylist))


router.route("/image/:id").patch(isAuthenticated, upload.fields([{ name: 'image', maxCount: 1 }]),errorHandler(updatePlaylistImage))


export default router