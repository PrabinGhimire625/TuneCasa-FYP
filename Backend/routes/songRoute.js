import {Router} from "express"
import { addSong, deleteSong, fetchSingleSong, getAllSong, updateSong } from "../controllers/songController.js";
import upload from "../middleware/multer.js";
import errorHandler from "../services/catchAsyncError.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router=Router();

router.route("/").post(isAuthenticated, upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]),addSong)
.get(isAuthenticated, errorHandler(getAllSong))

router.route("/:id").get(isAuthenticated, errorHandler((fetchSingleSong)))
.delete(isAuthenticated, errorHandler(deleteSong))
.patch(isAuthenticated, upload.fields([{ name: 'image', maxCount: 1 }]),errorHandler(updateSong))


export default router