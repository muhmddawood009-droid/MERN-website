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

/* ------------------ INIT SERVICES ------------------ */
connectDB();
connectCloudinary();

/* ------------------ MIDDLEWARES ------------------ */
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend-domain.vercel.app"
    ],
    credentials: true,
  })
);

/* ------------------ ROUTES ------------------ */
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully");
});

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/booking", bookingRoutes);

/* ------------------ ERROR HANDLERS ------------------ */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* ------------------ SMART SERVER START ------------------ */
// ONLY run locally, NOT on Vercel
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Local server running on port ${PORT}`);
  });
}

/* ------------------ EXPORT FOR VERCEL ------------------ */
export default app;