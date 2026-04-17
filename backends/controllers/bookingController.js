import Booking from "../models/bookingModel.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, phone, numberOfPeople, date, time, note } = req.body;

    if (!name || !phone || !numberOfPeople || !date || !time) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check for overlapping bookings
    const existingBooking = await Booking.findOne({
      date,
      time,
      status: { $ne: "Cancelled" }, // match enum value
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ success: false, message: "This time slot is already booked" });
    }

    const booking = await Booking.create({
      user: id,
      name,
      phone,
      numberOfPeople,
      date,
      time,
      note,
    });

    res
      .status(201)
      .json({ success: true, message: "Table booked successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get bookings for the logged-in user
export const getUserBooking = async (req, res) => {
  try {
    const { id } = req.user;
    const bookings = await Booking.find({ user: id }).sort({
      createdAt: -1, // ✅ corrected field name
    });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all bookings (admin only)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email");
    res.status(200).json({ bookings, success: true });
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params; // fixed variable name
    const { status } = req.body;

    const booking = await Booking.findById(bookingId); // fixed method
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "Booking status updated", booking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
