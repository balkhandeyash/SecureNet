// Profile.js

import React, { useState, useEffect } from "react";
import defaultUserImage from "../assets/defaultUserImage.png";
import "./Profile.css";
import axios from "axios"; // Import axios

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "Default Username",
    name: "Default Name",
    email: "default@example.com",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    // Add other user data fields as needed
  });

  const [editedValues, setEditedValues] = useState({
    username: "",
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    // Add other user data fields as needed
  });

  const [editedValuesTemp, setEditedValuesTemp] = useState({
    username: "",
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    // Add other user data fields as needed
  });

  const [isProfileZoomed, setIsProfileZoomed] = useState(false);
  const [isPasswordUpdateZoomed, setIsPasswordUpdateZoomed] = useState(false);

  const handleInputChange = (field, value) => {
    setEditedValuesTemp((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const updateProfile = async () => {
    try {
      console.log("Updating profile details:", editedValuesTemp);

      // Make a PUT request to update user details
      // eslint-disable-next-line
      const response = await axios.put(
        "https://securenet-backend.vercel.app/api/user",
        editedValuesTemp,
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      );
      // Fetch the updated user data again from the server
      const updatedResponse = await axios.get(
        "https://securenet-backend.vercel.app/api/user",
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      );

      console.log("Updated User Data:", updatedResponse.data);

      // Update the local state with the new data
      setEditedValues(updatedResponse.data);
      setUserData(updatedResponse.data);
      setIsProfileZoomed(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  // const updatePassword = (currentPassword, newPassword) => {
  //   console.log("Updating password:", currentPassword, newPassword);
  //   setIsPasswordUpdateZoomed(false);
  // };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault(); // Prevent form submission
    const { currentPassword, newPassword, confirmNewPassword } = editedValuesTemp;

    // Check if any field is empty
    const emptyFields = [];
    if (!currentPassword) emptyFields.push("Current Password");
    if (!newPassword) emptyFields.push("New Password");
    if (!confirmNewPassword) emptyFields.push("Confirm New Password");

    // Show alert if any field is empty
    if (emptyFields.length > 0) {
      const errorMessage = `Please fill in the following fields: ${emptyFields.join(", ")}`;
      alert(errorMessage);
      return;
    }
  
    try {
      if (newPassword !== confirmNewPassword) {
        console.error("New password and confirm new password do not match");
        return;
      }
  
      console.log("Updating Password ...");
  
      // Make a POST request to update the password
      // eslint-disable-next-line
      const response = await axios.post(
        "https://securenet-backend.vercel.app/api/updatepassword",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      );
  
      console.log("Password updated successfully");
  
      // Close the password update dialog
      setIsPasswordUpdateZoomed(false);
      setEditedValuesTemp((prevValues) => ({
        ...prevValues,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
    } catch (error) {
      // Check if the error is due to incorrect current password
      if (error.response && error.response.status === 401) {
        alert("Incorrect current password. Please try again.");
      } else {
        console.error("Error updating password:", error);
      }
    }
  };

  const handleCloseButtonClick = () => {
    // Clear password-related fields
    setEditedValuesTemp({
      ...editedValuesTemp,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  
    // Close the zoomed card
    setIsPasswordUpdateZoomed(false);
  };
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://securenet-backend.vercel.app/api/user",
          {
            headers: {
              Authorization: sessionStorage.getItem("token"), // Include the token in the request headers
            },
          }
        );
        console.log(response);
        const data = response.data;
        setUserData(data);
        setEditedValues(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-body">
      <div className="profile-card">
        <img
          src={userData.image || defaultUserImage}
          alt="User Profile"
          className="profile-image"
        />
        <div className="user-details">
          <h2>{userData.username}</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <button onClick={() => setIsProfileZoomed(true)}>
            Update Profile
          </button>
          <button onClick={() => setIsPasswordUpdateZoomed(true)}>
            Update Password
          </button>
        </div>
      </div>

      {isProfileZoomed && (
        <div className="zoomed-card">
          <div className="profile-card">
            <img
              src={userData.image || defaultUserImage}
              alt="User Profile"
              className="profile-image"
            />
            <div className="user-details">
              <h2>{editedValues.username || userData.username}</h2>
              <p>Name: {editedValues.name || userData.name}</p>
              <p>Email: {editedValues.email || userData.email}</p>

              {/* Input fields for editing user details */}
              <input
                type="text"
                placeholder="Enter new username"
                value={editedValuesTemp.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter new name"
                value={editedValuesTemp.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter new email"
                value={editedValuesTemp.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />

              <button onClick={updateProfile}>Update Profile</button>
              <button onClick={() => setIsProfileZoomed(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

{isPasswordUpdateZoomed && (
  <div className="zoomed-card">
    <div className="profile-card">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="password"
          placeholder="Current Password"
          value={editedValuesTemp.currentPassword}
          onChange={(e) =>
            handleInputChange("currentPassword", e.target.value)
          }
        />
        <input
          type="password"
          placeholder="New Password"
          value={editedValuesTemp.newPassword}
          onChange={(e) =>
            handleInputChange("newPassword", e.target.value)
          }
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={editedValuesTemp.confirmNewPassword}
          onChange={(e) =>
            handleInputChange("confirmNewPassword", e.target.value)
          }
        />
        <button onClick={handlePasswordUpdate}>Update</button>
        <button
          className="close"
          onClick={handleCloseButtonClick}
        >
          Close
        </button>
      </form>
    </div>
  </div>
)}



    </div>
  );
};

export default Profile;
