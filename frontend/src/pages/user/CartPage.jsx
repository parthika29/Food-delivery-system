import React, { useState, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import Navbar from "../Navbar";
import axios from "../../api/axiosInstance";
import { Link } from "react-router-dom";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="flex gap-4 border-b border-gray-200 py-3">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-semibold">{item.name}</h3>
            <p className="text-xs text-gray-500">{item.category}</p>
          </div>
          <button
            aria-label="Remove item"
            onClick={() => onRemove(item.productId)}
            className="text-gray-400 hover:text-red-500 cursor-pointer"
          >
            <HiOutlineTrash className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              aria-label="Decrease quantity"
              onClick={() => onDecrease(item.productId)}
              disabled={item.quantity <= 1}
              className="w-7 h-7 flex items-center justify-center border rounded-md disabled:opacity-50 cursor-pointer"
            >
              –
            </button>
            <span className="text-sm px-2">{item.quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => onIncrease(item.productId)}
              className="w-7 h-7 flex items-center justify-center border rounded-md cursor-pointer"
            >
              +
            </button>
          </div>
          <div className="text-sm font-medium">
            ₹{(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const userId = "testuser123";
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false); // optional loading state

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/cart/${userId}`);
      setCart(res.data.cart.items);
    } catch (err) {
      console.error("Error fetching cart", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (userId, meal) => {
    try {
      await axios.post("/cart/add", {
        userId,
        productId: meal.id,
        name: meal.name,
        price: meal.price,
        quantity: 1,
        image: meal.imageUrl,
      });
      console.log("Add to cart clicked for:", meal.name);
      alert("Item added to cart!");
      fetchCart(); // refresh UI
    } catch (err) {
      console.error("Error adding to cart", err);
    }
  };

  // Load cart when page loads
  useEffect(() => {
    fetchCart();
  }, []);

  const onIncrease = async (productId) => {
    try {
      const res = await axios.post("/cart/update-quantity", {
        userId,
        productId,
        action: "increase",
      });
      setCart(res.data.cart.items);
    } catch (err) {
      console.error("Error increasing quantity", err);
    }
  };

  const onDecrease = async (productId) => {
    try {
      const res = await axios.post("/cart/update-quantity", {
        userId,
        productId,
        action: "decrease",
      });
      setCart(res.data.cart.items);
    } catch (err) {
      console.error("Error decreasing quantity", err);
    }
  };

  const onRemove = async (productId) => {
    try {
      const res = await axios.post("/cart/remove", { userId, productId });
      if (res.data?.cart?.items) {
        setCart(res.data.cart.items);
      }
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  // Wrappers to fix state update issues without changing existing code
  const handleIncrease = async (productId) => {
    await onIncrease(productId);
    fetchCart();
  };

  const handleDecrease = async (productId) => {
    await onDecrease(productId);
    fetchCart();
  };

  const handleRemove = async (productId) => {
    await onRemove(productId);
    fetchCart();
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 50;
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {loading && <p className="text-center py-4">Loading cart...</p>}
        {cart.length === 0 && !loading ? (
          <div className="text-center py-20 text-gray-500">
            <p className="mb-2 font-medium">Your cart is empty</p>
            <p className="text-sm">Add some delicious meals to get started.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            ))}

            <div className="p-4 border rounded-lg mt-4 bg-gray-50">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Subtotal</span>
                <span className="text-sm font-medium">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Delivery</span>
                <span className="text-sm font-medium">
                  ₹{deliveryFee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mt-2 pt-2 border-t font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <Link to="/checkout">
                <button
                  disabled={cart.length === 0}
                  className="w-full mt-4 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 cursor-pointer"
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
