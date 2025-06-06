import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectCloudinary from "./src/config/cloudinary.js";
import { connectDB } from "./src/config/databaseConnection.js";
import cors from "cors";
import appRouter from "./src/routes/index.routes.js";

dotenv.config()

const app = express();

connectDB().then(() => console.log("DB connected")).catch(console.error)
connectCloudinary();

const allowedOrigins = ["https://aimai-frontend.vercel.app"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api", appRouter);

export default app;
