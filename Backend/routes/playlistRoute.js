import { Router } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import errorHandler from "../services/catchAsyncError.js";
import { createPlaylist, getAllPlaylist } from "../controllers/playlistController.js";
const router=Router();

router.route("/").post(isAuthenticated, errorHandler(createPlaylist))
.get(errorHandler(getAllPlaylist))


export default router