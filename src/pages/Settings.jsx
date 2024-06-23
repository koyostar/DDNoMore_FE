import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../utilities/user";

export default function Settings() {
  const { user, setUser } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("profile");

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/profile", profileData);
      setUser(response.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      await axios.put("/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="container font-bold bg-lightsec mx-auto max-w-md p-4 rounded-2xl">
      <div className="tabs mb-6 flex space-x-4 justify-center">
        <button
          className={`tab px-4 py-2 rounded-md ${
            activeTab === "profile"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Edit Profile
        </button>
        <button
          className={`tab px-4 py-2 rounded-md ${
            activeTab === "password"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
      </div>

      {activeTab === "profile" && (
        <div className="form-container m-4">
          <h2 className="text-xl font-semibold mb-2 text-center">
            Edit Profile
          </h2>
          <form onSubmit={updateProfile} className="flex flex-col space-y-4">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              className="p-2 border rounded-md w-full"
              required
            />
            <label>Username: </label>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleProfileChange}
              className="p-2 border rounded-md w-full"
              required
            />
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              className="p-2 border rounded-md w-full"
              required
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-lightacc text-darksec my-4 mx-2 px-4 py-2 rounded"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "password" && (
        <div className="form-container m-4">
          <h2 className="text-xl font-semibold mb-2 text-center">
            Change Password
          </h2>
          <form onSubmit={changePassword} className="flex flex-col space-y-4">
            <label>Current Password: </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="p-2 border rounded-md w-full"
              required
            />
            <label>New Password: </label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="p-2 border rounded-md w-full"
              required
            />
            <label>Confirm New Password: </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="p-2 border rounded-md w-full"
              required
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-lightacc text-darksec my-4 mx-2 px-4 py-2 rounded"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
