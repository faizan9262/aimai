// /index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import appRouter from "./src/routes/index.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://aimai-frontend.vercel.app", // or your frontend domain
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// Routes
app.use("/api", appRouter);

export default app;




