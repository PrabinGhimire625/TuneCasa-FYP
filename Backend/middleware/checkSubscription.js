import Subscription from "../models/subscriptionModel.js";

export const checkSubscription = async (req, res, next) => {
    try {
        const userId = req.user.id; // Extract userId from request

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const subscription = await Subscription.findOne({ userId, status: "active" });

        // Attach isSubscribed flag to request
        req.isSubscribed = !!subscription;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error checking subscription status" });
    }
};
