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
import Toastify from "./utils/Toastify.js";
import AddUser from "./Pages/Users/AddUser.jsx";
import EditUser from "./Pages/Users/EditUser.jsx";
import AddSubscription from "./Pages/Subscription/AddSubscription.jsx";
import EditSubscription from "./Pages/Subscription/EditSubscription.jsx";

export default function Layout() {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className={`${token ? "App" : ""}`}>
      {token && <Header />}
      <div style={{ overflowY: "hidden" }} className="d-flex  my-2">
        {token && <Sidebar />}
        <div
          className="mx-3 my-1 flex-1 card-container"
          style={{ overflowY: "scroll", minHeight: "100%", width: "100%" }}
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
              path="/admin/add-users"
              element={
                <ProtectedRoute>
                  <AddUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-user/:id"
              element={
                <ProtectedRoute>
                  <EditUser />
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
            <Route
              path="/admin/add-subscription"
              element={
                <ProtectedRoute>
                  <AddSubscription />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-subscription/:id"
              element={
                <ProtectedRoute>
                  <EditSubscription />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Toastify />
        </div>
      </div>
    </div>
  );
}
