import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: String,
  roll: String,
  year: Number,
  branch: String,
  mobile_no: Number,
  parent_mobile_no: Number,
  address: String,
  email: String,
  type: String,
});

const Students =
  mongoose.model.Students || mongoose.model("Students", StudentSchema);

export default Students;
