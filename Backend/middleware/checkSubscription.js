import Subscription from "../models/subscriptionModel.js";

const checkSubscription = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming authentication middleware is used

        // Find an active subscription for the user
        const subscription = await Subscription.findOne({ userId, status: "active" });

        if (!subscription) {
            return res.status(403).json({ message: "You need an active subscription to access this feature." });
        }

        next(); 
    } catch (error) {
        res.status(500).json({ message: "Error checking subscription", error: error.message });
    }
};

export default checkSubscription;
