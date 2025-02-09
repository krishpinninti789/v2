import mongoose from "mongoose";

const DueSchema = new mongoose.Schema({
  duetype: String,
  amount: Number,
});

const StudentSchema = new mongoose.Schema({
  roll: String,
  sem: Number,
  dues: [DueSchema], // Array of due objects
});

const Students =
  mongoose.models.Students || mongoose.model("Students", StudentSchema);

export default Students;
