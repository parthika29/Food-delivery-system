import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { restaurants } from "./RestaurantList";

export default function MenuItemDetail() {
  const { id, itemId } = useParams();
  const navigate = useNavigate();

  const restaurant = restaurants.find((r) => r.id === parseInt(id));
  if (!restaurant) return <p>Restaurant not found!</p>;

  const item = restaurant.menu.find((i) => i.id === parseInt(itemId));
  if (!item) return <p>Item not found!</p>;

  const handleOrderClick = () => {
    navigate(`/order/${restaurant.id}/${item.id}`);
  };

  return (
    <div style={{ padding: "40px 60px", background: "#fafafa", minHeight: "100vh" }}>
      <Link
        to={`/restaurant/${restaurant.id}`}
        style={{ display: "inline-block", marginBottom: "20px", textDecoration: "none", color: "black" }}
      >
        ← Back to {restaurant.name}
      </Link>

      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
        {/* Big Image */}
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "400px",
            height: "300px",
            borderRadius: "16px",
            objectFit: "cover",
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
          }}
        />

        {/* Item Info */}
        <div>
          <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>{item.name}</h2>
          <p style={{ fontSize: "16px", color: "#374151", marginBottom: "15px" }}>
            {item.description}
          </p>
          <p style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px" }}>{item.price}</p>
          <p style={{ fontSize: "15px", color: "#6b7280", marginBottom: "20px" }}>
            ⭐ {restaurant.rating} • {restaurant.deliveryTime} • Delivery {restaurant.deliveryFee}
          </p>
          <button
            onClick={handleOrderClick}
            style={{
              padding: "12px 20px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
