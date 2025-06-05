import express from "express";
import { config } from "dotenv";
import appRouter from "./src/routes/index.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectCloudinary from "./src/config/cloudinary.js";

const app = express();

config();
connectCloudinary();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use("/api", appRouter);

export default app;
