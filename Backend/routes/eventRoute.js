import { Router } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { addEvent, fetchAndCountArtistUpcomingEvents, deleteEvent, fetchEventsOfEachArtist, fetchSingleEvent, getAllEvents, updateEvent } from "../controllers/eventController.js";
import upload from "../middleware/multer.js";
import errorHandler from "../services/catchAsyncError.js";

const router=Router();

router.route("/").post(isAuthenticated, upload.single('image'),errorHandler(addEvent))
.get( errorHandler(getAllEvents))

router.route("/artistEvent/count").get( isAuthenticated, errorHandler(fetchAndCountArtistUpcomingEvents))
router.route("/artist/:userId").get( errorHandler(fetchEventsOfEachArtist))

router.route("/:id").get( errorHandler(fetchSingleEvent))
.delete(isAuthenticated, errorHandler(deleteEvent))
.patch(isAuthenticated, upload.fields([{ name: 'image', maxCount: 1 }]),errorHandler(updateEvent))



export default router