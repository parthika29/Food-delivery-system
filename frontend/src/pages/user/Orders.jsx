
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId = "testuser123"; // Hardcoded for testing
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`/orders/${userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
        alert("Failed to fetch orders. Please refresh.");
      }
    };

    fetchOrders();
  }, []);

  const reorder = async (items) => {
    if (!items || items.length === 0) {
      alert("No items to reorder.");
      return;
    }

    try {
      await axios.post("/cart/add-multiple", { userId, items });
      alert("Items added to cart for reorder!");
      navigate("/checkout"); // Redirect to checkout page after reorder
    } catch (err) {
      console.error("Failed to reorder items", err);
      alert("Failed to add items to cart. Try again.");
    }
  };

  const cancelOrder = async (orderId) => {
    if (!orderId) return;

    try {
      await axios.post("/orders/cancel", { orderId });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
      alert("Order cancelled successfully!");
    } catch (err) {
      console.error("Failed to cancel order", err);
      alert("Failed to cancel order. Try again.");
    }
  };

  const statusColor = {
    Pending: "text-yellow-500",
    Preparing: "text-blue-500",
    "Out for Delivery": "text-orange-500",
    Delivered: "text-green-600",
    Cancelled: "text-red-500",
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No orders yet. Start ordering your favorite meals!
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-gray-800">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      statusColor[order.status || "Pending"]
                    }`}
                  >
                    {order.status || "Pending"}
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-2">
                  Date: {new Date(order.orderedAt).toLocaleString()}
                </div>

                <ul className="text-sm mb-2 list-disc pl-4">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.quantity} - ₹
                      {(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold text-gray-800">
                    Total: ₹{order.totalAmount?.toFixed(2)}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => reorder(order.items)}
                      className="text-green-600 border border-green-600 px-3 py-1 rounded hover:bg-green-50 text-sm cursor-pointer"
                    >
                      Reorder
                    </button>
                    <button
                      onClick={() => cancelOrder(order._id)}
                      disabled={
                        order.status === "Cancelled" || order.status === "Delivered"
                      }
                      className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 text-sm cursor-pointer disabled:opacity-50"
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
