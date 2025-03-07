import mongoose from "mongoose";

// Plan prices and subscription durations
export const PLAN_PRICES = {
  monthly: 2.99,
  halfYear: 15.99,
  yearly: 29.99,
};

// Define subscription durations in days
export const PLAN_DURATION = {
  monthly: 30,   // 1 month = 30 days
  halfYear: 180, // 6 months = 180 days
  yearly: 365,   // 1 year = 365 days
};

const SubscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planName: {
      type: String,
      required: true,
      enum: Object.keys(PLAN_PRICES),
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "canceled", "pending"],
      default: "pending",
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Automatically set the subscription amount based on planName before validation
SubscriptionSchema.pre("validate", function (next) {
  if (!this.amount) {
    this.amount = PLAN_PRICES[this.planName];
  }
  next();
});

// Middleware to set startDate and endDate when subscription is activated
SubscriptionSchema.pre("save", function (next) {
  if (this.status === "active") {
    // Set startDate only if not already set
    if (!this.startDate) {
      this.startDate = new Date();
    }
    
    // Calculate endDate based on the plan duration
    const durationInDays = PLAN_DURATION[this.planName];
    
    console.log("Plan Name:", this.planName);  // Log plan name
    console.log("Duration in Days:", durationInDays);  // Log the duration
    
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.startDate.getDate() + durationInDays);
    
    console.log("End Date:", this.endDate);  // Log the calculated end date
  }
  next();
});

export default mongoose.model("Subscription", SubscriptionSchema);
