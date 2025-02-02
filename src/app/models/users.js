import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default Users;
