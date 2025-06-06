// /api/index.js
import app from "../index.js"; // Import the Express app
import { createServer } from "http";
import { connectDB } from "../src/config/databaseConnection.js";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    try {
      console.log("Connecting to MongoDB...");
      await connectDB();
      isConnected = true;
      console.log("MongoDB connected in /api/index.js");
    } catch (err) {
      console.error("MongoDB connection failed:", err);
      return res.status(500).end("Database connection error");
    }
  }

  const server = createServer(app);
  server.emit("request", req, res);
}
