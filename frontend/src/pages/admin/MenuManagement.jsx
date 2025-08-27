import { useState, useEffect } from "react";

function AdminMenuManagement() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    // TODO: Replace with API call: fetch("/api/admin/menus")
    setMenus([
      { id: "M1", name: "Pizza", price: 250 },
      { id: "M2", name: "Burger", price: 120 },
    ]);
  }, []);

  const handleDelete = (id) => {
    setMenus((prev) => prev.filter((m) => m.id !== id));
    // TODO: API call for delete
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Manage Menu</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Menu ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.id}>
              <td>{menu.id}</td>
              <td>{menu.name}</td>
              <td>₹{menu.price}</td>
              <td>
                <button
                  onClick={() => handleDelete(menu.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMenuManagement;
