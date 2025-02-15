import mongoose from "mongoose";

const DueSubSchema = new mongoose.Schema({
  duetype: String,
  amount: Number,
  amount_paid: Number,
  amount_pending: Number,
  status: {
    type: String,
    enum: ["paid", "pending"],
  },
  // status: String,
  // due_date: String,
  due_date: Date,
});

const DuesSchema = new mongoose.Schema({
  roll: String,
  year: Number,
  dues: [DueSubSchema], // Array of due objects
});

const Dues = mongoose.models.Dues || mongoose.model("Dues", DuesSchema);

export default Dues;
