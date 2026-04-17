import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
  createBooking,
  getAllBookings,
  getUserBooking,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const bookingRoutes = express.Router();

// Create a booking (protected route)
bookingRoutes.post("/create", protect, createBooking);

// Get bookings of the logged-in user
bookingRoutes.get("/my-bookings", protect, getUserBooking);

// Get all bookings (admin only)
bookingRoutes.get("/",protect, adminOnly, getAllBookings);

// Update booking status (admin only)
bookingRoutes.put("/update-status/:bookingId",protect, adminOnly, updateBookingStatus);

export default bookingRoutes;
