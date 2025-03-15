import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  roll: {
    type: String,
    required: true,
    ref: "Students",
  },
  due_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dues",
  },
  due_name: String,
  amountPaid: Number,
  paymentId: String,
  payment_mode: { type: String, enum: ["online", "cash"] },
  createdAt: { type: Date, default: Date.now },
});

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

export default Payment;
