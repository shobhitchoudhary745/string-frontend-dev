import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./Pages/Auth/Login.jsx";
import Home from "./Pages/Home/Home.jsx";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute.js";
import User from "./Pages/Users/User.jsx";
import Transaction from "./Pages/Transactions/Transaction.jsx";
import Subscription from "./Pages/Subscription/Subscription.jsx";

export default function Layout() {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className={`${token ? "App" : ""}`}>
      {token && <Header />}
      <div style={{ overflowY: "hidden" }} className="d-flex  my-2">
        {token && <Sidebar />}
        <div
          className="mx-3 my-1 flex-1 card-container"
          style={{ overflowY: "scroll", minHeight: "100%" }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/transactions"
              element={
                <ProtectedRoute>
                  <Transaction />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/subscription"
              element={
                <ProtectedRoute>
                  <Subscription />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
