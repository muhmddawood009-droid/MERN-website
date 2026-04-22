import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

import { connectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

dotenv.config();

const app = express();

// --------------------
// INIT ONCE ONLY (IMPORTANT FIX)
// --------------------
let initialized = false;

const initServices = async () => {
  if (initialized) return;

  try {
    await connectDB();
    connectCloudinary();
    initialized = true;
    console.log("DB + Cloudinary connected");
  } catch (err) {
    console.log("Init error:", err.message);
  }
};

// run ONCE at cold start only
initServices();

// --------------------
// Middlewares
// --------------------
app.use(express.json());
app.use(
  cors({
    origin: "https://mern-website-frontend-eight.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());

// --------------------
// Routes
// --------------------
app.get("/", (req, res) => {
  res.status(200).send("Hello from server");
});

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/booking", bookingRoutes);

// --------------------
// 404 handler
// --------------------
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// --------------------
// EXPORT
// --------------------
export default app;