import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "customer",
    location: "",
    specialties: "",
    bio: "",
    businessName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData
      );

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f9ff 0%, #fff7ed 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: "500px", width: "100%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              background:
                "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 4px 12px rgba(249, 115, 22, 0.3)",
            }}
          >
            <span
              style={{ fontSize: "24px", color: "white", fontWeight: "bold" }}
            >
              🔒
            </span>
          </div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#1f2937",
              margin: "0 0 8px 0",
            }}
          >
            Create Your Account
          </h1>
          <p style={{ color: "#6b7280", margin: 0 }}>
            Join Foodie and start your journey
          </p>
        </div>

        {/* Form */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "32px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            border: "1px solid #f3f4f6",
          }}
        >
          {error && (
            <div
              style={{
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "24px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                I am a:
              </label>
              <div style={{ display: "flex", gap: "12px" }}>
                {["customer", "chef"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, role }))
                    }
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      border: "1px solid",
                      cursor: "pointer",
                      backgroundColor:
                        formData.role === role ? "#f97316" : "#f9fafb",
                      borderColor:
                        formData.role === role ? "#f97316" : "#d1d5db",
                      color:
                        formData.role === role ? "white" : "#374151",
                    }}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Name (full row) */}
            <div style={{ marginBottom: "20px" }}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                style={inputStyle}
                required
              />
            </div>

            {/* Email (full row) */}
            <div style={{ marginBottom: "20px" }}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                style={inputStyle}
                required
              />
            </div>

            {/* Phone + Location (two in a row) */}
            <div style={formRow}>
              <div style={{ flex: 1 }}>
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Password + Confirm Password (two in a row) */}
            <div style={formRow}>
              <div style={{ flex: 1, position: "relative" }}>
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  style={{ ...inputStyle, paddingRight: "48px" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={eyeButtonStyle}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <div style={{ flex: 1, position: "relative" }}>
                <label>Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  style={{ ...inputStyle, paddingRight: "48px" }}
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  style={eyeButtonStyle}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Extra fields for chefs */}
            {formData.role === "chef" && (
              <>
                <div style={formRow}>
                  <div style={{ flex: 1 }}>
                    <label>Business Name</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Restaurant or Business Name"
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label>Specialties</label>
                    <input
                      type="text"
                      name="specialties"
                      value={formData.specialties}
                      onChange={handleChange}
                      placeholder="E.g. Italian, Sushi"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Write a short bio"
                    style={{ ...inputStyle, minHeight: "80px" }}
                  />
                </div>
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px 20px",
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
                backgroundColor: loading ? "#9ca3af" : "#f97316",
                border: "none",
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* Reusable styles */
const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  fontSize: "16px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  outline: "none",
  boxSizing: "border-box",
  marginBottom: "20px",
};

const formRow = {
  display: "flex",
  gap: "16px",
  marginBottom: "20px",
};

const eyeButtonStyle = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
};
