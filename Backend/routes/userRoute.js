import {Router} from "express";
import errorHandler from "../services/catchAsyncError.js";
import { approveArtist,artistProfile, artistLogin, fetchAllUser, fetchPendingArtists, forgetPassword, login, profile, register, registerArtist, rejectArtist, resetPassword, updateUser, verifyOtp, fetchAllArtists, fetchSingleUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js"
const router=Router();


//user routes
router.route("/user/register").post((req, res, next) => {  //user register
    req.body.role = "user"; 
    next();
}, errorHandler(register));

router.route("/login").post(errorHandler(login))
router.route("/user/profile").get(isAuthenticated,errorHandler(profile))
router.route("/artist/profile").get(isAuthenticated,errorHandler(artistProfile))

router.route("/user/profile/:id").patch(upload.fields([{ name: 'image', maxCount: 1 }]), errorHandler(updateUser)); 
router.route("/user").get(errorHandler(fetchAllUser))
router.route("/user/forgetPassword").post(errorHandler(forgetPassword))
router.route("/user/verifyOtp").post(errorHandler(verifyOtp))
router.route("/user/resetPassword").post(errorHandler(resetPassword))

router.route("/user/:id").get(errorHandler(fetchSingleUser))

//artist route
router.route("/artist").get(errorHandler(fetchAllArtists))
router.route("/artist/register").post((req, res, next) => {
    req.body.role = "artist"; 
    next();
}, errorHandler(registerArtist));
router.route("/artist/login").post(errorHandler(artistLogin))
router.route("/artist/pendingArtist").get(errorHandler(fetchPendingArtists))


//admin route
router.route("/admin/approve-artist/:artistId").get(errorHandler(approveArtist))
router.route("/admin/reject-artist/:artistId").get(errorHandler(rejectArtist))



export default router