import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { FaDesktop } from "react-icons/fa6";
import { TfiUser } from "react-icons/tfi";
import { CiPower } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import "./Header.scss";
import { setCurrentPage, toggle } from "../../features/generalSlice";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../features/authSlice";
import { toast } from "react-toastify";
const image = "https://dewv7gdonips4.cloudfront.net/uploads/user-66bcc3c36d6e0c1c35f55569/profile/1723709281147-stringgeologo.jpeg"

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPage } = useSelector((state) => state.general);

  const logout = (e) => {
    e.preventDefault();
    dispatch(removeToken());
    localStorage.clear();
    navigate("/login");
    toast.success("Logout Successfully");
    dispatch(setCurrentPage({ currentPage: "Dashboard" }));
  };

  return (
    <div className="Header">
      <div className="d-flex parent">
        <div className="d-flex header_first_child ">
          <Link className="text-center" to="/">
            <img
              className="string-geo-logo"
              src="https://www.stringgeo.com/logo/string-geo-logo-white.png"
              alt="logoimage"
            />
          </Link>
        </div>
        <div className="header_second_child mx-3">
          <div className="d-flex align-items-center h-100 justify-content-between">
            <div className={`d-flex sub_child align-items-center`}>
              <div>
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
              <a
                target="_blank"
                rel="noreferrer"
                style={{ color: "#f9f9f9" }}
                href={"https://www.stringgeo.com"}
              >
                <FaDesktop size={25} style={{ cursor: "pointer" }} />
              </a>
              <Dropdown>
                <Dropdown.Toggle
                  className="dropdown-toggle p-0"
                  style={{ backgroundColor: "black", border: "none" }}
                >
                  <img
                    className="avatar"
                    src={image}
                    alt=""
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      navigate("/admin/profile");
                    }}
                    className="d-flex gap-2 align-items-center"
                  >
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
