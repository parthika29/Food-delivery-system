import React, { useState, useMemo } from "react";
import Navbar from "../Navbar";
import axios from "../../api/axiosInstance";
import Navbar2 from "../Navbar2";

const SAMPLE_MEALS = [
  {
    id: "1",
    name: "Grilled Chicken Bowl",
    description: "Herb-marinated chicken with quinoa and greens.",
    category: "Healthy",
    price: 1130,
    rating: 4.5,
    imageUrl:
      "https://cdn.scrambledchefs.com/wp-content/uploads/2022/05/Greek-Grilled-Chicken-Salad-29.jpg",
    isVeg: false,
  },
  {
    id: "2",
    name: "Paneer Tikka Wrap",
    description: "Spiced paneer with veggies in a whole wheat wrap.",
    category: "Vegetarian",
    price: 745,
    rating: 4.2,
    imageUrl:
      "https://www.chefkunalkapur.com/wp-content/uploads/2023/08/DSC04081-scaled.jpg?v=1692276994",
    isVeg: true,
  },
  {
    id: "3",
    name: "Vegan Buddha Bowl",
    description: "Roasted veggies, chickpeas, and tahini dressing.",
    category: "Vegan",
    price: 960,
    rating: 4.8,
    imageUrl:
      "https://images.ctfassets.net/6ilzexksnph5/2fZi70BliFSO7oI7IZpZbW/a3f274476170d75bd84a141371ae04b6/Vegan_Buddha_Bowl.jpg?w=2000&h=1500&fm=webp&fit=thumb&q=100",
    isVeg: true,
  },
  {
    id: "4",
    name: "Cheeseburger Deluxe",
    description: "Juicy beef patty with cheddar and special sauce.",
    category: "Fast Food",
    price: 950,
    rating: 4.0,
    imageUrl:
      "https://www.tysonfoodservice.com/adobe/dynamicmedia/deliver/dm-aid--92a52f1f-9d97-4118-93d0-a54d82e85a68/deluxe-cheeseburger-pickles-onion-pub-burger-137353-768x522.jpg?quality=75&preferwebp=true&width=1024",
    isVeg: false,
  },
];

const CATEGORIES = ["All", "Healthy", "Vegetarian", "Vegan", "Fast Food"];

const userId = "testuser123";

const addToCart = async (userId, meal) => {
  try {
    const res = await axios.post("/cart/add", {
      userId,
      item: {
        quantity: 1,
        productId: meal.id,
        name: meal.name,
        price: meal.price,
        image: meal.imageUrl,
      },
    });
    console.log("Add to cart clicked for:", meal.name);
    alert("Item added to cart!");
  } catch (err) {
    console.error("Error adding to cart", err);
  }
};

const sortOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating", value: "rating" },
];

const Home2 = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortKey, setSortKey] = useState("popularity");
  const [showVegOnly, setShowVegOnly] = useState(false);

  const filteredMeals = useMemo(() => {
    let list = SAMPLE_MEALS;

    if (activeCategory !== "All") {
      list = list.filter((m) => m.category === activeCategory);
    }

    if (showVegOnly) {
      list = list.filter((m) => m.isVeg);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      );
    }

    switch (sortKey) {
      case "price_asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [search, activeCategory, sortKey, showVegOnly]);

  return (
    <>
      <Navbar/>
      {/* <Navbar2/> */}
      <div className="w-full bg-[#]">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-6 text-[#111827] ">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold mb-1">Delicious Meals</h1>
              <p className="text-sm text-gray-600">
                Choose from a variety of fresh meals delivered to your door.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="flex flex-1">
                <label htmlFor="search" className="sr-only">
                  Search meals
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search for meals or ingredients"
                  aria-label="Search meals"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <select
                  aria-label="Sort meals"
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-1">
                  <input
                    id="veg-only"
                    type="checkbox"
                    checked={showVegOnly}
                    onChange={(e) => setShowVegOnly(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="veg-only" className="text-sm">
                    Veg Only
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-3 mb-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 whitespace-nowrap rounded-full border ${
                  activeCategory === cat
                    ? "bg-[#243745] text-white border-black cursor-pointer"
                    : "bg-white text-gray-700 border-gray-200 cursor-pointer "
                } focus:ring-2 `}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredMeals.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No meals match your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="border rounded-2xl overflow-hidden shadow-sm flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={meal.imageUrl}
                      alt={meal.name}
                      loading="lazy"
                      className="w-full h-44 object-cover"
                    />
                    {meal.isVeg ? (
                      <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                        Veg
                      </span>
                    ) : (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                        Non-Veg
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg font-medium">{meal.name}</h2>
                      <div className="flex items-center text-sm gap-1">
                        <svg
                          aria-hidden="true"
                          className="w-4 h-4 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.363 1.118l1.287 3.956c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.37 2.448c-.785.57-1.84-.197-1.54-1.118l1.287-3.956a1 1 0 00-.363-1.118L3.644 9.383c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.956z" />
                        </svg>
                        <span>{meal.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 flex-1">
                      {meal.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-lg font-semibold">
                        ₹{meal.price.toFixed(2)}
                      </div>
                      <button
                        aria-label={`Add ${meal.name} to cart`}
                        onClick={() => addToCart(userId, meal)}
                        className="px-3 py-2 bg-[#243745] text-white rounded-lg text-sm hover:bg-[#F97316] transition cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home2;