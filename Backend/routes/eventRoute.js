import { Router } from "express";
import { isAuthenticated, restrictTo, Role } from "../middleware/authMiddleware.js";
import { addEvent, fetchAndCountArtistUpcomingEvents, deleteEvent, fetchEventsOfEachArtist, fetchSingleEvent, getAllEvents, updateEvent } from "../controllers/eventController.js";
import upload from "../middleware/multer.js";
import errorHandler from "../services/catchAsyncError.js";

const router=Router();

router.route("/").post(isAuthenticated, upload.single('image'),restrictTo(Role.Artist),  errorHandler(addEvent))
.get( errorHandler(getAllEvents))

router.route("/artistEvent/count").get( isAuthenticated, errorHandler(fetchAndCountArtistUpcomingEvents))
router.route("/artist/:userId").get( errorHandler(fetchEventsOfEachArtist))

router.route("/:id").get( errorHandler(fetchSingleEvent))
.delete(isAuthenticated, restrictTo(Role.Artist),  errorHandler(deleteEvent))
.patch(isAuthenticated, upload.fields([{ name: 'image', maxCount: 1 }]), restrictTo(Role.Artist), errorHandler(updateEvent))



export default router