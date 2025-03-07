import {Router} from "express";
import { createSubscription, khaltiVerification } from "../controllers/subscriptionController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import checkSubscription from "../middleware/checkSubscription.js";

const router=Router();

router.route("/").post(isAuthenticated ,createSubscription);
router.route("/verify-payment").post(isAuthenticated,khaltiVerification)

router.route("/premium-content").get(isAuthenticated, checkSubscription, (req, res) => {
    console.log('Premium content route hit');
    res.send('Premium content access granted!');
  });
  

export default router
