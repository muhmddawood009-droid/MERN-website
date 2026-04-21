import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // no extra options needed
    console.log("Database connected successfully");
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1); // Exit process if DB connection fails
  }
};
