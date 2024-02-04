import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { FaDesktop } from "react-icons/fa6";
import { TfiUser } from "react-icons/tfi";
import { CiPower } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import "./Header.scss";
import { setCurrentPage, toggle } from "../../features/generalSlice";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../features/authSlice";
import { toast } from "react-toastify";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPage } = useSelector((state) => state.general);

  const logout = (e) => {
    e.preventDefault();
    dispatch(removeToken());
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout Successfully");
    dispatch(setCurrentPage({ currentPage: "Dashboard" }));
  };

  return (
    <div className="Header">
      <div className="d-flex parent">
        <div className="d-flex header_first_child ">
          <img
            className="string-geo-logo"
            src="https://stringgeo.com/upload/NewFolder/String%20Geo%20logo%20Icon.png"
            alt="logoimage"
          />
        </div>
        <div className="header_second_child mx-3">
          <div className="d-flex align-items-center h-100 justify-content-between">
            <div className={`d-flex sub_child align-items-center`}>
              <div >
                <FiMenu
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggle());
                  }} 
                  cursor={"pointer"}
                  className="menu_icon"
                  size={25}
                />
              </div>
              <div className="dashboard mt-1">{currentPage.toUpperCase()}</div>
            </div>
            <div className="d-flex gap-3  align-items-center">
              <FaDesktop size={25} style={{ cursor: "pointer" }} />
              <Dropdown>
                <Dropdown.Toggle
                  className="dropdown-toggle p-0"
                  style={{ backgroundColor: "black", border: "none" }}
                >
                  <img
                    className="avatar"
                    src="https://stringgeo.com/upload/stringgeo-282da67f48305d53442105c86436c3bf-b.jpg"
                    alt=""
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item className="d-flex gap-2 align-items-center">
                    <TfiUser size={17} /> Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={logout}
                    className="d-flex gap-2 align-items-center"
                  >
                    <CiPower size={18} /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
