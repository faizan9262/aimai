// /index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import appRouter from "./src/routes/index.routes.js";
import connectCloudinary from "./src/config/cloudinary.js";
import { connectDB } from "./src/config/databaseConnection.js";

dotenv.config();


const app = express();
connectCloudinary();

app.use(
  cors({
    origin: ["https://aimai-frontend.vercel.app","http://localhost:5173"], 
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api", appRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT} And Database connected`);

});

export default app;




