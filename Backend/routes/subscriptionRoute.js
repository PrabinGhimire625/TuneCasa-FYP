import {Router} from "express";
import { checkActiveSubscription, createSubscription, khaltiVerification } from "../controllers/subscriptionController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import checkSubscription from "../middleware/checkSubscription.js";

const router=Router();

router.route("/").post(isAuthenticated ,createSubscription);
router.route("/verify-payment").post(isAuthenticated,khaltiVerification)
router.route("/check-active-subscription").get(isAuthenticated, checkActiveSubscription)


router.route("/premium-content")
  .get(isAuthenticated, checkSubscription, (req, res) => {
      // This route should only be accessible if checkSubscription succeeds
      res.status(200).json({ message: "Premium content access granted!" });
  });


export default router
