// src/pages/HomePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Search } from "lucide-react";

export default function Home2() {
  const navigate = useNavigate();

  // 🔹 Food Categories
  const categories = [
    { id: 1, name: "Pizza", emoji: "🍕" },
    { id: 2, name: "Burger", emoji: "🍔" },
    { id: 3, name: "Sushi", emoji: "🍣" },
    { id: 4, name: "Starbucks", emoji: "☕" },
    { id: 5, name: "Subway", emoji: "🥪" },
    { id: 6, name: "Indian Food", emoji: "🍛" },
    { id: 7, name: "Italian Food", emoji: "🍝" },
    { id: 8, name: "Taco Bell", emoji: "🌮" },
  ];

  // 🔹 Restaurants Data
  const restaurants = [
    { id: 1, name: "Domino's Pizza", cuisine: "Pizza", emoji: "🍕", rating: "4.5", deliveryTime: "30 min", deliveryFee: "Free" },
    { id: 2, name: "Pizza Hut", cuisine: "Pizza", emoji: "🍕", rating: "4.2", deliveryTime: "25 min", deliveryFee: "₹40" },
    { id: 3, name: "Burger King", cuisine: "Burger", emoji: "🍔", rating: "4.3", deliveryTime: "20 min", deliveryFee: "Free" },
    { id: 4, name: "McDonald's", cuisine: "Burger", emoji: "🍔", rating: "4.0", deliveryTime: "18 min", deliveryFee: "₹30" },
    { id: 5, name: "Sushi House", cuisine: "Sushi", emoji: "🍣", rating: "4.7", deliveryTime: "35 min", deliveryFee: "₹50" },
    { id: 6, name: "Starbucks Cafe", cuisine: "Starbucks", emoji: "☕", rating: "4.6", deliveryTime: "15 min", deliveryFee: "Free" },
    { id: 7, name: "Subway Express", cuisine: "Subway", emoji: "🥪", rating: "4.4", deliveryTime: "22 min", deliveryFee: "₹20" },
    { id: 8, name: "Curry Palace", cuisine: "Indian Food", emoji: "🍛", rating: "4.8", deliveryTime: "40 min", deliveryFee: "Free" },
    { id: 9, name: "Little Italy", cuisine: "Italian Food", emoji: "🍝", rating: "4.5", deliveryTime: "28 min", deliveryFee: "₹35" },
    { id: 10, name: "Taco Bell", cuisine: "Taco Bell", emoji: "🌮", rating: "4.3", deliveryTime: "25 min", deliveryFee: "Free" },
  ];

  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [searchInput, setSearchInput] = useState(""); // input text
  const [searchTerm, setSearchTerm] = useState("");   // applied on click

  // 🔹 Filter restaurants based on cuisine & search
  const filteredRestaurants = restaurants.filter((res) => {
    const matchesCuisine = selectedCuisine ? res.cuisine === selectedCuisine : true;
    const matchesSearch =
      res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCuisine && matchesSearch;
  });

  return (
    <div style={{ padding: "40px" }}>
      {/* 🔹 Search Bar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "10px 16px",
            width: "100%",
            maxWidth: "500px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          <Search size={18} style={{ marginRight: "10px", color: "#6b7280" }} />
          <input
            type="text"
            placeholder="Search restaurants or cuisines..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              fontSize: "16px",
              flex: 1,
            }}
          />
          <button
            onClick={() => setSearchTerm(searchInput)} // ✅ Apply search
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "6px 12px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* 🔹 Categories */}
      <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "20px", textAlign: "center" }}>
        What’s on your mind? 🍴
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCuisine(cat.name)}
            style={{
              background: selectedCuisine === cat.name ? "#1e293b" : "white",
              color: selectedCuisine === cat.name ? "white" : "black",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
          >
            <span style={{ fontSize: "36px" }}>{cat.emoji}</span>
            <p style={{ marginTop: "8px", fontWeight: "500" }}>{cat.name}</p>
          </div>
        ))}
      </div>

      {/* 🔹 Restaurants */}
      <h3 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "20px", textAlign: "center" }}>
        Popular Restaurants
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => navigate(`/restaurants/${restaurant.cuisine.toLowerCase()}`)}
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "24px",
              cursor: "pointer",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "12px",
                  background: "#f9fafb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "40px" }}>{restaurant.emoji}</span>
              </div>
              <div>
                <h4 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "6px" }}>
                  {restaurant.name}
                </h4>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>{restaurant.cuisine}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#6b7280" }}>
                  <Star size={14} style={{ color: "#fbbf24", fill: "#fbbf24" }} />
                  <span>{restaurant.rating}</span>
                  <span>• {restaurant.deliveryTime}</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: restaurant.deliveryFee === "Free" ? "#10b981" : "#6b7280",
                }}
              >
                Delivery: {restaurant.deliveryFee}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/cart");
                }}
                style={{
                  backgroundColor: "#1e293b",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* If no restaurants match */}
      {filteredRestaurants.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#6b7280" }}>
          No restaurants found.
        </p>
      )}
    </div>
  );
}
