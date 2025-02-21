import { Router } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import errorHandler from "../services/catchAsyncError.js";
import { addSongToPlaylist, createPlaylist, deletePlaylist, getAllPlaylist, getSinglePlaylist, updatePlaylist } from "../controllers/playlistController.js";
const router=Router();

router.route("/").post(isAuthenticated, errorHandler(createPlaylist))
.get(errorHandler(getAllPlaylist))

router.route("/add-song/:id").post(isAuthenticated, errorHandler(addSongToPlaylist))
// router.route("/:playlistId/add-song/:songId").post(isAuthenticated, errorHandler(addSongToPlaylist))

router.route("/:id").get(isAuthenticated, errorHandler(getSinglePlaylist))
.delete(isAuthenticated, errorHandler(deletePlaylist))
.patch(isAuthenticated, errorHandler(updatePlaylist))


export default router