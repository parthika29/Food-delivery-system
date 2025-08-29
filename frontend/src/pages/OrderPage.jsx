import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { restaurants } from "./RestaurantList";

export default function OrderPage() {
  const { id, itemId } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurants.find((r) => r.id === parseInt(id));
  const item = restaurant?.menu.find((i) => i.id === parseInt(itemId));

  // State for form
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // If restaurant or item not found
  if (!restaurant || !item) {
    return <p>Item not found!</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Order placed for ${item.name}!\nDelivery to: ${formData.address}, ${formData.city}`
    );
  };

  return (
    <div style={{ padding: "40px", background: "#f9fafb", minHeight: "100vh" }}>
      {/* Back to Home Button */}
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

      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        Delivery Address for {item.name}
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "16px",
          maxWidth: "500px",
          padding: "20px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="address"
          placeholder="Full Address"
          value={formData.address}
          onChange={handleChange}
          required
          style={{ ...inputStyle, height: "80px", resize: "none" }}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            padding: "14px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "16px",
  outline: "none",
};
