import mongoose from "mongoose";
const connectToDB = async () => {
  const connectionUrl = process.env.MONGODB_URI;
  mongoose
    .connect(connectionUrl)
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err));
};

export default connectToDB;
