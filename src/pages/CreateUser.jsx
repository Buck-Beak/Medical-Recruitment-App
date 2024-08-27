import React, { useState } from "react";
import { signUp } from "../functions/auth";

export default function CreateUSer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userData = {
    firstName,
    lastName,
    email,
  };

  const handleCreateUser = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else if (!email) {
      alert("Email is required");
      return;
    } else if (!password) {
      alert("Password is required");
      return;
    } else signUp(email, password, userData);
  };

  return (
    <>
      <h1 className="register">Register</h1>
      <p>{firstName}</p>
      <div className="form">
        <label>First Name:</label>
        <input type="text" placeholder="First Name" 
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        />
        <label>Last Name:</label>
        <input type="text" placeholder="Last Name" 
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        />
        <label>Email:</label>
        <input type="email" placeholder="Email" 
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        />
        <label>Password:</label>
        <input type="password" placeholder="Password" 
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        />
        <label>Confirm Password:</label>
        <input type="password" placeholder="Confirm Password"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }} 
        />
        <button className="Create-button"
        onClick={handleCreateUser}
        >
          Register
        </button>
      </div>
    </>
  );
}
