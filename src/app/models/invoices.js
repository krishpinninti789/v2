import mongoose, { Schema } from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  invoice_id: { type: mongoose.Schema.ObjectId },
  paymentId: { type: String, ref: "Payment" },
  due_name: { type: String, ref: "Payment" },
  roll: { type: String, ref: "Payment" },
  due_id: { type: String, ref: "Payment" },
  amountPaid: { type: Number, ref: "Payment" },
  amountPending: Number,
  payment_mode: { type: Number, enum: ["online", "cash"] },
  createdAt: { type: Date, default: Date.now, ref: "Payment" },
});

const Invoice =
  mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
