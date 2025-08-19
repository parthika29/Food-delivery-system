import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Navbar from "../Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);

  // Fetch user profile
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/auth/profile");
      if (res.data?.user) {
        setUser(res.data.user);
        setFormData({
          name: res.data.user.name,
          email: res.data.user.email,
          phone: res.data.user.phone || "",
        });
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.put("/auth/profile", formData);
      setUser(res.data.user);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const handlePasswordChange = async () => {
    setPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      setPasswordLoading(false);
      return;
    }

    try {
      await axios.put("/auth/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordSuccess("Password changed successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error("Password change failed", err);
      setPasswordError("Failed to change password. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow space-y-6">

        {/* Profile Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">My Profile</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Name:</label>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              ) : (
                <p className="mt-1">{user.name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Email:</label>
              <p className="mt-1">{user.email}</p>
            </div>

            <div>
              <label className="block text-gray-700">Phone:</label>
              {editing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              ) : (
                <p className="mt-1">{user.phone || "Not provided"}</p>
              )}
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              {editing ? (
                <>
                  <button
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="border-t pt-4">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>

          {passwordError && <p className="text-red-500 mb-2">{passwordError}</p>}
          {passwordSuccess && <p className="text-green-500 mb-2">{passwordSuccess}</p>}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Current Password:</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700">New Password:</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700">Confirm New Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>

            <button
              onClick={handlePasswordChange}
              disabled={passwordLoading}
              className={`px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 mt-2 ${
                passwordLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {passwordLoading ? "Updating..." : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
