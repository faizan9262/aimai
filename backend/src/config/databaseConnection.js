import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Attempting MongoDB connection...");
    await connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw new Error("Cannot connect to Database.");
  }
};
