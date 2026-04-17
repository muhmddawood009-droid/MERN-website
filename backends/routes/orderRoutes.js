import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
  getAllOrders,
  getUserOrder,
  placeOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Place a new order (protected route)
router.post("/place", protect, placeOrder);

// Get orders of the logged-in user (protected route)
router.get("/my-orders", protect, getUserOrder);

// Get all orders (admin only)
router.get("/orders", adminOnly, getAllOrders);

// Update order status (admin only)
router.put("/update-status/:orderId", adminOnly, updateOrderStatus);

export default router;

