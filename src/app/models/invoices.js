import mongoose, { Schema } from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  invoice_id: { type: mongoose.Schema.ObjectId },
  paymentId: { type: String, ref: "Payment" },
  due_name: { type: String, ref: "Payment" },
  due_id: { type: String, ref: "Payment" },
  amount: Number,
  amountPaid: { type: Number, ref: "Payment" },
  new_amount_pending: Number,
  payment_mode: { type: String, enum: ["online", "cash"] },
  roll: { type: String, ref: "Student" },
  year: Number,
  branch: String,
  email: String,
  mobile_no: Number,
  due_date: Date,
  createdAt: { type: Date, default: Date.now },
});

const Invoice =
  mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
