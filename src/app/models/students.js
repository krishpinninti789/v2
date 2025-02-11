import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  Name: String,
  roll: String,
  sem: Number,
  branch: String,
  mobile_no: Number,
  parent_mobile_no: Number,
  address: String,
  email: String,
  type: String,
});

const Students =
  mongoose.model.Students || mongoose.model("Studnets", StudentSchema);

export default Students;
