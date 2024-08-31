import React, { useState } from "react";
import { signUp } from "../functions/auth";
import { useNavigate } from "react-router-dom";

export default function CreateUSer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hiring,setHiring] = useState(false);
  const navigate = useNavigate();

  const userData = {
    firstName,
    lastName,
    email,
    hiring,
  };

  const handleHire=()=>{
    setHiring(true);
    console.log(hiring);
  }
  const handleNotHire=()=>{
    setHiring(false);
    console.log(hiring);
  }

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
    } else{
      signUp(email, password, userData);
      navigate('/user-details');
    }

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
        <p>Are you a hiring?</p>
        <button className="hiring" onClick={handleHire}>Yes</button>
        <button className="not-hiring" onClick={handleNotHire}>No</button>
        <button className="Create-button"
        onClick={handleCreateUser}
        >
          Register
        </button>
      </div>
    </>
  );
}
