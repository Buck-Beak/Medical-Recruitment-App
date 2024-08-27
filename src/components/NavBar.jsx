import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ children }) {
  return (
    <div>
      <nav className="Navbar">
        <Link to="/" className="home">Home</Link>
        <Link to="/create-user" className="register">Register</Link>
        <Link to="/login" className="login">Login</Link>
      </nav>
      {children}
    </div>
  );
}
