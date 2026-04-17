import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Generate JWT and set cookie
const generateToken = (res, payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    generateToken(res, { id: user._id, role: user.isAdmin ? "admin" : "user" });

    res.json({
      message: "User logged in successfully",
      success: true,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Admin login
export const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields", success: false });
    }

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    generateToken(res, { email, role: "admin" });

    res.json({
      success: true,
      message: "Admin logged in successfully",
      admin: { email }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Logout user
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Get profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Check authentication
export const isAuth = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

