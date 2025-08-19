import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrdersManagement from "./pages/admin/OrdersManagement";
import AdminMenuManagement from "./pages/admin/MenuManagement";
import AdminUsersManagement from "./pages/admin/UsersManagement";

// Chef pages
import ChefDashboard from "./pages/chef/Dashboard";
import ChefMenuUploadForm from "./pages/chef/MenuUploadForm";
import ChefOrdersManagement from "./pages/chef/OrdersManagement";
import ChefProfile from "./pages/chef/Profile";

// User pages
import Home from "./pages/user/Home";
import Menu from "./pages/user/Menu";
import Orders from "./pages/user/Orders";
import CartPage from "./pages/user/CartPage";
import CheckOut from "./pages/user/CheckOut";
import UserProfile from "./pages/user/Profile";
import OrderConfirmation from "./pages/user/OrderConfirmation";

// Other pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./pages/Navbar";



function App() {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  const increaseQty = (id) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decreaseQty = (id) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const newOrder = {
      id: `ORD${Math.floor(1000 + Math.random() * 9000)}`,
      items: cartItems.map(({ name, quantity }) => ({ name, qty: quantity })),
      total: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]); // clear cart after checkout
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    window.location.href = "/auth/login"; // redirect
  };

  return (
    <Router>
      {/* Pass cartCount and logout handler */}
      <Navbar cartCount={cartItems.length} onLogout={handleLogout} />

      <Routes>
        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrdersManagement />} />
        <Route path="/admin/users" element={<AdminUsersManagement />} />
        <Route path="/admin/menu" element={<AdminMenuManagement />} />

        {/* Chef */}
        <Route path="/chef/dashboard" element={<ChefDashboard />} />
        <Route path="/chef/menu" element={<ChefMenuUploadForm />} />
        <Route path="/chef/orders" element={<ChefOrdersManagement />} />
        <Route path="/chef/profile" element={<ChefProfile />} />

        {/* User */}
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              onIncrease={increaseQty}
              onDecrease={decreaseQty}
              onRemove={removeFromCart}
              onCheckout={handleCheckout}
            />
          }
        />
        <Route path="/orders" element={<Orders orders={orders} />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/profile" element={<UserProfile />} />

        {/* Other */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
