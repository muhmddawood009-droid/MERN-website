import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config()

const connectCloudinary = async () => {
  console.log("api_key",process.env.CLOUDINARY_API_KEY)
  try {
    cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // ✔️ correct
});

    console.log("Cloudinary connected successfully");
  } catch (error) {
    console.error("Error occurred in Cloudinary connection:", error);
  }
};

export default connectCloudinary;
