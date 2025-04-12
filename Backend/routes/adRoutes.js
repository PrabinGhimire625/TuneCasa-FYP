import {Router} from "express"
import { createAds, deleteAds, fetchSingleAds, getAdsForFreeUsers, getAllAds, trackAdClick, trackAdSkip, trackAdView, updateAds } from "../controllers/adController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
import errorHandler from "../services/catchAsyncError.js";
import { checkSubscription } from "../middleware/checkSubscription.js";


const router=Router();

router.route("/").post(isAuthenticated, upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}])
,createAds)
.get( errorHandler(getAllAds))

router.route("/freeAds").get(isAuthenticated, checkSubscription, getAdsForFreeUsers); // If this is how the route is set, you would expect an _id like an ObjectId.



router.route("/:id")
.get(isAuthenticated, errorHandler((fetchSingleAds)))
.delete(isAuthenticated, errorHandler(deleteAds))
.patch(isAuthenticated, upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]), errorHandler(updateAds))


router.route("/track-view").post(isAuthenticated,checkSubscription, errorHandler(trackAdView))
router.route("/track-skip").post(isAuthenticated,checkSubscription, errorHandler(trackAdSkip))
router.route("/track-click").post(isAuthenticated,checkSubscription, errorHandler(trackAdClick))



export default router