import Menu from "../models/menuModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ success: false, message: "Name, description, price, and category are required" });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const newMenuItem = await Menu.create({
      name,
      description,
      price,
      category,
      image: result.secure_url,
    });

    return res.status(201).json({ success: true, message: "Menu item added successfully", menuItem: newMenuItem });
  } catch (error) {
    console.error("Error adding menu item:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Get all menu items
export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, menuItems });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a menu item
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, isAvailable } = req.body;

    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: "Menu item not found" });
    }

    // Update image if a new file is uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      menuItem.image = result.secure_url;
    }

    // Update other fields if provided
    if (name) menuItem.name = name;
    if (description) menuItem.description = description;
    if (price) menuItem.price = price;
    if (category) menuItem.category = category;
    if (typeof isAvailable !== "undefined") menuItem.isAvailable = isAvailable;

    await menuItem.save();

    return res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      menuItem,
    });
  } catch (error) {
    console.error("Error updating menu item:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await Menu.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({ success: false, message: "Menu item not found" });
    }

    return res.status(200).json({ success: true, message: "Menu item deleted" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
