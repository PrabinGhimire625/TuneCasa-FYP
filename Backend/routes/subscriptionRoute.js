import {Router} from "express";
import { checkActiveSubscription, createSubscription, fetchSingleSubscription, getAllSubscription, getTotalSubscribedUsers, getTotalSubscriptionAmount, khaltiVerification } from "../controllers/subscriptionController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {checkSubscription} from "../middleware/checkSubscription.js";
import errorHandler from "../services/catchAsyncError.js";

const router=Router();

router.route("/").post(isAuthenticated ,createSubscription)
.get(errorHandler(getAllSubscription))
router.route("/verify-payment").post(isAuthenticated,khaltiVerification)
router.route("/check-active-subscription").get(isAuthenticated, checkActiveSubscription)
router.route("/total/count").get( getTotalSubscribedUsers)
router.route("/totalAmount-per-month").get( errorHandler(getTotalSubscriptionAmount))

router.route("/:id").get( errorHandler(fetchSingleSubscription))

router.route("/premium-content")
  .get(isAuthenticated, checkSubscription, (req, res) => {
      // This route should only be accessible if checkSubscription succeeds
      res.status(200).json({ message: "Premium content access granted!" });
  });


export default router
