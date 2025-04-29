import Subscription, { PLAN_PRICES, PLAN_DURATION } from "../models/subscriptionModel.js";
import Payment from "../models/paymentModel.js";
import axios from "axios";
import moment from 'moment'; // for better date handling
import User from "../models/userModel.js";
import notifiactionModel from "../models/notifiactionModel.js";

// Create a new subscription
export const createSubscription = async (req, res) => {
  try {
    const { planName } = req.body;
    const userId = req.user.id;

    const PLAN_DURATION = {
      monthly: 30,
      halfYear: 180,
    };

    const PLAN_PRICES = {
      monthly: 2.99,
      halfYear: 15.99,
    };

    if (!PLAN_DURATION[planName]) {
      return res.status(400).json({ message: "Invalid subscription plan" });
    }
    const now = new Date();
    const latestSub = await Subscription.findOne({
      userId,
    }).sort({ endDate: -1 });

  
  //  if (latestSub && latestSub.endDate > now) {
  //   return res.status(400).json({ message: "You already have an active subscription" });
  // }


    let startDate = now;

    if (latestSub && latestSub.endDate > now) {
      startDate = new Date(latestSub.endDate);
    }

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + PLAN_DURATION[planName]);

    // 🧾 Create subscription
    const subscription = await Subscription.create({userId,planName, amount: PLAN_PRICES[planName], status: "pending",  startDate,  endDate,});

    const payment = await Payment.create({ subscriptionId: subscription._id,totalAmount: PLAN_PRICES[planName], paymentMethod: "khalti",paymentStatus: "unpaid", });

    subscription.payment = payment._id;
    await subscription.save();

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        return_url: "http://localhost:5173/verifyPayment/",
        purchase_order_id: subscription._id.toString(),
        amount: PLAN_PRICES[planName] * 100,
        website_url: "http://localhost:5173/",
        purchase_order_name: `order_${subscription._id}`,
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );

    payment.pidx = response.data.pidx;
    await payment.save();

    res.status(200).json({message: "Subscription initiated successfully",data: {  payment,url: response.data.payment_url,},
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating subscription", error: error.message });
  }
};

// Khalti payment verification
export const khaltiVerification = async (req, res) => {
  try {
    const { pidx } = req.body;

    if (!pidx) {
      return res.status(400).json({ message: "Missing pidx" });
    }
    const payment = await Payment.findOne({ pidx });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (payment.paymentStatus === "paid") {
      console.log("Payment already verified and status is 'paid'. Skipping notification.");
      return res.status(200).json({ message: "Payment already processed" });
    }

    const subscription = await Subscription.findById(payment.subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const planName = subscription.planName;
    const durationInDays = PLAN_DURATION[planName];

    if (!durationInDays) {
      return res.status(400).json({ message: "Invalid plan duration" });
    }

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );

    const data = response.data;

    if (data.status === "Completed") {
      payment.paymentStatus = "paid";
      await payment.save();
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + durationInDays);

      // Activate the subscription associated with the payment
      await Subscription.findByIdAndUpdate(payment.subscriptionId, {
        status: "active",
        startDate,
        endDate,
      });
      try {
        const user = await User.findById(subscription.userId);
        if (user) {

          const existingNotification = await notifiactionModel.findOne({
            userId: user._id,
            type: "subscription",
            name: `Subscription: ${planName}`,
          });

          if (!existingNotification) {
            console.log("Creating new notification for subscription activation");

            const newNotification = await notifiactionModel.create({
              userId: user._id,
              content: `🎉 Your subscription to the ${planName} plan is now active! Enjoy your perks!`,
              type: "subscription",
              isRead: false,
              name: `Subscription: ${planName}`,
              image: "",
            });

            console.log("Notification saved:", newNotification);
          } else {
            console.log("Notification already exists for this subscription.");
          }
        }
      } catch (err) {
        console.error("Error sending subscription notification:", err);
      }

      res.status(200).json({
        message: "Payment successful, subscription activated!",
        payment: {
          paymentId: payment._id,
          paymentMethod: payment.paymentMethod,
          totalAmount: payment.totalAmount,
          paymentStatus: payment.paymentStatus,
          pidx: payment.pidx,
        },
        subscription: {
          subscriptionId: payment.subscriptionId,
          startDate,
          endDate,
        },
      });
    } else if (data.status === "Pending") {
      res.status(201).json({
        message: "Payment is still pending. Please wait or try again later.",
        status: "Pending",
      });
    } else {
      res.status(400).json({ message: "Payment verification failed", status: data.status });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Error verifying payment", error: error.message });
  }
};


