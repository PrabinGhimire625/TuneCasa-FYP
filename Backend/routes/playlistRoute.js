import { Router } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import errorHandler from "../services/catchAsyncError.js";
import { createPlaylist, deletePlaylist, getAllPlaylist, getSinglePlaylist } from "../controllers/playlistController.js";
const router=Router();

router.route("/").post(isAuthenticated, errorHandler(createPlaylist))
.get(errorHandler(getAllPlaylist))


router.route("/:id").get(isAuthenticated, errorHandler(getSinglePlaylist))
.delete(isAuthenticated, errorHandler(deletePlaylist))


export default router