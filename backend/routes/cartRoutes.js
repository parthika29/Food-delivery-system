import express from "express";
import Cart from "../models/Cart.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Add single item
router.post("/add", auth, async (req, res) => {
  const userId = req.user.id; // token se user id
  const item = req.body.item;

  if (!item) return res.status(400).json({ message: "Item missing" });

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [item] });
    else {
      const existingItem = cart.items.find(i => i.productId === item.productId);
      if (existingItem) existingItem.quantity += item.quantity;
      else cart.items.push(item);
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to add item" });
  }
});

// Get user's cart
router.get("/", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

export default router;
