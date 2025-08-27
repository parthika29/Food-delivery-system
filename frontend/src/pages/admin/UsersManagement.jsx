import { useState, useEffect } from "react";

function AdminUsersManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // TODO: Replace with API call: fetch("/api/admin/users")
    setUsers([
      { id: "U1", name: "Rahul", role: "User", blocked: false },
      { id: "U2", name: "Priya", role: "Chef", blocked: true },
    ]);
  }, []);

  const toggleBlock = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, blocked: !u.blocked } : u
      )
    );
    // TODO: API call to block/unblock
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>{u.blocked ? "Blocked" : "Active"}</td>
              <td>
                <button
                  onClick={() => toggleBlock(u.id)}
                  className={`px-3 py-1 rounded ${
                    u.blocked ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {u.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsersManagement;
