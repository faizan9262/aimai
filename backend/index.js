import express from "express";
import { config } from "dotenv";
import appRouter from "./src/routes/index.routes.js";
import cookieParser from "cookie-parser";
import connectCloudinary from "./src/config/cloudinary.js";
import { connectDB } from "./src/config/databaseConnection.js";
import cors from 'cors'

config();

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));

// ✅ Manual CORS headers for Vercel

app.use("/api", appRouter);

// 🛠 Run setup in a way compatible with serverless
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

export default app;
