import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true, // fixed typo (was "ture")
    },
    numberOfPeople: {
      type: Number,
      required: true, // fixed typo (was "ture")
      min: 1,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
    status: {
      type: String, // fixed typo (was lowercase "string")
      enum: ["Pending", "Approved", "Cancelled"], // consistent casing
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