// Check if user already has an active subscription
export const checkActiveSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const activeSubscription = await Subscription.findOne({
      userId,
      status: "active",
    });

    if (activeSubscription) {
      return res.status(200).json({
        message: "You already have an active subscription.",
        data: activeSubscription,
      });
    } else {
      return res.status(404).json({
        message: "You do not have an active subscription.",
      });
    }
  } catch (error) {
    console.error("Error checking active subscription:", error);
    res.status(500).json({ message: "Error checking subscription", error: error.message });
  }
};

//get the total subscription taken user
export const getTotalSubscribedUsers = async (req, res) => {
  try {
    const totalSubscribers = await Subscription.countDocuments({ status: "active" });

    res.status(200).json({
      message: "Total subscribed users",
      data: totalSubscribers,
    });
  } catch (error) {
    console.error("Error fetching total subscribed users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get all active subscriptions
export const getAllSubscription = async (req, res) => {
  const allSubscription = await Subscription.find({ status: "active" }).populate("userId", "username");

  if (allSubscription.length < 1) {
    return res.status(404).json({ message: "No active subscriptions found" });
  }

  res.status(200).json({
    message: "Successfully retrieved all active subscriptions",
    data: allSubscription,
  });
};

// Get total subscription amount for the current month
export const getTotalSubscriptionAmount = async (req, res) => {
  const startOfMonth = moment().startOf('month').toDate();
  const endOfMonth = moment().endOf('month').toDate();
  try {
    const subscriptions = await Subscription.find({
      status: "active",
      startDate: { $gte: startOfMonth, $lte: endOfMonth }
    });
    const totalAmount = subscriptions.reduce((acc, sub) => acc + sub.amount, 0);

    res.status(200).json({
      message: "Total subscription amount for the month retrieved successfully",
      data: { totalAmount },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error calculating total subscription amount",
      error: error.message,
    });
  }
};

//fetch single subscription
export const fetchSingleSubscription = async (req, res) => {
  const id = req.params.id;
  try {
    const singleSubscription = await Subscription.findById(id).populate('userId', 'username');

    if (!singleSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json({
      message: "Successfully fetched the subscription",
      data: {
        ...singleSubscription.toObject(),
        username: singleSubscription.userId.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching the subscription",
      error: error.message,
    });
  }
};

//delete subscription 
export const deleteSubscription = async (req, res) => {
  const id = req.params.id;
  const subscription = await Subscription.findByIdAndDelete(id);
  if (!subscription) {
    return res.status(400).json({ message: "Subcription not found" });
  }
  res.status(200).json(({ message: " Subcription deleted successfully" }));
}


//user payment history
export const getUserPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const subscriptions = await Subscription.find({ userId }).select('_id');

    if (!subscriptions || subscriptions.length === 0) {
      return res.status(404).json({ message: "No subscriptions found for this user." });
    }

    const subscriptionIds = subscriptions.map(sub => sub._id);
    const payments = await Payment.find({
      subscriptionId: { $in: subscriptionIds }
    })
      .populate("subscriptionId")
      .sort({ createdAt: -1 });

    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: "No payment history found for this user." });
    }

    res.status(200).json({
      message: "Payment history retrieved successfully.",
      data: payments,
    });

  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({ message: "Server error while retrieving payment history." });
  }
};
