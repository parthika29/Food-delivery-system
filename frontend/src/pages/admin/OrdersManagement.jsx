import React, { useEffect, useState } from "react";
import API from "../../api/axiosinstance";
import Navbar from "../Navbar";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders"); 
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
        alert("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
      alert(`Order status updated to ${status}`);
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update order status.");
    }
  };

  const statusColor = {
    pending: "text-yellow-500",
    accepted: "text-blue-500",
    preparing: "text-orange-500",
    delivered: "text-green-600",
    cancelled: "text-red-500",
  };

  if (loading) {
    return <div className="text-center py-20">Loading orders...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Orders Management</h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No orders available.
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
                      statusColor[order.status || "pending"]
                    }`}
                  >
                    {order.status || "pending"}
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-2">
                  <strong>User:</strong> {order.userRef?.name || "Unknown"} <br />
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                  <br />
                  <strong>Address:</strong> {order.deliveryAddress}
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
                    Total: ₹{order.total?.toFixed(2)}
                  </span>

                  <div className="flex gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="border px-2 py-1 rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="preparing">Preparing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
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

export default OrdersManagement;
