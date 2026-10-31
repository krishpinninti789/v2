import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const connectionUrl = process.env.MONGODB_URI;
    console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);

    if (!connectionUrl) {
      throw new Error("MONGODB_URI is missing in environment variables");
    }

    await mongoose.connect(connectionUrl);

    console.log("Connection to DB successful");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

export default connectToDB;