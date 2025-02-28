import mongoose from "mongoose";

const PaymentShcema = new mongoose.Schema({
  due_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dues",
  },
  amount: Number,
  date: Date,
  payment_mode: String,
});

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", PaymentShcema);

export default Payment;
