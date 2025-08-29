// src/pages/Home2.jsx
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
   
  ];

  // 🔹 Restaurants Data (with images now)
  const restaurants = [
    {
      id: 1,
      name: "Domino's Pizza",
      cuisine: "Pizza",
      emoji: "🍕",
      rating: "4.5",
      deliveryTime: "30 min",
      deliveryFee: "Free",
      image: "https://www.dominos.com.au/ManagedAssets/AU/product/M013D/AU_M013D_en_menu_12070.jpg?v-574049395",
    },
    {
      id: 2,
      name: "Pizza Hut",
      cuisine: "Pizza",
      emoji: "🍕",
      rating: "4.2",
      deliveryTime: "25 min",
      deliveryFee: "₹40",
      image: "https://i.pinimg.com/736x/4b/60/60/4b60607498abe68245b0654a8d4cfcf2.jpg",
    },
    {
      id: 3,
      name: "Burger King",
      cuisine: "Burger",
      emoji: "🍔",
      rating: "4.3",
      deliveryTime: "20 min",
      deliveryFee: "Free",
      image: "https://wallpapercave.com/wp/wp2253965.jpg",
    },
    {
      id: 4,
      name: "McDonald's",
      cuisine: "Burger",
      emoji: "🍔",
      rating: "4.0",
      deliveryTime: "18 min",
      deliveryFee: "₹30",
      image: "https://watcher.guru/news/wp-content/uploads/2024/03/mcdonalds.jpg",
    },
    {
      id: 5,
      name: "Sushi House",
      cuisine: "Sushi",
      emoji: "🍣",
      rating: "4.7",
      deliveryTime: "35 min",
      deliveryFee: "₹50",
      image: "http://pirenopolisonline.com.br/wp-content/uploads/2020/02/foto-sushi-house-696x696.jpg",
    },
    {
      id: 6,
      name: "Starbucks Cafe",
      cuisine: "Starbucks",
      emoji: "☕",
      rating: "4.6",
      deliveryTime: "15 min",
      deliveryFee: "Free",
      image: "https://www.allrecipes.com/thmb/rIy7SyNgsYcyB7SvQ0RLgNZJRxY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Myproject-1-94a90a81eb8740c88b766770eac32a23.jpg",
    },
    {
      id: 7,
      name: "Subway Express",
      cuisine: "Subway",
      emoji: "🥪",
      rating: "4.4",
      deliveryTime: "22 min",
      deliveryFee: "₹20",
      image: "https://pic.accessify.com/thumbnails/777x423/s/subwayexpress.co.nz.png",
    },
    {
      id: 8,
      name: "Curry Palace",
      cuisine: "Indian Food",
      emoji: "🍛",
      rating: "4.8",
      deliveryTime: "40 min",
      deliveryFee: "Free",
      image: "https://i.pinimg.com/originals/3b/e1/28/3be128d2502bbfb30de8bd6d9dceb2ad.jpg",
    },
    {
      id: 9,
      name: "Little Italy",
      cuisine: "Italian Food",
      emoji: "🍝",
      rating: "4.5",
      deliveryTime: "28 min",
      deliveryFee: "₹35",
      image: "https://dianashealthyliving.com/wp-content/uploads/2019/09/Italian-food-Depositphotos_.jpg",
    },
  
  ];

  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Filter logic
  const filteredRestaurants = restaurants.filter((res) => {
    const matchesCuisine = selectedCuisine ? res.cuisine === selectedCuisine : true;
    const matchesSearch =
      res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCuisine && matchesSearch;
  });

  return (
    
     <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      {/* 🔹 Logout Button (Top Right) */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}>
        <button
          onClick={() => navigate("/")} // 👈 Change this to your actual homepage route
          style={{
            background: "black",
            color: "white",
            padding: "6px 12px",
            fontSize: "14px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Logout
        </button>
      </div>
      
      {/* 🔹 Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #ff4d4d, #ff944d)",
          color: "white",
          padding: "60px 20px",
          textAlign: "center",
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px",
        }}
      >
        <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "10px" }}>
          Craving something delicious? 😋
        </h1>
        <p style={{ fontSize: "18px", fontWeight: "400" }}>
          Order your favorite meals from top restaurants near you
        </p>
      </div>

      {/* 🔹 Search Bar */}
      <div style={{ display: "flex", justifyContent: "center", margin: "30px auto" }}>
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
            onClick={() => setSearchTerm(searchInput)}
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "8px 14px",
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
          margin: "0 auto 40px",
          maxWidth: "1000px",
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCuisine(cat.name)}
            style={{
              background: selectedCuisine === cat.name ? "#1e293b" : "white",
              color: selectedCuisine === cat.name ? "white" : "black",
              borderRadius: "16px",
              padding: "24px",
              textAlign: "center",
              cursor: "pointer",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              transition: "all 0.3s",
            }}
          >
            <span style={{ fontSize: "36px" }}>{cat.emoji}</span>
            <p style={{ marginTop: "8px", fontWeight: "600" }}>{cat.name}</p>
          </div>
        ))}
      </div>

      {/* 🔹 Restaurants */}
      <h3 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "20px", textAlign: "center" }}>
        Popular Restaurants
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px 60px",
        }}
      >
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => navigate(`/restaurants/${restaurant.cuisine.toLowerCase()}`)}
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              overflow: "hidden",
              cursor: "pointer",
              border: "1px solid #e5e7eb",
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)";
            }}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div style={{ padding: "16px" }}>
              <h4 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "6px" }}>
                {restaurant.name}
              </h4>
              <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
                {restaurant.cuisine}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "12px",
                }}
              >
                <Star size={14} style={{ color: "#fbbf24", fill: "#fbbf24" }} />
                <span>{restaurant.rating}</span>
                <span>• {restaurant.deliveryTime}</span>
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
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
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No restaurants found */}
      {filteredRestaurants.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#6b7280" }}>
          No restaurants found.
        </p>
      )}
    </div>
  );
}
