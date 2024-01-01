import React from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
export default function Layout({ children }) {
  return (
    <div className="App">
      <Header />
      <div style={{overflowY: "hidden"}} className="d-flex flex-1  mt-2">
        <Sidebar />
        <div className="mx-1" style={{overflowY: "auto"}}>{children}</div>
      </div>
    </div>
  );
}
