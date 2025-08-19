import { useState, useEffect } from "react";

function AdminOrdersManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // TODO: Replace with API call: fetch("/api/admin/orders")
    setOrders([
      { id: "ORD1234", user: "Rahul", total: 450, status: "Pending" },
      { id: "ORD1235", user: "Priya", total: 650, status: "Delivered" },
    ]);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    // TODO: Call backend API to update order status
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Manage Orders</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user}</td>
              <td>₹{order.total}</td>
              <td>{order.status}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border p-1"
                >
                  <option>Pending</option>
                  <option>Preparing</option>
                  <option>On the way</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrdersManagement;
