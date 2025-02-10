import { Router } from "express";
import { addAlbum, deleteAlbum, fetchSingleAlbum, getAllAlbum, updateAlbum } from "../controllers/albumController.js";
import errorHandler from "../services/catchAsyncError.js";
import upload from "../middleware/multer.js"
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router=Router();

router.route("/").post(isAuthenticated, upload.single('image'),errorHandler(addAlbum))

.get(isAuthenticated, errorHandler(getAllAlbum))

router.route("/:id").get(isAuthenticated, errorHandler(fetchSingleAlbum))
.delete(isAuthenticated, errorHandler(deleteAlbum))
.patch(isAuthenticated, upload.fields([{ name: 'image', maxCount: 1 }]),errorHandler(updateAlbum))


export default router