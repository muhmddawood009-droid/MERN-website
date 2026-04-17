// menuRoutes.js
import express from "express";
import { adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import {
  addMenuItem,
  getAllMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

const router = express.Router();

router.post("/add", adminOnly, upload.single("image"), addMenuItem);
router.get("/", getAllMenuItems);
router.put("/:id", adminOnly, upload.single("image"), updateMenuItem);
router.delete("/:id", adminOnly, deleteMenuItem);

export default router;

