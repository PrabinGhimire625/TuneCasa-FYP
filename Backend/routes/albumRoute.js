import { Router } from "express";
import { addAlbum, countAllAlbum, deleteAlbum, fetchAlbumByGenre, fetchLatestAlbums, fetchSingleAlbum, fetchSingleAlbumByName, getAlbumsOfArtist, getAllAlbum, updateAlbum } from "../controllers/albumController.js";
import errorHandler from "../services/catchAsyncError.js";
import upload from "../middleware/multer.js"
import { isAuthenticated, restrictTo, Role } from "../middleware/authMiddleware.js";

const router=Router();

router.route("/").post(isAuthenticated, upload.single('image'), restrictTo(Role.Artist), errorHandler(addAlbum))
.get( errorHandler(getAllAlbum))
router.route("/albumOfArtist").get(isAuthenticated, getAlbumsOfArtist)


router.route("/total/count").get( errorHandler(countAllAlbum))
router.route("/latestReleaseAlbum").get(errorHandler(fetchLatestAlbums))
router.route("/:name").get(errorHandler(fetchSingleAlbumByName));  
router.route("/albumByGenre/genres/:genre").get( errorHandler(fetchAlbumByGenre))
router.route("/singleAlbum/:id").get( errorHandler(fetchSingleAlbum))

router.route("/:id").delete(isAuthenticated,restrictTo(Role.Artist), errorHandler(deleteAlbum))
.patch(isAuthenticated,restrictTo(Role.Artist), upload.fields([{ name: 'image', maxCount: 1 }]),errorHandler(updateAlbum))


export default router