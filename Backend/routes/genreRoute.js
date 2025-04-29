import { Router } from "express";
import { isAuthenticated, restrictTo, Role } from "../middleware/authMiddleware.js";
import errorHandler from "../services/catchAsyncError.js";
import { addGenre, deleteGenre, fetchSingleGenre, getAllGenre, updateGenre } from "../controllers/genreController.js";

const router=Router();

router.route("/").post(isAuthenticated,restrictTo(Role.Admin), errorHandler(addGenre))
.get( errorHandler(getAllGenre))


router.route("/:id").get( errorHandler(fetchSingleGenre))
.delete(isAuthenticated,restrictTo(Role.Admin), errorHandler(deleteGenre))
.patch(isAuthenticated, restrictTo(Role.Admin),errorHandler(updateGenre))


export default router