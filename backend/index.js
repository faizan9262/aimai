import express from "express";
import { config } from "dotenv";
import appRouter from "./src/routes/index.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectCloudinary from "./src/config/cloudinary.js";
import { connectDB } from "./src/config/databaseConnection.js";

const app = express();

config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));

app.use(cors({
  origin: "https://aimai.vercel.app",
  credentials: true
}));
app.use("/api", appRouter);

connectDB()
connectCloudinary();

export default app;
