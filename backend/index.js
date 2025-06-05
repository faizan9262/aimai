import express from "express";
import { config } from "dotenv";
import appRouter from "./src/routes/index.routes.js";
import cookieParser from "cookie-parser";
import connectCloudinary from "./src/config/cloudinary.js";
import { connectDB } from "./src/config/databaseConnection.js";
import cors from "cors";

config();

const app = express();

// CORS first
app.use(cors({
  origin: "https://aimai.vercel.app",
  credentials: true,
}));

// Body parsing and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));

// Manual CORS headers for OPTIONS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://aimai.vercel.app");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// ✅ Ensure DB/Cloudinary is connected before routes are mounted
let initialized = false;

async function initialize() {
  if (!initialized) {
    await connectDB();
    connectCloudinary();
    initialized = true;
  }
}

app.use(async (req, res, next) => {
  await initialize();
  next();
});

// ✅ Routes after initialization
app.use("/api", appRouter);

export default app;
