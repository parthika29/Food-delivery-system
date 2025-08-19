import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const userId = "testuser123"; // Hardcoded for testing
  const [cart, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const res = await axios.get(`/cart/${userId}`);
      if (res.data?.cart?.items) {
        setCartItems(res.data.cart.items);
      }
    } catch (err) {
      console.error("Failed to fetch cart items", err);
      setError("Failed to fetch cart items.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  // Place order
  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Backend call to place order
      const res = await axios.post("/orders/place", {
        userId,
        items: cart,
        totalAmount: total,
      });

      const orderId = res.data?.orderId || "N/A";

      alert("Order placed successfully!");
      setCartItems([]);

      // Navigate to order confirmation page
      navigate("/order-confirmation", { state: { orderId, amount: total } });
    } catch (err) {
      console.error("Order placement failed", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.productId} className="flex justify-between mb-2">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <hr className="my-4" />

            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-2">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={placeOrder}
              disabled={loading}
              className={`w-full mt-4 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default CheckOut;
