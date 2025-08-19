import React, { useState } from "react";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineShoppingCart,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { name: "Home", to: "/" },
  { name: "Log In", to: "/auth/login" },
  { name: "Sign Up", to: "/auth/register" },
  { name: "Chef", to: "/chef/dashboard" },
  { name: "Orders", to: "/orders" },
  { name: "Admin", to: "/admin" },
];

const Navbar = ({ activeCategory, setActiveCategory, cartCount = 0, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  return (
    <header className="bg-[#F3F7F9] shadow sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + desktop nav */}
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 flex items-center">
              <div className="text-green-600 font-bold text-xl">Foodie</div>
            </div>
            <nav className="hidden md:flex gap-4">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                      isActive
                        ? "bg-green-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Middle: search (desktop) */}
          <div className="flex-1 hidden sm:flex justify-center px-4">
            <div className="w-full max-w-md">
              <label htmlFor="nav-search" className="sr-only">
                Search meals
              </label>
              <div className="relative">
                <input
                  id="nav-search"
                  type="text"
                  placeholder="Search meals or ingredients"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-gray-200 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M16 16l4 4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              <button
                aria-label="Cart"
                className="relative flex items-center px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                <Link to="/cart">
                  <HiOutlineShoppingCart className="w-6 h-6 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-orange-500 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </button>

              <button
                aria-label="User menu"
                className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                <Link to="/profile">
                  <HiOutlineUserCircle className="w-7 h-7 text-gray-700" />
                </Link>
              </button>

              {/* Logout button */}
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                >
                  Logout
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle menu"
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 focus:outline-none"
              >
                {mobileOpen ? (
                  <HiOutlineX className="w-6 h-6 text-gray-700" />
                ) : (
                  <HiOutlineMenu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile panel */}
        {mobileOpen && (
          <div className="md:hidden mt-2 pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-2 px-2">
              <div>
                <label htmlFor="mobile-search" className="sr-only">
                  Search meals
                </label>
                <div className="relative">
                  <input
                    id="mobile-search"
                    type="text"
                    placeholder="Search meals"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-200 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="M16 16l4 4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 px-2">
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    item.to === "/"
                      ? location.pathname === "/"
                      : location.pathname.startsWith(item.to);

                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                        isActive
                          ? "bg-green-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 mt-2">
                <Link to="/cart" onClick={() => setMobileOpen(false)}>
                  <HiOutlineShoppingCart className="w-6 h-6 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-orange-500 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/profile" onClick={() => setMobileOpen(false)}>
                  <HiOutlineUserCircle className="w-7 h-7 text-gray-700" />
                </Link>
                {onLogout && (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onLogout();
                    }}
                    className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
