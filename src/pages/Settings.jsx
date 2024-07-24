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
      if (error.response) {
        const errorMsg = error.response.data.error;
        toast.error(errorMsg);
      } else {
        toast.error("Failed to update profile");
      }
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
    <div className="container font-bold bg-lightsec mx-auto max-w-md rounded-2xl">
      <div className="flex flex-row justify-between bg-transparent">
        <button
          className={`tab text-xl w-1/2 text-center p-2 rounded-tl-xl ${
            activeTab === "profile"
              ? "bg-lightsec text-darksec  hover:bg-darkacc"
              : "text-lightsec bg-darkpri hover:text-darksec hover:bg-lightacc"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Edit Profile
        </button>
        <button
          className={`tab text-xl w-1/2 text-center p-2 rounded-tr-xl ${
            activeTab === "password"
              ? "bg-lightsec text-darksec  hover:bg-darkacc"
              : "text-lightsec bg-darkpri hover:text-darksec hover:bg-lightacc"
          }`}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
      </div>

      {activeTab === "profile" && (
        <div className="form-container m-4">
          <h2 className="text-xl font-bold mb-2 text-center">Edit Profile</h2>
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
                className="bg-darksec text-lightpri my-4 mx-2 px-4 py-2 rounded"
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
                className="bg-darksec text-lightpri my-4 mx-2 px-4 py-2 rounded"
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
