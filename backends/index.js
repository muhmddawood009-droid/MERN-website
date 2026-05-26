import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

/* ------------------ DATABASE CONNECTION ------------------ */
try {
  console.log("🔄 Connecting to MongoDB...");
  connectDB();
  console.log("✅ MongoDB connection initialized");
} catch (error) {
  console.error("❌ DB Connection Failed:", error.message);
}

/* ------------------ CLOUDINARY ------------------ */
try {
  console.log("🔄 Connecting Cloudinary...");
  connectCloudinary();
  console.log("✅ Cloudinary initialized");
} catch (error) {
  console.error("❌ Cloudinary Error:", error.message);
}

/* ------------------ MIDDLEWARES ------------------ */
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // FIXED (http not https)
  credentials: true,
}));

app.use(cookieParser());

/* ------------------ ROUTES ------------------ */
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully");
});

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/booking", bookingRoutes);

/* ------------------ 404 HANDLER ------------------ */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ------------------ ERROR HANDLER ------------------ */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* ------------------ START SERVER ------------------ */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});