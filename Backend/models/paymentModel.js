import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription", 
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['khalti'],
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid',
    },
    pidx: {
      type: String, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
