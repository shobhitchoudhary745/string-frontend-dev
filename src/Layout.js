import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./Pages/Auth/Login.jsx";
import Home from "./Pages/Home/Home.jsx";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute.js";
export default function Layout() {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className={`${token ? "App" : ""}`}>
      {token && <Header />}
      <div
        style={{ overflowY: token ? "hidden" : "" }}
        className={`${token ? "d-flex flex-1  mt-2" : ""}`}
      >
        {token && <Sidebar />}
        <div className="mx-1" style={{ overflowY: "auto" }}>
            <Routes>
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
            </Routes>
        </div>
      </div>
    </div>
  );
}
