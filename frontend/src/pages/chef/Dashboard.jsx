// src/pages/ChefDashboard.jsx
import React, { useState } from "react";

export default function ChefDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    photo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price || !newItem.photo) return;
    setMenuItems([...menuItems, newItem]);
    setNewItem({ name: "", price: "", description: "", photo: "" });
  };

  return (
    <div style={{ padding: "40px", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "20px" }}>
        👨‍🍳 Chef Dashboard
      </h1>

      {/* Add New Menu Item */}
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "30px",
          maxWidth: "600px",
        }}
      >
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>
          ➕ Add Menu Item
        </h2>
        <form onSubmit={handleAddItem} style={{ display: "grid", gap: "12px" }}>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={newItem.name}
            onChange={handleInputChange}
            required
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          />
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={newItem.price}
            onChange={handleInputChange}
            required
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newItem.description}
            onChange={handleInputChange}
            rows="3"
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          />
          <input
            type="text"
            name="photo"
            placeholder="Image URL"
            value={newItem.photo}
            onChange={handleInputChange}
            required
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#f97316",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Add Item
          </button>
        </form>
      </div>

      {/* Menu Items */}
      <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px" }}>
        📜 Your Menu
      </h2>
      {menuItems.length === 0 ? (
        <p style={{ color: "#6b7280" }}>No items added yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                padding: "16px",
              }}
            >
              <img
                src={item.photo}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              />
              <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                {item.name}
              </h3>
              <p style={{ color: "#6b7280", marginBottom: "6px" }}>
                {item.description}
              </p>
              <p style={{ fontWeight: "600", color: "#16a34a" }}>
                ₹{item.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
