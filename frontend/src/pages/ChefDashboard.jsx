// src/pages/ChefDashboard.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
export default function ChefDashboard() {
    const navigate = useNavigate();
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
    <div
      style={{
        padding: "40px",
        fontFamily: "system-ui",
        background: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        <button
        onClick={() => navigate("/home2")}
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "6px 12px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
      >
        ← Back to Home
      </button>
        👨‍🍳 Chef Dashboard
      </h1>

      {/* Two-Column Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "30px",
        }}
      >
        {/* Add Menu Item Form */}
        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "16px",
              textAlign: "center",
              color: "#374151",
            }}
          >
            ➕ Add Menu Item
          </h2>
          <form onSubmit={handleAddItem} style={{ display: "grid", gap: "14px" }}>
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={newItem.name}
              onChange={handleInputChange}
              required
              style={{
                padding: "12px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
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
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
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
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
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
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                color: "white",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "15px",
                cursor: "pointer",
                transition: "0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.opacity = "0.9")}
              onMouseOut={(e) => (e.target.style.opacity = "1")}
            >
              ➕ Add Item
            </button>
          </form>
        </div>
 
        {/* Menu Items (Full-Width Horizontal Cards) */}
        <div>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "600",
              marginBottom: "20px",
              color: "#374151",
            }}
          >
            📜 Your Menu
          </h2>

          {menuItems.length === 0 ? (
            <p style={{ color: "#6b7280", textAlign: "center" }}>
              No items added yet.
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 18px rgba(0,0,0,0.12)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.1)";
                  }}
                >
                  {/* Left Image */}
                  <img
                    src={item.photo}
                    alt={item.name}
                    style={{
                      width: "200px",
                      height: "150px",
                      objectFit: "cover",
                      borderRight: "1px solid #f0f0f0",
                    }}
                  />

                  {/* Right Content */}
                  <div
                    style={{
                      flex: 1,
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#111",
                        }}
                      >
                        {item.name}
                      </h3>
                      <span
                        style={{
                          fontWeight: "700",
                          color: "#16a34a",
                          fontSize: "16px",
                        }}
                      >
                        ₹{item.price}
                      </span>
                       
                    </div>

                    <p
                      style={{
                        color: "#6b7280",
                        marginTop: "8px",
                        fontSize: "14px",
                        lineHeight: "1.4",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
