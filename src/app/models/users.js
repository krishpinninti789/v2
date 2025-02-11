import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  first_login: Boolean,
  role: String,
  manages: String,
});

const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default Users;
