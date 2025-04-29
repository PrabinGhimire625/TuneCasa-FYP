import Subscription from "../models/subscriptionModel.js";

//check the user is take the subscription or not
export const checkSubscription = async (req, res, next) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const subscription = await Subscription.findOne({ userId, status: "active" });
        req.isSubscribed = !!subscription;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error checking subscription status" });
    }
};
