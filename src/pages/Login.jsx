import React, { useState } from "react";
import { signIn } from "../functions/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    signIn(email, password);
    navigate('/entry-page');
  };

  return (
    <div>
      <h1>Login</h1>
      <label>Email:</label>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="login-button"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
