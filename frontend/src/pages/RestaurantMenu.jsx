import React from "react";
import { useParams, Link } from "react-router-dom";
import { restaurants } from "./RestaurantList";

export default function RestaurantMenu() {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === parseInt(id));

  if (!restaurant) {
    return <p style={{ padding: "40px" }}>Restaurant not found!</p>;
  }

  return (
    <div style={{ padding: "40px 60px", background: "#fafafa", minHeight: "100vh" }}>
      <Link
        to={`/restaurants/${restaurant.cuisine}`}
        style={{
          color: "black",
          fontWeight: "500",
          marginBottom: "20px",
          display: "inline-block",
          textDecoration: "none",
        }}
      >
        ← Back to {restaurant.cuisine} Restaurants
      </Link>

      {/* Restaurant Header */}
      <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>
        {restaurant.emoji} {restaurant.name}
      </h2>
      <p style={{ color: "#6b7280", marginBottom: "30px", fontSize: "15px" }}>
        ⭐ {restaurant.rating} • {restaurant.deliveryTime} • Delivery {restaurant.deliveryFee}
      </p>

      {/* Menu Section */}
      <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px" }}>Menu</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {restaurant.menu.map((item) => (
          <Link
            key={item.id}
            to={`/restaurant/${restaurant.id}/item/${item.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                overflow: "hidden",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
              }}
            >
              {/* Item Image */}
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />

              {/* Item Info */}
              <div style={{ padding: "14px" }}>
                <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "6px" }}>
                  {item.name}
                </h4>
                <p style={{ fontSize: "14px", color: "#374151", marginBottom: "8px" }}>
                  {item.description}
                </p>
                <p style={{ fontSize: "16px", fontWeight: "bold", color: "#111827" }}>
                  {item.price}
                </p>
                <button
                  style={{
                    marginTop: "10px",
                    padding: "10px 16px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Order Now
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
