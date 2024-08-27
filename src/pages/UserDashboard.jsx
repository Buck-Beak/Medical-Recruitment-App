/*import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { logout } from "../functions/auth";
import { updateData } from "../functions/crud";

export default function UserDashboard() {
  const { user } = UserAuth();
  const [newFirstName, setNewFirstName] = useState("");

  const handleLogout = () => {
    logout();
  };

  const handleUpdateName = () => {
    console.log(newFirstName);
    updateData("users", user.uid, { firstName: newFirstName });
    setNewFirstName("");
  };

  return (
    <>
      <div>Welcome {user?.firstName}</div>

      <input
        type="text"
        value={newFirstName}
        placeholder="New First Name"
        onChange={(e) => {
          setNewFirstName(e.target.value);
        }}
      />
      <button
        className="update-button"
        onClick={handleUpdateName}
      >
        Update Name
      </button>

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
}*/

import { UserAuth } from "../context/AuthContext";
import { logout } from "../functions/auth";
import { Link } from "react-router-dom";

export default function UserDashboard(){
  const { user } = UserAuth();

  const handleLogout=()=>{
    logout();
  }
  return (
    <div className="user-dashboard">
      <nav>
        <Link to="/create-post" className="create">Create Post</Link>
        <Link to="/user-profile" className="user profile">My Profile</Link>
      </nav>
      <h2>Welcome {user?.firstName}</h2>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
   );
}
