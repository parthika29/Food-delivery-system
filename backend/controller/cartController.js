const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const { productId, name, price, quantity, image } =
      req.body.item || req.body;

    if (!userId || !productId || !name || !price || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    if (!Array.isArray(cart.items)) {
      cart.items = [];
    }

    const existingItem = cart.items.find(
      (item) => item && item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({ productId, name, price, quantity, image });
    }

    await cart.save();

    return res.status(200).json({ message: "Item added to cart", cart });
  } catch (err) {
    console.error("Error adding to cart:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { userId, productId, action } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart || !Array.isArray(cart.items)) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((i) => i && i.productId === productId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (action === "increase") {
      item.quantity++;
    } else if (action === "decrease" && item.quantity > 1) {
      item.quantity--;
    }

    await cart.save();
    return res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error("Error updating quantity:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart || !Array.isArray(cart.items)) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item && item.productId !== productId
    );
    await cart.save();

    return res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    console.error("Error removing item:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(200)
        .json({ message: "Cart is empty", cart: { items: [] } });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ cart });
};
