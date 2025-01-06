import {Router} from "express";
import errorHandler from "../services/catchAsyncError.js";
import { approveArtist, artistLogin, fetchAllUser, fetchPendingArtists, forgetPassword, login, profile, register, registerArtist, rejectArtist, resetPassword, verifyOtp } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router=Router();

//user routes
router.route("/user/register").post((req, res, next) => {  //user register
    req.body.role = "user"; 
    next();
}, errorHandler(register));

router.route("/login").post(errorHandler(login))
router.route("/user/profile").get(isAuthenticated,errorHandler(profile))
router.route("/user").get(errorHandler(fetchAllUser))
router.route("/user/forgetPassword").post(errorHandler(forgetPassword))
router.route("/user/verifyOtp").post(errorHandler(verifyOtp))
router.route("/user/resetPassword").post(errorHandler(resetPassword))

//artist route
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