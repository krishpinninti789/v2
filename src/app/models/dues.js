import mongoose from "mongoose";

const DueSubSchema = new mongoose.Schema({
  duetype: String,
  amount: Number,
  paid: Number,
  pending: Number,
  status: Enumerator("pending", "paid"),
});

const DuesSchema = new mongoose.Schema({
  roll: String,
  year: Number,
  dues: [DueSubSchema], // Array of due objects
});

const Dues = mongoose.models.Dues || mongoose.model("Dues", DuesSchema);

export default Dues;
