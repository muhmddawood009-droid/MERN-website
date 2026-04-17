import Cart from "../models/cartModel.js";
import Menu from "../models/menuModel.js";

// ➕ Add to cart
export const addToCart = async (req, res) => {
  try {
    const { menuId, quantity } = req.body;
    const { id } = req.user;

    if (!menuId || !quantity) {
      return res.status(400).json({ success: false, message: "menuId and quantity are required" });
    }

    const menuItem = await Menu.findById(menuId);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: `Menu item with ID ${menuId} not found` });
    }

    let cart = await Cart.findOne({ user: id });
    if (!cart) cart = new Cart({ user: id, items: [] });

    const existingItem = cart.items.find(item => item.menuItem.toString() === menuId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ menuItem: menuItem._id, quantity });
    }

    await cart.save();
    res.status(200).json({ success: true, message: "Item added to cart", cart: cart.items });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// 📦 Get cart
export const getCart = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await Cart.findOne({ user: id }).populate("items.menuItem");

    if (!cart) {
      return res.status(200).json({ success: true, cart: [] });
    }

    res.status(200).json({ success: true, cart: cart.items });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ❌ Remove from cart (decrement quantity or remove item)
export const removeFromCart = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { id } = req.user;

    if (!menuId) {
      return res.status(400).json({ success: false, message: "menuId is required" });
    }

    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.menuItem.toString() === menuId);

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1; // decrement by 1
    } else {
      cart.items.splice(itemIndex, 1); // remove item completely
    }

    await cart.save();

    res.status(200).json({ success: true, message: "Cart updated", cart: cart.items });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
