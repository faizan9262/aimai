// /index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import appRouter from "./src/routes/index.routes.js";
import connectCloudinary from "./src/config/cloudinary.js";

dotenv.config();


const app = express();
connectCloudinary();

app.use(
  cors({
    origin: "https://aimai-frontend.vercel.app", 
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api", appRouter);

export default app;




