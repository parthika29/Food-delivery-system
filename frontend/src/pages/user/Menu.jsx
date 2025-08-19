import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance"; // aapka axios instance
import Navbar from "../Navbar";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  // Fetch menu items from backend
  const fetchMenu = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/menu");
      if (res.data?.menu) {
        setMenuItems(res.data.menu);
      }
    } catch (err) {
      console.error("Failed to fetch menu", err);
      setError("Failed to load menu. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Add to cart
  const addToCart = (item) => {
    const existing = cart.find((i) => i.productId === item._id);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.productId === item._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, productId: item._id, quantity: 1 }]);
    }
    alert(`${item.name} added to cart`);
  };

  if (loading) return <p className="text-center mt-10">Loading menu...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Our Menu</h2>
        {menuItems.length === 0 ? (
          <p className="text-gray-500">No items available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-bold text-gray-800">₹{item.price}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
