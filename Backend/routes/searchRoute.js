import { Router } from "express";
import { searchSongAlbumArtist } from "../controllers/searchController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get( searchSongAlbumArtist);

export default router;
