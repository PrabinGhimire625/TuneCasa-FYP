import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Checkout = mongoose.model('Checkout', checkoutSchema);


export default Checkout;

