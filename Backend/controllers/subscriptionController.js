import Subscription, { PLAN_PRICES, PLAN_DURATION } from "../models/subscriptionModel.js";
import Payment from "../models/paymentModel.js";
import axios from "axios";
import moment from 'moment'; // for better date handling

// Create a new subscription
export const createSubscription = async (req, res) => {
  try {
    const { planName } = req.body;
    const userId = req.user.id; 
    
    // Validate subscription plan
    if (!PLAN_PRICES[planName]) {
      return res.status(400).json({ message: "Invalid subscription plan" });
    }
    
    // Create Subscription document
    const subscription = await Subscription.create({
      userId,
      planName,
      amount: PLAN_PRICES[planName],
      status: "pending", 
    });
    
    // Create Payment record linked to the subscription
    const payment = await Payment.create({
      subscriptionId: subscription._id,
      totalAmount: PLAN_PRICES[planName],
      paymentMethod: "khalti", 
      paymentStatus: "unpaid", 
    });

    // Link payment to subscription and save
    subscription.payment = payment._id;
    await subscription.save();
    
    // Define Khalti payment initiation request data
    const paymentData = {
      return_url: "http://localhost:5173/verifyPayment/", 
      purchase_order_id: subscription._id.toString(), 
      amount: PLAN_PRICES[planName] * 100, 
      website_url: "http://localhost:5174/", 
      purchase_order_name: `orderName_${subscription._id}`, 
    };

    // Send request to Khalti payment initiation API
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      paymentData,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );

    // Handle Khalti response
    const khaltiResponse = response.data;
    payment.pidx = khaltiResponse.pidx; 
    await payment.save();

    res.status(200).json({
      message: "Subscription initiated successfully",
      data: {
        payment: payment,
        url: khaltiResponse.payment_url, // Redirect URL for Khalti payment page
        khaltiData: khaltiResponse,
      },
    });
    
  } catch (error) {
    console.error("Error creating subscription:", error);
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

    // Find the payment document by pidx
    const payment = await Payment.findOne({ pidx });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const subscription = await Subscription.findById(payment.subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const planName = subscription.planName;

    // Check if the planName is valid and retrieve the duration
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
      // If payment is successful, update payment status
      payment.paymentStatus = "paid";
      await payment.save();

      // Calculate the start and end date for the subscription
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + durationInDays); 

      // Activate the subscription associated with the payment
      await Subscription.findByIdAndUpdate(payment.subscriptionId, {
        status: "active",
        startDate,
        endDate,
      });

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

    // Find the user's active subscription
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


export const getTotalSubscribedUsers = async (req, res) => {
  try {
    const totalSubscribers = await Subscription.countDocuments({ status: "active" });

    res.status(200).json({
      message: "Total subscribed users",
      data:totalSubscribers,
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
  // Get the start and end of the current month
  const startOfMonth = moment().startOf('month').toDate();
  const endOfMonth = moment().endOf('month').toDate();

  try {
    // Find all active subscriptions with startDate within the current month
    const subscriptions = await Subscription.find({
      status: "active",
      startDate: { $gte: startOfMonth, $lte: endOfMonth }
    });

    // Calculate total amount using reduce on the subscriptions array
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
    // Find the subscription by ID and populate the userId field with user details
    const singleSubscription = await Subscription.findById(id).populate('userId', 'username');

    if (!singleSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Include the username in the response data
    res.status(200).json({
      message: "Successfully fetched the subscription",
      data: {
        ...singleSubscription.toObject(),
        username: singleSubscription.userId.username,  // Include username in the response
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching the subscription",
      error: error.message,
    });
  }
};
