import {Router} from "express"
import { createAds, deleteAds, fetchSingleAds, getAllAds, updateAds } from "../controllers/adController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
import errorHandler from "../services/catchAsyncError.js";

const router=Router();

router.route("/").post(isAuthenticated, upload.fields([{ name: 'video', maxCount: 1 }])
,createAds)
.get( errorHandler(getAllAds))

router.route("/:id").get(isAuthenticated, errorHandler((fetchSingleAds)))
.delete(isAuthenticated, errorHandler(deleteAds))
.patch(isAuthenticated, upload.fields([{ name: 'video', maxCount: 1 }]), errorHandler(updateAds))
export default router