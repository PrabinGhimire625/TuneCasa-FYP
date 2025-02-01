import { Router } from "express";
import { addAlbum, deleteAlbum, fetchSingleAlbum, getAllAlbum, updateAlbum } from "../controllers/albumController.js";
import errorHandler from "../services/catchAsyncError.js";
import upload from "../middleware/multer.js"
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router=Router();

router.route("/").post(isAuthenticated, upload.single('image'),errorHandler(addAlbum))

.get(errorHandler(getAllAlbum))

router.route("/:id").get(isAuthenticated, errorHandler(fetchSingleAlbum))
.delete(errorHandler(deleteAlbum))
.patch(upload.single('image'),updateAlbum)


export default router