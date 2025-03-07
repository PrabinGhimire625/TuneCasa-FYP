import { Router } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import errorHandler from "../services/catchAsyncError.js";
import { addGenre, deleteGenre, fetchSingleGenre, getAllGenre, updateGenre } from "../controllers/genreController.js";

const router=Router();

router.route("/").post(isAuthenticated, errorHandler(addGenre))
.get( errorHandler(getAllGenre))


router.route("/:id").get( errorHandler(fetchSingleGenre))
.delete(isAuthenticated, errorHandler(deleteGenre))
.patch(isAuthenticated, errorHandler(updateGenre))


export default router