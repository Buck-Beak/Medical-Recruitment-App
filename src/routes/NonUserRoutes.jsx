import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CreateUser from "../pages/CreateUser";
import Login from "../pages/Login";
import NavBar from "../components/NavBar";
import Welcome from "../pages/Welcome";

export default function NonUserRoutes() {
  return (
    <div>
      <NavBar>
        <Routes>

          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
         { /*<Route path="/*" element={<Home />} />*/ }
          <Route path="/*" element={<Welcome/>}/>
        </Routes>
      </NavBar>
    </div>
  );
}
