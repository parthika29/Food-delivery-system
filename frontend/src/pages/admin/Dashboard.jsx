import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    chefs: 0,
  });

  useEffect(() => {
    // TODO: Replace with API call: fetch("/api/admin/stats")
    setStats({
      totalOrders: 120,
      totalUsers: 45,
      totalRevenue: 56000,
      chefs: 6,
    });
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="bg-blue-500 text-white p-5 rounded-lg shadow">
          <h2 className="text-lg">Total Orders</h2>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
        </div>

        <div className="bg-green-500 text-white p-5 rounded-lg shadow">
          <h2 className="text-lg">Total Users</h2>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>

        <div className="bg-yellow-500 text-white p-5 rounded-lg shadow">
          <h2 className="text-lg">Total Revenue</h2>
          <p className="text-2xl font-bold">₹{stats.totalRevenue}</p>
        </div>

        <div className="bg-purple-500 text-white p-5 rounded-lg shadow">
          <h2 className="text-lg">Chefs</h2>
          <p className="text-2xl font-bold">{stats.chefs}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
