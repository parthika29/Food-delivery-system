import React from "react";
import { useParams, useNavigate } from "react-router-dom";



 const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    cuisine: "pizza",
    emoji: "🍕",
    rating: "4.5",
    deliveryTime: "30-40 min",
    deliveryFee: "₹99",
    menu: [
      {
        id: 1,
        name: "Margherita Pizza",
        price: "₹299",
        description: "Classic pizza with tomato, mozzarella, and basil.",
        image: "https://adriano.com.ua/wp-content/uploads/2022/12/%D0%AF%D0%BA-%D0%BF%D1%80%D0%B8%D0%B3%D0%BE%D1%82%D1%83%D0%B2%D0%B0%D1%82%D0%B8-%D0%BF%D1%96%D1%86%D1%83-22%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B022.png",
      },
      {
        id: 2,
        name: "Pepperoni Pizza",
        price: "₹349",
        description: "Loaded with cheese and crispy pepperoni.",
        image: "https://www.simplyrecipes.com/thmb/rLl58QZmVP4C3zSlpkKBo72EUws=/2000x1333/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-8f256746d649404baa36a44d271329bc.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Burger Hub",
    cuisine: "burger",
    emoji: "🍔",
    rating: "4.3",
    deliveryTime: "25-35 min",
    deliveryFee: "₹49",
    menu: [
      {
        id: 1,
        name: "Classic Beef Burger",
        price: "₹199",
        description: "Juicy beef patty with lettuce, tomato, and cheese.",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600",
      },
      {
        id: 2,
        name: "Veggie Burger",
        price: "₹179",
        description: "A wholesome vegetarian option with crispy patty.",
        image: "https://i.pinimg.com/originals/e6/d7/15/e6d7155356155cca2b0dd09e9d1a1053.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "Sushi World",
    cuisine: "sushi",
    emoji: "🍣",
    rating: "4.7",
    deliveryTime: "40-50 min",
    deliveryFee: "₹149",
    menu: [
      {
        id: 1,
        name: "California Roll",
        price: "₹399",
        description: "Crab, avocado, and cucumber rolled in rice.",
        image: "https://images.unsplash.com/photo-1546069901-eacef0df6022?w=600",
      },
      {
        id: 2,
        name: "Salmon Nigiri",
        price: "₹459",
        description: "Fresh salmon over vinegared rice.",
        image: "https://thumbs.dreamstime.com/b/delicious-sushi-nigiri-served-sleek-black-plate-fresh-salmon-slices-carefully-arranged-over-vinegared-rice-style-331409772.jpg",
      },
    ],
  },
  {
    id: 4,
    name: "Starbucks",
    cuisine: "starbucks",
    emoji: "☕",
    rating: "4.6",
    deliveryTime: "20-30 min",
    deliveryFee: "₹59",
    menu: [
      {
        id: 1,
        name: "Caffè Latte",
        price: "₹249",
        description: "Rich espresso balanced with steamed milk.",
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600",
      },
      {
        id: 2,
        name: "Caramel Frappuccino",
        price: "₹299",
        description: "Blended coffee with caramel syrup and whipped cream.",
        image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600",
      },
    ],
  },
  {
    id: 5,
    name: "Taco Bell",
    cuisine: "taco",
    emoji: "🌮",
    rating: "4.2",
    deliveryTime: "30-40 min",
    deliveryFee: "₹79",
    menu: [
      {
        id: 1,
        name: "Chicken Taco",
        price: "₹159",
        description: "Soft tortilla filled with spiced chicken & veggies.",
        image: "https://images.unsplash.com/photo-1600891963933-96053a71d4c4?w=600",
      },
      {
        id: 2,
        name: "Veggie Taco",
        price: "₹129",
        description: "Healthy vegetarian option with beans and cheese.",
        image: "https://images.unsplash.com/photo-1617196034796-73bc9e1e3a0e?w=600",
      },
    ],
  },
  {
    id: 6,
    name: "Indian Tandoor",
    cuisine: "indian",
    emoji: "🍛",
    rating: "4.8",
    deliveryTime: "35-45 min",
    deliveryFee: "₹89",
    menu: [
      {
        id: 1,
        name: "Butter Chicken",
        price: "₹349",
        description: "Creamy tomato-based curry with tender chicken.",
        image: "https://images.unsplash.com/photo-1604908177522-402deae28f52?w=600",
      },
      {
        id: 2,
        name: "Paneer Tikka",
        price: "₹299",
        description: "Grilled paneer cubes marinated in spices.",
        image: "https://images.unsplash.com/photo-1603898037225-4d02e3fdfb0e?w=600",
      },
    ],
  },
  {
    id: 7,
    name: "Italiano",
    cuisine: "italian",
    emoji: "🍝",
    rating: "4.4",
    deliveryTime: "30-40 min",
    deliveryFee: "₹99",
    menu: [
      {
        id: 1,
        name: "Pasta Alfredo",
        price: "₹279",
        description: "Creamy Alfredo sauce with fettuccine pasta.",
        image: "https://images.unsplash.com/photo-1589308078055-42f17f5a1ef5?w=600",
      },
      {
        id: 2,
        name: "Lasagna",
        price: "₹329",
        description: "Layered pasta with cheese, meat, and tomato sauce.",
        image: "https://images.unsplash.com/photo-1603079680026-c63e9cb47da5?w=600",
      },
    ],
  },
];


export default function RestaurantList() {
  const { category } = useParams();
  const navigate = useNavigate();

  const filtered = restaurants.filter(
    (r) => r.cuisine.toLowerCase() === category.toLowerCase()
  );

  return (
    <div style={{ padding: "40px 60px" }}>
      <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
        {category.charAt(0).toUpperCase() + category.slice(1)} Restaurants 🍴
      </h2>
      {filtered.length === 0 ? (
        <p>No restaurants found for {category}</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {filtered.map((res) => (
            <div
              key={res.id}
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/restaurant/${res.id}`)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <span style={{ fontSize: "36px" }}>{res.emoji}</span>
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                    {res.name}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>
                    {res.cuisine}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: "14px", color: "#374151" }}>
                ⭐ {res.rating} • {res.deliveryTime} • Delivery {res.deliveryFee}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 👇 Export restaurants so RestaurantMenu can use it
export { restaurants };
