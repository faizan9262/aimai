import express from "express";
import { config } from "dotenv";
import appRouter from "./src/routes/index.routes.js";
import cookieParser from "cookie-parser";
import connectCloudinary from "./src/config/cloudinary.js";
import { connectDB } from "./src/config/databaseConnection.js";
import cors from "cors";

config();

const app = express();

connectDB();
connectCloudinary();

  const allowedOrigins = ['https://aimai-frontend.vercel.app/']
  app.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }));
connectDB();
connectCloudinary();
app.use(cookieParser());
app.use(express.json());

app.use("/api", appRouter);

export default app;
